// Energy Physics Calculations based on electrical engineering principles

export class EnergyCalculations {
  // Physical constants
  static GRID_CO2_FACTOR = 0.6; // kg CO2/kWh for Egyptian grid
  static SOLAR_CO2_FACTOR = 0.04; // kg CO2/kWh lifecycle
  static WIND_CO2_FACTOR = 0.01; // kg CO2/kWh lifecycle
  static GENERATOR_CO2_FACTOR = 0.85; // kg CO2/kWh

  // Calculate electrical power using P = V * I * cos(φ) * √3 for 3-phase
  static calculateThreePhasePower(voltage, current, powerFactor) {
    return Math.sqrt(3) * voltage * current * powerFactor / 1000; // kW
  }

  // Calculate energy consumption over time
  static calculateEnergyConsumption(power, hours) {
    return power * hours; // kWh
  }

  // Calculate efficiency using η = (Useful Output / Total Input) * 100
  static calculateEfficiency(usefulOutput, totalInput) {
    if (totalInput === 0) return 0;
    return (usefulOutput / totalInput) * 100;
  }

  // Calculate power losses using P_loss = I²R (simplified)
  static calculatePowerLosses(current, resistance) {
    return Math.pow(current, 2) * resistance / 1000; // kW
  }

  // Calculate reactive power Q = V * I * sin(φ) * √3
  static calculateReactivePower(voltage, current, powerFactor) {
    const phi = Math.acos(powerFactor);
    return Math.sqrt(3) * voltage * current * Math.sin(phi) / 1000; // kVAR
  }

  // Calculate apparent power S = V * I * √3
  static calculateApparentPower(voltage, current) {
    return Math.sqrt(3) * voltage * current / 1000; // kVA
  }

  // Calculate energy cost based on tariff structure
  static calculateEnergyCost(consumption, tariffStructure) {
    let totalCost = 0;
    let remainingConsumption = consumption;

    for (const tier of tariffStructure.tiers) {
      if (remainingConsumption <= 0) break;
      
      const tierConsumption = Math.min(remainingConsumption, tier.limit - tier.min);
      totalCost += tierConsumption * tier.rate;
      remainingConsumption -= tierConsumption;
    }

    return totalCost;
  }

  // AI-based consumption prediction using linear regression
  static predictConsumption(historicalData, seasonalFactor = 1) {
    if (historicalData.length < 3) {
      return { predicted: 0, confidence: 0 };
    }

    // Simple linear regression
    const n = historicalData.length;
    const x = Array.from({ length: n }, (_, i) => i + 1);
    const y = historicalData;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const predicted = (slope * (n + 1) + intercept) * seasonalFactor;
    
    // Calculate R-squared for confidence
    const yMean = sumY / n;
    const totalVariation = y.reduce((sum, yi) => sum + Math.pow(yi - yMean, 2), 0);
    const unexplainedVariation = y.reduce((sum, yi, i) => {
      const predictedY = slope * x[i] + intercept;
      return sum + Math.pow(yi - predictedY, 2);
    }, 0);
    
    const rSquared = 1 - (unexplainedVariation / totalVariation);
    const confidence = Math.max(0, Math.min(100, rSquared * 100));

    return { predicted: Math.max(0, predicted), confidence };
  }

  // Calculate CO2 emissions based on energy mix
  static calculateCO2Emissions(energySources) {
    return energySources.reduce((total, source) => {
      const co2Factor = this.getCO2Factor(source.type);
      return total + (source.consumption * co2Factor);
    }, 0);
  }

  // Get CO2 emission factor by energy source type
  static getCO2Factor(sourceType) {
    switch (sourceType) {
      case 'solar': return this.SOLAR_CO2_FACTOR;
      case 'wind': return this.WIND_CO2_FACTOR;
      case 'generator': return this.GENERATOR_CO2_FACTOR;
      case 'grid': return this.GRID_CO2_FACTOR;
      default: return this.GRID_CO2_FACTOR;
    }
  }

  // Calculate optimal load distribution to minimize costs
  static optimizeLoadDistribution(loads, constraints) {
    // Simplified optimization - sort by cost efficiency
    const sortedLoads = loads.map((load, index) => ({ ...load, originalIndex: index }))
      .sort((a, b) => (a.cost / a.efficiency) - (b.cost / b.efficiency));

    let totalPower = 0;
    let totalCost = 0;
    const optimizedLoads = [];

    for (const load of sortedLoads) {
      if (totalPower + load.power <= constraints.maxPower) {
        optimizedLoads.push(load);
        totalPower += load.power;
        totalCost += load.cost;
      }
    }

    const savings = loads.reduce((sum, load) => sum + load.cost, 0) - totalCost;
    const efficiencyImprovement = optimizedLoads.reduce((sum, load) => sum + load.efficiency, 0) / optimizedLoads.length;

    return {
      optimizedLoads,
      totalPower,
      totalCost,
      savings,
      efficiencyImprovement
    };
  }

  // Calculate power factor correction requirements
  static calculatePowerFactorCorrection(activePower, currentPF, targetPF) {
    if (currentPF >= targetPF) {
      return { capacitanceNeeded: 0, cost: 0, savings: 0 };
    }

    const currentReactivePower = activePower * Math.tan(Math.acos(currentPF));
    const targetReactivePower = activePower * Math.tan(Math.acos(targetPF));
    const capacitiveReactivePower = currentReactivePower - targetReactivePower;

    // Assuming 415V system
    const voltage = 415;
    const frequency = 50;
    const capacitanceNeeded = capacitiveReactivePower * 1000 / (2 * Math.PI * frequency * Math.pow(voltage, 2)); // Farads

    const cost = capacitanceNeeded * 50; // Estimated cost per Farad
    const currentLosses = Math.pow(activePower / (voltage * Math.sqrt(3) * currentPF), 2) * 0.1; // Simplified loss calculation
    const improvedLosses = Math.pow(activePower / (voltage * Math.sqrt(3) * targetPF), 2) * 0.1;
    const savings = (currentLosses - improvedLosses) * 24 * 30 * 1.2; // Monthly savings in EGP

    return {
      capacitanceNeeded: capacitanceNeeded * 1000000, // Convert to µF
      cost,
      savings
    };
  }
}

// Egyptian electricity tariff structure (2024)
export const EGYPTIAN_TARIFF = {
  tiers: [
    { min: 0, limit: 50, rate: 0.48 },
    { min: 50, limit: 100, rate: 0.58 },
    { min: 100, limit: 200, rate: 0.70 },
    { min: 200, limit: 350, rate: 0.90 },
    { min: 350, limit: 650, rate: 1.35 },
    { min: 650, limit: 1000, rate: 1.45 },
    { min: 1000, limit: Infinity, rate: 1.55 }
  ]
};
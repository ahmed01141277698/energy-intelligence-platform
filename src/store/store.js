import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'ar',
  darkMode: false,
  energyData: [
    {
      consumption: 2450,
      renewable: 35.2,
      efficiency: 87.5,
      cost: 2940,
      losses: 306.25,
      date: '2024-09-23',
      type: 'industrial',
      powerFactor: 0.85,
      voltage: 380,
      current: 18.5
    }
  ],
  comparisonData: [
    { factoryName: 'مصنعنا', consumption: 2450, efficiency: 87.5, cost: 2940, renewablePercentage: 35.2, co2Emissions: 1470, ranking: 1 },
    { factoryName: 'مصنع الصفا', consumption: 2890, efficiency: 82.1, cost: 3468, renewablePercentage: 28.5, co2Emissions: 1734, ranking: 3 },
    { factoryName: 'مصنع النيل', consumption: 2650, efficiency: 85.2, cost: 3180, renewablePercentage: 31.8, co2Emissions: 1590, ranking: 2 },
    { factoryName: 'مصنع العربية', consumption: 3120, efficiency: 79.8, cost: 3744, renewablePercentage: 25.2, co2Emissions: 1872, ranking: 4 }
  ],
  energySources: [
    { type: 'solar', capacity: 500, currentOutput: 320, efficiency: 22.5, cost: 0.08, co2Factor: 0 },
    { type: 'wind', capacity: 300, currentOutput: 180, efficiency: 35.2, cost: 0.06, co2Factor: 0 },
    { type: 'generator', capacity: 800, currentOutput: 450, efficiency: 42.8, cost: 0.15, co2Factor: 0.85 },
    { type: 'grid', capacity: 2000, currentOutput: 1500, efficiency: 38.5, cost: 1.20, co2Factor: 0.6 }
  ],
  factoryZones: [
    {
      id: 'production',
      name: 'خط الإنتاج الرئيسي',
      consumption: 1200,
      efficiency: 78.5,
      equipment: ['آلات التشكيل', 'أفران التسخين', 'مضخات هيدروليكية'],
      priority: 'high',
      recommendations: ['تحسين عزل الأفران', 'استخدام محركات عالية الكفاءة', 'نظام استرداد الحرارة']
    },
    {
      id: 'hvac',
      name: 'نظام التكييف والتهوية',
      consumption: 680,
      efficiency: 82.3,
      equipment: ['مكيفات مركزية', 'مراوح تهوية', 'أنظمة ترطيب'],
      priority: 'medium',
      recommendations: ['تحديث نظام التحكم الذكي', 'صيانة دورية للفلاتر', 'عزل حراري محسن']
    },
    {
      id: 'lighting',
      name: 'نظام الإضاءة',
      consumption: 350,
      efficiency: 92.1,
      equipment: ['مصابيح LED', 'أنظمة تحكم ذكية', 'حساسات الحركة'],
      priority: 'low',
      recommendations: ['تحسين توزيع الإضاءة الطبيعية', 'تحديث المزيد من LED', 'نظام تحكم أذكى']
    },
    {
      id: 'utilities',
      name: 'المرافق العامة',
      consumption: 220,
      efficiency: 88.9,
      equipment: ['مضخات المياه', 'ضواغط الهواء', 'أنظمة الأمان'],
      priority: 'medium',
      recommendations: ['صيانة دورية للمضخات', 'تحسين كفاءة الضواغط', 'نظام مراقبة ذكي']
    }
  ],
  currentFactory: {
    name: 'مصنع التقنيات المتطورة',
    totalConsumption: 2450,
    efficiency: 87.5,
    co2Emissions: 1470
  },
  aiPredictions: {
    nextMonthConsumption: 2680,
    nextMonthCost: 3216,
    confidenceLevel: 87,
    recommendations: [
      'تحسين جدولة الأحمال لتوفير 320 ج.م شهرياً',
      'صيانة دورية للمعدات لتحسين الكفاءة بنسبة 5%',
      'تحديث أنظمة الإضاءة لتقليل الاستهلاك 25%'
    ]
  }
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    addEnergyData: (state, action) => {
      state.energyData.push(action.payload);
    },
    updateEnergySource: (state, action) => {
      const { index, data } = action.payload;
      if (state.energySources[index]) {
        state.energySources[index] = { ...state.energySources[index], ...data };
      }
    },
    updateFactoryZone: (state, action) => {
      const { id, data } = action.payload;
      const zoneIndex = state.factoryZones.findIndex(zone => zone.id === id);
      if (zoneIndex !== -1) {
        state.factoryZones[zoneIndex] = { ...state.factoryZones[zoneIndex], ...data };
      }
    },
    updateAIPredictions: (state, action) => {
      state.aiPredictions = { ...state.aiPredictions, ...action.payload };
    }
  }
});

export const { 
  setLanguage, 
  toggleDarkMode, 
  addEnergyData, 
  updateEnergySource, 
  updateFactoryZone,
  updateAIPredictions 
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
});
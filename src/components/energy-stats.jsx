import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Lightbulb,
  Battery,
  Gauge,
  Leaf,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useLanguage } from "../contexts/LanguageContext";

export function EnergyStats() {
  const { t } = useLanguage();
  const energyData = useSelector((state) => state.app.energyData[0]);
  const currentFactory = useSelector((state) => state.app.currentFactory);

  const stats = [
    {
      titleKey: "totalConsumption",
      value: energyData.consumption.toLocaleString(),
      unit: t("kwh"),
      change: "+12%",
      trend: "up",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "from-blue-500/20",
    },
    {
      titleKey: "efficiency",
      value: energyData.efficiency.toString(),
      unit: t("percent"),
      change: "+5.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "from-green-500/20",
    },
    {
      titleKey: "monthlyCost",
      value: energyData.cost.toLocaleString(),
      unit: t("egp"),
      change: "-8.1%",
      trend: "down",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "from-orange-500/20",
    },
    {
      titleKey: "renewableEnergy",
      value: energyData.renewable.toString(),
      unit: t("percent"),
      change: "+15.3%",
      trend: "up",
      icon: Lightbulb,
      color: "text-yellow-600",
      bgColor: "from-yellow-500/20",
    },
    {
      titleKey: "lossPercentage",
      value: ((energyData.losses / energyData.consumption) * 100).toFixed(1),
      unit: t("percent"),
      change: "-3.2%",
      trend: "down",
      icon: Battery,
      color: "text-red-600",
      bgColor: "from-red-500/20",
    },
    {
      titleKey: "powerFactor",
      value: energyData.powerFactor.toString(),
      unit: "",
      change: "+2.1%",
      trend: "up",
      icon: Gauge,
      color: "text-purple-600",
      bgColor: "from-purple-500/20",
    },
    {
      titleKey: "co2Emissions",
      value: currentFactory.co2Emissions.toLocaleString(),
      unit: t("kg"),
      change: "-12.5%",
      trend: "down",
      icon: Leaf,
      color: "text-emerald-600",
      bgColor: "from-emerald-500/20",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "up";
        const isGoodChange =
          stat.titleKey === "lossPercentage" || stat.titleKey === "co2Emissions"
            ? !isPositive
            : isPositive;

        return (
          <motion.div key={index} variants={itemVariants}>
            <motion.div
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="relative overflow-hidden group cursor-pointer">
                {/* Animated Background */}
                <motion.div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.bgColor} to-transparent rounded-bl-full transition-all duration-300 group-hover:w-24 group-hover:h-24`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {t(stat.titleKey)}
                  </CardTitle>
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </motion.div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <motion.span
                        className="text-2xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      >
                        {stat.value}
                      </motion.span>
                      <span className="text-sm text-muted-foreground">
                        {stat.unit}
                      </span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    >
                      <Badge
                        variant={isGoodChange ? "default" : "secondary"}
                        className={`w-fit ${
                          isGoodChange
                            ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300"
                        }`}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + 0.7,
                          }}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                        </motion.div>
                        {stat.change}
                      </Badge>
                    </motion.div>
                  </div>
                </CardContent>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Card>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

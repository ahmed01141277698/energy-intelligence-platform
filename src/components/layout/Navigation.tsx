// import { Link, useLocation } from 'react-router-dom';
// import { motion } from 'motion/react';
// import { 
//   LayoutDashboard, 
//   BarChart3, 
//   Brain, 
//   Calculator, 
//   GitCompare, 
//   Zap, 
//   Factory, 
//   User 
// } from 'lucide-react';
// import { useLanguage } from '../../contexts/LanguageContext';

// const navigationItems = [
//   { path: '/', icon: LayoutDashboard, key: 'dashboard' },
//   { path: '/analysis', icon: BarChart3, key: 'analysis' },
//   { path: '/predictions', icon: Brain, key: 'predictions' },
//   { path: '/calculator', icon: Calculator, key: 'calculator' },
//   { path: '/comparison', icon: GitCompare, key: 'comparison' },
//   { path: '/energy-sources', icon: Zap, key: 'energySources' },
//   { path: '/factory-zones', icon: Factory, key: 'factoryZones' },
//   { path: '/about', icon: User, key: 'about' }
// ];

// export function Navigation() {
//   const location = useLocation();
//   const { t, dir } = useLanguage();

//   return (
//     <nav className="bg-card border-r border-border h-full">
//       <div className="p-4">
//         <h2 className="font-semibold text-lg mb-4">{t('platformTitle')}</h2>
//         <ul className="space-y-2">
//           {navigationItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = location.pathname === item.path;
            
//             return (
//               <li key={item.path}>
//                 <Link to={item.path}>
//                   <motion.div
//                     className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
//                       isActive 
//                         ? 'bg-primary text-primary-foreground' 
//                         : 'hover:bg-accent hover:text-accent-foreground'
//                     }`}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <Icon className="h-5 w-5" />
//                     <span className="text-sm font-medium">{t(item.key)}</span>
//                   </motion.div>
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </nav>
//   );
// }
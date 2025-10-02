import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  User,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Award,
  Code,
  Briefcase,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const skills = [
    "React.js",
    "TypeScript",
    "Node.js",
    "Redux",
    "Tailwind CSS",
    "Material-UI",
    "Motion/Framer",
    "MongoDB",
    "PostgreSQL",
    "Docker",
  ];

  const achievements = [
    {
      title:
        language === "ar"
          ? "منصة إدارة الطاقة الذكية"
          : "Smart Energy Management Platform",
      description:
        language === "ar"
          ? "تطوير منصة متكاملة لإدارة ومراقبة استهلاك الطاقة باستخدام الذكاء الاصطناعي"
          : "Developed comprehensive platform for energy management and monitoring using AI",
      tech: ["React", "Redux", "AI/ML", "Charts", "Real-time Data"],
    },
    {
      title:
        language === "ar" ? "نظام إدارة المصانع" : "Factory Management System",
      description:
        language === "ar"
          ? "تطوير نظام شامل لإدارة العمليات الصناعية وتحسين الكفاءة"
          : "Comprehensive system for industrial operations management and efficiency optimization",
      tech: ["React", "Node.js", "MongoDB", "Real-time Analytics"],
    },
    {
      title:
        language === "ar" ? "لوحات تحكم تفاعلية" : "Interactive Dashboards",
      description:
        language === "ar"
          ? "تصميم وتطوير لوحات تحكم تفاعلية لتصور البيانات والتحليلات"
          : "Design and development of interactive dashboards for data visualization and analytics",
      tech: ["D3.js", "Recharts", "React", "TypeScript"],
    },
  ];

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="text-center space-y-4">
          <motion.div
            className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <User className="h-16 w-16 text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {t("developerName")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("developerTitle")}
            </p>
            <p className="text-muted-foreground mt-2">
              {t("aboutDescription")}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {language === "ar" ? "معلومات التواصل" : "Contact Information"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                className="flex items-center gap-3 p-3 border rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">
                    {language === "ar" ? "البريد الإلكتروني" : "Email"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ahmed.badawy@email.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-3 border rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">
                    {language === "ar" ? "رقم الهاتف" : "Phone"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    +20 011 412 77 698
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-3 border rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Globe className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">
                    {language === "ar" ? "الموقع الإلكتروني" : "Website"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    www.ahmedbadawy.dev
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-3 border rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Github className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">GitHub</p>
                  <p className="text-sm text-muted-foreground">@ahmed-badawy</p>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills & Technologies */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-600" />
              {language === "ar"
                ? "المهارات والتقنيات"
                : "Skills & Technologies"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Projects & Achievements */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              {language === "ar"
                ? "المشاريع والإنجازات"
                : "Projects & Achievements"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="border rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {achievement.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {achievement.description}
                        </p>
                      </div>
                      <Briefcase className="h-5 w-5 text-blue-600 mt-1" />
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {achievement.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* About the Platform */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>
              {language === "ar"
                ? "حول منصة إدارة الطاقة الذكية"
                : "About Smart Energy Management Platform"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {language === "ar"
                  ? "تم تطوير هذه المنصة لتوفير حل شامل لإدارة ومراقبة استهلاك الطاقة في المصانع والمؤسسات الصناعية. تستخدم المنصة أحدث تقنيات الذكاء الاصطناعي والتعلم الآلي لتقديم تحليلات دقيقة وتوصيات عملية لتحسين كفاءة الطاقة."
                  : "This platform was developed to provide a comprehensive solution for energy management and monitoring in factories and industrial facilities. The platform uses the latest AI and machine learning technologies to provide accurate analytics and practical recommendations for improving energy efficiency."}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-600">
                    {language === "ar" ? "الميزات الرئيسية:" : "Key Features:"}
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>
                      •{" "}
                      {language === "ar"
                        ? "مراقبة الاستهلاك في الوقت الفعلي"
                        : "Real-time consumption monitoring"}
                    </li>
                    <li>
                      •{" "}
                      {language === "ar"
                        ? "تحليل الكفاءة والأداء"
                        : "Efficiency and performance analysis"}
                    </li>
                    <li>
                      •{" "}
                      {language === "ar"
                        ? "حسابات فيزيائية متقدمة"
                        : "Advanced physics calculations"}
                    </li>
                    <li>
                      •{" "}
                      {language === "ar"
                        ? "تنبؤات ذكية بالاستهلاك"
                        : "Smart consumption predictions"}
                    </li>
                    <li>
                      •{" "}
                      {language === "ar"
                        ? "مقارنات معيارية"
                        : "Benchmarking comparisons"}
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-600">
                    {language === "ar"
                      ? "التقنيات المستخدمة:"
                      : "Technologies Used:"}
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• React.js & JavaScript</li>
                    <li>• Redux Toolkit</li>
                    <li>• Tailwind CSS</li>
                    <li>• Motion/Framer Animation</li>
                    <li>• Recharts for Data Visualization</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={itemVariants}>
        <Card className="text-center">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              {language === "ar"
                ? "هل تريد التعاون معي؟"
                : "Want to Work Together?"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === "ar"
                ? "أرحب بالتعاون في مشاريع تطوير الويب والحلول التقنية المبتكرة"
                : "I welcome collaboration on web development projects and innovative technical solutions"}
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                {language === "ar" ? "تواصل معي" : "Contact Me"}
              </Button>
              <Button variant="outline" className="gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

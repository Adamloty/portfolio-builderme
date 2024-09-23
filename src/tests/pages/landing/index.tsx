// File: src/tests/pages/landing/index.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Mail, Github, Linkedin, Star } from 'lucide-react'

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('experience')

  const features = [
    { name: 'AI-Powered Content Suggestions', level: 95 },
    { name: 'Real-Time Collaboration', level: 90 },
    { name: 'Custom Domain Integration', level: 85 },
    { name: 'SEO Optimization Tools', level: 80 },
    { name: 'Analytics Dashboard', level: 75 },
  ]

  const customizationOptions = [
    { title: 'Theme Wizard', desc: 'Create your perfect color scheme with our AI-powered Theme Wizard' },
    { title: 'Layout Library', desc: 'Choose from 50+ pre-designed layouts or create your own' },
    { title: 'Font Pairing', desc: 'Discover perfect font combinations with our smart pairing tool' },
    { title: 'Interactive Elements', desc: 'Add animations, parallax effects, and micro-interactions' },
  ]

  const experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Innovators Inc.',
      period: '2020 - Present',
      description: 'Led a team of developers in creating cutting-edge web applications.'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      period: '2017 - 2020',
      description: 'Developed and maintained various client projects using modern web technologies.'
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Ventures',
      period: '2015 - 2017',
      description: 'Assisted in the development of innovative mobile apps and websites.'
    }
  ]

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'Tech University',
      year: '2015'
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'State College',
      year: '2013'
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8"
    >
      <Card className="max-w-4xl mx-auto shadow-lg overflow-hidden">
        <CardContent className="p-6">
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">PortfolioForge</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Craft Your Professional Identity in Minutes</p>
            <motion.div 
              className="flex justify-center space-x-4 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Button variant="outline" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div 
              className="flex justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button>
                Start Building Your Portfolio <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.header>

          <motion.section 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Unleash Your Professional Potential</h2>
            <p className="text-gray-600 dark:text-gray-300">
              PortfolioForge empowers you to create stunning, personalized portfolios that capture your unique skills and experiences. With our intuitive drag-and-drop interface, AI-powered content suggestions, and real-time collaboration features, you'll have a professional-grade portfolio in no time. Stand out in the competitive job market and showcase your talents to the world!
            </p>
          </motion.section>

          <motion.section 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.3 }}
                >
                  <span className="w-48 text-sm">{feature.name}</span>
                  <motion.div 
                    className="flex-1 mr-4"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.2 * index + 0.3, duration: 0.5 }}
                  >
                    <Progress value={feature.level} />
                  </motion.div>
                  <span className="text-sm font-medium">{feature.level}%</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
              <TabsContent value="experience">
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 * index, duration: 0.3 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{exp.company} | {exp.period}</p>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">{exp.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="education">
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 * index, duration: 0.3 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold">{edu.degree}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{edu.school} | {edu.year}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.section 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4">Customization Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {customizationOptions.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="overflow-hidden">
                    <motion.div 
                      className="h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                      whileHover={{ backgroundColor: '#3498db' }}
                    >
                      <span className="text-4xl text-gray-400 dark:text-gray-500">{option.title}</span>
                    </motion.div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{option.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{option.desc}</p>
                      <Button variant="outline" size="sm">Learn More</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.footer 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join thousands of professionals who have elevated their online presence with PortfolioForge. 
              Create your stunning, customized portfolio today and take the next step in your career!
            </p>
            <div className="flex justify-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button>
                  Start Free Trial <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline">
                  View Pricing Plans <Star className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.footer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

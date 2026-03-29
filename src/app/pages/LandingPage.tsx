import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Target, 
  TrendingUp, 
  Award, 
  Bell, 
  FileText,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Users,
  Shield
} from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Path4U
            </h1>
          </motion.div>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="hover:bg-blue-50">Login</Button>
            </Link>
            <Link to="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-shadow">
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200 px-4 py-2">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Career Guidance
            </Badge>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Your AI Job Mentor
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Upload your resume, get instant ATS scores, personalized roadmaps, and real-time job matches. 
            Whether you're a fresher or switching roles, Path4U guides your career journey.
          </motion.p>
          
          <motion.div 
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-8 shadow-lg hover:shadow-2xl transition-shadow">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/jobs">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:bg-gray-50">
                  Browse Jobs
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '50K+', label: 'Active Users', color: 'blue', delay: 0 },
            { value: '10K+', label: 'Jobs Listed', color: 'purple', delay: 0.1 },
            { value: '500+', label: 'Companies', color: 'pink', delay: 0.2 },
            { value: '95%', label: 'Success Rate', color: 'orange', delay: 0.3 }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="text-center shadow-lg hover:shadow-xl transition-all border-0">
                <CardContent className="pt-6">
                  <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-4">Who We Serve</h3>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Tailored solutions for every stage of your career journey
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Freshers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <Card className="border-2 hover:border-blue-500 transition-all hover:shadow-2xl h-full group">
              <CardHeader>
                <div className="h-48 overflow-hidden rounded-lg mb-4 relative">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1758270704025-0e1a1793e1ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudHMlMjBsZWFybmluZ3xlbnwxfHx8fDE3NzQ3NzMxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="College Students"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.div 
                    className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <CardTitle className="text-2xl">Freshers</CardTitle>
                </div>
                <CardDescription className="text-base">
                  College students ready to kickstart their careers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Resume building & ATS optimization',
                    'Entry-level job recommendations',
                    'Skill development roadmaps',
                    'Career path guidance'
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link to="/signup?type=fresher" className="block mt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experienced Professionals */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <Card className="border-2 hover:border-purple-500 transition-all hover:shadow-2xl h-full group relative overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-yellow-400 text-yellow-900 shadow-lg">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </div>
              <CardHeader>
                <div className="h-48 overflow-hidden rounded-lg mb-4 relative">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1770235621101-91b9d255f07a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYXJlZXIlMjBzdWNjZXNzfGVufDF8fHx8MTc3NDcyNjAwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Experienced Professional"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.div 
                    className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </motion.div>
                  <CardTitle className="text-2xl">Experienced</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Professionals seeking career transitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Role transition analysis',
                    'Senior position matching',
                    'Upskilling recommendations',
                    'Salary insights & negotiation'
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link to="/signup?type=experienced" className="block mt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 shadow-lg">
                      Switch Roles <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Companies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ y: -10 }}
          >
            <Card className="border-2 hover:border-pink-500 transition-all hover:shadow-2xl h-full group">
              <CardHeader>
                <div className="h-48 overflow-hidden rounded-lg mb-4 relative">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1672917187338-7f81ecac3d3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmd8ZW58MXx8fHwxNzc0NzkyOTM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Companies"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.div 
                    className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Building2 className="h-6 w-6 text-pink-600" />
                  </motion.div>
                  <CardTitle className="text-2xl">Companies</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Organizations looking for top talent
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Post job openings instantly',
                    'AI-powered candidate matching',
                    'Host coding contests & assessments',
                    'Recruitment analytics dashboard'
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link to="/signup?type=company" className="block mt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700 shadow-lg">
                      Hire Talent <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-center mb-4">Powerful Features</h3>
            <p className="text-center text-blue-100 mb-12 text-lg">
              Everything you need for career success in one platform
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: 'ATS Score Analysis', desc: 'Get real-time ATS scores with detailed improvement suggestions', delay: 0 },
              { icon: TrendingUp, title: 'Career Roadmaps', desc: 'Personalized learning paths with resource recommendations', delay: 0.1 },
              { icon: Bell, title: 'Job Alerts', desc: 'Real-time notifications for matching opportunities', delay: 0.2 },
              { icon: Award, title: 'Role Possibility', desc: '0-100% match score for different career paths', delay: 0.3 }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white h-full hover:bg-white/20 transition-all">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="h-10 w-10 mb-3" />
                    </motion.div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="text-blue-100">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-4">How It Works</h3>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Get started in just 3 simple steps
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { num: 1, title: 'Upload Resume', desc: 'Upload your resume and let our AI analyze your profile', color: 'blue' },
            { num: 2, title: 'Get Insights', desc: 'Receive ATS score, role suggestions, and personalized roadmap', color: 'purple' },
            { num: 3, title: 'Apply & Grow', desc: 'Apply to matched jobs and follow your learning roadmap', color: 'pink' }
          ].map((step, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className={`h-20 w-20 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className={`text-3xl font-bold text-${step.color}-600`}>{step.num}</span>
              </motion.div>
              <h4 className="text-xl font-bold mb-2">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, value: '50,000+', label: 'Happy Users', color: 'blue' },
            { icon: Shield, value: '99.9%', label: 'Uptime', color: 'green' },
            { icon: Zap, value: '<2min', label: 'Analysis Time', color: 'yellow' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="text-center p-8 border-0 shadow-xl">
                <item.icon className={`h-12 w-12 mx-auto mb-4 text-${item.color}-600`} />
                <div className="text-4xl font-bold mb-2">{item.value}</div>
                <p className="text-gray-600">{item.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-0 text-white shadow-2xl overflow-hidden relative">
            {/* Animated background elements */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-10"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity }}
            />
            
            <CardHeader className="text-center pb-8 pt-12 relative z-10">
              <CardTitle className="text-4xl md:text-5xl mb-4">Ready to Transform Your Career?</CardTitle>
              <CardDescription className="text-blue-100 text-lg max-w-2xl mx-auto">
                Join thousands of professionals who have found their dream jobs with Path4U
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-12 relative z-10">
              <Link to="/signup">
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="secondary" className="text-lg px-8 shadow-2xl">
                    Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Path4U</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Your AI-powered career mentor guiding you to success
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Candidates</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link></li>
                <li><Link to="/resume-analysis" className="hover:text-white transition-colors">Resume Analysis</Link></li>
                <li><Link to="/roadmap" className="hover:text-white transition-colors">Learning Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Companies</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/company" className="hover:text-white transition-colors">Post Jobs</Link></li>
                <li><Link to="/company" className="hover:text-white transition-colors">Host Contests</Link></li>
                <li><Link to="/company" className="hover:text-white transition-colors">Find Talent</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Path4U. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
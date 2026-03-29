import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Target, 
  Bell, 
  LogOut,
  BookOpen,
  Play,
  CheckCircle2,
  Lock,
  ExternalLink,
  Trophy,
  Zap,
  Youtube,
  FileText,
  Code
} from 'lucide-react';

interface RoadmapItem {
  title: string;
  type: 'video' | 'article' | 'course' | 'practice';
  duration: string;
  platform: string;
  url: string;
  completed: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Skill {
  name: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  roadmap: RoadmapItem[];
}

export function RoadmapPage() {
  // Target role
  const targetRole = 'Senior Frontend Developer';
  const overallProgress = 45;

  // Skills to learn
  const skills: Skill[] = [
    {
      name: 'React Advanced Patterns',
      progress: 60,
      priority: 'high',
      roadmap: [
        {
          title: 'React Hooks Deep Dive',
          type: 'video',
          duration: '2h 30m',
          platform: 'YouTube',
          url: '#',
          completed: true,
          difficulty: 'intermediate'
        },
        {
          title: 'Custom Hooks Mastery',
          type: 'course',
          duration: '4h',
          platform: 'Udemy',
          url: '#',
          completed: true,
          difficulty: 'intermediate'
        },
        {
          title: 'React Design Patterns',
          type: 'article',
          duration: '30m',
          platform: 'Medium',
          url: '#',
          completed: false,
          difficulty: 'advanced'
        },
        {
          title: 'Build a Complex App',
          type: 'practice',
          duration: '10h',
          platform: 'FreeCodeCamp',
          url: '#',
          completed: false,
          difficulty: 'advanced'
        }
      ]
    },
    {
      name: 'System Design',
      progress: 30,
      priority: 'high',
      roadmap: [
        {
          title: 'System Design Fundamentals',
          type: 'video',
          duration: '3h',
          platform: 'YouTube',
          url: '#',
          completed: true,
          difficulty: 'intermediate'
        },
        {
          title: 'Scalability Concepts',
          type: 'article',
          duration: '45m',
          platform: 'System Design Primer',
          url: '#',
          completed: false,
          difficulty: 'advanced'
        },
        {
          title: 'Designing Netflix',
          type: 'course',
          duration: '2h',
          platform: 'Educative',
          url: '#',
          completed: false,
          difficulty: 'advanced'
        },
        {
          title: 'Mock System Design Interviews',
          type: 'practice',
          duration: '5h',
          platform: 'Pramp',
          url: '#',
          completed: false,
          difficulty: 'advanced'
        }
      ]
    },
    {
      name: 'TypeScript Advanced',
      progress: 80,
      priority: 'medium',
      roadmap: [
        {
          title: 'TypeScript Basics',
          type: 'course',
          duration: '3h',
          platform: 'TypeScript Handbook',
          url: '#',
          completed: true,
          difficulty: 'beginner'
        },
        {
          title: 'Advanced Types & Generics',
          type: 'video',
          duration: '2h',
          platform: 'YouTube',
          url: '#',
          completed: true,
          difficulty: 'advanced'
        },
        {
          title: 'TypeScript Best Practices',
          type: 'article',
          duration: '20m',
          platform: 'Dev.to',
          url: '#',
          completed: false,
          difficulty: 'intermediate'
        }
      ]
    },
    {
      name: 'Performance Optimization',
      progress: 25,
      priority: 'high',
      roadmap: [
        {
          title: 'Web Performance Fundamentals',
          type: 'course',
          duration: '4h',
          platform: 'Web.dev',
          url: '#',
          completed: true,
          difficulty: 'intermediate'
        },
        {
          title: 'React Performance Tips',
          type: 'video',
          duration: '1h 30m',
          platform: 'YouTube',
          url: '#',
          completed: false,
          difficulty: 'intermediate'
        },
        {
          title: 'Lighthouse & Core Web Vitals',
          type: 'article',
          duration: '40m',
          platform: 'Google Developers',
          url: '#',
          completed: false,
          difficulty: 'intermediate'
        }
      ]
    },
    {
      name: 'Testing & TDD',
      progress: 40,
      priority: 'medium',
      roadmap: [
        {
          title: 'Jest & React Testing Library',
          type: 'course',
          duration: '3h',
          platform: 'Testing JavaScript',
          url: '#',
          completed: true,
          difficulty: 'intermediate'
        },
        {
          title: 'E2E Testing with Cypress',
          type: 'video',
          duration: '2h',
          platform: 'YouTube',
          url: '#',
          completed: false,
          difficulty: 'intermediate'
        },
        {
          title: 'TDD Best Practices',
          type: 'article',
          duration: '30m',
          platform: 'Kent C. Dodds Blog',
          url: '#',
          completed: false,
          difficulty: 'advanced'
        }
      ]
    },
    {
      name: 'Cloud & DevOps Basics',
      progress: 15,
      priority: 'low',
      roadmap: [
        {
          title: 'AWS Fundamentals',
          type: 'course',
          duration: '5h',
          platform: 'AWS Training',
          url: '#',
          completed: false,
          difficulty: 'beginner'
        },
        {
          title: 'Docker for Developers',
          type: 'video',
          duration: '2h',
          platform: 'YouTube',
          url: '#',
          completed: true,
          difficulty: 'beginner'
        },
        {
          title: 'CI/CD Pipeline Setup',
          type: 'practice',
          duration: '4h',
          platform: 'GitHub Actions',
          url: '#',
          completed: false,
          difficulty: 'intermediate'
        }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Youtube className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'practice':
        return <Code className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'advanced':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Path4U
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link to="/resume-analysis">
              <Button variant="ghost">Resume Analysis</Button>
            </Link>
            <Link to="/jobs">
              <Button variant="ghost">Jobs</Button>
            </Link>
            <Link to="/roadmap">
              <Button variant="ghost">Roadmap</Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Learning Roadmap</h2>
          <p className="text-gray-600">Personalized path to become a {targetRole}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Progress */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Overall Progress
                    </CardTitle>
                    <CardDescription>Track your journey to {targetRole}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{overallProgress}%</div>
                    <p className="text-sm text-gray-600">Complete</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={overallProgress} className="h-3 mb-4" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-400">7</div>
                    <p className="text-sm text-gray-600">Remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Roadmap */}
            <Card>
              <CardHeader>
                <CardTitle>Skills to Master</CardTitle>
                <CardDescription>Focus on high-priority skills first</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="all">All Skills</TabsTrigger>
                    <TabsTrigger value="high">High Priority</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="low">Low</TabsTrigger>
                  </TabsList>

                  {['all', 'high', 'medium', 'low'].map((priority) => (
                    <TabsContent key={priority} value={priority} className="space-y-4">
                      {skills
                        .filter(skill => priority === 'all' || skill.priority === priority)
                        .map((skill, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                                  <Badge variant="outline" className={getPriorityColor(skill.priority)}>
                                    {skill.priority} priority
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm text-gray-600">Progress</span>
                                      <span className="text-sm font-medium">{skill.progress}%</span>
                                    </div>
                                    <Progress value={skill.progress} className="h-2" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {skill.roadmap.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                                    item.completed ? 'bg-green-50 border-green-200' : 'bg-white'
                                  }`}
                                >
                                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    item.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                                  }`}>
                                    {item.completed ? (
                                      <CheckCircle2 className="h-5 w-5" />
                                    ) : (
                                      <Lock className="h-4 w-4" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      {getTypeIcon(item.type)}
                                      <h5 className="font-medium text-sm truncate">{item.title}</h5>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-600">
                                      <span>{item.platform}</span>
                                      <span>•</span>
                                      <span>{item.duration}</span>
                                      <Badge variant="outline" className={`${getDifficultyColor(item.difficulty)} text-xs`}>
                                        {item.difficulty}
                                      </Badge>
                                    </div>
                                  </div>
                                  <Button size="sm" variant={item.completed ? 'outline' : 'default'}>
                                    {item.completed ? 'Review' : 'Start'}
                                    <ExternalLink className="h-3 w-3 ml-2" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Target Role */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-white">Target Role</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl font-bold mb-2">{targetRole}</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Based on your profile analysis and career goals
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-100">Current Match</span>
                    <span className="font-bold">78%</span>
                  </div>
                  <Progress value={78} className="h-2 bg-blue-400" />
                  <p className="text-blue-100 text-xs mt-3">
                    Complete the high-priority skills to reach 95% match
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Learning Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Hours</span>
                  <span className="font-bold text-lg">124h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-bold text-lg">8h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Streak</span>
                  <span className="font-bold text-lg flex items-center gap-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    12 days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Certificates</span>
                  <span className="font-bold text-lg">3</span>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Platforms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-red-100 rounded flex items-center justify-center">
                    <Youtube className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="text-sm font-medium">YouTube Tutorials</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-100 rounded flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">Udemy Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-purple-100 rounded flex items-center justify-center">
                    <FileText className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium">Documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-green-100 rounded flex items-center justify-center">
                    <Code className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">Practice Projects</span>
                </div>
              </CardContent>
            </Card>

            {/* Motivation */}
            <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Keep Going!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-yellow-50">
                  You're making great progress! Complete 2 more items this week to maintain your streak.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

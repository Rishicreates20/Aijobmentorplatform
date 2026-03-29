import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { 
  Target, 
  Bell, 
  LogOut,
  Plus,
  Briefcase,
  Trophy,
  Users,
  TrendingUp,
  Eye,
  Calendar,
  DollarSign,
  MapPin,
  Building2
} from 'lucide-react';
import { toast } from 'sonner';

export function CompanyDashboard() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [contestName, setContestName] = useState('');
  const [contestDescription, setContestDescription] = useState('');

  const company = {
    name: 'TechCorp Inc.',
    logo: 'TC'
  };

  const stats = {
    jobsPosted: 12,
    totalApplicants: 458,
    activeContests: 2,
    hiredCandidates: 8
  };

  const postedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$140k - $180k',
      posted: '2 days ago',
      applicants: 67,
      views: 234,
      status: 'active'
    },
    {
      id: 2,
      title: 'Backend Engineer',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130k - $170k',
      posted: '5 days ago',
      applicants: 89,
      views: 312,
      status: 'active'
    },
    {
      id: 3,
      title: 'Product Designer',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$100k - $130k',
      posted: '1 week ago',
      applicants: 45,
      views: 156,
      status: 'active'
    }
  ];

  const contests = [
    {
      id: 1,
      name: 'Frontend Challenge 2026',
      participants: 234,
      startDate: 'Apr 1, 2026',
      endDate: 'Apr 15, 2026',
      prize: '$5,000',
      status: 'active'
    },
    {
      id: 2,
      name: 'Algorithm Sprint',
      participants: 189,
      startDate: 'Mar 20, 2026',
      endDate: 'Mar 27, 2026',
      prize: '$3,000',
      status: 'ended'
    }
  ];

  const topCandidates = [
    { name: 'Alice Johnson', role: 'Frontend Developer', matchScore: 95, status: 'Interview Scheduled' },
    { name: 'Bob Smith', role: 'Backend Engineer', matchScore: 92, status: 'Applied' },
    { name: 'Carol Davis', role: 'Full Stack Developer', matchScore: 88, status: 'Under Review' },
    { name: 'David Wilson', role: 'Frontend Developer', matchScore: 85, status: 'Applied' }
  ];

  const handlePostJob = () => {
    if (!jobTitle || !jobDescription || !jobLocation || !jobSalary) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Job posted successfully!');
    setJobTitle('');
    setJobDescription('');
    setJobLocation('');
    setJobSalary('');
  };

  const handleCreateContest = () => {
    if (!contestName || !contestDescription) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Contest created successfully!');
    setContestName('');
    setContestDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Path4U
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/company">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {company.logo}
              </div>
              <span className="font-medium">{company.name}</span>
            </div>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Company Dashboard</h2>
          <p className="text-gray-600">Manage your job postings, contests, and find top talent</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Jobs Posted</CardTitle>
              <Briefcase className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.jobsPosted}</div>
              <p className="text-xs text-gray-600 mt-1">Active positions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Applicants</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stats.totalApplicants}</div>
              <p className="text-xs text-gray-600 mt-1">Across all jobs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Contests</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.activeContests}</div>
              <p className="text-xs text-gray-600 mt-1">Running now</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Hired</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.hiredCandidates}</div>
              <p className="text-xs text-gray-600 mt-1">This quarter</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs for Jobs and Contests */}
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="jobs" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="jobs">Posted Jobs</TabsTrigger>
                    <TabsTrigger value="contests">Contests</TabsTrigger>
                  </TabsList>

                  {/* Posted Jobs */}
                  <TabsContent value="jobs" className="space-y-4">
                    <div className="flex justify-end mb-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-pink-600 to-purple-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Post New Job
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Post a New Job</DialogTitle>
                            <DialogDescription>
                              Fill in the details to post a new job opening
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label htmlFor="job-title">Job Title</Label>
                              <Input
                                id="job-title"
                                placeholder="e.g., Senior Frontend Developer"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="job-location">Location</Label>
                              <Input
                                id="job-location"
                                placeholder="e.g., San Francisco, CA or Remote"
                                value={jobLocation}
                                onChange={(e) => setJobLocation(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="job-salary">Salary Range</Label>
                              <Input
                                id="job-salary"
                                placeholder="e.g., $120k - $150k"
                                value={jobSalary}
                                onChange={(e) => setJobSalary(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="job-description">Description</Label>
                              <Textarea
                                id="job-description"
                                placeholder="Job responsibilities, requirements, and benefits..."
                                rows={6}
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                              />
                            </div>
                            <Button onClick={handlePostJob} className="w-full bg-gradient-to-r from-pink-600 to-purple-600">
                              Post Job
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {postedJobs.map((job) => (
                      <Card key={job.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold mb-2">{job.title}</h4>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  {job.salary}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {job.posted}
                                </span>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-700">{job.status}</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{job.applicants}</div>
                              <p className="text-xs text-gray-600">Applicants</p>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{job.views}</div>
                              <p className="text-xs text-gray-600">Views</p>
                            </div>
                            <div className="text-center">
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  {/* Contests */}
                  <TabsContent value="contests" className="space-y-4">
                    <div className="flex justify-end mb-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-gradient-to-r from-yellow-600 to-orange-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Contest
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Create a Contest</DialogTitle>
                            <DialogDescription>
                              Host a coding contest to find top talent
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label htmlFor="contest-name">Contest Name</Label>
                              <Input
                                id="contest-name"
                                placeholder="e.g., Frontend Challenge 2026"
                                value={contestName}
                                onChange={(e) => setContestName(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label htmlFor="contest-description">Description</Label>
                              <Textarea
                                id="contest-description"
                                placeholder="Contest rules, challenges, and prizes..."
                                rows={6}
                                value={contestDescription}
                                onChange={(e) => setContestDescription(e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="start-date">Start Date</Label>
                                <Input id="start-date" type="date" />
                              </div>
                              <div>
                                <Label htmlFor="end-date">End Date</Label>
                                <Input id="end-date" type="date" />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="prize">Prize Amount</Label>
                              <Input
                                id="prize"
                                placeholder="e.g., $5,000"
                              />
                            </div>
                            <Button onClick={handleCreateContest} className="w-full bg-gradient-to-r from-yellow-600 to-orange-600">
                              Create Contest
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {contests.map((contest) => (
                      <Card key={contest.id} className="border-l-4 border-l-yellow-500">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Trophy className="h-5 w-5 text-yellow-600" />
                                <h4 className="text-lg font-semibold">{contest.name}</h4>
                              </div>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <span>{contest.startDate} - {contest.endDate}</span>
                                <span>•</span>
                                <span className="font-medium text-green-600">{contest.prize} Prize</span>
                              </div>
                            </div>
                            <Badge className={contest.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                              {contest.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div>
                              <span className="text-2xl font-bold text-purple-600">{contest.participants}</span>
                              <span className="text-sm text-gray-600 ml-2">Participants</span>
                            </div>
                            <Button variant="outline" size="sm">View Leaderboard</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full justify-start bg-gradient-to-r from-pink-600 to-purple-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Post a New Job</DialogTitle>
                      <DialogDescription>Fill in the details to post a new job opening</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="quick-job-title">Job Title</Label>
                        <Input id="quick-job-title" placeholder="e.g., Senior Frontend Developer" />
                      </div>
                      <div>
                        <Label htmlFor="quick-job-description">Description</Label>
                        <Textarea id="quick-job-description" rows={4} />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600">Post Job</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button className="w-full justify-start" variant="outline">
                  <Trophy className="h-4 w-4 mr-2" />
                  Create Contest
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Candidates
                </Button>
              </CardContent>
            </Card>

            {/* Top Candidates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Matched Candidates</CardTitle>
                <CardDescription>AI-recommended candidates for your positions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {topCandidates.map((candidate, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-medium text-sm">{candidate.name}</h5>
                        <p className="text-xs text-gray-600">{candidate.role}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {candidate.matchScore}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">{candidate.status}</span>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upgrade Banner */}
            <Card className="bg-gradient-to-br from-pink-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="text-white text-base">Upgrade to Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-pink-100 mb-4">
                  <li>• Priority job listings</li>
                  <li>• Advanced analytics</li>
                  <li>• Unlimited contests</li>
                  <li>• Dedicated support</li>
                </ul>
                <Button variant="secondary" className="w-full">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

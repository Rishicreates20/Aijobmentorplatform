import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import {
  Target,
  Bell,
  LogOut,
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building2,
  Bookmark,
  ExternalLink,
  Filter,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';
import { fetchJobs } from '../../lib/api';

interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  skills: string[];
  matchScore: number;
  applicants: number;
}

export function JobListings() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch(() => toast.error('Failed to load jobs'))
      .finally(() => setLoading(false));
  }, []);

  const toggleSaveJob = (jobId: number) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      toast.success('Job removed from saved list');
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success('Job saved successfully!');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation =
      locationFilter === 'all' ||
      (locationFilter === 'remote' && job.location === 'Remote') ||
      (locationFilter === 'onsite' && job.location !== 'Remote');
    const matchesType = jobTypeFilter === 'all' || job.type.toLowerCase().replace('-', '') === jobTypeFilter.replace('-', '');
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
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
            <Link to="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
            <Link to="/resume-analysis"><Button variant="ghost">Resume Analysis</Button></Link>
            <Link to="/jobs"><Button variant="ghost">Jobs</Button></Link>
            <Link to="/roadmap"><Button variant="ghost">Roadmap</Button></Link>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button>
          </nav>
        </div>
      </header>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2">Find Your Dream Job</h2>
          <p className="text-blue-100 mb-8">Curated listings matched to your skills</p>
          <div className="flex gap-4 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by job title, company, or skills..."
                className="pl-10 h-12 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="lg" variant="secondary" className="px-8">Search Jobs</Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Type</label>
                  <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="w-full" onClick={() => {
                  setSearchQuery(''); setLocationFilter('all'); setJobTypeFilter('all');
                }}>Clear Filters</Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-gray-600">Loading jobs...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">{filteredJobs.length} Jobs Found</h3>
                </div>
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center flex-shrink-0 border">
                            <Building2 className="h-7 w-7 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="text-lg font-semibold mb-1">{job.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{job.company}</span>
                                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.posted}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => toggleSaveJob(job.id)}
                                className={savedJobs.includes(job.id) ? 'text-blue-600' : ''}>
                                <Bookmark className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                              </Button>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {job.skills.map((skill, idx) => (
                                <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">{skill}</Badge>
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 text-sm">
                                <span className="flex items-center gap-1 text-gray-600"><DollarSign className="h-4 w-4" />{job.salary}</span>
                                <Badge variant="outline">{job.type}</Badge>
                                <Link to="/resume-analysis">
                                  <Badge className="bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200">
                                    Analyze Match
                                  </Badge>
                                </Link>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">{job.applicants} applicants</span>
                                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                                  Apply Now <ExternalLink className="h-3.5 w-3.5 ml-1" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filteredJobs.length === 0 && (
                  <Card className="p-12 text-center">
                    <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters</p>
                    <Button variant="outline" onClick={() => { setSearchQuery(''); setLocationFilter('all'); setJobTypeFilter('all'); }}>
                      Clear All Filters
                    </Button>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

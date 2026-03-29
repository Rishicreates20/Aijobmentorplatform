import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { CandidateDashboard } from "./pages/CandidateDashboard";
import { ResumeAnalysis } from "./pages/ResumeAnalysis";
import { JobListings } from "./pages/JobListings";
import { RoadmapPage } from "./pages/RoadmapPage";
import { CompanyDashboard } from "./pages/CompanyDashboard";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/dashboard",
    Component: CandidateDashboard,
  },
  {
    path: "/resume-analysis",
    Component: ResumeAnalysis,
  },
  {
    path: "/jobs",
    Component: JobListings,
  },
  {
    path: "/roadmap",
    Component: RoadmapPage,
  },
  {
    path: "/company",
    Component: CompanyDashboard,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

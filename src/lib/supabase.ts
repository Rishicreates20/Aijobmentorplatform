import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jqvzgpunhfzdlhqcdwth.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdnpncHVuaGZ6ZGxocWNkd3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3Njg4NTYsImV4cCI6MjA5MDM0NDg1Nn0.bYvPxxjdAaEeCu1Vh5QJ7mvFTUecXTjRiTvpxjudRVs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'company';
  user_type?: 'fresher' | 'experienced';
  company_name?: string;
};

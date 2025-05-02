import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nlfkbejztqvkxojepfib.supabase.co'; // Replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZmtiZWp6dHF2a3hvamVwZmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1ODMzODksImV4cCI6MjA2MTE1OTM4OX0.ntCGaiL_UXfElaBlOndqZ4U9ZqyUxOqa8Tw1GJk4pDc'; // Replace this

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
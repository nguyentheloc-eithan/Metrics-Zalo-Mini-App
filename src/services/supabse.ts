import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ctxvsrfwmbfxsodwuvxv.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0eHZzcmZ3bWJmeHNvZHd1dnh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc0MDE3NjgsImV4cCI6MTk4Mjk3Nzc2OH0.ZraLICYhlmsLyv7C40WbdQPmPr5-5aDAv5Y8W68d1lM";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

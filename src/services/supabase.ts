import { createClient } from "@supabase/supabase-js";
// dev

// const supabaseUrl = "https://ctxvsrfwmbfxsodwuvxv.supabase.co";
// const supabaseAnonKey =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0eHZzcmZ3bWJmeHNvZHd1dnh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NzQwMTc2OCwiZXhwIjoxOTgyOTc3NzY4fQ.ILlCsy7X1bBf5DQ2ccj4eHR3sK-cvStCnDEHLMtFOA0";
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
/*** Production ***/
const supabaseUrl = "https://ghukjxfokoeacobbajae.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdodWtqeGZva29lYWNvYmJhamFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2Mzk0NzcyNywiZXhwIjoxOTc5NTIzNzI3fQ.I2l0n_mA16puKRDg2A4IIPwjKWuvaQeSB0CpMtTx7H4";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

// This creates a Supabase client for use in client components
// It handles session persistence automatically
export const supabaseClient = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

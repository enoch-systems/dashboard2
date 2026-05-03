import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/database';

// This creates a Supabase client for use in client components
// It handles session persistence automatically
export const supabaseClient = createClientComponentClient<Database>();

import { createClient } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      enrollment_inquiries: {
        Row: {
          id: string;
          full_name: string;
          contact_number: string;
          whatsapp_number: string;
          address: string;
          dob: string;
          guardian_contact: string;
          campus_location: string;
          programme: string;
          schedule: string;
          education: string | null;
          email: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          full_name: string;
          contact_number: string;
          whatsapp_number: string;
          address: string;
          dob: string;
          guardian_contact: string;
          campus_location?: string;
          programme: string;
          schedule: string;
          education?: string | null;
          email?: string | null;
          notes?: string | null;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: never;
    Functions: never;
    Enums: never;
    CompositeTypes: never;
  };
}

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (!url || !anonKey) {
    throw new Error('Supabase configuration is missing');
  }
  if (!client) client = createClient<Database>(url, anonKey);
  return client;
}

/*
# Create enrollment_inquiries table (single-tenant, no auth)

1. New Tables
- `enrollment_inquiries`
  - `id` (uuid, primary key)
  - `full_name` (text, not null) — applicant's full name
  - `contact_number` (text, not null) — primary phone
  - `whatsapp_number` (text, not null) — WhatsApp contact
  - `address` (text, not null)
  - `dob` (date, not null) — date of birth
  - `guardian_contact` (text, not null) — guardian/emergency contact name
  - `campus_location` (text, not null, default 'Dillibazar-30, Kathmandu')
  - `programme` (text, not null) — selected training programme title
  - `schedule` (text, not null) — preferred batch
  - `education` (text, nullable) — education/background
  - `email` (text, nullable)
  - `notes` (text, nullable) — additional questions
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `enrollment_inquiries`.
- Grant INSERT to `anon, authenticated` (public enrollment form, no sign-in).
- Grant SELECT/DELETE only to `service_role` for admissions staff tooling.
- Policy: anyone may insert an inquiry; no reads for anon/authenticated.
*/

CREATE TABLE IF NOT EXISTS enrollment_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  contact_number text NOT NULL,
  whatsapp_number text NOT NULL,
  address text NOT NULL,
  dob date NOT NULL,
  guardian_contact text NOT NULL,
  campus_location text NOT NULL DEFAULT 'Dillibazar-30, Kathmandu',
  programme text NOT NULL,
  schedule text NOT NULL,
  education text,
  email text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE enrollment_inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT (full_name, contact_number, whatsapp_number, address, dob, guardian_contact, campus_location, programme, schedule, education, email, notes) ON enrollment_inquiries TO anon, authenticated;
GRANT SELECT ON enrollment_inquiries TO service_role;

DROP POLICY IF EXISTS "Public can submit enrollment inquiries" ON enrollment_inquiries;
CREATE POLICY "Public can submit enrollment inquiries"
ON enrollment_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

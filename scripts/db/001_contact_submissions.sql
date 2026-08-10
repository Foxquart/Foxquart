CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  project_type text,
  budget text,
  timeline text,
  preferred_time text,
  timezone text,
  message text NOT NULL,
  ip_hash text,
  user_agent text,
  status text NOT NULL DEFAULT 'new'
);

-- Serves the sliding-window rate limit (count by ip_hash over recent minutes).
CREATE INDEX IF NOT EXISTS contact_submissions_ip_recent
  ON contact_submissions (ip_hash, created_at);

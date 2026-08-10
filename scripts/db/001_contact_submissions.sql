-- Enquiries from the website contact form. Write-only from the public site;
-- read/managed later by an internal admin, so the indexes below anticipate the
-- admin's access patterns (inbox listing, per-contact history, status queues).
--
-- `status` lifecycle convention (free text, no constraint, so new states can be
-- added without a migration): 'new' -> 'replied' | 'archived' | 'spam';
-- 'email_failed' marks rows whose notification email bounced at submit time.
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  phone text,
  project_type text,
  timeline text,
  preferred_time text,
  timezone text,
  message text NOT NULL,
  ip_hash text,
  user_agent text,
  status text NOT NULL DEFAULT 'new',
  -- For a future admin/automation layer: when we last wrote to this person,
  -- and whether they agreed to anything beyond a reply to their enquiry.
  -- Replying to an enquiry needs no consent; marketing automation does.
  last_contacted_at timestamptz,
  marketing_consent boolean NOT NULL DEFAULT false
);

-- Serves the sliding-window rate limit (count by ip_hash over recent minutes).
CREATE INDEX IF NOT EXISTS contact_submissions_ip_recent
  ON contact_submissions (ip_hash, created_at);

-- Admin inbox: newest first, optionally filtered by status queue.
CREATE INDEX IF NOT EXISTS contact_submissions_inbox
  ON contact_submissions (status, created_at DESC);

-- Per-contact history and dedupe for any follow-up automation.
CREATE INDEX IF NOT EXISTS contact_submissions_email
  ON contact_submissions (lower(email), created_at DESC);

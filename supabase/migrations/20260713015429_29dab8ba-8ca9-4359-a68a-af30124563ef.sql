
-- Jobs table
CREATE TABLE public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL,
  employment_type text NOT NULL DEFAULT 'full-time',
  level text NOT NULL DEFAULT 'mid',
  description text NOT NULL,
  responsibilities text[] NOT NULL DEFAULT '{}',
  requirements text[] NOT NULL DEFAULT '{}',
  nice_to_haves text[] NOT NULL DEFAULT '{}',
  salary_min integer,
  salary_max integer,
  salary_currency text DEFAULT 'USD',
  is_active boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  posted_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.jobs TO anon, authenticated;
GRANT ALL ON public.jobs TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.jobs TO authenticated;

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone views active jobs" ON public.jobs
  FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage jobs" ON public.jobs
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_jobs_updated BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_jobs_active ON public.jobs (is_active, posted_at DESC);

-- Extend job_applications
ALTER TABLE public.job_applications
  ADD COLUMN job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
  ADD COLUMN skills text[] NOT NULL DEFAULT '{}',
  ADD COLUMN years_experience integer,
  ADD COLUMN education text,
  ADD COLUMN linkedin_url text,
  ADD COLUMN portfolio_url text,
  ADD COLUMN current_company text,
  ADD COLUMN notice_period text,
  ADD COLUMN expected_salary text,
  ADD COLUMN admin_notes text,
  ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now();

CREATE TRIGGER trg_applications_updated BEFORE UPDATE ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_apps_job ON public.job_applications (job_id);
CREATE INDEX idx_apps_user ON public.job_applications (user_id, created_at DESC);

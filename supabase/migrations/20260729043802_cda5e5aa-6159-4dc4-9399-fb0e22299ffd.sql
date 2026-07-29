ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS locale text NOT NULL DEFAULT 'ar',
  ADD COLUMN IF NOT EXISTS theme_pref text NOT NULL DEFAULT 'auto';

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_locale_check CHECK (locale IN ('ar','en'));

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_theme_pref_check CHECK (theme_pref IN ('auto','light','dark'));
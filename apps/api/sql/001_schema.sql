-- Every table carries org_id: data is kept apart per school owner, and the API
-- always filters on the logged-in user's organisation.

CREATE TABLE IF NOT EXISTS subscription (
  org_id      text PRIMARY KEY,
  school_name text NOT NULL,
  pupils      integer NOT NULL CHECK (pupils >= 0),
  -- 29 kr per pupil per year
  price_nok_per_pupil integer NOT NULL DEFAULT 29,
  started_at  date NOT NULL,
  ended_at    date
);

CREATE TABLE IF NOT EXISTS pupil (
  org_id       text NOT NULL REFERENCES subscription (org_id) ON DELETE CASCADE,
  feide_id     text NOT NULL,
  display_name text NOT NULL,
  PRIMARY KEY (org_id, feide_id)
);

CREATE TABLE IF NOT EXISTS journal_entry (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          text NOT NULL REFERENCES subscription (org_id) ON DELETE CASCADE,
  pupil_feide_id  text NOT NULL,
  pupil_group     text,
  text            text NOT NULL CHECK (length(text) <= 2000),
  photo_key       text,
  teacher_comment text CHECK (length(teacher_comment) <= 500),
  commented_at    timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS find (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id         text NOT NULL REFERENCES subscription (org_id) ON DELETE CASCADE,
  pupil_feide_id text NOT NULL,
  pupil_group    text NOT NULL,
  fossil_id      text NOT NULL,
  place          text NOT NULL,
  lat            double precision NOT NULL,
  lng            double precision NOT NULL,
  created_at     timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS journal_entry_pupil ON journal_entry (org_id, pupil_feide_id);
CREATE INDEX IF NOT EXISTS find_group ON find (org_id, pupil_group);

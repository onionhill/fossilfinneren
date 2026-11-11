-- Feide's test organisation, for local development only.
INSERT INTO subscription (org_id, school_name, pupils, started_at)
VALUES ('fc:org:spusers.feide.no', 'Feide testskole', 96, '2025-08-01')
ON CONFLICT DO NOTHING;

INSERT INTO pupil (org_id, feide_id, display_name)
VALUES ('fc:org:spusers.feide.no', 'asbjorn_elev@spusers.feide.no', 'Asbjørn ElevEn')
ON CONFLICT DO NOTHING;

INSERT INTO find (org_id, pupil_feide_id, pupil_group, fossil_id, place, lat, lng)
SELECT 'fc:org:spusers.feide.no', 'asbjorn_elev@spusers.feide.no', 'fc:gogroup:spusers.feide.no:3a-nat', 'trilobitt', 'Slemmestad', 59.78, 10.49
WHERE NOT EXISTS (SELECT 1 FROM find);

import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().url(),
  WEB_ORIGIN: z.string().url().default("https://fossilfinneren.no"),
  AUTH_MODE: z.enum(["feide", "mock"]).default("feide"),
  FEIDE_USERINFO_URL: z.string().url().default("https://api.dataporten.no/userinfo/v1/userinfo"),
  FEIDE_GROUPS_URL: z.string().url().default("https://groups-api.dataporten.no/groups/me/groups"),
  FEIDE_ENTITLEMENT_PREFIX: z.string().default("urn:mace:fossilfinneren.no:lisens:"),
  SESSION_SECRET: z.string().min(16),
  S3_ENDPOINT: z.string().url().default("https://s3.hamburg.wolkenhafen.example"),
  S3_BUCKET: z.string().default("fossilfinneren-funn"),
  S3_REGION: z.string().default("eu-central-hh1"),
  SMTP_HOST: z.string().default("smtp.liffeymail.example"),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().default(""),
  SMTP_PASSWORD: z.string().default(""),
  MAIL_FROM: z.string().default("Fossilfinneren <ikke-svar@fossilfinneren.no>"),
  RETENTION_DAYS_AFTER_SUBSCRIPTION: z.coerce.number().int().positive().default(180),
});

export const config = schema.parse(process.env);

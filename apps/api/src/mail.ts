import nodemailer from "nodemailer";
import { config } from "./config.js";

// Weekly summary to teachers, sent through Liffey Mailworks (Dublin).
// The address is the school's customer contact, never taken from Feide.
const transport = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: config.SMTP_USER ? { user: config.SMTP_USER, pass: config.SMTP_PASSWORD } : undefined,
});

export async function sendWeeklySummary(to: string, group: string, newFinds: number): Promise<void> {
  await transport.sendMail({
    from: config.MAIL_FROM,
    to,
    subject: `Fossilfinneren: ${newFinds} nye funn i ${group}`,
    text: `Elevene i ${group} har registrert ${newFinds} nye funn denne uken. Logg inn på https://fossilfinneren.no/laerer for å se klassekartet.`,
  });
}

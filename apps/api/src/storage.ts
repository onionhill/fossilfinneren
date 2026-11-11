import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import { config } from "./config.js";

// Pupils' photos of their finds, in Wolkenhafen's object storage in Hamburg.
const s3 = new S3Client({ endpoint: config.S3_ENDPOINT, region: config.S3_REGION, forcePathStyle: true });

export async function storePhoto(orgId: string, body: Buffer, contentType: string): Promise<string> {
  const key = `${orgId}/${randomUUID()}`;
  await s3.send(
    new PutObjectCommand({
      Bucket: config.S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      ServerSideEncryption: "AES256",
    }),
  );
  return key;
}

export async function readPhoto(key: string): Promise<{ body: Uint8Array; contentType: string } | null> {
  const object = await s3.send(new GetObjectCommand({ Bucket: config.S3_BUCKET, Key: key })).catch(() => null);
  if (!object?.Body) return null;
  return { body: await object.Body.transformToByteArray(), contentType: object.ContentType ?? "image/jpeg" };
}

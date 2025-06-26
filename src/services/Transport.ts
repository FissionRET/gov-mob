import fs from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { once } from "node:events";
import path from "node:path";

export default async (options: { destination: string }) => {
  try {
    // Ensure the directory exists
    const dir = path.dirname(options.destination);
    await fs.mkdir(dir, { recursive: true });

    // this block check if file exist, doesnt nesscessary in current use case
    // try {
    //   await fs.access(options.destination);
    // } catch {
    //   // File doesn't exist, which is fine for writing a new file
    // }

    const stream = createWriteStream(options.destination);
    await once(stream, "open");
    return stream;
  } catch (error: any) {
    throw new Error(`Failed to create write stream: ${error.message}`);
  }
};

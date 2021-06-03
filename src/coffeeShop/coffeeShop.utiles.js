import { createWriteStream } from "fs";

export function processCategory(input) {
  const categories = input.match(/[^,]+/g);
  return categories.map((category) => ({
    where: { name: category },
    create: { name: category, slug: category },
  }));
};

export async function filesHandler(file, id) {
  const { filename, createReadStream } = await file;
  const newFilename = `${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = createWriteStream(
    process.cwd() + "/uploads/" + newFilename
  );
  readStream.pipe(writeStream);
  return `http://localhost:4000/static/${newFilename}`;
}
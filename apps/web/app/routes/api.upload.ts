import { uploadFileToCloudStorage } from "@app/utils/firebase";
import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { prisma } from "@zeno-ai/database";

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
        try {
            const formData = await request.formData();
            const files = formData.getAll('file') as File[];
            if (files.length === 0) {
                return { error: 'Please upload at least 1 file' };
            }
            let filesToSave: { name: string, url: string }[] = [];
            const uploadPromises = files.map(async (file, idx) => {
                const filePath = `zeno/${file.name}`;
                const url = await uploadFileToCloudStorage(file, filePath);
                filesToSave.push({
                    name: file.name,
                    url,
                });
              });

            await Promise.all(uploadPromises);

            // Create the file in the database
            await prisma.originalFile.createMany({
                data: filesToSave.map((f) => ({
                    ownerEmail: "eunicehx920@gmail.com",
                    name: f.name,
                    url: f.url,
                }))
            });

            return { urls: filesToSave.map((f) => f.url) }; 
        } catch (e) {
            const error = e as Error;
            return { error: error.message };
        }
    }
  }
};
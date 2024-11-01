import { uploadFileToCloudStorage } from "@app/utils/firebase";
import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
        try {
            const formData = await request.formData();
            const files = formData.getAll('files') as File[];
            if (files.length === 0) {
                return { error: 'Please upload at least 1 file' };
            }
            let urls: string[] = [];
            const uploadPromises = files.map(async (file, idx) => {
                const filePath = `zeno/${file.name}`;
                const url = await uploadFileToCloudStorage(file, filePath);
                urls.push(url);
              });

            await Promise.all(uploadPromises);

            return { urls }; 
        } catch (e) {
            const error = e as Error;
            return { error: error.message };
        }
    }
  }
};
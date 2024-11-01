import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getStorage,
  getDownloadURL,
  ref as cloudStorageRef,
  uploadBytes,
  listAll,
  getMetadata,
  FullMetadata,
} from "firebase/storage";
import { firebaseConfig } from "@app/config";

declare global {
  var firebaseApp: FirebaseApp | undefined;
}

export const firebaseApp = global.firebaseApp || initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(firebaseApp);

// ============ Cloud Storage ============

export const uploadFileToCloudStorage = async (
  file: Blob,
  filePath: string
): Promise<string> => {
  const fileRef = cloudStorageRef(storage, filePath);

  // 'file' comes from the Blob or File API
  return uploadBytes(fileRef, file).then((snapshot) => {
    if (!snapshot) {
      return "";
    } else {
      return getDownloadURL(fileRef);
    }
  });
};

export async function getMetadataOfFile(
  filePath: string
): Promise<FullMetadata[]> {
  const storageRef = cloudStorageRef(storage, filePath);
  const results = await listAll(storageRef);
  if (!results) {
    return [];
  } else {
    const allMetadata = await Promise.all(
      results.items.map((itemRef) => getMetadata(itemRef))
    );
    return allMetadata.filter((m) => !!m);
  }
}



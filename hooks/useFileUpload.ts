import { useState } from 'react';

interface UseFileUploadOptions {
  directory: string;
}

export function useFileUpload({ directory }: UseFileUploadOptions) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('directory', directory);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading, error };
}
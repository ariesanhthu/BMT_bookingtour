'use client';

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';

interface UploadFileProps {
  onUploadSuccess: (url: string) => void;
}

export default function UploadFile({ onUploadSuccess }: UploadFileProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setIsUploading(true);

    try {
      // Tạo form data
      const formData = new FormData();
      formData.append('file', file);

      // Gửi file đến API
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { url } = response.data;
      alert('File uploaded successfully.');
      onUploadSuccess(url);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file.');
    } finally {
      setIsUploading(false);
    }
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          setFile(event.target.files[0]);
        }
      };
  return (
    <div className="space-y-4">
        <Input
            id="productImage"
            type="file"
            accept="image/*"
            onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]); // Safely set the first file
                }
            }}
        />
      {/* <Button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button> */}
    </div>
  );
}

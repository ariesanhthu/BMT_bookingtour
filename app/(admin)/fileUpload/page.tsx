'use client'
import { useState } from 'react';
import UploadFile from '@/app/components/uploadFile/UploadFile';

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: '',
    url: '',
    // Các trường khác
  });

  const handleUploadSuccess = (url: string) => {
    setProduct((prev) => ({ ...prev, url }));
  };

  const handleSubmit = async () => {
    // Gửi product đến API lưu sản phẩm
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error('Failed to save product.');
      alert('Product saved successfully.');
    } catch (error) {
      console.error('Save product error:', error);
      alert('Failed to save product.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <UploadFile onUploadSuccess={handleUploadSuccess} />
      <button type="submit" onClick={handleSubmit}>
        Save Product
      </button>
    </form>
  );
}

'use client';

import { useState, useEffect } from 'react';

export default function ProductPage() {
  const [products, setProduct] = useState([]);
  const [name, setName] = useState('');
  const [editProduct, setEditProduct] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all roles
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/product');
      const data = await res.json();
      if (data.success) {
        setProduct(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch products');
      }
    } catch (error) {
      setStatus('Error fetching products');
    }
  };

  // Create or update role
  const handleCreateOrUpdate = async () => {
    if (!name) {
      setStatus('name is required');
      return;
    }

    const url = '/api/product';
    const method = editProduct ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editProduct,
      name,
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        resetForm();
        setStatus(editProduct ? 'product updated successfully' : 'product created successfully');
      } else {
        setStatus(data.error || 'Failed to save product');
      }
    } catch (error) {
      setStatus('Error saving product');
    }
  };

  // Delete role
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/product', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        setStatus('product deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete product');
      }
    } catch (error) {
      setStatus('Error deleting product');
    }
  };

  // Edit role (populate form fields)
  const handleEdit = (product: any) => {
    setEditProduct(product._id);
    setName(product.name);
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setEditProduct(null);
  };

  return (
    <div>
      <h1>product Management</h1>

      {/* Status Message */}
      {status && <p style={{ color: 'red'}}>{status}</p>}

      {/* Form for Create/Update */}
      <div>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleCreateOrUpdate}>
          {editProduct ? 'Update product' : 'Create product'}
        </button>
        {editProduct && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* Role List */}
      <ul>
        {products.map((product: any) => (
          <li key={product._id}>
            <strong>name:  {product.name}</strong>
            <button onClick={() => handleEdit(product._id)}>Edit</button> 
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

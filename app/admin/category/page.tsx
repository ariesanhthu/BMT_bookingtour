'use client';

import { useState, useEffect } from 'react';

export default function RolePage() {
  const [Categorys, setCategory] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [editCategory, setEditCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchCategorys();
  }, []);

  // Fetch all roles
  const fetchCategorys = async () => {
    try {
      const res = await fetch('/api/category');
      const data = await res.json();
      if (data.success) {
        setCategory(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch Categorys');
      }
    } catch (error) {
      setStatus('Error fetching Categorys');
    }
  };

  // Create or update role
  const handleCreateOrUpdate = async () => {
    if (!name) {
      setStatus('Category name is required');
      return;
    }

    const url = '/api/category';
    const method = editCategory ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editCategory,
      name,
      slug,
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();
      if (data.success) {
        fetchCategorys();
        resetForm();
        setStatus(editCategory ? 'Category updated successfully' : 'Category created successfully');
      } else {
        setStatus(data.error || 'Failed to save Category');
      }
    } catch (error) {
      setStatus('Error saving Category');
    }
  };

  // Delete role
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/category', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCategorys();
        setStatus('Category deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete Category');
      }
    } catch (error) {
      setStatus('Error deleting Category');
    }
  };

  // Edit role (populate form fields)
  const handleEdit = (Category: any) => {
    setEditCategory(Category._id);
    setName(Category.name);
    setSlug(Category.slug || '  ');
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setSlug('');
    setEditCategory(null);
  };

  return (
    <div>
      <h1>Category Management</h1>

      {/* Status Message */}
      {status && <p style={{ color: 'red'}}>{status}</p>}

      {/* Form for Create/Update */}
      <div>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button onClick={handleCreateOrUpdate}>
          {editCategory ? 'Update Category' : 'Create Category'}
        </button>
        {editCategory && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* Role List */}
      <ul>
        {Categorys.map((Category: any) => (
          <li key={Category._id}>
            <strong>Name:  {Category.name}</strong>  /  <strong>Slug:  {Category.slug || "No slug"}</strong>
            <button onClick={() => handleEdit(Category._id)}>Edit</button> 
            <button onClick={() => handleDelete(Category._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

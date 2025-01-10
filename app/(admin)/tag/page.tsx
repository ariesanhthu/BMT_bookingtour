'use client';

import { useState, useEffect } from 'react';

export default function RolePage() {
  const [Tags, setTag] = useState([]);
  const [name, setTagname] = useState('');
  const [editTagname, setEditTag] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchTags();
  }, []);

  // Fetch all roles
  const fetchTags = async () => {
    try {
      const res = await fetch('/api/tag');
      const data = await res.json();
      if (data.success) {
        setTag(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch Tags');
      }
    } catch (error) {
      setStatus('Error fetching Tags');
    }
  };

  // Create or update role
  const handleCreateOrUpdate = async () => {
    if (!name) {
      setStatus('Tagname is required');
      return;
    }

    const url = '/api/tag';
    const method = editTagname ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editTagname,
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
        fetchTags();
        resetForm();
        setStatus(editTagname ? 'tag updated successfully' : 'tag created successfully');
      } else {
        setStatus(data.error || 'Failed to save tag');
      }
    } catch (error) {
      setStatus('Error saving tag');
    }
  };

  // Delete role
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/tag', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchTags();
        setStatus('tag deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete tag');
      }
    } catch (error) {
      setStatus('Error deleting tag');
    }
  };

  // Edit role (populate form fields)
  const handleEdit = (tag: any) => {
    setEditTag(tag._id);
    setTagname(tag.name);
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setTagname('');
    setEditTag(null);
  };

  return (
    <div>
      <h1>tag Management</h1>

      {/* Status Message */}
      {status && <p style={{ color: 'red'}}>{status}</p>}

      {/* Form for Create/Update */}
      <div>
        <input
          type="text"
          placeholder="Tagname"
          value={name}
          onChange={(e) => setTagname(e.target.value)}
        />
        <button onClick={handleCreateOrUpdate}>
          {editTagname ? 'Update tag' : 'Create tag'}
        </button>
        {editTagname && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* Role List */}
      <ul>
        {Tags.map((tag: any) => (
          <li key={tag._id}>
            <strong>Name:  {tag.name}</strong>
            <button onClick={() => handleEdit(tag._id)}>Edit</button> 
            <button onClick={() => handleDelete(tag._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

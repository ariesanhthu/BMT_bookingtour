'use client';

import { useState, useEffect } from 'react';

export default function RolePage() {
  const [roles, setRoles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editRoleId, setEditRoleId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  // Fetch all roles
  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/role');
      const data = await res.json();
      if (data.success) {
        setRoles(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch roles');
      }
    } catch (error) {
      setStatus('Error fetching roles');
    }
  };

  // Create or update role
  const handleCreateOrUpdate = async () => {
    if (!name) {
      setStatus('Role name is required');
      return;
    }

    const url = '/api/role';
    const method = editRoleId ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editRoleId,
      name,
      description,
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();
      if (data.success) {
        fetchRoles();
        resetForm();
        setStatus(editRoleId ? 'Role updated successfully' : 'Role created successfully');
      } else {
        setStatus(data.error || 'Failed to save role');
      }
    } catch (error) {
      setStatus('Error saving role');
    }
  };

  // Delete role
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/role', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchRoles();
        setStatus('Role deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete role');
      }
    } catch (error) {
      setStatus('Error deleting role');
    }
  };

  // Edit role (populate form fields)
  const handleEdit = (role: any) => {
    setEditRoleId(role._id);
    setName(role.name);
    setDescription(role.description || '');
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setDescription('');
    setEditRoleId(null);
  };

  return (
    <div>
      <h1>Role Management</h1>

      {/* Status Message */}
      {status && <p style={{ color: 'red'}}>{status}</p>}

      {/* Form for Create/Update */}
      <div>
        <input
          type="text"
          placeholder="Role Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreateOrUpdate}>
          {editRoleId ? 'Update Role' : 'Create Role'}
        </button>
        {editRoleId && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* Role List */}
      <ul>
        {roles.map((role: any) => (
          <li key={role._id}>
            <strong>{role.name}</strong> - {role.description || 'No description'}
            <button onClick={() => handleEdit(role._id)}>Edit</button>
            <button onClick={() => handleDelete(role._id)}>Delete</button>
            <a href={`role/${role._id}`}>Go to Edit Page</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

export default function ServicePage() {
  const [Services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editserviceId, setEditService] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch all Services
  const fetchServices = async () => {
    try {
      const res = await fetch('/api/service');
      const data = await res.json();
      if (data.success) {
        setServices(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch Services');
      }
    } catch (error) {
      setStatus('Error fetching Services');
    }
  };

  // Create or update service
  const handleCreateOrUpdate = async () => {
    if (!name) {
      setStatus('service name is required');
      return;
    }

    const url = '/api/service';
    const method = editserviceId ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editserviceId,
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
        fetchServices();
        resetForm();
        setStatus(editserviceId ? 'service updated successfully' : 'service created successfully');
      } else {
        setStatus(data.error || 'Failed to save service');
      }
    } catch (error) {
      setStatus('Error saving service');
    }
  };

  // Delete service
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/service', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchServices();
        setStatus('service deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete service');
      }
    } catch (error) {
      setStatus('Error deleting service');
    }
  };

  // Edit service (populate form fields)
  const handleEdit = (service: any) => {
    setEditService(service._id);
    setName(service.name);
    setDescription(service.description || '');
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setDescription('');
    setEditService(null);
  };

  return (
    <div>
      <h1>service Management</h1>

      {/* Status Message */}
      {status && <p style={{ color: 'red'}}>{status}</p>}

      {/* Form for Create/Update */}
      <div>
        <input
          type="text"
          placeholder="Service Name"
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
          {editserviceId ? 'Update service' : 'Create service'}
        </button>
        {editserviceId && <button onClick={resetForm}>Cancel</button>}
      </div>

      {/* service List */}
      <ul>
        {Services.map((service: any) => (
          <li key={service._id}>
            <strong>{service.name}</strong> - {service.description || 'No description'}
            <button onClick={() => handleEdit(service._id)}>Edit</button>
            <button onClick={() => handleDelete(service._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

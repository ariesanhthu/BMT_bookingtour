'use client';

import { useState, useEffect } from 'react';

export default function RolePage({ params }: { params: { id: string } }) {
  const [role, setRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  // Sử dụng destructuring để lấy `id` từ `params`
  const { id } = params;
  console.log('Params:', params);
  console.log('Role ID:', id);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const roleRes = await fetch(`/api/role/${id}`);
        if (!roleRes.ok) throw new Error('Failed to fetch role data');
        const roleData = await roleRes.json();
        setRole(roleData.data);

        const usersRes = await fetch('/api/user'); // Fetch toàn bộ user
        if (!usersRes.ok) throw new Error('Failed to fetch users data');
        const usersData = await usersRes.json();

        // Lọc user chưa có trong role
        setUsers(roleData.data.users);
        setAvailableUsers(
          usersData.data.filter((user: any) => !roleData.data.users.some((u: any) => u._id === user._id))
        );
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  const handleAddUser = async () => {
    if (!selectedUserId) return; // Kiểm tra đã chọn user chưa

    const res = await fetch(`/api/role/${id}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: selectedUserId }),
    });

    if (res.ok) {
      const data = await res.json();
      setUsers(data.data.role.users);
      setAvailableUsers(availableUsers.filter((u: any) => u._id !== selectedUserId));
      setSelectedUserId(''); // Reset selected user
    }
  };

  const handleRemoveUser = async (userId: string) => {
    const res = await fetch(`/api/role/${id}/user`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      const data = await res.json();
      setUsers(data.data.role.users);
      setAvailableUsers([...availableUsers, data.data.user]);
    }
  };

  return (
    <div>
      <h1>Role: {role?.name}</h1>
      <p>{role?.description}</p>
      <h2>Users in Role</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button onClick={() => handleRemoveUser(user._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Add User</h2>
      <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
        <option value="">Select User</option>
        {availableUsers.map((user: any) => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
      <button onClick={handleAddUser}>Add</button>
    </div>
  );
}

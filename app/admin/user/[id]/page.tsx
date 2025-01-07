'use client';

import { useState, useEffect } from 'react';

export default function RolePage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(null);
  
  const [status, setStatus] = useState<string | null>(null);
  // const [users, setUsers] = useState([]);
  // const [availableUsers, setAvailableUsers] = useState([]);
  // const [selectedUserId, setSelectedUserId] = useState('');

  // Sử dụng destructuring để lấy `id` từ `params`
  const { id } = params;
  console.log('Params:', params);
  console.log('User ID:', id);
  
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const userRes = await fetch(`/api/user/${id}`);
      if (!userRes.ok) throw new Error('Failed to fetch user data');
      const userData = await userRes.json();
      setUser(userData.data);
      
    } catch (error) {
      console.error(error);
    }
  }

  const resetForm = async () => {
    setUsername('');
    setPassword('');
  }

  const handleUpdateUsername = async () => {
    if (!username) {
      setStatus('Username is required');
      return;
    }

    const url = `/api/user/${id}`;
    const method = 'PUT';
    const body = JSON.stringify({
      _id: id,
      username : username,
      password : ''
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
        resetForm();
        setStatus('Username updated successfully');
      } else {
        setStatus(data.error || 'Failed to save username');
      }
    } catch (error) {
      setStatus(error.message || 'Error saving username');
    }
  };

  const handleUpdatePassword = async () => {
    if (!password) {
      setStatus('Username is required');
      return;
    }

    const url = `/api/user/${id}`;
    const method = 'PUT';
    const body = JSON.stringify({
      _id: id,
      username : '',
      password : username,
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
        resetForm();
        setStatus('Password updated successfully');
      } else {
        setStatus(data.error || 'Failed to save Password');
      }
    } catch (error) {
      setStatus(error.message || 'Error saving Password');
    }
  };

  // const handleAddUser = async () => {
  //   if (!selectedUserId) return; // Kiểm tra đã chọn user chưa

  //   const res = await fetch(`/api/user/${id}/user`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ userId: selectedUserId }),
  //   });

  //   if (res.ok) {
  //     const data = await res.json();
  //     setUsers(data.data.user.users);
  //     setAvailableUsers(availableUsers.filter((u: any) => u._id !== selectedUserId));
  //     setSelectedUserId(''); // Reset selected user
  //   }
  // };

  // const handleRemoveUser = async (userId: string) => {
  //   const res = await fetch(`/api/user/${id}/user`, {
  //     method: 'DELETE',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ userId }),
  //   });

  //   if (res.ok) {
  //     const data = await res.json();
  //     setUsers(data.data.user.users);
  //     setAvailableUsers([...availableUsers, data.data.user]);
  //   }
  // };

  return (
    <div>
      {user ? (
          <div>
            {status && <p style={{ color: 'red'}}>{status}</p>}

            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Password:</strong> {user.password || "No"}</p>
            {/* show list of users in this role  */}
            <div> 
              <p><strong>Roles: </strong></p>
              {user.roles && user.roles.length > 0 ? (
                <ul>
                  {user.roles.map((role: any) => (
                    <li key={role._id}>{role.name || "No"}</li>
                  ))}
                </ul>
              ) : (
                <p>No roles assigned to this user.</p>
              )}
            </div>

            {/* edit information of role */}
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={handleUpdateUsername}>
                {'Update'}
              </button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleUpdatePassword}>
                {'Update'}
              </button>
            </div>
            <div> 
              
            </div>
            <button onClick={resetForm}>Cancel</button>
          </div>
      ) : (
          <p>Loading role...</p>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { getAuthToken } from './auth';
import { Link } from 'react-router-dom';
import '../css/AdminDashboard.css'

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const authToken = getAuthToken();
    console.log('Authentication token:', authToken);

    if (!authToken) {
      // Handle the case when the user is not authenticated
      console.error('User is not authenticated');
      return;
    }

    fetch('http://localhost:3001/api/admin/users', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Function to toggle the permission for a user
const togglePermission = (userId, permission) => {
  // Create a copy of the users array to avoid directly mutating state
  const updatedUsers = [...users];

  // Find the user by ID
  const userToUpdate = updatedUsers.find((user) => user._id === userId);

  if (userToUpdate) {
    // Toggle the permission in the user object in the state
    userToUpdate.permissions[permission] = !userToUpdate.permissions[permission];

    // Update the state with the modified user
    setUsers(updatedUsers);

    // Send a request to update the database with the new permission setting
    const authToken = getAuthToken();

    fetch(`http://localhost:3001/api/admin/users/${userId}/permissions/${permission}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        allowed: userToUpdate.permissions[permission],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(`Permission ${permission} for user ${userId} updated successfully`);
      })
      .catch((error) => console.error('Error updating permissions:', error));
  }
};


return (
  <div className="admin-dashboard">
    <h2>Admin Dashboard</h2>
    <div className="links">
      <Link to="/product-types" className="view-link">View Product Types</Link>
      <Link to="/products" className="view-link">View Products</Link>
    </div>
    <table className="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Role</th>
          <th>Password</th>
          <th>Permissions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td className="password-cell">••••••••</td> {/* Placeholder for the password */}
            <td>
              <ul className="permissions-list">
                {Object.entries(user.permissions).map(([permission, allowed]) => (
                  <li key={permission} className="permission-item">
                    {permission}:
                    <button
                      onClick={() => togglePermission(user._id, permission)}
                      className={`status-button ${allowed ? 'status-allowed' : 'status-blocked'}`}
                    >
                      {allowed ? 'Allowed' : 'Blocked'}
                    </button>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import API from '../api';
import { format, parseISO } from 'date-fns';
import '../App.css';

function UserTable() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const query = search.trim() ? `?name=${search}` : '';
      const res = await API.get(`/users${query}`);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

const updateUsers = async () => {
  try {
    await API.post('/users/update', users);
    alert('Updated successfully!');
    fetchUsers();
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors && Array.isArray(errors)) {
      const details = errors.map(e => `ID ${e.id}: ${e.error}`).join('\n');
      alert(`Update failed:\n${details}`);
    } else {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Update failed';
      alert(`Update failed: ${message}`);
    }

    console.error('Error updating users:', err);
  }
};




  const handleChange = (id, field, value) => {
    setUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, [field]: value } : user))
    );
  };

  
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-table-container">
      <h2 className="mb-4 text-center text-primary">User Management</h2>

      <div className="mb-3 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter name/email to search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={fetchUsers}>
          Search
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Birthdate</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={user.username}
                    onChange={e => handleChange(user.id, 'username', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={user.email}
                    onChange={e => handleChange(user.id, 'email', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    className="form-control"
                    value={format(parseISO(user.birthdate), 'yyyy-MM-dd')}
                    onChange={e => handleChange(user.id, 'birthdate', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-3">
        <button className="btn btn-success px-4" onClick={updateUsers}>
          Update Users
        </button>
      </div>
    </div>
  );
}

export default UserTable;

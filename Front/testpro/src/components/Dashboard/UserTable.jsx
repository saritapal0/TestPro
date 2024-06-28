import React, { useState, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Button,
  Modal,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // State for adding new user
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/getusers');
        setUsers(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/users/update/${editUser.id}`, editUser);
      const updatedUser = response.data;
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error updating user
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/users/delete/${deleteUserId}`);
      setUsers(users.filter(user => user.id !== deleteUserId));
      setConfirmDeleteOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error deleting user
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setConfirmDeleteOpen(true);
  };

  const handleCloseModal = () => {
    setEditUser(null);
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleAddUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', newUser);
      const createdUser = response.data;
      setUsers([...users, createdUser]);
      setAddUserModalOpen(false);
      setNewUser({ username: '', email: '', password: '' }); // Clear input fields
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle error adding user
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                {error}
              </TableCell>
            </TableRow>
          ) : users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEditClick(user)}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteClick(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <TextField fullWidth label="Username" name="username" value={editUser?.username || ''} onChange={handleInputChange} />
          <TextField fullWidth label="Email" name="email" value={editUser?.email || ''} onChange={handleInputChange} />
          <TextField fullWidth label="Password" name="password" value={editUser?.password || ''} onChange={handleInputChange} />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </Modal>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for adding new user */}
      <Dialog open={addUserModalOpen} onClose={() => setAddUserModalOpen(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Username" name="username" value={newUser.username} onChange={handleAddUserInputChange} />
          <TextField fullWidth label="Email" name="email" value={newUser.email} onChange={handleAddUserInputChange} />
          <TextField fullWidth label="Password" name="password" value={newUser.password} onChange={handleAddUserInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddUserModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Button to open add user modal */}
      <Button variant="contained" color="primary" onClick={() => setAddUserModalOpen(true)}>
        Add User
      </Button>

    </TableContainer>
  );
};

export default UserTable;

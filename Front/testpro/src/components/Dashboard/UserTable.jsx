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
  const [users, setUsers] = useState([]); // State to hold users fetched from server
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [editUser, setEditUser] = useState(null); // State for currently edited user
  const [modalOpen, setModalOpen] = useState(false); // State for edit modal
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // State for delete confirmation dialog
  const [deleteUserId, setDeleteUserId] = useState(null); // State for user id to delete

  // State for adding new user
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUserModalOpen, setAddUserModalOpen] = useState(false); // State for add user modal

  // Fetch users from server on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/getusers');
        console.log('Fetched users:', response.data);
        setUsers(response.data.users || []); // Set users state with fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false whether successful or not
      }
    };


    fetchUsers();
  }, []);

  // Update user details
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/users/update/${editUser.id}`, editUser);
      const updatedUser = response.data;
      console.log('Updated user:', updatedUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user))); // Update user in state
      setModalOpen(false); // Close modal
      setEditUser(null); // Clear editUser state
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Error updating user. Please try again later.');
    }
  };

  // Delete user
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/users/delete/${deleteUserId}`);
      console.log('Deleted user with ID:', deleteUserId);
      setUsers(users.filter(user => user.id !== deleteUserId)); // Remove deleted user from state
      setConfirmDeleteOpen(false); // Close confirmation dialog
      setDeleteUserId(null); // Clear deleteUserId state
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user. Please try again later.');
    }
  };

  // Open modal for editing user
  const handleEditClick = (user) => {
    console.log('Editing user:', user);
    setEditUser(user); // Set editUser state with user to edit
    setModalOpen(true); // Open edit modal
  };

  // Open confirmation dialog for deleting user
  const handleDeleteClick = (userId) => {
    console.log('Deleting user with ID:', userId);
    setDeleteUserId(userId); // Set deleteUserId state with user id to delete
    setConfirmDeleteOpen(true); // Open confirmation dialog
  };

  // Close edit modal
  const handleCloseModal = () => {
    console.log('Closing edit modal');
    setEditUser(null); // Clear editUser state
    setModalOpen(false); // Close edit modal
  };

  // Handle input change in edit modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Editing ${name}: ${value}`);
    setEditUser({ ...editUser, [name]: value }); // Update editUser state
  };

  // Handle input change in add user modal
  const handleAddUserInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Adding new ${name}: ${value}`);
    setNewUser({ ...newUser, [name]: value }); // Update newUser state
  };

  // Add new user
  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', newUser);
      const createdUser = response.data;
      console.log('Created user:', createdUser);
      setUsers([...users, createdUser]); // Add newly created user to state
      setAddUserModalOpen(false); // Close add user modal
      setNewUser({ username: '', email: '', password: '' }); // Clear input fields
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Error adding user. Please try again later.');
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
              <TableCell colSpan={5} align="center" style={{ color: 'red' }}>
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

      {/* Modal for editing user */}
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

      {/* Dialog for confirming user deletion */}
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

      {/* Dialog for adding new user */}
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
    </TableContainer>
  );
};

export default UserTable;

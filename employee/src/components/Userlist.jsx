import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Modal,
  Button,
} from "@mui/material";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import FormAddUser from "./FormAddUser";
import FormEditUser from "./FormEditUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication token not found in local storage");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("http://localhost:5000/users", config);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d9534f", // Rouge
        cancelButtonColor: "#6c757d", // Gris
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authentication token not found in local storage");
          return;
        }

        await axios.delete(`http://localhost:5000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getUsers();
        Swal.fire("Deleted!", "Your user has been deleted.", "success");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedUser(null);
    setEditModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box p={1}>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <IconButton>
                <FaSearch />
              </IconButton>
            ),
          }}
        />
        <IconButton color="primary" onClick={handleAddModalOpen}>
          <FaPlus />
        </IconButton>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow key={user.uuid}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditModalOpen(user)}>
                        <FaEdit style={{ fontSize: "1rem", color: "blue" }} />
                      </IconButton>
                      <IconButton onClick={() => deleteUser(user.uuid)}>
                        <FaTrash style={{ fontSize: "1rem", color: "red" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Modal pour ajouter un utilisateur */}
      <Modal open={addModalOpen} onClose={handleAddModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <FormAddUser />
        </Box>
      </Modal>
      {/* Modal pour modifier un utilisateur */}
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <FormEditUser user={selectedUser} />
        </Box>
      </Modal>
    </Box>
  );
};

export default UserList;

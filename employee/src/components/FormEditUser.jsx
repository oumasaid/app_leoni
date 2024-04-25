import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";

const FormEditUser = ({ user }) => {
  const navigate = useNavigate();

  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user) {
      setEditedUser({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        role: user.role || "",
        password: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const updateUser = async (e) => {
    e.preventDefault();
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

      const response = await axios.patch(
        `http://localhost:5000/users/${user.uuid}`,
        editedUser,
        config
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "User updated successfully.",
      }).then(() => {
        navigate("/users");
      });
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    if (msg) {
      Swal.fire({
        icon: "error",
        title: "Update Error",
        text: msg,
      });
    }
  }, [msg]);

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Edit User
      </Typography>
      <form onSubmit={updateUser}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              name="firstName"
              value={editedUser.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              name="lastName"
              value={editedUser.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={editedUser.role}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              fullWidth
              type="password"
              name="password"
              value={editedUser.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FormEditUser;

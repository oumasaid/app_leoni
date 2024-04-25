import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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

const FormAddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token available");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (!firstName || !lastName || !email || !password || !role) {
      setMsg("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/users",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role,
        },
        config
      );

      Swal.fire({
        icon: "success",
        title: "User added successfully",
        text: "Your user has been added successfully.",
        showConfirmButton: false,
        timer: 3000,
      });

      setTimeout(() => {
        navigate("/users");
      }, 3000); // Attendre 3 secondes avant de naviguer vers la nouvelle page
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Add New User
      </Typography>
      <form onSubmit={saveUser}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role"
              >
                <MenuItem value="">Select Role</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
      {msg && (
        <Typography variant="subtitle1" color="error">
          {msg}
        </Typography>
      )}
    </Box>
  );
};

export default FormAddUser;

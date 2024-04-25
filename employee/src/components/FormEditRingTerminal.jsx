import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";

const FormEditRingTerminal = ({ terminal, closeModal }) => {
  const [editedTerminal, setEditedTerminal] = useState({
    typeOfTerminal: "",
    leoniTerminalNo: "",
    vwTerminalNo: "",
    supplierNo: "",
    bending: "",
    soldering: "",
    image: null,
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (terminal) {
      setEditedTerminal({
        typeOfTerminal: terminal.typeOfTerminal || "",
        leoniTerminalNo: terminal.leoniTerminalNo || "",
        vwTerminalNo: terminal.vwTerminalNo || "",
        supplierNo: terminal.supplierNo || "",
        bending: terminal.bending || "",
        soldering: terminal.soldering || "",
      });
    }
  }, [terminal]);

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setEditedTerminal({ ...editedTerminal, image: e.target.files[0] });
    } else {
      setEditedTerminal({ ...editedTerminal, [e.target.name]: e.target.value });
    }
  };

  const updateTerminal = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found in local storage");
        return;
      }

      const formData = new FormData();
      formData.append("typeOfTerminal", editedTerminal.typeOfTerminal);
      formData.append("leoniTerminalNo", editedTerminal.leoniTerminalNo);
      formData.append("vwTerminalNo", editedTerminal.vwTerminalNo);
      formData.append("supplierNo", editedTerminal.supplierNo);
      formData.append("bending", editedTerminal.bending);
      formData.append("soldering", editedTerminal.soldering);
      formData.append("image", editedTerminal.image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.patch(
        `http://localhost:5000/RingTerminals/${terminal.uuid}`,
        formData,
        config
      );

      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "Ring Terminal updated successfully.",
      }).then(() => {
        closeModal();
      });
    } catch (error) {
      console.error("Error updating ring terminal:", error);
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
        Edit Ring Terminal
      </Typography>
      <form onSubmit={updateTerminal}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Type of Terminal"
              fullWidth
              name="typeOfTerminal"
              value={editedTerminal.typeOfTerminal}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Leoni Terminal No"
              fullWidth
              name="leoniTerminalNo"
              value={editedTerminal.leoniTerminalNo}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="VW Terminal No"
              fullWidth
              name="vwTerminalNo"
              value={editedTerminal.vwTerminalNo}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Supplier No"
              fullWidth
              name="supplierNo"
              value={editedTerminal.supplierNo}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bending"
              fullWidth
              name="bending"
              value={editedTerminal.bending}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Soldering"
              fullWidth
              name="soldering"
              value={editedTerminal.soldering}
              onChange={handleInputChange}
              required
            >
              <MenuItem value="With">With</MenuItem>
              <MenuItem value="Without">Without</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleInputChange}
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

export default FormEditRingTerminal;

import React, { useState, useEffect } from "react";
import axios from "axios";
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

const FormEditGlue = ({ glue, closeModal }) => {
  const [editedGlue, setEditedGlue] = useState({
    designation: "",
    leoniPN: "",
    supplier: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (glue) {
      setEditedGlue({
        designation: glue.designation || "",
        leoniPN: glue.leoniPN || "",
        supplier: glue.supplier || "",
      });
    }
  }, [glue]);

  const handleInputChange = (e) => {
    setEditedGlue({ ...editedGlue, [e.target.name]: e.target.value });
  };

  const handleSupplierChange = (e) => {
    setEditedGlue({ ...editedGlue, supplier: e.target.value });
  };

  const updateGlue = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found in local storage");
        return;
      }

      await axios.patch(
        `http://localhost:5000/glues/${glue.id}`, // Utiliser glue.id comme ID de la colle
        editedGlue,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "Glue updated successfully.",
      }).then(() => {
        closeModal();
      });
    } catch (error) {
      console.error("Error updating glue:", error);
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
        Edit Glue
      </Typography>
      <form onSubmit={updateGlue}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Designation"
              fullWidth
              name="designation"
              value={editedGlue.designation}
              onChange={handleInputChange}
              placeholder="Designation"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Leoni PN"
              fullWidth
              name="leoniPN"
              value={editedGlue.leoniPN}
              onChange={handleInputChange}
              placeholder="Leoni PN"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Supplier</InputLabel>
              <Select
                value={editedGlue.supplier}
                onChange={handleSupplierChange}
                name="supplier"
              >
                <MenuItem value="">Select Supplier</MenuItem>
                <MenuItem value="TE Raychem">TE Raychem</MenuItem>
                <MenuItem value="DSG">DSG</MenuItem>
              </Select>
            </FormControl>
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

export default FormEditGlue;

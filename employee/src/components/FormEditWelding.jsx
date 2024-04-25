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

const FormEditWelding = ({ welding, closeModal }) => {
  const [editedWelding, setEditedWelding] = useState({
    model: "",
    supplier: "",
    image: null,
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (welding) {
      setEditedWelding({
        model: welding.model || "",
        supplier: welding.supplier || "",
      });
    }
  }, [welding]);

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setEditedWelding({ ...editedWelding, image: e.target.files[0] });
    } else {
      setEditedWelding({ ...editedWelding, [e.target.name]: e.target.value });
    }
  };

  const updateWelding = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found in local storage");
        return;
      }

      const formData = new FormData();
      formData.append("model", editedWelding.model);
      formData.append("supplier", editedWelding.supplier);
      formData.append("image", editedWelding.image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.patch(
        `http://localhost:5000/Weldings/${welding.uuid}`,
        formData,
        config
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "Welding updated successfully.",
      }).then(() => {
        closeModal();
      });
    } catch (error) {
      console.error("Error updating welding:", error);
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
        Edit Welding
      </Typography>
      <form onSubmit={updateWelding}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Model"
              fullWidth
              name="model"
              value={editedWelding.model}
              onChange={handleInputChange}
              placeholder="Welding Model"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Supplier</InputLabel>
              <Select
                value={editedWelding.supplier}
                onChange={handleInputChange}
                name="supplier"
              >
                <MenuItem value="">Select Supplier</MenuItem>
                <MenuItem value="Shunk">Shunk</MenuItem>
                <MenuItem value="Telsonic">Telsonic</MenuItem>
              </Select>
            </FormControl>
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

export default FormEditWelding;

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

const FormAddWelding = ({ closeModal }) => {
  const [model, setModel] = useState("");
  const [supplier, setSupplier] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveWelding = async (e) => {
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

    if (!model || !supplier || !image) {
      // Vérifiez si des champs obligatoires sont vides
      setMsg("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("model", model);
      formData.append("supplier", supplier);

      const response = await axios.post(
        "http://localhost:5000/Weldings",
        formData,
        {
          ...config,
          headers: {
            ...config.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Welding added successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/Weldings");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Add New Welding
      </Typography>
      <form onSubmit={saveWelding}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Model *"
              fullWidth
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Model"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Supplier *</InputLabel>
              <Select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              >
                <MenuItem value="">Select Supplier</MenuItem>
                <MenuItem value="Shunk">Shunk</MenuItem>
                <MenuItem value="Telsonic">Telsonic</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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

export default FormAddWelding;

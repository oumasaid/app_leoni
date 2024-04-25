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

const FormEditWire = ({ wire, closeModal }) => {
  const [editedWire, setEditedWire] = useState({
    type: "",
    crossSection: "",
    insulationMaterial: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (wire) {
      setEditedWire({
        type: wire.type || "",
        crossSection: wire.crossSection || "",
        insulationMaterial: wire.insulationMaterial || "",
      });
    }
  }, [wire]);

  const handleInputChange = (e) => {
    setEditedWire({ ...editedWire, [e.target.name]: e.target.value });
  };

  const updateWire = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found in local storage");
        return;
      }

      await axios.patch(
        `http://localhost:5000/wires/${wire.uuid}`,
        editedWire,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "Wire updated successfully.",
      }).then(() => {
        closeModal();
      });
    } catch (error) {
      console.error("Error updating wire:", error);
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
        Edit Wire
      </Typography>
      <form onSubmit={updateWire}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={editedWire.type}
                onChange={handleInputChange}
                name="type"
              >
                <MenuItem value="">Select Type</MenuItem>
                <MenuItem value="FLRY-A">FLRY-A</MenuItem>
                <MenuItem value="FLRY-B">FLRY-B</MenuItem>
                <MenuItem value="FLR2X-A">FLR2X-A</MenuItem>
                <MenuItem value="FLR2X-B">FLR2X-B</MenuItem>
                <MenuItem value="FLR6Y-A">FLR6Y-A</MenuItem>
                <MenuItem value="FLR6Y-B">FLR6Y-B</MenuItem>
                <MenuItem value="FLR2G-A">FLR2G-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Cross Section"
              fullWidth
              name="crossSection"
              value={editedWire.crossSection}
              onChange={handleInputChange}
              placeholder="Cross Section"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Insulation Material</InputLabel>
              <Select
                value={editedWire.insulationMaterial}
                onChange={handleInputChange}
                name="insulationMaterial"
              >
                <MenuItem value="">Select Insulation Material</MenuItem>
                <MenuItem value="PVC (Polyvinyl Chloride)">
                  PVC (Polyvinyl Chloride)
                </MenuItem>
                <MenuItem value="XPE E-Cross-linked polyethylene">
                  XPE E-Cross-linked polyethylene
                </MenuItem>
                <MenuItem value="Cross-linked polyethylene">
                  Cross-linked polyethylene
                </MenuItem>
                <MenuItem value="FEP (Tetrafluoroethylene hexafluoropropylene)">
                  FEP (Tetrafluoroethylene hexafluoropropylene)
                </MenuItem>
                <MenuItem value="Silicon rubber">Silicon rubber</MenuItem>
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

export default FormEditWire;

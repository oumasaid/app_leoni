import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
import ErrorMessage from "./ErrorMessage";

const FormAddWire = () => {
  const [type, setType] = useState("");
  const [crossSection, setCrossSection] = useState("");
  const [insulationMaterial, setInsulationMaterial] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const saveWire = async (e) => {
    e.preventDefault();

    if (!type || !crossSection || !insulationMaterial) {
      setMsg("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("crossSection", crossSection);
    formData.append("insulationMaterial", insulationMaterial);

    try {
      const response = await axios.post(
        "http://localhost:5000/wires",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "Wire added successfully",
        html: "<p>Your wire has been added successfully.</p>",
        showConfirmButton: false,
        timer: 3000,
      });
      
      navigate("/wires");
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Add New Wire
      </Typography>
      <form onSubmit={saveWire}>
        <ErrorMessage message={msg} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
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
              type="number"
              value={crossSection}
              onChange={(e) => setCrossSection(e.target.value)}
              placeholder="Cross Section"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Insulation Material</InputLabel>
              <Select
                value={insulationMaterial}
                onChange={(e) => setInsulationMaterial(e.target.value)}
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
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FormAddWire;

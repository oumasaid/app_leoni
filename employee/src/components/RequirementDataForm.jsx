import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Grid,
} from "@mui/material";

const RequirementDataForm = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    // Ajoutez d'autres données au formData si nécessaire
    console.log(formData); // Envoyez formData à votre backend pour le traitement
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ maxWidth: 400, margin: "auto" }}>
        <h2>Requirement Data</h2>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input type="file" onChange={handleFile1Change} accept="*" />
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={handleFile2Change} accept="*" />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

export default RequirementDataForm;

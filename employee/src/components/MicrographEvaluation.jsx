import React, { useState } from "react";
import { Button, Grid, Typography, Input } from "@mui/material";

const MicrographEvaluation = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = () => {
    // Logique de soumission du formulaire ici
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} textAlign="center">
        <h2>Micrograph Evaluation</h2>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <label htmlFor="fileInput">
          <Input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="*"
          />
          <Button
            variant="outlined"
            style={{ textTransform: "none" }}
            component="span"
          >
            Choose File
          </Button>
        </label>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Typography variant="body1" marginTop="16px">
          {file ? `Selected File: ${file.name}` : "No file selected"}
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default MicrographEvaluation;

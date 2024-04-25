import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function ProductionTechnologyForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    temperature: "",
    timeVelocity: "",
    coolingTime: "",
    coreTemperature: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Appeler une fonction de soumission avec les données remplies
    onSubmit(formData);
  };

  return (
    <Box maxWidth={600} mx="auto" my={4} p={2} borderRadius={8}>
      <Typography variant="h4" align="center" gutterBottom>
        Production Technology Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          component="table"
          width="100%"
          mb={2}
          border={0}
          cellSpacing={0}
          cellPadding={0}
        >
          <tbody>
            <TableRow>
              <TableCell>
                <Typography variant="body1">Temperature (±5°C):</Typography>
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell style={{ paddingLeft: 16 }}>
                <Typography variant="body1">
                  Time (s) / Velocity (cm/min):
                </Typography>
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="timeVelocity"
                  value={formData.timeVelocity}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="body1">Cooling Time:</Typography>
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="coolingTime"
                  value={formData.coolingTime}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell style={{ paddingLeft: 16 }}>
                <Typography variant="body1">
                  Core temperature (±7°C):
                </Typography>
              </TableCell>
              <TableCell>
                <TextField
                  type="text"
                  name="coreTemperature"
                  value={formData.coreTemperature}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </TableCell>
            </TableRow>
          </tbody>
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          Remarks:
        </Typography>
        <TextField
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          size="small"
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

function TableRow({ children }) {
  return <tr>{children}</tr>;
}

function TableCell({ children }) {
  return <td>{children}</td>;
}

export default ProductionTechnologyForm;

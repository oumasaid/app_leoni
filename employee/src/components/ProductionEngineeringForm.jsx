import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import { getMachineNames } from "../services/apiService.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function ProductionEngineeringForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    setupParameters: {
      PR: {
        creation: false,
        modification: false,
        requalification: false,
      },
    },
    userMethod: {
      MU: {
        creation: false,
        modification: false,
      },
    },
    date: "",
    applicant: "",
    pf: "",
    machine: "",
    spliceType: "",
    wireDescription: {
      side1: [{ wireType: "", crossSection: "" }],
      side2: [{ wireType: "", crossSection: "" }],
      sleeve: "",
      additionalGlue: "",
    },
  });
  const [machineNames, setMachineNames] = useState([]);
  const [token, setToken] = useState(""); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored Token:", storedToken); // Check if the token is retrieved correctly

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  useEffect(() => {
    const fetchMachineNames = async () => {

      if (!token) {
        console.log("Token is empty. Skipping fetch request.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/machines", {
          headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("Request Headers:", response.headers);
        if (response.ok) {
          const data = await response.json();
          setMachineNames(data);
        } else {
          console.error("Failed to fetch machines:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    if (token && token.trim() !== "") {
      fetchMachineNames();
    }

  }, [token]);

  const handleCheckboxChange = (category, subCategory, field) => {
    setFormData((prevState) => {
      // Créer une copie de l'état actuel
      const updatedState = { ...prevState };

      // Si la case sélectionnée est déjà cochée, décocher toutes les cases
      // Sinon, cocher la case sélectionnée et décocher toutes les autres dans la même sous-catégorie
      Object.keys(updatedState[category][subCategory]).forEach((key) => {
        if (key === field) {
          updatedState[category][subCategory][key] =
            !prevState[category][subCategory][field];
        } else {
          updatedState[category][subCategory][key] = false;
        }
      });

      return updatedState;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData)
  };

  const handleDateChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      date: value,
    }));
  };

  const handleChangeWireType = (side, index, e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      wireDescription: {
        ...prevState.wireDescription,
        [side]: prevState.wireDescription[side].map((item, idx) =>
          idx === index ? { ...item, [name]: value } : item
        ),
      },
    }));
  };

  const handleAddWireType = (side) => {
    setFormData((prevState) => ({
      ...prevState,
      wireDescription: {
        ...prevState.wireDescription,
        [side]: [
          ...prevState.wireDescription[side],
          { wireType: "", crossSection: "" },
        ],
      },
    }));
  };

  const handleRemoveWireType = (side, index) => {
    setFormData((prevState) => ({
      ...prevState,
      wireDescription: {
        ...prevState.wireDescription,
        [side]: prevState.wireDescription[side].filter(
          (_, idx) => idx !== index
        ),
      },
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // onSubmit(formData);  
  //   console.log(formData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const modifiedData = { ...formData };


    console.log(modifiedData);
    axios({
      method: "POST",
      data: modifiedData,
      withCredentials: true,
      url: "http://localhost:5000/shrinkform",
      headers: {
      Authorization: `Bearer ${token}`, 
    },
    })

      .then((res) => {
        console.log(res);
        if (res.data.Login) {
          navigate("/"); 
        }
      })
      .catch((anError) => {
        console.error(anError);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Fichier sélectionné:", file);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ maxWidth: 400, margin: "auto" }}>
        <h2>Production Engineering Form</h2>
        <div style={{ marginBottom: "16px" }}>
          <div>
            <label>Setup Parameters (PR):</label>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    name="setupParameters.PR.creation"
                    checked={formData.setupParameters.PR.creation}
                    onChange={() =>
                      handleCheckboxChange("setupParameters", "PR", "creation")
                    }
                  />
                  Création
                </label>
              </div>
              <div style={{ marginRight: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    name="setupParameters.PR.modification"
                    checked={formData.setupParameters.PR.modification}
                    onChange={() =>
                      handleCheckboxChange(
                        "setupParameters",
                        "PR",
                        "modification"
                      )
                    }
                  />
                  Modification
                </label>
              </div>
              <div style={{ marginRight: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    name="setupParameters.PR.requalification"
                    checked={formData.setupParameters.PR.requalification}
                    onChange={() =>
                      handleCheckboxChange(
                        "setupParameters",
                        "PR",
                        "requalification"
                      )
                    }
                  />
                  Requalification
                </label>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label>User Method (MU):</label>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ marginRight: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    name="userMethod.MU.creation"
                    checked={formData.userMethod.MU.creation}
                    onChange={() =>
                      handleCheckboxChange("userMethod", "MU", "creation")
                    }
                  />
                  Création
                </label>
              </div>
              <div style={{ marginRight: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    name="userMethod.MU.modification"
                    checked={formData.userMethod.MU.modification}
                    onChange={() =>
                      handleCheckboxChange("userMethod", "MU", "modification")
                    }
                  />
                  Modification
                </label>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <TextField
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleDateChange(e.target.value)}
            fullWidth
            margin="normal"
            style={{ marginRight: "8px" }}
          />
          <TextField
            label="Applicant"
            name="applicant"
            value={formData.applicant}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <TextField
            label="PF"
            name="pf"
            value={formData.pf}
            onChange={handleChange}
            fullWidth
            margin="normal"
            style={{ marginRight: "8px" }}
          />
          <TextField
            label="Machine"
            name="machine"
            select
            value={formData.machine}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {machineNames.map((machine, index) => (
              <MenuItem key={index} value={machine.machine_name}>
                {machine.machine_name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <FormControl fullWidth margin="normal">
          <InputLabel>Select Splice Type</InputLabel>
          <Select
            name="spliceType"
            value={formData.spliceType}
            onChange={handleChange}
          >
            <MenuItem value="">Select Splice Type</MenuItem>
            <MenuItem value="End-Splice">End-Splice</MenuItem>
            <MenuItem value="Parallel-Splice">Parallel-Splice</MenuItem>
            <MenuItem value="RingTerminal">RingTerminal</MenuItem>
          </Select>
        </FormControl>
        <div>
          <label>Wires description:</label>
          <div>
            <label>Side 1:</label>
            {formData.wireDescription.side1.map((wire, index) => (
              <div key={index} style={{ display: "flex", marginBottom: "8px" }}>
                <TextField
                  type="text"
                  name="wireType"
                  value={wire.wireType}
                  onChange={(e) => handleChangeWireType("side1", index, e)}
                  placeholder="Wire Type"
                  style={{ marginRight: "8px" }}
                />
                <TextField
                  type="text"
                  name="crossSection"
                  value={wire.crossSection}
                  onChange={(e) => handleChangeWireType("side1", index, e)}
                  placeholder="Cross Section"
                />
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveWireType("side1", index)}
                    style={{ marginLeft: "8px" }}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={() => handleAddWireType("side1")}>
              Add
            </Button>
          </div>
          <div>
            <label>Side 2:</label>
            {formData.wireDescription.side2.map((wire, index) => (
              <div key={index} style={{ display: "flex", marginBottom: "8px" }}>
                <TextField
                  type="text"
                  name="wireType"
                  value={wire.wireType}
                  onChange={(e) => handleChangeWireType("side2", index, e)}
                  placeholder="Wire Type"
                  style={{ marginRight: "8px" }}
                />
                <TextField
                  type="text"
                  name="crossSection"
                  value={wire.crossSection}
                  onChange={(e) => handleChangeWireType("side2", index, e)}
                  placeholder="Cross Section"
                />
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => handleRemoveWireType("side2", index)}
                    style={{ marginLeft: "8px" }}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={() => handleAddWireType("side2")}>
              Add
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginRight: "16px" }}>
            <label>Sleeve:</label>
            <TextField
              label="Sleeve"
              name="sleeve"
              value={formData.wireDescription.sleeve}
              onChange={handleChange}
              fullWidth
              margin="normal"
              style={{ marginRight: "8px" }}
            />
          </div>
          <div>
            <label>Additional Glue:</label>
            <TextField
              label="Additional Glue"
              name="additionalGlue"
              value={formData.wireDescription.additionalGlue}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <InputLabel htmlFor="image-upload">Upload Image</InputLabel>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="image-upload">
            <Button component="span" variant="outlined">
              Select Image
            </Button>
          </label>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default ProductionEngineeringForm;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

const FormAddRingTerminal = ({ onTerminalAdded }) => { // Ajout de la prop onTerminalAdded
  const [typeOfTerminal, setTypeOfTerminal] = useState("");
  const [leoniTerminalNo, setLeoniTerminalNo] = useState("");
  const [vwTerminalNo, setVwTerminalNo] = useState("");
  const [supplierNo, setSupplierNo] = useState("");
  const [bending, setBending] = useState("");
  const [soldering, setSoldering] = useState("With");
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const saveRingTerminal = async (e) => {
    e.preventDefault();
    if (
      !typeOfTerminal ||
      !leoniTerminalNo ||
      !vwTerminalNo ||
      !supplierNo ||
      !bending ||
      !soldering
    ) {
      setMsg("Please fill in all fields.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("typeOfTerminal", typeOfTerminal);
      formData.append("leoniTerminalNo", leoniTerminalNo);
      formData.append("vwTerminalNo", vwTerminalNo);
      formData.append("supplierNo", supplierNo);
      formData.append("bending", bending);
      formData.append("soldering", soldering);
      formData.append("image", image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/RingTerminals",
        formData,
        config
      );

      Swal.fire({
        title: "Success",
        text: "Ring Terminal added successfully!",
        icon: "success",
      });

      onTerminalAdded(); // Appel de la fonction de mise à jour après avoir ajouté le terminal avec succès

      // Rediriger vers la page de liste des terminaux d'anneau après le succès
      navigate("/ring-terminals");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Add New Ring Terminal
      </Typography>
      <form onSubmit={saveRingTerminal}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Type of Terminal"
              fullWidth
              value={typeOfTerminal}
              onChange={(e) => setTypeOfTerminal(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Leoni Terminal No"
              fullWidth
              value={leoniTerminalNo}
              onChange={(e) => setLeoniTerminalNo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="VW Terminal No"
              fullWidth
              value={vwTerminalNo}
              onChange={(e) => setVwTerminalNo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Supplier No"
              fullWidth
              value={supplierNo}
              onChange={(e) => setSupplierNo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bending"
              fullWidth
              value={bending}
              onChange={(e) => setBending(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label="Soldering"
              fullWidth
              value={soldering}
              onChange={(e) => setSoldering(e.target.value)}
              required
            >
              <MenuItem value="With">With</MenuItem>
              <MenuItem value="Without">Without</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <input type="file" onChange={handleImageChange} required />
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

export default FormAddRingTerminal;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import ErrorMessage from "./ErrorMessage";

// const FormAddRingTerminal = () => {
//     const [typeOfTerminal, setTypeOfTerminal] = useState("");
//     const [leoniTerminalNo, setLeoniTerminalNo] = useState("");
//     const [vwTerminalNo, setVwTerminalNo] = useState("");
//     const [supplierNo, setSupplierNo] = useState("");
//     const [bending, setBending] = useState("");
//     const [soldering, setSoldering] = useState("With");
//     const [msg, setMsg] = useState("");
//     const [image, setImage] = useState(null);

//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");
//     // Check if token exists
//     if (!token) {
//       throw new Error("No token available");
//     }

//     // Add the token to the request headers
//     const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data' // Add this for uploading files
//         },
//       };
//       const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const saveRingTerminal = async (e) => {
//         e.preventDefault();
//         if (!typeOfTerminal || !leoniTerminalNo || !vwTerminalNo || !supplierNo || !bending || !soldering) {
//             setMsg("Please fill in all fields.");
//             return;
//         }
//         try {
//             const formData = new FormData();
//             formData.append('typeOfTerminal', typeOfTerminal);
//             formData.append('leoniTerminalNo', leoniTerminalNo);
//             formData.append('vwTerminalNo', vwTerminalNo);
//             formData.append('supplierNo', supplierNo);
//             formData.append('bending', bending);
//             formData.append('soldering', soldering);
//             formData.append('image', image);

//             const response=await axios.post("http://localhost:5000/RingTerminals",
//                formData
//             ,config);

//             Swal.fire({
//                 title: 'Success',
//                 text: 'Ring Terminal added successfully!',
//                 icon: 'success'
//             });
//             navigate("/ring-terminals");
//         } catch (error) {
//             if (error.response) {
//                 setMsg(error.response.data.msg);
//             }
//         }
//     };

//     return (
//         <div>
//             <h1 className="title">Ring Terminals</h1>
//             <h2 className="subtitle">Add New Ring Terminal</h2>
//             <div className="card is-shadowless">
//                 <div className="card-content">
//                     <div className="content">
//                         <form onSubmit={saveRingTerminal}>
//                             <ErrorMessage message={msg} />
//                             {/* Add input field for image upload */}
//                             <div className="field">
//                                 <label className="label">Upload Image</label>
//                                 <div className="control">
//                                     <input
//                                         type="file"
//                                         className="input"
//                                         onChange={handleImageChange}
//                                     />
//                                 </div>
//                             </div>
//                             {/* Other input fields */}
//                             <div className="field">
//                                 <label className="label">Type of Terminal</label>
//                                 <div className="control">
//                                     <input
//                                         type="text"
//                                         className="input"
//                                         value={typeOfTerminal}
//                                         onChange={(e) => setTypeOfTerminal(e.target.value)}
//                                         placeholder="Type of Terminal"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="field">
//                                 <label className="label">Leoni Terminal No</label>
//                                 <div className="control">
//                                     <input
//                                         type="text"
//                                         className="input"
//                                         value={leoniTerminalNo}
//                                         onChange={(e) => setLeoniTerminalNo(e.target.value)}
//                                         placeholder="Leoni Terminal No"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="field">
//                                 <label className="label">VW Terminal No</label>
//                                 <div className="control">
//                                     <input
//                                         type="text"
//                                         className="input"
//                                         value={vwTerminalNo}
//                                         onChange={(e) => setVwTerminalNo(e.target.value)}
//                                         placeholder="VW Terminal No"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="field">
//                                 <label className="label">Supplier No</label>
//                                 <div className="control">
//                                     <input
//                                         type="text"
//                                         className="input"
//                                         value={supplierNo}
//                                         onChange={(e) => setSupplierNo(e.target.value)}
//                                         placeholder="Supplier No"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="field">
//                                 <label className="label">Bending</label>
//                                 <div className="control">
//                                     <input
//                                         type="text"
//                                         className="input"
//                                         value={bending}
//                                         onChange={(e) => setBending(e.target.value)}
//                                         placeholder="Bending"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="field">
//                                 <label className="label">Soldering</label>
//                                 <div className="control">
//                                     <div className="buttons">
//                                         <label className="button">
//                                             <input
//                                                 type="radio"
//                                                 value="With"
//                                                 checked={soldering === "With"}
//                                                 onChange={(e) => setSoldering(e.target.value)}
//                                             />
//                                             With
//                                         </label>
//                                         <label className="button">
//                                             <input
//                                                 type="radio"
//                                                 value="Without"
//                                                 checked={soldering === "Without"}
//                                                 onChange={(e) => setSoldering(e.target.value)}
//                                             />
//                                             Without
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="field">
//                                 <div className="control">
//                                     <button type="submit" className="button is-success">
//                                         Save
//                                     </button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

// };

// export default FormAddRingTerminal;

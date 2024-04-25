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

const FormAddGlue = ({ refreshGlueList }) => {
  const [designation, setDesignation] = useState("");
  const [leoniPN, setLeoniPN] = useState("");
  const [supplier, setSupplier] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveGlue = async (e) => {
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

    if (!designation || !leoniPN || !supplier) {
      setMsg("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/glues",
        {
          designation,
          leoniPN,
          supplier,
        },
        config
      );
      Swal.fire({
        title: "Success",
        text: "Glue added successfully!",
        icon: "success",
      });

      // Après avoir ajouté avec succès, rafraîchir la liste des glues en appelant la fonction refreshGlueList
      refreshGlueList();

      navigate("/glues");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Add New Glue
      </Typography>
      <form onSubmit={saveGlue}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Designation"
              fullWidth
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Designation"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Leoni PN"
              fullWidth
              value={leoniPN}
              onChange={(e) => setLeoniPN(e.target.value)}
              placeholder="Leoni PN"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Supplier</InputLabel>
              <Select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                required
              >
                <MenuItem value="">Select Supplier</MenuItem>
                <MenuItem value="TE Raychem">TE Raychem</MenuItem>
                <MenuItem value="DSG">DSG</MenuItem>
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

export default FormAddGlue;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// const FormAddGlue = () => {
//   const [designation, setDesignation] = useState("");
//   const [leoniPN, setLeoniPN] = useState("");
//   const [supplier, setSupplier] = useState("");
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();

//   const saveGlue = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     if (!token) {
//       throw new Error("No token available");
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     if (!designation || !leoniPN || !supplier) {
//       setMsg("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/glues",
//         {
//           designation,
//           leoniPN,
//           supplier,
//         },
//         config
//       );
//       Swal.fire({
//         title: "Success",
//         text: "Ring Terminal added successfully!",
//         icon: "success",
//       });

//       navigate("/glues");
//     } catch (error) {
//       if (error.response) {
//         setMsg(error.response.data.msg);
//       }
//     }
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h6" gutterBottom>
//         Add New Glue
//       </Typography>
//       <form onSubmit={saveGlue}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Designation"
//               fullWidth
//               value={designation}
//               onChange={(e) => setDesignation(e.target.value)}
//               placeholder="Designation"
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               label="Leoni PN"
//               fullWidth
//               value={leoniPN}
//               onChange={(e) => setLeoniPN(e.target.value)}
//               placeholder="Leoni PN"
//               required
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Supplier</InputLabel>
//               <Select
//                 value={supplier}
//                 onChange={(e) => setSupplier(e.target.value)}
//                 required
//               >
//                 <MenuItem value="">Select Supplier</MenuItem>
//                 <MenuItem value="TE Raychem">TE Raychem</MenuItem>
//                 <MenuItem value="DSG">DSG</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">
//               Save
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//     </Box>
//   );
// };

// export default FormAddGlue;

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

const FormAddMachine = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState("");
  const [shrinkCategory, setShrinkCategory] = useState("");
  const [category, setCategory] = useState("");
  const [machineName, setMachineName] = useState("");
  const [image, setImage] = useState(null); // Add state for image file
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveMachine = async (e) => {
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

    if (!name || !supplier || !shrinkCategory || !category || !machineName || !image) {
      // Check if any required fields are empty
      setMsg("Please fill in all required fields.");
      return;
    }

    if (!Number.isInteger(Number(category))) {
      setMsg("Category must be an integer.");
      return;
    }

    try {
      const formData = new FormData(); // Create FormData object
      formData.append("image", image); // Append image file to FormData
      formData.append("name", name);
      formData.append("supplier", supplier);
      formData.append("shrinkCategory", shrinkCategory);
      formData.append("category", category);
      formData.append("machine_name", machineName);

      const response = await axios.post(
        "http://localhost:5000/machines",
        formData, // Pass FormData object instead of JSON
        {
          ...config,
          headers: {
            ...config.headers,
            "Content-Type": "multipart/form-data", // Set content type for FormData
          },
        }
      );

      console.log(response.data);
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Machine added successfully",
        html: "<p>Your machine has been added successfully.</p><p>This is a longer message to demonstrate how to display a longer message with SweetAlert2.</p>",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/machines");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Add New Machine
      </Typography>
      <form onSubmit={saveMachine}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name *"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
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
                <MenuItem value="MECALBI">MECALBI</MenuItem>
                <MenuItem value="DSG">DSG</MenuItem>
                <MenuItem value="TE Raychem">TE Raychem</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Shrink Category *</InputLabel>
              <Select
                value={shrinkCategory}
                onChange={(e) => setShrinkCategory(e.target.value)}
              >
                <MenuItem value="">Select Shrink Category</MenuItem>
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="multiple">Multiple</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Machine Name *"
              fullWidth
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
              placeholder="Machine Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category *"
              fullWidth
              type="number"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])} // Handle file input change
            />
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

export default FormAddMachine;

// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
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

// const FormAddMachine = (closeModal) => {
//   const [name, setName] = useState("");
//   const [supplier, setSupplier] = useState("");
//   const [shrinkCategory, setShrinkCategory] = useState("");
//   const [category, setCategory] = useState("");
//   const [machineName, setMachineName] = useState("");
//   const [image, setImage] = useState(null); // Add state for image file
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();

//   const saveMachine = async (e) => {
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

//     if (
//       !name ||
//       !supplier ||
//       !shrinkCategory ||
//       !category ||
//       !machineName ||
//       !image
//     ) {
//       // Check if image is not empty
//       setMsg("Please fill in all fields.");
//       return;
//     }

//     if (!Number.isInteger(Number(category))) {
//       setMsg("Category must be an integer.");
//       return;
//     }

//     try {
//       const formData = new FormData(); // Create FormData object
//       formData.append("image", image); // Append image file to FormData
//       formData.append("name", name);
//       formData.append("supplier", supplier);
//       formData.append("shrinkCategory", shrinkCategory);
//       formData.append("category", category);
//       formData.append("machine_name", machineName);

//       const response = await axios.post(
//         "http://localhost:5000/machines",
//         formData, // Pass FormData object instead of JSON
//         {
//           ...config,
//           headers: {
//             ...config.headers,
//             "Content-Type": "multipart/form-data", // Set content type for FormData
//           },
//         }
//       );

//       console.log(response.data);
//       closeModal();
//       Swal.fire({
//         icon: "success",
//         title: "Machine added successfully",
//         html: "<p>Your machine has been added successfully.</p><p>This is a longer message to demonstrate how to display a longer message with SweetAlert2.</p>",
//         showConfirmButton: false,
//         timer: 3000,
//       });
//       navigate("/machines");
//     } catch (error) {
//       if (error.response) {
//         setMsg(error.response.data.msg);
//       }
//     }
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h6" gutterBottom>
//         Add New Machine
//       </Typography>
//       <form onSubmit={saveMachine}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Name"
//               fullWidth
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Name"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Supplier</InputLabel>
//               <Select
//                 value={supplier}
//                 onChange={(e) => setSupplier(e.target.value)}
//               >
//                 <MenuItem value="">Select Supplier</MenuItem>
//                 <MenuItem value="MECALBI">MECALBI</MenuItem>
//                 <MenuItem value="DSG">DSG</MenuItem>
//                 <MenuItem value="TE Raychem">TE Raychem</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Shrink Category</InputLabel>
//               <Select
//                 value={shrinkCategory}
//                 onChange={(e) => setShrinkCategory(e.target.value)}
//               >
//                 <MenuItem value="">Select Shrink Category</MenuItem>
//                 <MenuItem value="single">Single</MenuItem>
//                 <MenuItem value="multiple">Multiple</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Machine Name"
//               fullWidth
//               value={machineName}
//               onChange={(e) => setMachineName(e.target.value)}
//               placeholder="Machine Name"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Category"
//               fullWidth
//               type="number"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               placeholder="Category"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <input
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])} // Handle file input change
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">
//               Save
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       {msg && (
//         <Typography variant="subtitle1" color="error">
//           {msg}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default FormAddMachine;

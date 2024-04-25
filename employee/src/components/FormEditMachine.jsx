import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";

const FormEditMachine = ({ machine, closeModal }) => {
  const [editedMachine, setEditedMachine] = useState({
    name: "",
    supplier: "",
    shrinkCategory: "",
    category: "",
    machine_name: "",
    image: null,
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (machine) {
      setEditedMachine({
        name: machine.name || "",
        supplier: machine.supplier || "",
        shrinkCategory: machine.shrinkCategory || "",
        category: machine.category || "",
        machine_name: machine.machine_name || "",
      });
    }
  }, [machine]);

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setEditedMachine({ ...editedMachine, image: e.target.files[0] });
    } else {
      setEditedMachine({ ...editedMachine, [e.target.name]: e.target.value });
    }
  };

  const updateMachine = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token not found in local storage");
        return;
      }

      const formData = new FormData();
      formData.append("name", editedMachine.name);
      formData.append("supplier", editedMachine.supplier);
      formData.append("shrinkCategory", editedMachine.shrinkCategory);
      formData.append("category", editedMachine.category);
      formData.append("machine_name", editedMachine.machine_name);
      formData.append("image", editedMachine.image);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.patch(
        `http://localhost:5000/machines/${machine.uuid}`,
        formData,
        config
      );
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Update Successful",
        text: "Machine updated successfully.",
      }).then(() => {
        closeModal();
      });
    } catch (error) {
      console.error("Error updating machine:", error);
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
        Edit Machine
      </Typography>
      <form onSubmit={updateMachine}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              name="name"
              value={editedMachine.name}
              onChange={handleInputChange}
              placeholder="Machine Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Supplier"
              fullWidth
              name="supplier"
              value={editedMachine.supplier}
              onChange={handleInputChange}
              placeholder="Supplier"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Shrink Category"
              fullWidth
              name="shrinkCategory"
              value={editedMachine.shrinkCategory}
              onChange={handleInputChange}
              placeholder="Shrink Category"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Machine Name"
              fullWidth
              name="machine_name"
              value={editedMachine.machine_name}
              onChange={handleInputChange}
              placeholder="Machine Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Category"
              fullWidth
              name="category"
              value={editedMachine.category}
              onChange={handleInputChange}
              placeholder="Category"
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleInputChange}
            />
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

export default FormEditMachine;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
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

// const FormEditMachine = (machineId, closeModal) => {
//   const [machine, setMachine] = useState({
//     name: "",
//     supplier: "",
//     shrinkCategory: "",
//     category: "",
//     machine_name: "", // Ajout de machine_name
//     image: null, // New state for image file
//   });
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const getMachineById = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/machines/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const {
//           name,
//           supplier,
//           shrinkCategory,
//           category,
//           machine_name,
//           image,
//         } = response.data; // Inclure machine_name
//         setMachine({
//           name: name || "",
//           supplier: supplier || "",
//           shrinkCategory: shrinkCategory || "",
//           category: category || "",
//           machine_name: machine_name || "", // Définir machine_name
//           image: image || null, // Set the default value for image
//         });
//       } catch (error) {
//         if (error.response) {
//           setMsg(error.response.data.msg);
//         }
//       }
//     };
//     getMachineById();
//   }, [id, token]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     // Check if the changed field is 'category' and if the entered value is not a number
//     if (name === "category" && isNaN(value)) {
//       // Prevent setting the state if the entered value is not a number
//       return;
//     }

//     // Check if the changed field is 'image' and set the image state accordingly
//     if (name === "image") {
//       setMachine({
//         ...machine,
//         image: files[0],
//       });
//       return;
//     }

//     setMachine({
//       ...machine,
//       [name]: value,
//     });
//   };

//   const updateMachine = async (e) => {
//     e.preventDefault();
//     try {
//       // Check if category is null
//       if (machine.category === null) {
//         setMsg("Category cannot be null.");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("name", machine.name);
//       formData.append("supplier", machine.supplier);
//       formData.append("shrinkCategory", machine.shrinkCategory);
//       formData.append("category", machine.category);
//       formData.append("machine_name", machine.machine_name);
//       formData.append("image", machine.image); // Append image file to form data

//       await axios.patch(`http://localhost:5000/machines/${id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       navigate("/machines");
//       closeModal();
//     } catch (error) {
//       if (error.response) {
//         setMsg(error.response.data.msg);
//       }
//     }
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h6" gutterBottom>
//         Edit Machine
//       </Typography>
//       <form onSubmit={updateMachine}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Name"
//               fullWidth
//               name="name"
//               value={machine.name}
//               onChange={handleChange}
//               placeholder="Machine Name"
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth>
//               <InputLabel>Supplier</InputLabel>
//               <Select
//                 value={machine.supplier}
//                 onChange={handleChange}
//                 name="supplier"
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
//                 value={machine.shrinkCategory}
//                 onChange={handleChange}
//                 name="shrinkCategory"
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
//               name="machine_name"
//               value={machine.machine_name}
//               onChange={handleChange}
//               placeholder="Machine Name"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Category"
//               fullWidth
//               type="number"
//               name="category"
//               value={machine.category}
//               onChange={handleChange}
//               placeholder="Category"
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <input type="file" name="image" onChange={handleChange} />
//           </Grid>
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary">
//               Update
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

// export default FormEditMachine;

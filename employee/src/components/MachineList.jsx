import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Typography,
  Box,
  Button,
  TablePagination,
  IconButton,
  TextField,
} from "@mui/material";
import FormAddMachine from "./FormAddMachine";
import FormEditMachine from "./FormEditMachine";
import { useNavigate } from "react-router-dom";

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Etat pour ouvrir/fermer la modalité d'image
  const [selectedImage, setSelectedImage] = useState(null); // Etat pour stocker l'image sélectionnée
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token available");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    getMachines();
  }, []);

  const getMachines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/machines",
        config
      );
      setMachines(response.data);
    } catch (error) {
      console.error("Error fetching machines:", error);
      setError("Error fetching machines data");
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const deleteMachine = async (machineId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d9534f", // Rouge
        cancelButtonColor: "#6c757d", // Gris
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `http://localhost:5000/machines/${machineId}`,
          config
        );
        getMachines();
        Swal.fire("Deleted!", "Your machine has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting machine:", error);
      setError("Error deleting machine");
    }
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (machine) => {
    setSelectedMachine(machine);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedMachine(null);
    setEditModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredMachines = machines.filter((machine) =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={1}>
      <Typography variant="h5" gutterBottom>
        Machines
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <IconButton>
                <FaSearch />
              </IconButton>
            ),
          }}
        />
        <IconButton color="primary" onClick={handleAddModalOpen}>
          <FaPlus />
        </IconButton>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Shrink Category</TableCell>
                <TableCell>Machine Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMachines
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((machine, index) => (
                  <TableRow key={machine.uuid}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{machine.name}</TableCell>
                    <TableCell>{machine.supplier}</TableCell>
                    <TableCell>{machine.shrinkCategory}</TableCell>
                    <TableCell>{machine.machine_name}</TableCell>
                    <TableCell>{machine.category}</TableCell>

                    <TableCell>
                      <span
                        className="clickable"
                        onClick={() => handleImageClick(machine.image)}
                        style={{ cursor: "pointer" }}
                      >
                        View Image
                      </span>
                    </TableCell>
                    <TableCell>{machine.createdBy}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          onClick={() => handleEditModalOpen(machine)}
                        >
                          <FaEdit style={{ color: "blue", fontSize: "15px" }} />
                        </IconButton>
                        <IconButton onClick={() => deleteMachine(machine.uuid)}>
                          <FaTrash style={{ color: "red", fontSize: "15px" }} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredMachines.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal open={addModalOpen} onClose={handleAddModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <FormAddMachine />
        </Box>
      </Modal>
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <FormEditMachine
            machine={selectedMachine}
            closeModal={handleEditModalClose}
          />
        </Box>
      </Modal>
      <Modal open={modalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          <img
            src={selectedImage}
            alt="Machine Image"
            style={{
              maxHeight: "80vh",
              maxWidth: "100%",
              marginBottom: "1rem",
            }}
          />
          <Button variant="contained" onClick={closeModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MachineList;

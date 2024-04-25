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
import FormAddRingTerminal from "./FormAddRingTerminal"; // Import du composant FormAddRingTerminal
import FormEditRingTerminal from "./FormEditRingTerminal"; // Import du composant FormEditRingTerminal
import { useNavigate } from "react-router-dom";

const RingTerminalList = () => {
  const [ringTerminals, setRingTerminals] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false); // État pour l'affichage de la modalité de l'image
  const [addModalOpen, setAddModalOpen] = useState(false); // État pour l'affichage de la modalité du formulaire d'ajout
  const [editModalOpen, setEditModalOpen] = useState(false); // État pour l'affichage de la modalité du formulaire de modification
  const [selectedTerminal, setSelectedTerminal] = useState(null); // État pour stocker le terminal sélectionné
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  // Check if token exists
  if (!token) {
    throw new Error("No token available");
  }

  // Add the token to the request headers
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    getRingTerminals();
  }, []);

  const getRingTerminals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/RingTerminals",
        config
      );
      setRingTerminals(response.data);
    } catch (error) {
      console.error("Error fetching ring terminals:", error);
      setError("Error fetching ring terminals data");
    }
  };

  const deleteRingTerminal = async (terminalId) => {
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
          `http://localhost:5000/RingTerminals/${terminalId}`,
          config
        );
        getRingTerminals();
        Swal.fire(
          "Deleted!",
          "Your ring terminal has been deleted.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error deleting ring terminal:", error);
      setError("Error deleting ring terminal");
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true); // Ouvrir la modalité de l'image
  };

  const closeModal = () => {
    setSelectedImage(null);
    setImageModalOpen(false);
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (terminal) => {
    setSelectedTerminal(terminal);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedTerminal(null);
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

  const filteredTerminals = ringTerminals.filter((terminal) =>
    terminal.typeOfTerminal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={1}>
      <Typography variant="h5" gutterBottom>
        Ring Terminals
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
        {/* Utilisation du composant FormAddRingTerminal dans la modal */}
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
                <TableCell>Type</TableCell>
                <TableCell>Leoni No</TableCell>
                <TableCell>VW No</TableCell>
                <TableCell>Supplier No</TableCell>
                <TableCell>Bending</TableCell>
                <TableCell>Soldering</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTerminals
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((terminal, index) => (
                  <TableRow key={terminal.uuid}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{terminal.typeOfTerminal}</TableCell>
                    <TableCell>{terminal.leoniTerminalNo}</TableCell>
                    <TableCell>{terminal.vwTerminalNo}</TableCell>
                    <TableCell>{terminal.supplierNo}</TableCell>
                    <TableCell>{terminal.bending}</TableCell>
                    <TableCell>{terminal.soldering}</TableCell>
                    <TableCell>
                      <span
                        className="clickable"
                        onClick={() => handleImageClick(terminal.image)}
                        style={{ cursor: "pointer" }}
                      >
                        View Image
                      </span>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditModalOpen(terminal)}>
                        <FaEdit style={{ color: "blue", fontSize: "15px" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteRingTerminal(terminal.uuid)}
                      >
                        <FaTrash style={{ color: "red", fontSize: "15px" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredTerminals.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Modal pour afficher le formulaire d'ajout de terminal */}
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
          <FormAddRingTerminal />
        </Box>
      </Modal>
      {/* Modal pour afficher le formulaire de modification de terminal */}
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
          <FormEditRingTerminal
            terminal={selectedTerminal}
            closeModal={handleEditModalClose}
          />
        </Box>
      </Modal>
      {/* Modal pour afficher l'image du terminal */}
      <Modal open={imageModalOpen} onClose={closeModal}>
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
            alt="Terminal Image"
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

export default RingTerminalList;

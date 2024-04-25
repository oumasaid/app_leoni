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
import FormAddWelding from "./FormAddWelding";
import FormEditWelding from "./FormEditWelding";
import { useNavigate } from "react-router-dom";

const WeldingList = () => {
  const [weldings, setWeldings] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedWelding, setSelectedWelding] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
    getWeldings();
  }, []);

  const getWeldings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/Weldings",
        config
      );
      setWeldings(response.data);
    } catch (error) {
      console.error("Error fetching weldings:", error);
      setError("Error fetching weldings data");
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const deleteWelding = async (weldingId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d9534f",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `http://localhost:5000/Weldings/${weldingId}`,
          config
        );
        getWeldings();
        Swal.fire("Deleted!", "Your welding has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting welding:", error);
      setError("Error deleting welding");
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

  const handleEditModalOpen = (welding) => {
    setSelectedWelding(welding);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedWelding(null);
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

  const filteredWeldings = weldings.filter((welding) =>
    welding.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={1}>
      <Typography variant="h5" gutterBottom>
        Weldings
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
                <TableCell>Model</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWeldings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((welding, index) => (
                  <TableRow key={welding.uuid}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{welding.model}</TableCell>
                    <TableCell>{welding.supplier}</TableCell>
                    <TableCell>
                      <span
                        className="clickable"
                        onClick={() => handleImageClick(welding.image)}
                        style={{ cursor: "pointer" }}
                      >
                        View Image
                      </span>
                    </TableCell>
                    <TableCell>{welding.createdBy}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditModalOpen(welding)}>
                        <FaEdit style={{ color: "blue", fontSize: "15px" }} />
                      </IconButton>
                      <IconButton onClick={() => deleteWelding(welding.uuid)}>
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
          count={filteredWeldings.length}
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
          <FormAddWelding handleCloseModal={handleAddModalClose} />
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
          <FormEditWelding
            welding={selectedWelding}
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
            alt="Welding Image"
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

export default WeldingList;

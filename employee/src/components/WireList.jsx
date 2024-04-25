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
import FormAddWire from "./FormAddWire";
import FormEditWire from "./FormEditWire";
import { useNavigate } from "react-router-dom";

const WireList = () => {
  const [wires, setWires] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedWire, setSelectedWire] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
    getWires();
  }, []);

  const getWires = async () => {
    try {
      const response = await axios.get("http://localhost:5000/wires", config);
      setWires(response.data);
    } catch (error) {
      console.error("Error fetching wires:", error);
      setError("Error fetching wires data");
    }
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (wire) => {
    setSelectedWire(wire);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setSelectedWire(null);
    setEditModalOpen(false);
  };

  const deleteWire = async (wireId) => {
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
        await axios.delete(`http://localhost:5000/wires/${wireId}`, config);
        getWires();
        Swal.fire("Deleted!", "Your wire has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting wire:", error);
      setError("Error deleting wire");
    }
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

  const filteredWires = wires.filter((wire) =>
    wire.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={1}>
      <Typography variant="h5" gutterBottom>
        Wires
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
                <TableCell>Type</TableCell>
                <TableCell>Cross Section</TableCell>
                <TableCell>Insulation Material</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWires
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((wire, index) => (
                  <TableRow key={wire.uuid}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{wire.type}</TableCell>
                    <TableCell>{wire.crossSection}</TableCell>
                    <TableCell>{wire.insulationMaterial}</TableCell>
                    <TableCell>{wire.createdBy}</TableCell>
                    <TableCell>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <IconButton onClick={() => handleEditModalOpen(wire)}>
                          <FaEdit style={{ color: "blue", fontSize: "15px" }} />
                        </IconButton>
                        <IconButton onClick={() => deleteWire(wire.uuid)}>
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
          count={filteredWires.length}
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
          <FormAddWire />
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
          <FormEditWire wire={selectedWire} closeModal={handleEditModalClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default WireList;

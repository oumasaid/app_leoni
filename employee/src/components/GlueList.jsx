import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSearch, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
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
import FormAddGlue from "./FormAddGlue";
import FormEditGlue from "./FormEditGlue";
import { useNavigate } from "react-router-dom";

const GlueList = () => {
  const [glues, setGlues] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedGlue, setSelectedGlue] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    getGlues();
  }, []);

  const getGlues = async () => {
    try {
      const response = await axios.get("http://localhost:5000/glues", config);
      setGlues(response.data);
    } catch (error) {
      console.error("Error fetching glues:", error);
      setError("Error fetching glues data");
    }
  };

  const deleteGlue = async (glueId) => {
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
        await axios.delete(`http://localhost:5000/glues/${glueId}`, config);
        getGlues();
        Swal.fire("Deleted!", "Your glue has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting glue:", error);
      setError("Error deleting glue");
    }
  };

  const handleAddModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
  };

  const handleEditModalOpen = (glue) => {
    setSelectedGlue(glue);
    setOpenEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedGlue(null);
    setOpenEditModal(false);
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

  const filteredGlues = glues.filter((glue) =>
    glue.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={1}>
      <Typography variant="h5" gutterBottom>
        Glues
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
                <TableCell>Designation</TableCell>
                <TableCell>Leoni PN</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGlues
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((glue, index) => (
                  <TableRow key={glue.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{glue.designation}</TableCell>
                    <TableCell>{glue.leoniPN}</TableCell>
                    <TableCell>{glue.supplier}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditModalOpen(glue)}>
                        <FaEdit style={{ color: "blue", fontSize: "15px" }} />
                      </IconButton>
                      <IconButton onClick={() => deleteGlue(glue.id)}>
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
          count={filteredGlues.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal open={openAddModal} onClose={handleAddModalClose}>
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
          <FormAddGlue />
        </Box>
      </Modal>
      <Modal open={openEditModal} onClose={handleEditModalClose}>
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
          <FormEditGlue glue={selectedGlue} closeModal={handleEditModalClose} />
        </Box>
      </Modal>
    </Box>
  );
};

export default GlueList;

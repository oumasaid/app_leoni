import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const QualityOperationalForm = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleUpload = () => {
    if (!file || !status || !remarks) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      return;
    }

    // Reset upload progress
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("status", status);
    formData.append("remarks", remarks);

    axios
      .post("http://localhost:5000/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        // Handle successful upload
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Uploaded!",
          text: "Your file has been uploaded successfully.",
        });
      })
      .catch((error) => {
        // Handle upload error
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while uploading the file.",
        });
      });
  };

  const handleSave = () => {
    if (!file || !status || !remarks) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save this form?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle save action
        // You can perform additional actions here, such as submitting the form
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Your form has been saved successfully.",
        });
      }
    });
  };

  return (
    <Box maxWidth={500} mx="auto" my={4} p={2} borderRadius={8} boxShadow={2}>
      <Typography variant="h4" align="center" gutterBottom>
        Quality Operational
      </Typography>
      <TextField
        type="file"
        onChange={handleFileChange}
        fullWidth
        variant="outlined"
        size="small"
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        fullWidth
        size="medium"
        margin="normal"
      >
        Upload
      </Button>
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Box textAlign="center" mt={2}>
          <CircularProgress
            variant="determinate"
            value={uploadProgress}
            size={24}
          />
        </Box>
      )}
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          style={{ backgroundColor: "green", margin: "0 8px" }}
          onClick={() => handleStatusChange("IO")}
          size="medium"
        >
          IO
        </Button>
        <Button
          style={{ backgroundColor: "red", margin: "0 8px" }}
          onClick={() => handleStatusChange("N.IO")}
          size="medium"
        >
          N.IO
        </Button>
        <Button
          style={{ backgroundColor: "orange", margin: "0 8px" }}
          onClick={() => handleStatusChange("NA")}
          size="medium"
        >
          NA
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="h5" align="center" gutterBottom>
          Remarks
        </Typography>
        <TextareaAutosize
          value={remarks}
          onChange={handleRemarksChange}
          rowsMin={4}
          placeholder="Add remarks..."
          style={{ width: "100%", resize: "vertical" }}
        />
      </Box>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
          size="medium"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default QualityOperationalForm;

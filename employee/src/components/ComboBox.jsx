import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ComboBox = ({ options, onSelect }) => {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          onChange={(event) => onSelect(event.target.value)}
        />
      )}
    />
  );
};

export default ComboBox;

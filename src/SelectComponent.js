import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";

export default function SelectComponent({
  optionsArray,
  onSelectionChange,
  selectedValue,
}) {
  const handleSelectionChange = (event, value) => {
    onSelectionChange(value);
  };
  return (
    <Autocomplete
      className="w-[19rem] md:w-96"
      freeSolo
      id="select-component"
      disableClearable
      options={optionsArray
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(
          (option) =>
            (option.name ?? "") +
            (option.nickName ? ` (${option.nickName})` : "")
        )}
      onChange={handleSelectionChange}
      value={selectedValue}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        />
      )}
    />
  );
}

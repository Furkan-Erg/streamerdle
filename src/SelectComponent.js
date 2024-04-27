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
      className="w-72"
      freeSolo
      id="select-component"
      disableClearable
      options={optionsArray.map(
        (option) =>
          (option.name ?? "") + (option.nickName ? ` (${option.nickName})` : "")
      )}
      onChange={handleSelectionChange}
      value={selectedValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Yayıncı arayın"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}

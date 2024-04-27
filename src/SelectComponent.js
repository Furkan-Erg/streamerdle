import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SelectComponent({ optionsArray }) {
  return (
    <Autocomplete
      className="w-72"
      freeSolo
      id="select-component"
      disableClearable
      options={optionsArray.map(
        (option) => option.name + ` (${option.nickName})`
      )}
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

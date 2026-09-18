import React, { useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import StreamerAvatar from "./StreamerAvatar";
import { getLabel } from "../data/helpers";

// Case/diacritic-insensitive so "tugkan" finds "Tuğkan" and "IŞITMAK" finds "Işıtmak".
const normalize = (text) =>
  text
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const filterOptions = (options, { inputValue }) => {
  const query = normalize(inputValue.trim());
  if (!query) return options;
  return options.filter((option) =>
    normalize(`${option.name} ${option.nickName ?? ""}`).includes(query)
  );
};

// Picking an option (click or Enter) submits the guess immediately.
export default function StreamerSearch({
  options,
  onSelect,
  disabled = false,
  placeholder = "Bir influencer adı yaz...",
}) {
  const [inputValue, setInputValue] = useState("");
  const sortedOptions = useMemo(
    () => [...options].sort((a, b) => a.name.localeCompare(b.name, "tr")),
    [options]
  );

  return (
    <Autocomplete
      className="w-full max-w-md"
      options={sortedOptions}
      value={null}
      inputValue={inputValue}
      onInputChange={(_, value, reason) => {
        if (reason !== "reset") setInputValue(value);
      }}
      onChange={(_, streamer) => {
        if (streamer) {
          onSelect(streamer);
          setInputValue("");
        }
      }}
      getOptionLabel={getLabel}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterOptions={filterOptions}
      autoHighlight
      blurOnSelect={false}
      clearOnBlur={false}
      disabled={disabled}
      noOptionsText="Bu isimde biri yok"
      renderOption={({ key, ...props }, option) => (
        <li key={option.id} {...props}>
          <div className="flex items-center gap-3">
            <StreamerAvatar streamer={option} className="w-9 h-9" />
            <div className="leading-tight">
              <div className="font-medium">{option.name}</div>
              {option.nickName && (
                <div className="text-xs text-white/50">{option.nickName}</div>
              )}
            </div>
          </div>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          autoFocus
          InputProps={{
            ...params.InputProps,
            startAdornment: <Search className="ml-1 text-white/40" />,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(24,24,27,0.9)",
              borderRadius: "14px",
            },
          }}
        />
      )}
    />
  );
}

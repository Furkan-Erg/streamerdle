import React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";

export default function Modal({ open, onClose, title, children }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <IconButton onClick={onClose} size="small" aria-label="Kapat">
            <Close fontSize="small" />
          </IconButton>
        </div>
        <div className="text-sm text-white/80">{children}</div>
      </div>
    </Dialog>
  );
}

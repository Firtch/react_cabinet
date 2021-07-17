import React from "react";
import TextField from "@material-ui/core/TextField";

export const Input = React.forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      inputRef={ref}
      
      {...props}
    />
  );
});
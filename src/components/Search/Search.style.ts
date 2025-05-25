import { Autocomplete, styled } from "@mui/material";

// Create a styled version of the Autocomplete component
export const StyledAutocomplete = styled(Autocomplete)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "24px", // Makes the input rounded
    transition: "box-shadow 0.1s ease-in-out",
    minHeight: "48px", // Make component taller
    "&:hover": {
      boxShadow: "0 2px 5px rgba(51, 51, 51, 0.15)", // Drop shadow on hover
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e0e0e0", // Light gray border on hover
      },
    },
    "&.Mui-focused": {
      boxShadow: "0 2px 5px rgba(51, 51, 51, 0.15)", // Keep shadow when focused
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e0e0e0", // Light gray border when focused
        borderWidth: "1px", // Ensure consistent border width
      },
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "24px", // Ensures the border outline is also rounded
    borderColor: "#e0e0e0", // Light gray border by default
  },
  "& .MuiOutlinedInput-input": {
    paddingLeft: "32px", // Add left padding to the input text
  },
  "& .MuiAutocomplete-inputRoot": {
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
      paddingLeft: 16,
    },
  },
}));

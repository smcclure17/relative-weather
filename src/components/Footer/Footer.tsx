import { Box, Typography } from "@mui/material";
import Link from "next/link";

export const Footer = () => {
  return (
    <Box py={2} textAlign={"center"}>
      <Link href="/reset">
        <Typography color={"GrayText"}>
          Need to change your default city?
        </Typography>
      </Link>
    </Box>
  );
};

import React from "react";

import { Box, Stack, Typography } from "@mui/material";

// import { ArrowIcon, Container } from "./SearchItem.style";

export interface SearchItemProps {
  /**
   * Label of the search item.
   */
  itemLabel: string;
}

export const SearchItem = ({
  itemLabel,
}: SearchItemProps) => {
  return (
    <Box>
      <Stack direction="row">
        <Stack spacing={2}>
          <Typography>{itemLabel}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};
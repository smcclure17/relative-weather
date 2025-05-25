import React, { HTMLAttributes } from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  AutocompleteChangeReason,
  AutocompleteProps,
  TextField,
  createFilterOptions,
  ListItem,
  Box,
} from "@mui/material";

import { SearchItem } from "@/components";
import { Region } from "@/regions";
import { StyledAutocomplete } from "./Search.style";

function stringifyOption(region: Region) {
  return region.name;
}

export type CustomAutocompleteProps = AutocompleteProps<
  Region,
  false, // multiple
  false, // disableClearable
  false, // freeSolo
  "div" // ChipComponent
>;

export interface RegionSearchProps
  extends Omit<CustomAutocompleteProps, "renderInput"> {
  /**
   * Placeholder text displayed in the text field.
   */
  inputLabel?: string;
  /**
   * Function that renders the input.
   * See https://mui.com/material-ui/api/autocomplete/#props
   */
  renderInput?: CustomAutocompleteProps["renderInput"];
  value?: Region;
}

export const Search = ({
  options,
  inputLabel = "City",
  renderInput: customRenderInput,
  value,
  ...otherAutocompleteProps
}: RegionSearchProps) => {
  const defaultRenderInput: CustomAutocompleteProps["renderInput"] = (
    params
  ) => (
    <TextField
      sx={{ borderRadius: 1 }}
      {...params}
      label={inputLabel}
      variant="outlined"
      size="small"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <Box sx={{ mr: -2, pt: 0.75 }}>
            <SearchIcon />
          </Box>
        ),
      }}
      inputProps={{ ...params.inputProps, "aria-label": "Search" }}
    />
  );

  return (
    <StyledAutocomplete
      options={options}
      value={value}
      onChange={(
        e,
        region: Region | null,
        reason: AutocompleteChangeReason
      ) => {
        if (region && reason === "selectOption") {
          // Typescript doesn't allow to assign a string to window.location
          // https://github.com/microsoft/TypeScript/issues/48949
          (window as any).location = `/${region.id}`;
        }
      }}
      clearIcon={<></>}
      forcePopupIcon={false}
      renderInput={customRenderInput ?? defaultRenderInput}
      renderOption={(props: HTMLAttributes<HTMLLIElement>, option: Region) => (
        <ListItem {...props}>
          <SearchItem itemLabel={option.name} />
        </ListItem>
      )}
      getOptionLabel={stringifyOption}
      filterOptions={createFilterOptions({
        limit: 30,
        stringify: stringifyOption,
      })}
      {...otherAutocompleteProps}
    />
  );
};

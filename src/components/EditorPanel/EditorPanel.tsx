import {
  ColorLens,
  RoundedCorner,
  Straighten,
  TextFields,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState, type ReactNode } from "react";
import { DIVIDER_COLOR, EDITOR_PANEL_PADDING } from "../../constants";
import { PaletteEditor } from "../PaletteEditor/PaletteEditor";
import { ShapeEditor } from "../ShapeEditor/ShapeEditor";

type Section = "palette" | "typography" | "shape" | "spacing";
const BUTTON_DATA: { name: Section; icon: ReactNode }[] = [
  { name: "palette", icon: <ColorLens /> },
  { name: "typography", icon: <TextFields /> },
  { name: "shape", icon: <RoundedCorner /> },
  { name: "spacing", icon: <Straighten /> },
];

export const EditorPanel = () => {
  const [section, setSection] = useState<Section>("palette");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: "0px 1 1" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridAutoRows: "1fr 1fr",
          gap: 1,
          p: EDITOR_PANEL_PADDING,
          borderBottom: 1,
          borderColor: DIVIDER_COLOR,
        }}
      >
        {BUTTON_DATA.map(({ name, icon }) => (
          <Button
            key={name}
            startIcon={icon}
            variant={section === name ? "contained" : "outlined"}
            onClick={() => setSection(name)}
            sx={{ py: 1 }}
          >
            {name}
          </Button>
        ))}
      </Box>
      <Box sx={{ flex: "0px 1 1", overflowY: "scroll" }}>
        {section === "palette" && <PaletteEditor />}
        {section === "shape" && <ShapeEditor />}
      </Box>
    </Box>
  );
};

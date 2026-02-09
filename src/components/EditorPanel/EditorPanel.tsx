import { ColorLens, RoundedCorner, TextFields } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useState, type ReactNode } from "react";
import { FieldGroupContainer } from "../FieldGroupContainer/FieldGroupContainer";
import { PaletteEditor } from "../PaletteEditor/PaletteEditor";
import { ShapeEditor } from "../ShapeEditor/ShapeEditor";
import { TextEditor } from "../TextEditor.tsx/TextEditor";

type Section = "colors" | "text" | "shape & spacing";
const BUTTON_DATA: { name: Section; icon: ReactNode }[] = [
  { name: "colors", icon: <ColorLens /> },
  { name: "text", icon: <TextFields /> },
  { name: "shape & spacing", icon: <RoundedCorner /> },
];

export const EditorPanel = () => {
  const [section, setSection] = useState<Section>("colors");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: "0px 1 1" }}>
      <FieldGroupContainer>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 1,
          }}
        >
          {BUTTON_DATA.map(({ name, icon }) => (
            <Button
              key={name}
              variant={section === name ? "contained" : "outlined"}
              onClick={() => setSection(name)}
              sx={{ py: 1 }}
            >
              <Stack alignItems="center" gap={1}>
                {icon}
                <Stack height={24} sx={{ placeContent: "center" }}>
                  <Typography
                    sx={{
                      lineHeight: "1",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                    }}
                  >
                    {name}
                  </Typography>
                </Stack>
              </Stack>
            </Button>
          ))}
        </Box>
      </FieldGroupContainer>
      <Box sx={{ flex: "0px 1 1", overflowY: "scroll" }}>
        {section === "colors" && <PaletteEditor />}
        {section === "shape & spacing" && <ShapeEditor />}
        {section === "text" && <TextEditor />}
      </Box>
    </Box>
  );
};

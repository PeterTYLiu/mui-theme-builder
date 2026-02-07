import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { DIVIDER_COLOR } from "../../constants";
import { EditorPanel } from "../EditorPanel/EditorPanel";

export const ToolsPanel = () => {
  const [tab, setTab] = useState<"editor" | "code" | "themes">("editor");
  return (
    <Paper
      sx={{
        width: "345px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        variant="fullWidth"
        onChange={(_, value) => setTab(value)}
        value={tab}
        sx={{ borderBottom: 1, borderColor: DIVIDER_COLOR }}
      >
        <Tab label="Editor" value="editor" iconPosition="top" />
        <Tab label="Code" value="code" iconPosition="top" />
        <Tab label="My Themes" value="themes" iconPosition="top" />
      </Tabs>
      {tab === "editor" && <EditorPanel />}
    </Paper>
  );
};

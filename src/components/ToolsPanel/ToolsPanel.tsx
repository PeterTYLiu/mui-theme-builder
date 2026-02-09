import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { DIVIDER_COLOR } from "../../constants";
import { EditorPanel } from "../EditorPanel/EditorPanel";

export const ToolsPanel = () => {
  const [tab, setTab] = useState<"editor" | "code">("editor");
  return (
    <Paper
      sx={{
        width: "310px",
        display: { xs: "none", sm: "flex" },
        flexShrink: 0,
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
      </Tabs>
      {tab === "editor" && <EditorPanel />}
    </Paper>
  );
};

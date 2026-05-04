import { Code, Edit } from "@mui/icons-material";
import { Paper, Tab, Tabs, type SxProps } from "@mui/material";
import { Activity, useState } from "react";
import { CodePanel } from "../CodePanel/CodePanel";
import { EditorPanel } from "../EditorPanel/EditorPanel";

const TABS_SX: SxProps = {
  minHeight: "48px",
  transition: "0.2s color",
  "&:hover": {
    color: "primary.main",
  },
};

export const ToolsPanel = () => {
  const [tab, setTab] = useState<"editor" | "code">("editor");
  return (
    <Paper
      sx={{
        width: "300px",
        display: { xs: "none", sm: "flex" },
        flexShrink: 0,
        flexDirection: "column",
      }}
    >
      <Tabs variant="fullWidth" onChange={(_, value) => setTab(value)} value={tab} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tab icon={<Edit />} iconPosition="start" sx={TABS_SX} label="Editor" value="editor" />
        <Tab icon={<Code />} iconPosition="start" sx={TABS_SX} label="Code" value="code" />
      </Tabs>
      <Activity mode={tab === "editor" ? "visible" : "hidden"}>
        <EditorPanel />
      </Activity>
      <Activity mode={tab === "code" ? "visible" : "hidden"}>
        <CodePanel />
      </Activity>
    </Paper>
  );
};

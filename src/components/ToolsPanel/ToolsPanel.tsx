import { Code, Edit } from "@mui/icons-material";
import { Paper, Tab, Tabs } from "@mui/material";
import { Activity, useState } from "react";
import { DIVIDER_COLOR } from "../../constants";
import { CodePanel } from "../CodePanel/CodePanel";
import { EditorPanel } from "../EditorPanel/EditorPanel";

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
      <Tabs variant="fullWidth" onChange={(_, value) => setTab(value)} value={tab} sx={{ borderBottom: 1, borderColor: DIVIDER_COLOR }}>
        <Tab icon={<Edit />} iconPosition="start" sx={{ minHeight: "48px" }} label="Editor" value="editor" />
        <Tab icon={<Code />} iconPosition="start" sx={{ minHeight: "48px" }} label="Code" value="code" />
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

import { ContentCopy } from "@mui/icons-material";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { createHighlighter } from "shiki";
import stringifyObject from "stringify-object";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { saveObjectToClipboard } from "../../utils";

const highlighter = await createHighlighter({
  themes: ["ayu-dark"],
  langs: ["javascript"],
});

export const CodePanel = () => {
  const { themeOptions } = useInnerTheme();
  const codeHtml = highlighter.codeToHtml(
    `import { createTheme } from "@mui/material";

const themeOptions = ` +
      stringifyObject(themeOptions, {
        indent: "    ",
      }).replaceAll("'default'", "default") +
      `;
      
const myTheme = createTheme(themeOptions);`,
    {
      lang: "javascript",
      theme: "ayu-dark",
    },
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flex: "0px 1 1", position: "relative" }}>
      <Stack direction="row" sx={{ p: 2, py: 1, alignItems: "center", justifyContent: "space-between" }}>
        <Typography>Read-only</Typography>
        <Tooltip title="Copy">
          <IconButton onClick={() => saveObjectToClipboard(themeOptions)}>
            <ContentCopy />
          </IconButton>
        </Tooltip>
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }} dangerouslySetInnerHTML={{ __html: codeHtml }} />
    </Box>
  );
};

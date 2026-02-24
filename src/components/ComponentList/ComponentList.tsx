import { Box, Button, Paper, Typography } from "@mui/material";

const highlightComponent = (className: string) => {
  const firstInstance = document.getElementById("mock-app")?.querySelector("." + className);
  if (!firstInstance) return;
  if (firstInstance.classList.contains("pulse")) return;
  firstInstance.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  firstInstance.classList.add("pulse");
  setTimeout(() => firstInstance.classList.remove("pulse"), 2800);
};

const constructClassName = (string: string) => {
  const newString = string.replaceAll(/(^|\s)\w/g, (match) => match.toUpperCase());
  return `Mui${newString.replaceAll(" ", "")}-root`;
};

const COMPONENTS: Partial<Record<string, Array<[string, string] | string>>> = {
  inputs: ["button", "checkbox", ["select", "select-override"], "text field", "toggle button"],
  "data display": [
    "avatar",
    ["badge", "MuiBadge-badge"],
    "chip",
    "divider",
    ["list", "select-override"],
    ["table", "table-override"],
    ["tooltip", "tooltip-override"],
    "typography",
  ],
  feedback: ["alert", ["dialog", "dialog-override"]],
  surfaces: ["app bar", ["paper", "paper-override"]],
  navigation: ["link", ["menu", "select-override"]],
};

export const ComponentList = () => {
  return (
    <Box sx={{ flex: "1 1 100px", overflow: "scroll" }}>
      {Object.entries(COMPONENTS).map((category) => (
        <Box key={category[0]}>
          <Paper sx={{ position: "sticky", top: "0px", zIndex: 1, boxShadow: "none", borderRadius: 0 }}>
            <Typography sx={{ textTransform: "uppercase", color: "text.secondary" }}>{category[0]}</Typography>
          </Paper>
          <Box sx={{ borderInlineStart: "1px solid red", borderColor: "divider", my: 0.5, paddingInlineStart: 0.5 }}>
            {category[1]?.map((component) => {
              const hasOverride = typeof component === "object";
              const componentName = hasOverride ? component[0] : component;
              return (
                <Button
                  key={componentName}
                  size="medium"
                  sx={{ color: "text.primary", justifyContent: "start", textTransform: "capitalize", fontSize: "14px" }}
                  fullWidth
                  onClick={() => highlightComponent(hasOverride ? component[1] : constructClassName(component))}
                >
                  {componentName}
                </Button>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

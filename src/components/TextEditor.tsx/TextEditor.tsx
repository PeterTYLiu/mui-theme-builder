import { DEFAULT_THEME } from "../../constants";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { FieldGroupContainer } from "../FieldGroupContainer/FieldGroupContainer";
import { NumberSpecifier } from "../NumberSpecifier/NumberSpecifier";

export const TextEditor = () => {
  const { theme, mergeThemeOptions, deleteThemeOptionKey } = useInnerTheme();
  return (
    <>
      <FieldGroupContainer title="Font Size">
        <NumberSpecifier
          unit="px"
          isDefault={
            theme.typography.fontSize === DEFAULT_THEME.typography.fontSize
          }
          min={8}
          max={24}
          step={0.5}
          value={theme.typography.fontSize}
          onChange={(num) =>
            mergeThemeOptions({ typography: { fontSize: num } })
          }
          onReset={() => deleteThemeOptionKey(["typography", "fontSize"])}
        />
      </FieldGroupContainer>
    </>
  );
};

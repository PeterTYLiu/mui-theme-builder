import { DEFAULT_THEME } from "../../constants";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { FieldGroupContainer } from "../FieldGroupContainer/FieldGroupContainer";
import { NumberSpecifier } from "../NumberSpecifier/NumberSpecifier";

export const ShapeEditor = () => {
  const { theme, mergeThemeOptions, deleteThemeOptionKey } = useInnerTheme();
  return (
    <>
      <FieldGroupContainer title="Border Radius">
        <NumberSpecifier
          unit="px"
          isDefault={
            theme.shape.borderRadius === DEFAULT_THEME.shape.borderRadius
          }
          min={0}
          max={24}
          step={0.5}
          value={Number(theme.shape.borderRadius)}
          onChange={(num) =>
            mergeThemeOptions({ shape: { borderRadius: num } })
          }
          onReset={() => deleteThemeOptionKey(["shape", "borderRadius"])}
        />
      </FieldGroupContainer>
      <FieldGroupContainer title="Spacing">
        <NumberSpecifier
          unit="px"
          min={6}
          max={14}
          step={0.5}
          isDefault={theme.spacing(1) === "8px"}
          value={Number(theme.spacing(1).slice(0, -2))}
          onChange={(num) => {
            mergeThemeOptions({ spacing: num });
          }}
          onReset={() => deleteThemeOptionKey(["spacing"])}
        />
      </FieldGroupContainer>
    </>
  );
};

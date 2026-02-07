import { Slider } from "@mui/material";
import { FieldContainer } from "../FieldContainer/FieldContainer";

interface NumberSpecifierProps {
  min: number;
  max: number;
  value: number;
  step: number;
  onChange: (num: number) => void;
  title: string;
}

export const NumberSpecifier = ({
  title,
  onChange,
  ...props
}: NumberSpecifierProps) => {
  return (
    <FieldContainer title={title}>
      <Slider onChange={(_, value) => onChange(value)} {...props} />
    </FieldContainer>
  );
};

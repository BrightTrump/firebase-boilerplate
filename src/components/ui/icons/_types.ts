export interface IconProps {
  className?: string;
}

export const Icons = {
  Bin: "bin",
  Close: "close",
  Check: "check",
  EditSquare: "edit-square",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];

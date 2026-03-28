export interface IconProps {
  className?: string;
}

export const Icons = {
  Close: "close",
  Check: "check",
} as const;

export type Icons = (typeof Icons)[keyof typeof Icons];

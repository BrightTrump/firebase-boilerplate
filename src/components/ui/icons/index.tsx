import { type IconProps, Icons } from "./_types";
import CheckIcon from "./check";
import CloseIcon from "./close";

interface Props extends IconProps {
  type: Icons;
}

export function Icon({ type, className }: Props) {
  const props = { className };

  switch (type) {
    case Icons.Close:
      return <CloseIcon {...props} />;

    case Icons.Check:
      return <CheckIcon {...props} />;

    default:
      return null;
  }
}

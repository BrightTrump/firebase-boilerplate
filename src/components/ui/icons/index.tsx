import { type IconProps, Icons } from "./_types";
import BinIcon from "./bin";
import CheckIcon from "./check";
import CloseIcon from "./close";
import EditSquareIcon from "./edit-square";

interface Props extends IconProps {
  type: Icons;
}

export function Icon({ type, className }: Props) {
  const props = { className };

  switch (type) {
    case Icons.Bin:
      return <BinIcon {...props} />;

    case Icons.Close:
      return <CloseIcon {...props} />;

    case Icons.Check:
      return <CheckIcon {...props} />;

    case Icons.EditSquare:
      return <EditSquareIcon {...props} />;

    default:
      return null;
  }
}

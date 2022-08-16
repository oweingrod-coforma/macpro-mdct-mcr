// components
import {
  Table as TableRoot,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
  VisuallyHidden,
} from "@chakra-ui/react";
// utils
import { makeMediaQueryClasses } from "utils";
import { AnyObject, ActionTableContentShape } from "types";
import { ReactChild } from "react";

export const ActionTable = ({
  content,
  children,
  variant,
  sxOverride,
  ...props
}: Props) => {
  const mqClasses = makeMediaQueryClasses();
  return (
    <TableRoot
      variant={variant}
      size="sm"
      sx={{ ...sx.root, ...sxOverride }}
      {...props}
    >
      <TableCaption placement="top" sx={sx.captionBox}>
        <VisuallyHidden>{content.caption}</VisuallyHidden>
      </TableCaption>
      {content.headRow && (
        <Thead>
          {/* Head Row */}
          <Tr>
            {content.headRow.map((headerCell: string, index: number) => (
              <Th
                key={index}
                scope="col"
                sx={sx.tableHeader}
                className={mqClasses}
              >
                {headerCell}
              </Th>
            ))}
          </Tr>
        </Thead>
      )}
      <Tbody>{children}</Tbody>
    </TableRoot>
  );
};

interface Props {
  content: ActionTableContentShape;
  children: ReactChild | ReactChild[];
  variant?: string;
  sxOverride?: AnyObject;
  [key: string]: any;
}

const sx = {
  root: {
    width: "100%",
  },
  captionBox: {
    margin: 0,
    padding: 0,
    height: 0,
  },
  tableHeader: {
    padding: "0.75rem 0.5rem",
    fontSize: "sm",
    fontWeight: "semibold",
    textTransform: "none",
    letterSpacing: "normal",
    color: "black",
    "&.mobile": {
      fontSize: "xs",
    },
  },
  tableCell: {
    padding: "0.75rem 0.5rem",
    borderStyle: "none",
    fontWeight: "normal",
    color: "black",
    "&.mobile": {
      fontSize: "xs",
    },
  },
};

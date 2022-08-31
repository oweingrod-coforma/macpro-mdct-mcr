import { useState } from "react";
// components
import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { ReportDrawer, ReportPageFooter } from "components";
// utils
import { findRoute } from "utils";
import { PageJson } from "types";
// form data
import { mcparRoutes } from "forms/mcpar";

export const EntityDrawerSection = ({ pageJson, onSubmit }: Props) => {
  const { path, form, drawer } = pageJson;
  const { isOpen, onClose, onOpen } = useDisclosure();

  // make state
  const [currentEntity, setCurrentEntity] = useState<string>("");

  // make routes
  const previousRoute = findRoute(mcparRoutes, path, "previous", "/mcpar");
  const nextRoute = findRoute(mcparRoutes, path, "next", "/mcpar");

  const openRowDrawer = (entity: string) => {
    setCurrentEntity(entity);
    onOpen();
  };

  const tempEntityMap = {
    plans: ["Plan A", "Plan B", "Plan C"],
  };

  return (
    <Box data-testid="entity-drawer-section">
      <Heading as="h4">{drawer!.dashboard.title}</Heading>
      {tempEntityMap.plans.map((entity) => {
        return (
          <Flex key={entity} sx={sx.entityRow}>
            <Heading as="h5">{entity}</Heading>
            <Button
              sx={sx.enterButton}
              onClick={() => openRowDrawer(entity)}
              variant="outline"
            >
              Enter
            </Button>
          </Flex>
        );
      })}
      <ReportDrawer
        drawerDisclosure={{
          isOpen,
          onClose,
        }}
        drawerTitle={`${drawer!.drawerTitle} ${currentEntity}`}
        drawerInfo={drawer!.drawerInfo}
        form={form}
        onSubmit={onSubmit}
        data-testid="report-drawer"
      />
      <ReportPageFooter previousRoute={previousRoute} nextRoute={nextRoute} />
    </Box>
  );
};

interface Props {
  pageJson: PageJson;
  onSubmit: Function;
}

const sx = {
  entityRow: {
    justifyContent: "space-between",
    alignItems: "center",
    height: "3.25rem",
    padding: "0.5rem",
    paddingLeft: "0.75rem",
    borderBottom: "1.5px solid var(--chakra-colors-palette-gray_lighter)",
  },
  enterButton: {
    width: "4.25rem",
    height: "1.75rem",
    fontSize: "md",
    fontWeight: "normal",
  },
};
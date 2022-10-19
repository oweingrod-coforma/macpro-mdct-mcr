import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";
// components
import { EntityCard } from "components";
import {
  mockModalDrawerReportPageJson,
  mockAccessMeasuresEntity,
  mockUnfinishedAccessMeasuresFormattedEntityData,
  mockCompletedAccessMeasuresFormattedEntityData,
  mockSanctionsEntity,
  mockUnfinishedSanctionsFormattedEntityData,
  mockCompletedSanctionsFormattedEntityData,
} from "utils/testing/setupJest";

const openAddEditEntityModal = jest.fn();
const openDeleteEntityModal = jest.fn();
const mockOpenDrawer = jest.fn();

const {
  editEntityButtonText,
  enterEntityDetailsButtonText,
  editEntityDetailsButtonText,
} = mockModalDrawerReportPageJson.verbiage;

const UnfinishedAccessMeasuresEntityCardComponent = (
  <EntityCard
    entity={mockAccessMeasuresEntity}
    entityType="mock-entity-type"
    formattedEntityData={mockUnfinishedAccessMeasuresFormattedEntityData}
    verbiage={mockModalDrawerReportPageJson.verbiage}
    openAddEditEntityModal={openAddEditEntityModal}
    openDeleteEntityModal={openDeleteEntityModal}
    openDrawer={mockOpenDrawer}
  />
);

const AccessMeasuresEntityCardComponent = (
  <EntityCard
    entity={mockAccessMeasuresEntity}
    entityType="accessMeasures"
    formattedEntityData={mockCompletedAccessMeasuresFormattedEntityData}
    verbiage={mockModalDrawerReportPageJson.verbiage}
    openAddEditEntityModal={openAddEditEntityModal}
    openDeleteEntityModal={openDeleteEntityModal}
    openDrawer={mockOpenDrawer}
    data-testid="mock-entity-card"
  />
);

describe("Test Completed AccessMeasures EntityCard", () => {
  beforeEach(() => {
    render(AccessMeasuresEntityCardComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("EntityCard is visible", () => {
    expect(screen.getByTestId("entityCard")).toBeVisible();
  });

  test("Clicking edit button opens the AddEditProgramModal", async () => {
    const editEntityButton = screen.getByText(editEntityButtonText);
    await userEvent.click(editEntityButton);
    await expect(openAddEditEntityModal).toBeCalledTimes(1);
  });

  test("EntityCard opens the delete modal on remove click", async () => {
    const removeButton = screen.getByTestId("delete-entity-button");
    await userEvent.click(removeButton);
    expect(openDeleteEntityModal).toBeCalledTimes(1);
  });

  test("EntityCard opens the drawer on edit-details click", async () => {
    const editDetailsButton = screen.getByText(editEntityDetailsButtonText);
    await userEvent.click(editDetailsButton);
    expect(mockOpenDrawer).toBeCalledTimes(1);
  });
});

describe("Test Unfinished AccessMeasures EntityCard", () => {
  beforeEach(() => {
    render(UnfinishedAccessMeasuresEntityCardComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("EntityCard is visible", () => {
    expect(screen.getByTestId("entityCard")).toBeVisible();
  });

  test("EntityCard opens the delete modal on remove click", async () => {
    const removeButton = screen.getByTestId("delete-entity-button");
    await userEvent.click(removeButton);
    expect(openDeleteEntityModal).toBeCalledTimes(1);
  });

  test("EntityCard opens the drawer on enter-details click", async () => {
    const enterDetailsButton = screen.getByText(enterEntityDetailsButtonText);
    await userEvent.click(enterDetailsButton);
    expect(mockOpenDrawer).toBeCalledTimes(1);
  });
});

describe("Test AccessMeasures EntityCard accessibility", () => {
  it("Unfinished AccessMeasures EntityCard should not have basic accessibility issues", async () => {
    const { container } = render(UnfinishedAccessMeasuresEntityCardComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Completed AccessMeasures EntityCard should not have basic accessibility issues", async () => {
    const { container } = render(AccessMeasuresEntityCardComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const UnfinishedSanctionsEntityCardComponent = (
  <EntityCard
    entity={mockSanctionsEntity}
    entityType="sanctions"
    formattedEntityData={mockUnfinishedSanctionsFormattedEntityData}
    verbiage={mockModalDrawerReportPageJson.verbiage}
    openAddEditEntityModal={openAddEditEntityModal}
    openDeleteEntityModal={openDeleteEntityModal}
    openDrawer={mockOpenDrawer}
    data-testid="mock-entity-card"
  />
);

const SanctionsEntityCardComponent = (
  <EntityCard
    entity={mockSanctionsEntity}
    entityType="sanctions"
    formattedEntityData={mockCompletedSanctionsFormattedEntityData}
    verbiage={mockModalDrawerReportPageJson.verbiage}
    openAddEditEntityModal={openAddEditEntityModal}
    openDeleteEntityModal={openDeleteEntityModal}
    openDrawer={mockOpenDrawer}
    data-testid="mock-entity-card"
  />
);

describe("Test Completed Sanctions EntityCard", () => {
  beforeEach(() => {
    render(SanctionsEntityCardComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("EntityCard is visible", () => {
    expect(screen.getByTestId("entityCard")).toBeVisible();
  });

  test("Clicking edit button opens the AddEditProgramModal", async () => {
    const editEntityButton = screen.getByText(editEntityButtonText);
    await userEvent.click(editEntityButton);
    await expect(openAddEditEntityModal).toBeCalledTimes(1);
  });

  test("EntityCard opens the delete modal on remove click", async () => {
    const removeButton = screen.getByTestId("delete-entity-button");
    await userEvent.click(removeButton);
    expect(openDeleteEntityModal).toBeCalledTimes(1);
  });

  test("EntityCard opens the drawer on edit-details click", async () => {
    const editDetailsButton = screen.getByText(editEntityDetailsButtonText);
    await userEvent.click(editDetailsButton);
    expect(mockOpenDrawer).toBeCalledTimes(1);
  });
});

describe("Test Unfinished Sanctions EntityCard", () => {
  beforeEach(() => {
    render(UnfinishedSanctionsEntityCardComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("EntityCard is visible", () => {
    expect(screen.getByTestId("entityCard")).toBeVisible();
  });

  test("EntityCard opens the delete modal on remove click", async () => {
    const removeButton = screen.getByTestId("delete-entity-button");
    await userEvent.click(removeButton);
    expect(openDeleteEntityModal).toBeCalledTimes(1);
  });

  test("EntityCard opens the drawer on enter-details click", async () => {
    const enterDetailsButton = screen.getByText(enterEntityDetailsButtonText);
    await userEvent.click(enterDetailsButton);
    expect(mockOpenDrawer).toBeCalledTimes(1);
  });
});

describe("Test Sanctions EntityCard accessibility", () => {
  it("Unfinished Sanctions EntityCard should not have basic accessibility issues", async () => {
    const { container } = render(UnfinishedSanctionsEntityCardComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("Completed Sanctions EntityCard should not have basic accessibility issues", async () => {
    const { container } = render(SanctionsEntityCardComponent);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

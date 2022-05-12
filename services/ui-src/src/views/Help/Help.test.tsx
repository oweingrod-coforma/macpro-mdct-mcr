import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
// utils
import { RouterWrappedComponent } from "utils/testing/setupJest";
import { useApiMock } from "utils/testing/mockApi";
// views
import { Help } from "../index";

const helpView = (
  <RouterWrappedComponent>
    <Help />
  </RouterWrappedComponent>
);

describe("Test /help view", () => {
  beforeEach(() => {
    useApiMock({});
    render(helpView);
  });

  test("Check that /help view renders", () => {
    expect(screen.getByTestId("help-view")).toBeVisible();
  });
});

describe("Test /help view accessibility", () => {
  it("Should not have basic accessibility issues", async () => {
    const { container } = render(helpView);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

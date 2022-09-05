import { render, screen } from "@testing-library/react";
import Home from "../../pages";

jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
  };
});

describe("Home page", () => {
  it("renders correctk", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "R$10.00" }} />);

    expect(screen.getByText("For R$10.00 month")).toBeInTheDocument();
  });
});

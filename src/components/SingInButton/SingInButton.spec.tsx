import { render, screen } from "@testing-library/react";
import { createMock } from "ts-jest-mock";
import { useSession } from "next-auth/react";
import SingInButton from ".";

jest.mock("next-auth/react");

describe("SingInButton components", () => {
  it("Render correctly when user is not authenticated", () => {
    const useSessionMocked = createMock(useSession);
    useSessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<SingInButton />);
    expect(screen.getByText("Sing in with GitHub")).toBeInTheDocument();
  });

  it("Render correctly when user is authenticated", () => {
    const useSessionMocked = createMock(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "Douglas Miguel",
          email: "douglasmiguel@example.com",
          image: "",
        },
        expires: "2022-10-04T18:32:10.046Z",
      },
      status: "authenticated",
    });
    render(<SingInButton />);
    expect(screen.getByText("Douglas Miguel")).toBeInTheDocument();
  });
});

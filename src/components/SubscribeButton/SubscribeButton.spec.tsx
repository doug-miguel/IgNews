import {
  render,
  screen,
  fireEvent,
  act,
  renderHook,
} from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";
import { createMock } from "ts-jest-mock";
import SubscribeButton from ".";
import { useRouter } from "next/router";

jest.mock("next-auth/react");
jest.mock("next/router", () => require("next-router-mock"));

describe("SubscribeButton components", () => {
  it("Render correctly", () => {
    const useSessionMocked = createMock(useSession);
    useSessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticatied", () => {
    const useSessionMocked = createMock(useSession);
    useSessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    const signInMocked = createMock(signIn);
    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirects to posts when user already has a subscription", () => {
    const useSessionMocked = createMock(useSession);
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "Douglas Miguel",
          email: "douglasmiguel@example.com",
          image: "",
        },
        activeSubscription: "fake-test",
        expires: "2022-10-04T18:32:10.046Z",
      },
      status: "authenticated",
    });
    const { result } = renderHook(() => {
      return useRouter();
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");
    fireEvent.click(subscribeButton);
    act(() => {
      result.current.push("/posts");
    });
    expect(result.current).toMatchObject({ asPath: "/posts" });
  });
});

import { act, render, renderHook, screen } from "@testing-library/react";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { createMock } from "ts-jest-mock";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post Excerpt</p>",
  updateAt: "March, 10",
};

jest.mock("next-auth/react");
jest.mock("../../services/prismic");
jest.mock("next/router", () => require("next-router-mock"));

describe("Post preview page", () => {
  it("renders correctk", () => {
    const useSessionMocked = createMock(useSession);
    useSessionMocked.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    render(<Post post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post Excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when authenticated", async () => {
    const useSessionMocked = createMock(useSession);
    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: "fake-active-subscription" },
      false,
    ] as any);

    const { result } = renderHook(() => {
      return useRouter();
    });

    act(() => {
      result.current.push("/post/my-new-post");
    });

    render(<Post post={post} />);

    expect(result.current).toMatchObject({ asPath: "/post/my-new-post" });
  });

  it("loads initial data", async () => {
    const GetPrismicClientMocked = createMock(GetPrismicClient);

    GetPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My New Post" }],
          content: [{ type: "paragraph", text: "Post Excerpt" }],
        },
        last_publication_date: "03-12-2021",
      }),
    } as any);

    const response = await getStaticProps({
      params: { slug: "my-new-post" },
    });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-post",
            title: "My New Post",
            content: "<p>Post Excerpt</p>",
            updateAt: "12 de março de 21",
          },
        },
      })
    );
  });
});

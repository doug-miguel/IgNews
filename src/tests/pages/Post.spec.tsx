import { render, screen } from "@testing-library/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { createMock } from "ts-jest-mock";
import { getSession } from "next-auth/react";
import { GetPrismicClient } from "../../services/prismic";

const posts = {
  slug: "my-new-post",
  title: "My New Post",
  content: "<p>Post Excerpt</p>",
  updateAt: "March, 10",
};

jest.mock("next-auth/react");
jest.mock("../../services/prismic");

describe("Post page", () => {
  it("renders correctk", () => {
    render(<Post post={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Post Excerpt")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getSessionMocked = createMock(getSession);
    getSessionMocked.mockResolvedValueOnce(null);
    const response = await getServerSideProps({
      params: { slug: "my-new-post" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/posts/preview/my-new-post",
        }),
      })
    );
  });

  it("loads initial data", async () => {
    const getSessionMocked = createMock(getSession);
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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription",
    } as any);

    const response = await getServerSideProps({
      params: { slug: "my-new-post" },
    } as any);

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

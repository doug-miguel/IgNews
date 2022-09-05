import { render, screen } from "@testing-library/react";
import { GetPrismicClient } from "../../services/prismic";
import Posts, { getStaticProps } from "../../pages/posts";
import { createMock } from "ts-jest-mock";

const posts = [
  {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post Excerpt",
    updateAt: "March, 10",
  },
];

jest.mock("../../services/prismic");

describe("Posts page", () => {
  it("renders correctk", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("March, 10")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const GetPrismicClientMocked = createMock(GetPrismicClient);

    GetPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My New Post" }],
              content: [{ type: "paragraph", text: "Post Excerpt" }],
            },
            last_publication_date: "03-12-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My New Post",
              excerpt: "Post Excerpt",
              updateAt: "12 de março de 21",
            },
          ],
        },
      })
    );
  });
});

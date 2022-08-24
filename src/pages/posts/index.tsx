import { GetStaticProps } from "next";
import Link from "next/link";

import Head from "next/head";

import { GetPrismicClient } from "../../services/prismic";

import * as prismic from "@prismicio/client";

import style from "./style.module.scss";

import { RichText } from "prismic-dom";

type IPost = {
  slug: string;
  title: string;
  excerpt: string;
  updateAt: string;
};
interface IPosts {
  posts: IPost[];
}

export default function Posts({ posts }: IPosts) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={style.container}>
        <div className={style.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updateAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (req) => {
  const client = GetPrismicClient();

  const response = await client.query(
    [prismic.predicate.at("document.type", "post")],
    { fetch: ["post.title", "post.content"], pageSize: 100 }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content: any) => content.type === "paragraph")
          ?.text ?? "",
      updateAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "2-digit",
        }
      ),
    };
  });
  return {
    props: { posts },
  };
};

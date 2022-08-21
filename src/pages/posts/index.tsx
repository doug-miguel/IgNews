import { GetStaticProps } from "next";

import Head from "next/head";

import { GetPrismicClient } from "../../services/prismic";

import * as prismic from "@prismicio/client";

import style from "./style.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={style.container}>
        <div className={style.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>TypeScript: por trás do superset de JavaScript</strong>
            <p>
              Um conjunto de ferramentas JavaScript que adicionou tipagem e
              novos recursos na linguagem
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>TypeScript: por trás do superset de JavaScript</strong>
            <p>
              Um conjunto de ferramentas JavaScript que adicionou tipagem e
              novos recursos na linguagem
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>TypeScript: por trás do superset de JavaScript</strong>
            <p>
              Um conjunto de ferramentas JavaScript que adicionou tipagem e
              novos recursos na linguagem
            </p>
          </a>
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
  console.log(
    "🚀 ~ file: index.tsx ~ line 56 ~ constgetStaticProps:GetStaticProps= ~ response",
    JSON.stringify(response, null, 2)
  );
  return {
    props: {},
  };
};

import { GetServerSideProps } from "next"
import Head from "next/head"
import { getSession } from "next-auth/react"

import { RichText } from "prismic-dom"
import { GetPrismicClient } from "../../services/prismic"

import style from "./post.module.scss"

interface PostProps {
    post: {
        slug: string
        title: string
        content: string
        updateAt: string
    }
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>{post.title} | Ignews</title>
            </Head>
            <main className={style.container}>
              <article className={style.post}>
                  <h1>{post.title}</h1>
                  <time>{post.updateAt}</time>
                  <div
                      className={style.postContent}
                      dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const session = await getSession({ req })
    const { slug }: any = params;

    const prismic = GetPrismicClient(req)
    const response = await prismic.getByUID('post', String(slug), {});
    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updateAt: new Date(response.last_publication_date).toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "long",
                year: "2-digit",
            }
        )
    }
    return {
        props: {
            post
        }
    }
}
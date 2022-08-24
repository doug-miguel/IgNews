import React from "react"

import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"

import { RichText } from "prismic-dom"
import { GetPrismicClient } from "../../../services/prismic"

import style from "../post.module.scss"

interface PostPreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updateAt: string
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session }: any = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

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
            className={`${style.postContent} ${style.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={style.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now🤔</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      //Gerar pagina statica
      // { params: { slug: 'typescript-por-tras-do-superset-de-javascript' } }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug }: any = params;

  const prismic = GetPrismicClient()
  const response = await prismic.getByUID('post', String(slug), {});
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
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
    },
    redirect: 60 * 60 // 1 hora
  }
}
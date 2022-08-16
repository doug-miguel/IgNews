import type { NextPage } from "next";
import Head from "next/head";
import SubscribeButton from "../components/SubscribeButton";

import style from "./home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={style.contentContainer}>
        <section className={style.hero}>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>For $9.90 month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/imagens/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
};

export default Home;

import type { GetStaticProps } from "next";
import Head from "next/head";
import SubscribeButton from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import style from "./home.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  };
}

export default function Home({ product }: HomeProps) {
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
            <span>For {product.amount} month</span>
          </p>
          <SubscribeButton />
        </section>
        <img src="/imagens/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

// Pagina SSR
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve("price_1LXXF7LdHE6SRfidFOGrVprx");

//   const unitAmount: number | any = price.unit_amount && price.unit_amount / 100;

//   const product = {
//     priceId: price?.id,
//     amount: new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(unitAmount),
//   };

//   return {
//     props: {
//       product,
//     },
//   };
// };

// Pagina SSG
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1LXXF7LdHE6SRfidFOGrVprx");

  const unitAmount: number | any = price.unit_amount && price.unit_amount / 100;

  const product = {
    priceId: price?.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(unitAmount),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 1 dias para revalidação de novos dados da pagina
  };
};

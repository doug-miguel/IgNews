import * as prismic from "@prismicio/client";

export const GetPrismicClient = (config?: any) => {
  const PRISMIC_ACCESS_TOKEN: string | any = process.env.PRISMIC_ACCESS_TOKEN;
  const PRISMIC_URL: string | any = process.env.PRISMIC_URL;
  const client = prismic.createClient(PRISMIC_URL, {
    accessToken: PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  return client;
};

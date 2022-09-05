import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import style from "./style.module.scss";

export default function SubscribeButton() {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn();
      return;
    }
    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }
    try {
      const response = await api.post("/subscriber");
      const { sessionId } = response?.data;
      const stripe = await getStripeJs();
      await stripe?.redirectToCheckout({ sessionId });
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <button
      type="button"
      className={style.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}

import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useSession, signIn, signOut } from "next-auth/react";

import style from "./style.module.scss";

export default function SingInButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      type="button"
      className={style.singinButton}
      onClick={() => signOut()}
    >
      <>
        <FaGithub color="#04d361" />
        {session?.user}
        <FiX color="#737380" className={style.closeIcon} />
      </>
    </button>
  ) : (
    <button
      type="button"
      className={style.singinButton}
      onClick={() => signIn()}
    >
      <FaGithub color="#eba417" />
      Sing in with GitHub
    </button>
  );
}

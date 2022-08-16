import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import style from "./style.module.scss";

export default function SingInButton() {
  const isUserLoggeIn = true;
  return isUserLoggeIn ? (
    <button type="button" className={style.singinButton}>
      <FaGithub color="#04d361" />
      Douglas Miguel
      <FiX color="#737380" className={style.closeIcon} />
    </button>
  ) : (
    <button type="button" className={style.singinButton}>
      <FaGithub color="#eba417" />
      Sing in with GitHub
    </button>
  );
}

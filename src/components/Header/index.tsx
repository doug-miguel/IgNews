import SingInButton from "../SingInButton";
import style from "./style.module.scss";

import Link from "next/link";

export default function Header() {
  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <img src="/imagens/logo.svg" alt="ig News" />
        <nav>
          <Link href="/">
            <a className={style.active}>Home</a>
          </Link>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </nav>
        <SingInButton />
      </div>
    </header>
  );
}

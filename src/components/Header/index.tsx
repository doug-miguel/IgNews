import SingInButton from "../SingInButton";

import style from "./style.module.scss";

import { ActiveLink } from "../ActiveLink";

export default function Header() {
  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <img src="/imagens/logo.svg" alt="ig News" />
        <nav>
          <ActiveLink activeClassName={style.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={style.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SingInButton />
      </div>
    </header>
  );
}

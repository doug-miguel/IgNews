import SingInButton from "../SingInButton";
import style from "./style.module.scss";

export default function Header() {
  return (
    <header className={style.headerContainer}>
      <div className={style.headerContent}>
        <img src="/imagens/logo.svg" alt="ig News" />
        <nav>
          <a className={style.active}>Home</a>
          <a>Post</a>
        </nav>
        <SingInButton />
      </div>
    </header>
  );
}

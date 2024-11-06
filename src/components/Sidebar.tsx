import styles from "../components/Sidebar.module.css";
import {PencilLine} from 'phosphor-react'
import { Avatar } from "./Avatar";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="src\assets\capa.jpg"
        alt=""
      />
      <div className={styles.profile}>
        <Avatar className={styles.avatar} src="src\assets\murillo.png"/>
        <strong>Murillo Drigo</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20}/>
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}

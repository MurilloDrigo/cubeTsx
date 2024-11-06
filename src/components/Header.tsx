import styles from './Header.module.css'

import cubeLogo from '../assets/cubeLogo.svg'

export function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={cubeLogo} alt="logo"/>
                <strong>Cube</strong>
            </div>
        </header>
    );
}
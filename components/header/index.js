import styles from './header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h1 className={styles.title}>POKÉDEX</h1>
      </nav>
    </header>
  );
};

export default Header;

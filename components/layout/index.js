import Head from 'next/head';

import Header from '../../components/header';
import Footer from '../../components/footer';

import styles from '../../styles/Home.module.css';

const Layout = props => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokédex</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <main>{props.children}</main>

      <Footer />
    </div>
  );
};

export default Layout;

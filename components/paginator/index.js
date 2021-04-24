import React from 'react';

import styles from './paginator.module.css';

const Paginator = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.paginator}>
      <ul className={styles.pagination + ' ' + styles.paginationResponsive}>
        {pageNumbers.map(number => (
          <li key={number}>
            <a onClick={() => paginate(number)} className={styles.pageLink}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginator;

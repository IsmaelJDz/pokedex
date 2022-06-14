import React, { useState, useEffect } from "react";
import Languages from "../components/languages/index";
import Card from "../components/ui/card";
import Layout from "../components/layout";
import InputSearch from "../components/ui/input";
import Pagination from "../components/paginator";

const Home = (props) => {
  const {
    pokemons: { results },
  } = props;

  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const pages = [];

  for (let i = 1; i <= Math.ceil(pokemonData.length / postsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pokemonData.slice(indexOfFirstPost, indexOfLastPost);

  const renderPageNumber = pages.map((page) => {
    if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handleClick}
          className={currentPage == page ? "active" : null}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  const handlePrevBtn = (e) => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextBtn = (e) => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevBtn2 = (e) => {
    setCurrentPage(currentPage - 5);

    if (
      (currentPage - 5) % pageNumberLimit === 0 ||
      currentPage - 5 < maxPageNumberLimit
    ) {
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextBtn2 = (e) => {
    setCurrentPage(currentPage + 5);

    if (currentPage + 5 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageIncrementalBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementalBtn = <li onClick={handleNextBtn2}> &hellip; </li>;
  }

  let pageDecrementalBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementalBtn = <li onClick={handlePrevBtn2}> &hellip; </li>;
  }

  useEffect(() => {
    setPokemonData(results);
    return () => {};
  }, []);

  const handleChange = (evt) => {
    if (evt.target.value.length > 3) {
      setSearch(evt.target.value);
    } else {
      setSearch("");
    }
  };

  const handleLoadMore = (e) => {
    setPostsPerPage(postsPerPage + 5);
  };

  const filteredPosts = pokemonData.filter((pokeName) => {
    // !== -1 is used if the value es true always otherwise it will be false
    // 0 true
    // -1 false
    return pokeName.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <Languages />
      <InputSearch handleChange={handleChange} />
      {search !== "" ? (
        <Card data={filteredPosts} paginate={paginate} />
      ) : (
        <Card data={currentPosts} paginate={paginate} />
      )}

      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevBtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementalBtn}
        {renderPageNumber}
        {pageIncrementalBtn}
        <li>
          <button
            onClick={handleNextBtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>

      <button className="loadmore" onClick={handleLoadMore}>
        Load More
      </button>

      {/* <Pagination
        postsPerPage={postsPerPage}
        totalPosts={pokemonData.length}
        paginate={paginate}
      /> */}
    </Layout>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      pokemons: data,
    },
    revalidate: 60,
  };
}

export default Home;

import React, { useState, useEffect } from 'react';
import Languages from '../components/languages/index';
import Card from '../components/ui/card';
import Layout from '../components/layout';
import InputSearch from '../components/ui/input';
import Pagination from '../components/paginator';

const Home = props => {
  const {
    pokemons: { results },
  } = props;

  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [postsPerPage] = useState(5);

  useEffect(() => {
    setPokemonData(results);
    return () => {};
  }, []);

  const handleChange = evt => {
    if (evt.target.value.length > 3) {
      setSearch(evt.target.value);
    } else {
      setSearch('');
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pokemonData.slice(indexOfFirstPost, indexOfLastPost);

  const filteredPosts = pokemonData.filter(pokeName => {
    return pokeName.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Layout>
      <Languages />
      <InputSearch handleChange={handleChange} />
      {search !== '' ? (
        <Card data={filteredPosts} paginate={paginate} />
      ) : (
        <Card data={currentPosts} paginate={paginate} />
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={pokemonData.length}
        paginate={paginate}
      />
    </Layout>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
  );
  const data = await res.json();

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
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

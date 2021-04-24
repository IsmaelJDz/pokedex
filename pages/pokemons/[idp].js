import React from 'react';
import { useRouter } from 'next/router';

import Loading from '../../components/loading';
import Layout from '../../components/layout';
import PokeDetails from '../../components/pokedetails';

import useSWE from 'swr';

export default function PokemonDetails(props) {
  const router = useRouter();
  const pokemonNo = router.query.idp;

  const { data, error } = useSWE(
    `https://pokeapi.co/api/v2/pokemon/${pokemonNo}/`
  );

  if (error) {
    <p>Failed to load</p>;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <Layout>
      <PokeDetails data={data} />
    </Layout>
  );
}

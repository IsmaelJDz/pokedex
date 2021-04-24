import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import App from '../../pages/index';

afterEach(cleanup);

const handleChange = jest.fn();

const props = {
  pokemons: {
    count: 1118,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=10&limit=10',
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
      { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
      { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
      { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
      { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
      { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
    ],
  },
};

describe('App', () => {
  it('renders without crashing and pokemons exist in the DOM', () => {
    render(<App {...props} />);
    expect(screen.getByText('POKÉDEX')).toBeInTheDocument();
    expect(screen.getByText('3 venusaur')).toBeInTheDocument();
    expect(screen.getByText('5 charmeleon')).toBeInTheDocument();
  });
});

describe('App', () => {
  it('should show only a pokemon searched', () => {
    const wrapper = render(<App {...props} />);

    const handleChange = screen.getByTestId('inputSearch');

    userEvent.type(handleChange, 'charm');

    expect(screen.getByText('5 charmeleon')).toBeInTheDocument();
    expect(screen.getByText('4 charmander')).toBeInTheDocument();
  });
});

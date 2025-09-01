import React from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from '../components/PokemonCard';

const Favorites = () => {
  const allPokemons = useSelector((state) => state.pokemon.pokemons);
  const favoriteIds = useSelector((state) => state.favorites.ids);

  const favoritePokemons = allPokemons.filter(pokemon => favoriteIds.includes(pokemon.id));

  if (favoritePokemons.length === 0) {
    return <div className="text-center p-10">찜한 포켓몬이 없습니다.</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">찜 목록 ({favoritePokemons.length}마리)</h2>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {favoritePokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </>
  );
};

export default Favorites;

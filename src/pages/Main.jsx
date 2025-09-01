import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../RTK/pokemonSlice';
import PokemonCard from '../components/PokemonCard';

const Main = () => {
  const dispatch = useDispatch();
  const { pokemons, status, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div className="text-center mt-10 text-xl font-bold">로딩 중...</div>;
  if (status === 'failed') return <div className="text-center mt-10 text-red-500 font-bold">에러 발생: {error}</div>;
  if (!pokemons || pokemons.length === 0) return <div className="text-center mt-10 text-gray-500">포켓몬 데이터가 없습니다.</div>;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
};

export default Main;
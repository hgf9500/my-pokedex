import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRegExp } from 'korean-regexp';
import PokemonCard from '../components/PokemonCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const allPokemons = useSelector((state) => state.pokemon.pokemons);

  const searchRegex = getRegExp(query, { initialSearch: true });

  const filteredPokemons = allPokemons.filter(pokemon => 
    searchRegex.test(pokemon.korean_name) || pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!query) return <div className="text-center p-10">검색어를 입력해주세요.</div>;
  if (filteredPokemons.length === 0) return <div className="text-center p-10">"{query}"에 대한 검색 결과가 없습니다.</div>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">"{query}" 검색 결과 ({filteredPokemons.length}마리)</h2>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </>
  );
};

export default Search;
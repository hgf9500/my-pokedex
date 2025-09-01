import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FlipCard from '../components/FlipCard';

const Detail = () => {
  const { pokemonId } = useParams();
  const { pokemons, status } = useSelector((state) => state.pokemon);
  
  const pokemon = pokemons.find((p) => p.id === parseInt(pokemonId));

  if (status === 'loading' || !pokemon) {
    return <div className="text-center p-10">포켓몬 정보를 불러오는 중...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200">
      <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">&larr; 목록으로 돌아가기</Link>
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-extrabold capitalize">{pokemon.korean_name} <span className="text-3xl text-gray-500">({pokemon.name})</span></h2>
        <p className="text-gray-500 text-xl my-2">도감번호: #{pokemon.id}</p>
        
        <FlipCard 
          frontImage={pokemon.sprites.front_default} 
          backImage={pokemon.sprites.back_default} 
        />

        <div className="w-full mt-6 text-lg">
          <h3 className="text-3xl font-bold mt-4 border-b-2 border-red-500 pb-2 mb-4">포켓몬 정보</h3>
          <div className="grid grid-cols-2 gap-4 my-2">
              <p><strong>키:</strong> {pokemon.height * 10} cm</p>
              <p><strong>몸무게:</strong> {pokemon.weight / 10} kg</p>
          </div>
          <div className="mt-4">
              <strong className="mr-2">타입:</strong>
              {pokemon.types.map((typeInfo) => (
                  <span key={typeInfo.type.name} className="ml-2 px-4 py-1 bg-gray-200 rounded-full font-semibold capitalize">
                      {typeInfo.type.name}
                  </span>
              ))}
          </div>
          <h3 className="text-3xl font-bold mt-8 border-b-2 border-red-500 pb-2 mb-4">도감 설명</h3>
          <p className="mt-2 leading-relaxed text-gray-800">{pokemon.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

const PokemonCard = ({ pokemon }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  // pokemon prop이 없을 경우 렌더링하지 않음 (안정성 강화)
  if (!pokemon) {
    return null;
  }

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="relative group">
      <div className="border rounded-lg shadow-lg p-4 bg-white flex flex-col items-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl cursor-pointer h-full">
        <FavoriteButton pokemonId={pokemon.id} />
        
        {isImageLoading && <div className="w-24 h-24 flex items-center justify-center text-sm text-gray-500">로딩 중...</div>}
        <img
          // 이제 pokemon.sprites.front_default를 정상적으로 읽을 수 있습니다.
          src={pokemon.sprites?.front_default}
          // alt와 이름 표시에 korean_name을 사용합니다.
          alt={pokemon.korean_name}
          className={`w-24 h-24 ${isImageLoading ? 'hidden' : 'block'}`}
          onLoad={() => setIsImageLoading(false)}
        />

        <div className="mt-2 text-center">
          <p className="font-bold text-sm">{pokemon.korean_name}</p>
          <p className="text-gray-500 text-xs">도감번호: {pokemon.id}</p>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(PokemonCard);
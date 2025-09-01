import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../RTK/favoriteSlice';

const FavoriteButton = ({ pokemonId }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.ids);
  const isFavorite = favoriteIds.includes(pokemonId);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지 (카드 클릭 방지)
    e.preventDefault();  // Link 태그의 기본 동작 방지
    
    if (isFavorite) {
      dispatch(removeFromFavorites(pokemonId));
    } else {
      dispatch(addToFavorites(pokemonId));
    }
  };

  return (
    <button
      onClick={handleFavoriteClick}
      className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white transition"
      aria-label="Toggle Favorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
        fill={isFavorite ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemons } from '../RTK/pokemonSlice';
import { Link } from 'react-router-dom';

const Main = () => {
  // Redux 스토어에서 상태 가져오기
  const dispatch = useDispatch();
  // state.pokemon의 'data'를 'pokemons'로, status, error 상태를 가져옵니다.
  // 이 부분은 useSelector((state) => state.pokemon)으로 일치시켜야 합니다.
  const { pokemons, status, error } = useSelector((state) => state.pokemon);

  // 컴포넌트 마운트 시, API 호출
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  }, [status, dispatch]);

  // 상태에 따른 조건부 렌더링
  if (status === 'loading') {
    return <div className="text-center mt-10 text-xl font-bold">로딩 중...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center mt-10 text-red-500 font-bold">에러 발생: {error}</div>;
  }
  
  // 데이터가 없을 때 메시지
  if (!pokemons || pokemons.length === 0) {
    return <div className="text-center mt-10 text-gray-500">포켓몬 데이터가 없습니다.</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-8">포켓몬 도감</h1>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {pokemons.map((pokemon) => (
          <Link to={`/detail/${pokemon.id}`} key={pokemon.id}>
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
              <img src={pokemon.image_front} alt={pokemon.name} className="w-32 h-32" />
              <p className="mt-2 font-semibold capitalize">{pokemon.id}. {pokemon.name}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Main;
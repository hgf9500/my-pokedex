import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams(); // URL에서 포켓몬 ID를 가져옵니다.
  const pokemons = useSelector((state) => state.pokemons.data);
  
  // ID에 해당하는 포켓몬을 찾습니다.
  const pokemon = pokemons.find((p) => p.id === parseInt(id));

  if (!pokemon) {
    return <div className="text-center mt-10">포켓몬 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 mt-10 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center capitalize mb-6">{pokemon.name} (No. {pokemon.id})</h1>
        
        <div className="flex justify-center gap-8 mb-6">
          <img src={pokemon.image_front} alt={`${pokemon.name} (앞면)`} className="w-48 h-48 bg-gray-100 rounded-full p-2" />
          <img src={pokemon.image_back} alt={`${pokemon.name} (뒷면)`} className="w-48 h-48 bg-gray-100 rounded-full p-2" />
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold mb-2">설명</h2>
          <p className="text-gray-700">{pokemon.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
            <div>
                <h3 className="font-bold text-lg">타입</h3>
                <div className="flex justify-center gap-2 mt-1">
                    {pokemon.types.map(type => (
                        <span key={type} className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm capitalize">{type}</span>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="font-bold text-lg">키 / 몸무게</h3>
                <p>{pokemon.height / 10} m / {pokemon.weight / 10} kg</p>
            </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/" className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
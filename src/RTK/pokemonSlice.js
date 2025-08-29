import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 포켓몬 데이터를 효율적으로 가져오는 Thunk
export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (_, { rejectWithValue }) => {
    try {
      // 1. 전체 포켓몬 목록(1~151번)을 한 번의 요청으로 가져옵니다.
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonsList = response.data.results;

      // 2. 각 포켓몬의 상세 정보와 한국어 이름 데이터를 가져오는 Promise 배열을 만듭니다.
      const detailedPromises = pokemonsList.map(async (pokemon) => {
        const detailResponse = await axios.get(pokemon.url);
        const speciesResponse = await axios.get(detailResponse.data.species.url);

        const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko')?.name || pokemon.name;
        const koreanFlavorText = speciesResponse.data.flavor_text_entries.find(
          entry => entry.language.name === 'ko'
        )?.flavor_text || '설명을 찾을 수 없습니다.';

        return {
          id: detailResponse.data.id,
          name: koreanName,
          image_front: detailResponse.data.sprites.front_default,
          description: koreanFlavorText,
        };
      });

      // 3. 모든 상세 정보 요청이 완료될 때까지 기다립니다.
      const pokemonsWithDetails = await Promise.all(detailedPromises);
      return pokemonsWithDetails;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice 생성
const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default pokemonSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      const pokemonsList = response.data.results;

      const detailedPromises = pokemonsList.map(async (pokemon) => {
        const detailResponse = await axios.get(pokemon.url);
        const speciesResponse = await axios.get(detailResponse.data.species.url);

        const koreanName = speciesResponse.data.names.find(name => name.language.name === 'ko')?.name || pokemon.name;
        const koreanFlavorText = speciesResponse.data.flavor_text_entries.find(
          entry => entry.language.name === 'ko'
        )?.flavor_text || '설명을 찾을 수 없습니다.';

        // 모든 컴포넌트에서 필요한 정보를 포함하는 '완전한' 객체를 반환합니다.
        return {
          id: detailResponse.data.id,
          name: detailResponse.data.name, // 영문 이름 (고유 식별용)
          korean_name: koreanName,        // 한글 이름 (표시용)
          sprites: detailResponse.data.sprites, // sprites 객체 전체를 전달
          description: koreanFlavorText,
          types: detailResponse.data.types,
          height: detailResponse.data.height,
          weight: detailResponse.data.weight,
          speciesUrl: detailResponse.data.species.url,
        };
      });

      const pokemonsWithDetails = await Promise.all(detailedPromises);
      return pokemonsWithDetails;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice 생성 부분은 기존과 동일합니다.
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
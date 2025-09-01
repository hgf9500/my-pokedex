import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [], // 찜한 포켓몬의 id를 저장할 배열
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      // payload로 받은 id를 ids 배열에 추가
      state.ids.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      // payload로 받은 id를 ids 배열에서 제거
      state.ids = state.ids.filter(id => id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
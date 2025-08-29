import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';

// Redux 스토어 설정
export const store = configureStore({
  reducer: {
    // state.pokemon 상태를 pokemonReducer로 설정
    pokemon: pokemonReducer,
  },
  // 직렬화 오류 경고를 무시하도록 미들웨어 설정 추가
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
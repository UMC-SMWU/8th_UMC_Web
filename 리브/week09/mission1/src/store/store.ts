import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';

// 1. 저장소 생성
function createStore() {
  const store = configureStore({
    // 2. 리듀서 설정
    reducer: {
        cart: cartReducer,
    },
  });

  return store;
}

// store를 활용할 수 있도록 내보내야 함.
// 여기서 실행해서 store를 뽑는다.
// 싱글톤 패턴
const store = createStore();

export default store;

 // Infer the 'RootState' and 'AppDispatch' types from the store itself
 export type RootState = ReturnType<typeof store.getState>;
 // Inferred type: {posts: PostState, comments: CommentsState, users: UsersState}
 export type AppDispatch = typeof store.dispatch;
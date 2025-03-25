import { configureStore } from '@reduxjs/toolkit'
import { authReducer} from './slicers/auth.slicer';
import { listReducer } from './slicers/lists.slicer';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { auth: authReducer, lists: listReducer },
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api-client';


export type List = {
    id: string; 
    name: string
}


interface ListsState {
  lists: List[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  take: number; 
  skip: number;
  total: number;
}

const initialState: ListsState = {
  lists: [],
  status: 'idle',
  error: null,
  take: 10,
  skip: 0,
  total: 0
};


export const fetchLists = createAsyncThunk(
  'fetchLists',
  async ({take, skip, token}: {take: number, skip: number, token: string}, thunkAPI) => {
    try {
      const response = await apiClient.get(`/list/all`, {
        params: {
          take,
          skip
        },
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Cannot fetch lists');
    }
  }
);


export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
        setTake: (state, action) => {
            state.take = action.payload
        }, 
        setSkip: (state, action) => {
            state.skip = action.payload
        }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLists.pending, (state) => {
        state.status = 'loading';
    }).addCase(fetchLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = action.payload.data;
        state.total = action.payload.total;
    }).addCase(fetchLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    });
      
  },
});

export const { setTake, setSkip } = listsSlice.actions;
export const listReducer = listsSlice.reducer;


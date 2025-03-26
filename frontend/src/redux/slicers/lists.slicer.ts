import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api-client';


export type List = {
    id: string; 
    name: string;
    createdAt: Date; 
    role: string;
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
  take: 5,
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
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
         }
      });
      console.log(response.data)
      return response.data;
    } catch (error: unknown) {
      if (error !instanceof Error)
        return thunkAPI.rejectWithValue('Cannot fetch lists');
    }
  }
);

export const addList = createAsyncThunk(
  'addList',
  async ({name, token}: {name: string, token: string}, thunkAPI) => {
    try {
      console.log(name, token)
      const response = await apiClient.post(`/list`, { name }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error: unknown) {
      if (error !instanceof Error)
        return thunkAPI.rejectWithValue('Cannot add new list');
    }
  }
);

export const deleteList = createAsyncThunk(
  'deleteList',
  async ({id, token}: {id: string, token: string}, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/list/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('Cannot delete lists');
    }
  }
);

export const updateList = createAsyncThunk(
  'updateList',
  async ({id, token, name}: {id: string, token: string, name: string}, thunkAPI) => {
    try {
      const response = await apiClient.put(`/list/${id}`,{ name }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Cannot update lists');
    }
  }
);

export const addUser = createAsyncThunk(
  'addUser',
  async ({email, id, token, role}: {email: string, id: string, token: string, role: string}, thunkAPI) => {
    try {
      console.log(name, token)
      const response = await apiClient.post(`/list/${id}/add-user`, { email, role }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error: unknown) {
      if (error !instanceof Error)
        return thunkAPI.rejectWithValue('Cannot add new user list');
    }
  }
);


export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
        clearListError : (state)=>{
          state.error = null;
        },
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
    }).addCase(addList.pending, (state) => {
      state.status = 'loading';
    }).addCase(addList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists.push(action.payload);
        state.total = state.total + 1;
    }).addCase(addList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    }).addCase(deleteList.pending, (state) => {
      state.status = 'loading';
    }).addCase(deleteList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = state.lists.filter(item => item.id !== action.payload.id);
        state.total = state.total - 1;
    }).addCase(deleteList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    }).addCase(updateList.pending, (state) => {
      state.status = 'loading';
    }).addCase(updateList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = state.lists.map(item => 
        {  
            if(item.id === action.payload.id){ 
              return action.payload;
            } else { 
              return item;
            }
        });
    }).addCase(updateList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    }).addCase(addUser.pending, (state) => {
      state.status = 'loading';
    }).addCase(addUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
  })
      
  },
});

export const { setTake, setSkip, clearListError } = listsSlice.actions;
export const listReducer = listsSlice.reducer;


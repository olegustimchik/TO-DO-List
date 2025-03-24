import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api-client';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

export const login = createAsyncThunk(
  'signin',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await apiClient.post(`/user/signin`, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data.accessToken;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Cannot login');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
		setToken: (state, action) => {
			state.token = action.payload
		}
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        console.log(action.payload)
        
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export const authReducer =  authSlice.reducer;

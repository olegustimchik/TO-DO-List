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

export const signUp = createAsyncThunk(
  'signup',
  async ({ email, password, name }: { email: string; password: string, name: string}, thunkAPI) => {
    try {
      const response = await apiClient.post(`/user/signup`, { email, password, name }, {
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
    clearAuthError : (state)=>{
      state.error = null;
    },
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
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      }).addCase(signUp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.token = action.payload;
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});


export const { setToken, clearAuthError } = authSlice.actions;
export const authReducer =  authSlice.reducer;

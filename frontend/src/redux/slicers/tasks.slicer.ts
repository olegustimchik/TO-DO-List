import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../api-client';
import { List } from './lists.slicer';


export type Task = {
    id: string; 
    name: string;
    createdAt: Date; 
    role: string;
    description: string;
    completed: boolean;
}


interface taskState {
  task: Task[];
  list: List | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  take: number; 
  skip: number;
  total: number;
}

const initialState: taskState = {
  task: [],
  list: null,
  status: 'idle',
  error: null,
  take: 6,
  skip: 0,
  total: 0
};


export const fetchTasks = createAsyncThunk(
  'fetchTasks',
  async ({take, skip, token, id}: {take: number, skip: number, token: string, id: string}, thunkAPI) => {
    try {
      const response = await apiClient.get(`/list/${id}/tasks`, {
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
        return thunkAPI.rejectWithValue('Cannot fetch tasks');
    }
  }
);

export const addTask= createAsyncThunk(
  'addTask',
  async ({name, description, listId,  token}: {name: string, token: string, description: string, listId: string}, thunkAPI) => {
    try {
      console.log(name, token)
      const response = await apiClient.post(`/list/${listId}/add-task`, { name, description, listId }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error: unknown) {
      if (error !instanceof Error)
        return thunkAPI.rejectWithValue('Cannot add new task');
    }
  }
);

export const deleteTask = createAsyncThunk(
  'deleteTask',
  async ({id, token}: {id: string, token: string}, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/tasks/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue('Cannot delete task');
    }
  }
);

export const updateTask= createAsyncThunk(
  'updateTask',
  async ({id, token, name, description, completed}: {id: string, token: string, name: string, description: string, completed: boolean}, thunkAPI) => {
    try {
      const response = await apiClient.put(`/tasks/${id}`,{ name,description, completed }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' 
        }
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Cannot update task');
    }
  }
);

export const changeStatusTask= createAsyncThunk(
    'changeStatusOfTask',
    async ({id, token, completed}: {id: string, token: string, name: string, description: string, completed: boolean}, thunkAPI) => {
      try {
        const response = await apiClient.put(`/tasks/${id}`,{ completed }, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          }
        });
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue('Cannot update task');
      }
    }
  );

  export const getList = createAsyncThunk(
    'getList',
    async ({id, token }: {id: string, token: string }, thunkAPI) => {
      try {
        const response = await apiClient.get(`/list/${id}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          }
        });
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue('Cannot update task');
      }
    }
  );


export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
        clearTaskError : (state)=>{
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
    builder.addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
    }).addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = action.payload.data;
        state.total = action.payload.total;
    }).addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    }).addCase(addTask.pending, (state) => {
      state.status = 'loading';
    }).addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task.push(action.payload);
        state.total = state.total + 1;
    }).addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    }).addCase(deleteTask.pending, (state) => {
      state.status = 'loading';
    }).addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = state.task.filter(item => item.id !== action.payload.id);
        state.total = state.total - 1;
    }).addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    }).addCase(updateTask.pending, (state) => {
      state.status = 'loading';
    }).addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.task = state.task.map(item => 
        {  
            if(item.id === action.payload.id){ 
              return action.payload;
            } else { 
              return item;
            }
        });
    }).addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    }).addCase(changeStatusTask.pending, (state) => {
        state.status = 'loading';
    }).addCase(changeStatusTask.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.task = state.task.map(item => 
          {  
              if(item.id === action.payload.id){ 
                return action.payload;
              } else { 
                return item;
              }
          });
    }).addCase(changeStatusTask.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
    }).addCase(getList.pending, (state) => {
        state.status = 'loading';
    }).addCase(getList.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.list = action.payload;
    }).addCase(getList.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
    });     
  },
});

export const { setTake, setSkip, clearTaskError } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;


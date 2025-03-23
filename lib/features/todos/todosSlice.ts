import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodosState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: 'all' | 'active' | 'completed';
  sortBy: 'default' | 'alphabetical-asc' | 'alphabetical-desc' | 'date-asc' | 'date-desc';
}

const initialState: TodosState = {
  items: [],
  status: 'idle',
  error: null,
  filter: 'all',
  sortBy: 'default',
};

// Async thunk for fetching initial todos
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/todos.json');
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    return data.todos;
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: new Date()
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'default' | 'alphabetical-asc' | 'alphabetical-desc' | 'date-asc' | 'date-desc'>) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add fetched todos to the state
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { addTodo, toggleTodo, removeTodo, setFilter, setSortBy } = todosSlice.actions;

export const selectTodosStatus = (state: RootState) => state.todos.status;
export const selectTodosError = (state: RootState) => state.todos.error;
export const selectFilter = (state: RootState) => state.todos.filter;
export const selectSortBy = (state: RootState) => state.todos.sortBy;

export const selectTodos = (state: RootState) => {
  const allTodos = state.todos.items;
  const filter = state.todos.filter;
  const sortBy = state.todos.sortBy;
  
  // Filtreleme
  let filteredTodos = allTodos;
  if (filter === 'active') {
    filteredTodos = allTodos.filter(todo => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = allTodos.filter(todo => todo.completed);
  }
  
  // Sıralama
  const sortedTodos = [...filteredTodos];
  if (sortBy === 'alphabetical-asc') {
    sortedTodos.sort((a, b) => a.text.localeCompare(b.text, "tr"));
  } else if (sortBy === 'alphabetical-desc') {
    sortedTodos.sort((a, b) => b.text.localeCompare(a.text, "tr"));
  } else if (sortBy === 'date-desc') {
    sortedTodos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === 'date-asc') {
    sortedTodos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }
  
  return sortedTodos;
};

export default todosSlice.reducer;
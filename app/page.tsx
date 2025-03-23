'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  addTodo, 
  toggleTodo, 
  removeTodo, 
  selectTodos, 
  selectTodosStatus, 
  selectTodosError, 
  fetchTodos 
} from '@/lib/features/todos/todosSlice';
import { AppDispatch, RootState } from '@/lib/store';

export default function Home() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => selectTodos(state));
  const todosStatus = useSelector((state: RootState) => selectTodosStatus(state));
  const todosError = useSelector((state: RootState) => selectTodosError(state));
  
  // Initial data fetch when component mounts
  useEffect(() => {
    if (todosStatus === 'idle') {
      dispatch(fetchTodos());
    }
  }, [todosStatus, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Todo Uygulaması</h1>
        

        
        {todosStatus === 'failed' && (
          <div className="text-center py-4 text-red-500">Hata: {todosError}</div>
        )}
        
        <form onSubmit={handleSubmit} className="flex mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-l outline-none"
            placeholder="Yeni görev ekle..."
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Ekle
          </button>
        </form>
        
        <ul className="w-full">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="mr-3 h-5 w-5"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                  {todo.text}
                </span>
              </div>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-red-500 hover:text-red-700"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
        
        {todosStatus === 'loading' && (
          <div className="text-center py-4">Görevler yükleniyor...</div>
        )}

        {todosStatus === 'succeeded' && todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">Henüz görev eklenmedi</p>
        )}
      </div>
    </main>
  );
}
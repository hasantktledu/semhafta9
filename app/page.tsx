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
  selectFilter,
  selectSortBy,
  setFilter,
  setSortBy,
  fetchTodos 
} from '@/lib/features/todos/todosSlice';
import { AppDispatch, RootState } from '@/lib/store';

export default function Home() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => selectTodos(state));
  const todosStatus = useSelector((state: RootState) => selectTodosStatus(state));
  const todosError = useSelector((state: RootState) => selectTodosError(state));
  const currentFilter = useSelector((state: RootState) => selectFilter(state));
  const currentSortBy = useSelector((state: RootState) => selectSortBy(state));
  
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
        
        {todosStatus === 'loading' && (
          <div className="text-center py-4">Görevler yükleniyor...</div>
        )}
        
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
        
        <div className="flex justify-between mb-4">
          {/* Filtreleme seçenekleri */}
          <div className="flex space-x-2">
            <span className="text-gray-700 font-medium">Filtrele:</span>
            <button
              onClick={() => dispatch(setFilter('all'))}
              className={`px-2 py-1 text-sm rounded ${
                currentFilter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => dispatch(setFilter('active'))}
              className={`px-2 py-1 text-sm rounded ${
                currentFilter === 'active' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => dispatch(setFilter('completed'))}
              className={`px-2 py-1 text-sm rounded ${
                currentFilter === 'completed' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Tamamlanan
            </button>
          </div>
          
          {/* Sıralama seçenekleri */}
          <div className="flex items-center">
            <span className="text-gray-700 font-medium mr-2">Sırala:</span>
            <select
              value={currentSortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value as 'default' | 'alphabetical-asc' | 'alphabetical-desc' | 'date-asc' | 'date-desc'))}
              className="p-1 border border-gray-300 rounded text-sm"
            >
              <option value="default">Varsayılan</option>
              <option value="alphabetical-asc">Alfabetik (A-Z)</option>
              <option value="alphabetical-desc">Alfabetik (Z-A)</option>
              <option value="date-desc">Tarih (Yeni-Eski)</option>
              <option value="date-asc">Tarih (Eski-Yeni)</option>
            </select>
          </div>
        </div>
        
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
        
        {todosStatus === "succeeded" && todos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            {currentFilter === 'all' 
              ? 'Henüz görev eklenmedi' 
              : currentFilter === 'active' 
                ? 'Aktif görev yok' 
                : 'Tamamlanan görev yok'}
          </p>
        )}
        
        {/* İstatistikler */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Toplam: {useSelector((state: RootState) => state.todos.items.length)} görev
            </span>
            <span>
              Tamamlanan: {useSelector((state: RootState) => 
                state.todos.items.filter(todo => todo.completed).length
              )} görev
            </span>
            <span>
              Kalan: {useSelector((state: RootState) => 
                state.todos.items.filter(todo => !todo.completed).length
              )} görev
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
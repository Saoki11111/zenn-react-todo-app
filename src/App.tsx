import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoSummary } from './components/TodoSummary';

import { dummyTodoList } from './data/dummyTodoList';

function App() {
  const [todoList, setTodoList] = useState(dummyTodoList);

  // 対象の Todo の完了を変更
  const changeCompleted = (id: number) => {
    // 変更前の Todo リストが引数として呼び出せる
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        // 対象の id なら、 completed を変更
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        // それ以外の todo なら、そのまま返す
        return todo;
      });
    });
  };

  // Todo を追加
  const addTodo = (title: string) => {
    setTodoList((prevTodoList) => {
      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
      };

      // 変更前の Todo リストと合わせる
      return [newTodo, ...prevTodoList];
    });
  };

  // 対象の Todo を削除
  const deleteTodo = (id: number) => {
    setTodoList((prevTodoList) => {
      // 対象の id でない Todo を残す
      return prevTodoList.filter((todo) => {
        return todo.id !== id;
      });
    });
  };

  // 完了した Todo すべて削除
  const deleteAllCompleted = () => {
    setTodoList((prevTodoList) => {
      // 完了してない Todo を残す
      return prevTodoList.filter((todo) => {
        return !todo.completed;
      });
    });
  };

  return (
    <main className="mx-auto mt-10 max-w-xl space-y-10">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="space-y-5">
        <AddTodoForm addTodo={addTodo}/>
        <div className="space-y-5 rounded bg-slate-200 p-5">
          <TodoList
            todoList={todoList}
            changeCompleted={changeCompleted}
            deleteTodo={deleteTodo}
          />
          <TodoSummary deleteAllCompleted={deleteAllCompleted} />
        </div>
      </div>
    </main>
  );
}

export default App;

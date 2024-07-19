import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';

export const useTodolist = () => {

  const [todoList, setTodoList] = useState<Todo[]>(() => {
    // ローカルストレージから Todo を取得
    const localStorageTodoList = localStorage.getItem('todoList');

    // 配列に変換
    return JSON.parse(localStorageTodoList ?? '[]');
  });

  // 第2 引数の todoList の値が変更されると発火
  useEffect(() => {
    // ローカルストレージに保存
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

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

  return {
    todoList,
    changeCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompleted,
  };
};


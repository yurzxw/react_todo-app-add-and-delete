import React, { useState } from 'react';
import * as todosService from '../api/todos';
import { Todo } from '../types/Todo';

type Props = {
  onError: (error: string) => void;
  onTodos: (todos: Todo[]) => void;
  onQuery: (query: string) => void;
  query: string;
  onLoading: (isLoading: boolean) => void;
};
export const Header: React.FC<Props> = ({
  onError,
  onTodos,
  onQuery,
  query,
  onLoading,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTempTodo, setTempTodo] = useState<Todo | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() === '') {
      onError('Title should not be empty');

      return;
    }

    onLoading(true);

    const tempTodo = {
      id: 0,
      title: query,
      userId: todosService.USER_ID,
      completed: false,
    };

    setTempTodo(tempTodo);

    try {
      const createdTodo = await todosService.postTodo(tempTodo);

      onTodos((currentTodos: Todo[]) => [...currentTodos, createdTodo]);
      onQuery('');
    } catch {
      onError('Unable to add a todo');
    } finally {
      setTempTodo(null);
      onLoading(false);
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => onQuery(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};

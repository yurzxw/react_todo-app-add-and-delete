import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import { useState } from 'react';
type Props = {
  onToggle: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  loading: boolean;
  filtered: Todo[];
};

export const TodoList: React.FC<Props> = ({
  onToggle,
  onDeleteTodo,
  loading,
  filtered,
}) => {
  const [selected, setSelectedTodo] = useState<number | null>(0);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filtered.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDeleteTodo={onDeleteTodo}
          loading={loading}
          selected={selected}
          setSelectedTodo={setSelectedTodo}
        />
      ))}
    </section>
  );
};

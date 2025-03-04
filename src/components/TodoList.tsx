import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type Props = {
  onToggle: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  loading: boolean;
  filtered: Todo[];
  ID: number;
};

export const TodoList: React.FC<Props> = ({
  onToggle,
  onDeleteTodo,
  loading,
  filtered,
  ID,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filtered.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDeleteTodo={onDeleteTodo}
          loading={loading}
          ID={ID}
        />
      ))}
    </section>
  );
};

import { Todo } from '../types/Todo';
import classNames from 'classnames';
type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  loading: boolean;
  ID: number;
};
export const TodoItem: React.FC<Props> = ({
  todo,
  onToggle,
  onDeleteTodo,
  loading,
  ID,
}) => {
  const { title, completed, id } = todo;

  return (
    <div
      data-cy="Todo"
      key={todo.id}
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label">
        <input
          id={id}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <span className="hidden" style={{ display: 'none' }}>
          *
        </span>
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => {
          onDeleteTodo(id);
        }}
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal', 'overlay', {
          'is-active': loading && ID === id,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

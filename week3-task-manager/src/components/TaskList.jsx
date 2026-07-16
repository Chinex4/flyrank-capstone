import TaskItem from './TaskItem.jsx'

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="empty-state" role="status">
        No study tasks yet. Add your first task above.
      </p>
    )
  }

  return (
    <ul
      id="task-list-region"
      className="task-list"
      aria-label="Study tasks"
      aria-live="polite"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

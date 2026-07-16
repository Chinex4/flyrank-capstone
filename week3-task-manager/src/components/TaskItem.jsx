const PRIORITY_CLASSES = {
  Low: 'priority-low',
  Medium: 'priority-medium',
  High: 'priority-high',
}

function priorityClass(priority) {
  const levelClass = PRIORITY_CLASSES[priority] ?? 'priority-medium'
  return `priority-badge ${levelClass}`
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const statusLabel = task.completed ? 'Completed' : 'Pending'

  return (
    <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
      <div className="task-item__main">
        <h3 className="task-item__title">{task.title}</h3>
        <div className="task-item__meta">
          <span className={priorityClass(task.priority)}>{task.priority}</span>
          <span
            className={`status-badge${task.completed ? ' is-completed' : ''}`}
            aria-label={`Status: ${statusLabel}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="task-item__actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onToggle(task.id)}
          aria-label={
            task.completed
              ? `Mark "${task.title}" as pending`
              : `Mark "${task.title}" as completed`
          }
        >
          {task.completed ? 'Mark pending' : 'Mark completed'}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete "${task.title}"`}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

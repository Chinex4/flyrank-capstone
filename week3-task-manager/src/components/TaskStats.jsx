export default function TaskStats({ totalCount, pendingCount, completedCount }) {
  return (
    <dl className="task-stats" aria-label="Task counts">
      <div className="stat">
        <dt>Total</dt>
        <dd>{totalCount}</dd>
      </div>
      <div className="stat">
        <dt>Pending</dt>
        <dd>{pendingCount}</dd>
      </div>
      <div className="stat">
        <dt>Completed</dt>
        <dd>{completedCount}</dd>
      </div>
    </dl>
  )
}

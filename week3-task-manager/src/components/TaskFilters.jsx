const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
]

export default function TaskFilters({ activeFilter, onFilterChange }) {
  return (
    <div
      className="task-filters"
      role="group"
      aria-label="Filter tasks by status"
    >
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={`btn btn-filter${activeFilter === value ? ' is-active' : ''}`}
          aria-pressed={activeFilter === value}
          aria-controls="task-list-region"
          onClick={() => onFilterChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

import { useMemo, useState } from 'react'
import TaskFilters from './components/TaskFilters.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import TaskStats from './components/TaskStats.jsx'
import { useTasks } from './hooks/useTasks.js'
import './App.css'

export default function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    totalCount,
    completedCount,
    pendingCount,
  } = useTasks()

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'pending') {
      return tasks.filter((task) => !task.completed)
    }
    if (activeFilter === 'completed') {
      return tasks.filter((task) => task.completed)
    }
    return tasks
  }, [tasks, activeFilter])

  const showFilteredEmptyState =
    tasks.length > 0 && filteredTasks.length === 0

  return (
    <main className="app">
      <header className="app-header">
        <h1>Study Task Manager</h1>
        <p className="app-subtitle">
          Organize your study activities and keep track of your progress.
        </p>
      </header>

      <section className="panel" aria-labelledby="add-task-heading">
        <h2 id="add-task-heading">Add a task</h2>
        <TaskForm onAddTask={addTask} />
      </section>

      <section className="panel" aria-labelledby="tasks-heading">
        <div className="panel-header">
          <h2 id="tasks-heading">Your tasks</h2>
          <TaskFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <TaskStats
          totalCount={totalCount}
          pendingCount={pendingCount}
          completedCount={completedCount}
        />

        {showFilteredEmptyState ? (
          <p
            id="task-list-region"
            className="empty-state"
            role="status"
            aria-live="polite"
          >
            No {activeFilter} tasks. Try a different filter or add a new task.
          </p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
      </section>
    </main>
  )
}

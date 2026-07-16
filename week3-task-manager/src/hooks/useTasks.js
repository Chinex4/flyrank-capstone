import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'study-task-manager-tasks'
const VALID_PRIORITIES = ['Low', 'Medium', 'High']

function createTaskId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function normalizeTask(task) {
  if (!task || typeof task !== 'object') {
    return null
  }

  const title = typeof task.title === 'string' ? task.title.trim() : ''
  if (!title) {
    return null
  }

  return {
    id: typeof task.id === 'string' && task.id ? task.id : createTaskId(),
    title,
    priority: VALID_PRIORITIES.includes(task.priority) ? task.priority : 'Medium',
    completed: Boolean(task.completed),
  }
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return { tasks: [], parseFailed: false }
    }

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) {
      return { tasks: [], parseFailed: false }
    }

    return {
      tasks: parsed.map(normalizeTask).filter(Boolean),
      parseFailed: false,
    }
  } catch {
    return { tasks: [], parseFailed: true }
  }
}

export function useTasks() {
  const skipInitialSave = useRef(false)
  const [tasks, setTasks] = useState(() => {
    const { tasks: loadedTasks, parseFailed } = loadTasks()
    skipInitialSave.current = parseFailed
    return loadedTasks
  })

  useEffect(() => {
    if (skipInitialSave.current) {
      skipInitialSave.current = false
      return
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // Storage may be unavailable or full (private browsing, quota exceeded).
    }
  }, [tasks])

  function addTask(title, priority) {
    const trimmedTitle = typeof title === 'string' ? title.trim() : ''
    if (!trimmedTitle) {
      return
    }

    const newTask = {
      id: createTaskId(),
      title: trimmedTitle,
      priority: VALID_PRIORITIES.includes(priority) ? priority : 'Medium',
      completed: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const totalCount = tasks.length
  const completedCount = tasks.filter((task) => task.completed).length
  const pendingCount = tasks.filter((task) => !task.completed).length

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    totalCount,
    completedCount,
    pendingCount,
  }
}

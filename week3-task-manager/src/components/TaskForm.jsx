import { useRef, useState } from 'react'

const PRIORITIES = ['Low', 'Medium', 'High']

export default function TaskForm({ onAddTask }) {
  const titleInputRef = useRef(null)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [titleError, setTitleError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setTitleError('Please enter a task title before adding.')
      titleInputRef.current?.focus()
      return
    }

    onAddTask(trimmedTitle, priority)
    setTitle('')
    setPriority('Medium')
    setTitleError('')
  }

  function handleTitleChange(event) {
    setTitle(event.target.value)
    if (titleError) {
      setTitleError('')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="task-title">Task title</label>
        <input
          ref={titleInputRef}
          id="task-title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          aria-describedby={titleError ? 'task-title-error' : undefined}
          aria-invalid={titleError ? 'true' : 'false'}
          autoComplete="off"
          placeholder="e.g. Review chapter 5 notes"
        />
        {titleError && (
          <p id="task-title-error" className="field-error" role="alert">
            {titleError}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          {PRIORITIES.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Add task
      </button>
    </form>
  )
}

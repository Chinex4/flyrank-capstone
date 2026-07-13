import { useRef, useState } from 'react'
import { validatePhone } from '../utils/phoneValidation'
import './NotificationSettings.css'

const FREQUENCY_OPTIONS = [
  { value: 'immediately', label: 'Immediately' },
  { value: 'daily', label: 'Daily digest' },
  { value: 'weekly', label: 'Weekly digest' },
]

export default function NotificationSettings() {
  const phoneRef = useRef(null)
  const [emailUpdates, setEmailUpdates] = useState(false)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [frequency, setFrequency] = useState('immediately')
  const [phoneError, setPhoneError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(false)

    if (smsAlerts) {
      const error = validatePhone(phoneNumber)
      if (error) {
        setPhoneError(error)
        phoneRef.current?.focus()
        return
      }
    }

    setPhoneError('')
    setSubmitted(true)
  }

  function handleSmsChange(event) {
    const enabled = event.target.checked
    setSmsAlerts(enabled)
    if (!enabled) {
      setPhoneError('')
    }
  }

  const phoneErrorId = 'phone-error'

  return (
    <section className="notification-settings">
      <h1>Notification settings</h1>

      <form className="notification-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="email-updates">
            <input
              id="email-updates"
              name="emailUpdates"
              type="checkbox"
              checked={emailUpdates}
              onChange={(event) => setEmailUpdates(event.target.checked)}
            />
            Email updates
          </label>
        </div>

        <div className="form-field">
          <label htmlFor="sms-alerts">
            <input
              id="sms-alerts"
              name="smsAlerts"
              type="checkbox"
              checked={smsAlerts}
              onChange={handleSmsChange}
            />
            SMS alerts
          </label>
        </div>

        {smsAlerts && (
          <div className="form-field">
            <label htmlFor="phone-number">Phone number</label>
            <input
              ref={phoneRef}
              id="phone-number"
              name="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value)
                if (phoneError) {
                  setPhoneError('')
                }
              }}
              aria-invalid={phoneError ? 'true' : undefined}
              aria-describedby={phoneError ? phoneErrorId : undefined}
              autoComplete="tel"
            />
            {phoneError && (
              <p id={phoneErrorId} className="field-error" role="alert">
                {phoneError}
              </p>
            )}
          </div>
        )}

        <div className="form-field">
          <label htmlFor="notification-frequency">Notification frequency</label>
          <select
            id="notification-frequency"
            name="frequency"
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
          >
            {FREQUENCY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Save settings
        </button>
      </form>

      {submitted && (
        <p className="success-message" role="status" aria-live="polite">
          Your notification settings have been saved.
        </p>
      )}
    </section>
  )
}

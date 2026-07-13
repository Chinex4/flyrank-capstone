import { useState } from 'react'
import './NotificationSettings.css'

const DEFAULT_SETTINGS = {
  email: true,
  push: false,
  sms: false,
  marketing: false,
  productUpdates: true,
  securityAlerts: true,
  weeklyDigest: true,
  frequency: 'instant',
}

function NotificationSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [savedSettings, setSavedSettings] = useState(DEFAULT_SETTINGS)
  const [status, setStatus] = useState(null)

  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings)

  function updateSetting(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setStatus(null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSavedSettings(settings)
    setStatus('success')
  }

  function handleReset() {
    setSettings(DEFAULT_SETTINGS)
    setSavedSettings(DEFAULT_SETTINGS)
    setStatus('reset')
  }

  return (
    <div className="notification-settings">
      <header className="notification-settings__header">
        <h1>Notification Settings</h1>
        <p>Choose how and when FlyRank keeps you in the loop.</p>
      </header>

      <form className="notification-settings__form" onSubmit={handleSubmit}>
        <fieldset className="settings-section">
          <legend>Delivery channels</legend>
          <p className="settings-section__description">
            Select where you want to receive notifications.
          </p>

          <label className="toggle-row">
            <span className="toggle-row__text">
              <span className="toggle-row__label">Email</span>
              <span className="toggle-row__hint">
                Alerts sent to your registered email address
              </span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={settings.email}
              onChange={(e) => updateSetting('email', e.target.checked)}
            />
          </label>

          <label className="toggle-row">
            <span className="toggle-row__text">
              <span className="toggle-row__label">Push notifications</span>
              <span className="toggle-row__hint">
                Browser and mobile push alerts
              </span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={settings.push}
              onChange={(e) => updateSetting('push', e.target.checked)}
            />
          </label>

          <label className="toggle-row">
            <span className="toggle-row__text">
              <span className="toggle-row__label">SMS</span>
              <span className="toggle-row__hint">
                Text messages for urgent updates only
              </span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={settings.sms}
              onChange={(e) => updateSetting('sms', e.target.checked)}
            />
          </label>
        </fieldset>

        <fieldset className="settings-section">
          <legend>Notification types</legend>
          <p className="settings-section__description">
            Control which topics trigger a notification.
          </p>

          <label className="toggle-row">
            <span className="toggle-row__text">
              <span className="toggle-row__label">Security alerts</span>
              <span className="toggle-row__hint">
                Login attempts, password changes, and account activity
              </span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={settings.securityAlerts}
              onChange={(e) =>
                updateSetting('securityAlerts', e.target.checked)
              }
            />
          </label>

          <label className="toggle-row">
            <span className="toggle-row__text">
              <span className="toggle-row__label">Product updates</span>
              <span className="toggle-row__hint">
                New features, improvements, and release notes
              </span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={settings.productUpdates}
              onChange={(e) =>
                updateSetting('productUpdates', e.target.checked)
              }
            />
          </label>

          <label className="toggle-row">
            <span className="toggle-row__text">
              <span className="toggle-row__label">Marketing</span>
              <span className="toggle-row__hint">
                Promotions, tips, and community highlights
              </span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={settings.marketing}
              onChange={(e) => updateSetting('marketing', e.target.checked)}
            />
          </label>

          <label className="toggle-row">
            <span className="toggle-row__text">
              <span className="toggle-row__label">Weekly digest</span>
              <span className="toggle-row__hint">
                A summary of your activity delivered every Monday
              </span>
            </span>
            <input
              type="checkbox"
              role="switch"
              checked={settings.weeklyDigest}
              onChange={(e) =>
                updateSetting('weeklyDigest', e.target.checked)
              }
            />
          </label>
        </fieldset>

        <fieldset className="settings-section">
          <legend>Email frequency</legend>
          <p className="settings-section__description">
            How often non-urgent email notifications are grouped and sent.
          </p>

          <label className="select-row" htmlFor="frequency">
            <span className="select-row__label">Delivery schedule</span>
            <select
              id="frequency"
              value={settings.frequency}
              onChange={(e) => updateSetting('frequency', e.target.value)}
              disabled={!settings.email}
            >
              <option value="instant">Instant — as they happen</option>
              <option value="hourly">Hourly digest</option>
              <option value="daily">Daily digest</option>
              <option value="weekly">Weekly digest</option>
            </select>
          </label>
        </fieldset>

        <div className="notification-settings__actions">
          <button
            type="submit"
            className="btn btn--primary"
            disabled={!isDirty}
          >
            Save changes
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleReset}
          >
            Reset to defaults
          </button>
        </div>

        {status === 'success' && (
          <p className="notification-settings__status" role="status">
            Your notification preferences have been saved.
          </p>
        )}
        {status === 'reset' && (
          <p className="notification-settings__status" role="status">
            Settings restored to defaults.
          </p>
        )}
      </form>
    </div>
  )
}

export default NotificationSettings

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import NotificationSettings from './NotificationSettings.jsx'

describe('NotificationSettings', () => {
  it('hides the phone field initially', () => {
    render(<NotificationSettings />)

    expect(screen.queryByLabelText(/phone number/i)).not.toBeInTheDocument()
  })

  it('shows the phone field when SMS alerts are enabled', async () => {
    const user = userEvent.setup()
    render(<NotificationSettings />)

    await user.click(screen.getByLabelText(/sms alerts/i))

    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
  })

  it('prevents submission with an invalid phone number', async () => {
    const user = userEvent.setup()
    render(<NotificationSettings />)

    await user.click(screen.getByLabelText(/sms alerts/i))
    await user.type(screen.getByLabelText(/phone number/i), '123')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      /phone number must be 10 to 15 digits/i,
    )
    expect(
      screen.queryByRole('status', {
        name: /your notification settings have been saved/i,
      }),
    ).not.toBeInTheDocument()
  })

  it('shows a confirmation message after a valid submission', async () => {
    const user = userEvent.setup()
    render(<NotificationSettings />)

    await user.click(screen.getByLabelText(/email updates/i))
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(
      screen.getByText(/your notification settings have been saved/i),
    ).toBeInTheDocument()
  })

  it('does not require the phone field when SMS alerts are disabled', async () => {
    const user = userEvent.setup()
    render(<NotificationSettings />)

    await user.click(screen.getByLabelText(/sms alerts/i))
    await user.type(screen.getByLabelText(/phone number/i), '123')
    await user.click(screen.getByLabelText(/sms alerts/i))
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(
      screen.getByText(/your notification settings have been saved/i),
    ).toBeInTheDocument()
  })
})

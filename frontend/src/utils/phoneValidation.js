export function normalizePhone(value) {
  return value.replace(/[\s\-()]/g, '').replace(/^\+/, '')
}

export function validatePhone(phone) {
  const digits = normalizePhone(phone)

  if (!digits) {
    return 'Phone number is required.'
  }

  if (!/^\d+$/.test(digits)) {
    return 'Phone number must contain only digits.'
  }

  if (digits.length < 10 || digits.length > 15) {
    return 'Phone number must be 10 to 15 digits.'
  }

  return ''
}

async function apiFetch(path, options = {}) {
  const res = await fetch(path, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong')
  }
  return data
}

export function signup(payload) {
  return apiFetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export function login(payload) {
  return apiFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export function getUser(username) {
  return apiFetch(`/api/users/${encodeURIComponent(username)}`)
}
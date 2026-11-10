export type MockAuthState = {
  loggedIn: boolean
}

export type LoginCredentials = {
  email: string
  password: string
}

export type SignupData = {
  fullName: string
  campusId: string
  classYear: string
  email: string
  password: string
}

/**
 * In-memory authentication state.
 * Initially false so logged-out users are redirected to /login.
 */
export const mockAuthState: MockAuthState = {
  loggedIn: false,
}

export function getMockAuthState(): MockAuthState {
  return mockAuthState
}

export function setMockAuthState(loggedIn: boolean): void {
  mockAuthState.loggedIn = loggedIn
}

/**
 * Mock login function simulating API call.
 */
export async function mockLogin(credentials: LoginCredentials): Promise<{ success: boolean }> {
  // =========================================================================
  // TODO: Replace with real authentication API call
  // Example:
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(credentials),
  // })
  // if (!response.ok) {
  //   const error = await response.json()
  //   throw new Error(error.message || 'Login failed')
  // }
  // const data = await response.json()
  // =========================================================================

  // In-memory simulation with brief delay for UI feedback
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Basic in-memory verification
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required')
  }

  setMockAuthState(true)
  return { success: true }
}

/**
 * Mock signup function simulating API call.
 */
export async function mockSignup(data: SignupData): Promise<{ success: boolean }> {
  // =========================================================================
  // TODO: Replace with real user registration API call
  // Example:
  // const response = await fetch('/api/auth/signup', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // })
  // if (!response.ok) {
  //   const error = await response.json()
  //   throw new Error(error.message || 'Signup failed')
  // }
  // const result = await response.json()
  // =========================================================================

  // In-memory simulation with brief delay for UI feedback
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (!data.email || !data.password || !data.fullName) {
    throw new Error('All required fields must be filled')
  }

  setMockAuthState(true)
  return { success: true }
}

/**
 * Mock logout function.
 */
export function mockLogout(): void {
  // =========================================================================
  // TODO: Invalidate session on server (e.g. POST /api/auth/logout)
  // =========================================================================
  setMockAuthState(false)
}

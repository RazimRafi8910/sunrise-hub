import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthLayout } from '../../components/AuthLayout'
import { PasswordField } from '../../components/PasswordField'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TextField } from '../../components/TextField'
import { useLogin } from '../../hooks/useAuth'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useLogin();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [loading, setLoading] = useState(false)
  const [showForgotNotice, setShowForgotNotice] = useState(false)

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {}

    if (!email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      nextErrors.password = 'Password is required'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    login.mutate(
      { email, password },
      { onSuccess:()=> {
        navigate('/', {
          replace: true
        })
      },}
    )
    setLoading(true)
    setErrors({})

    try {

      navigate('/')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setErrors({ general: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      subtitle="Sign in to continue"
      cardTitle="Welcome back"
      bottomText="Don't have an account?"
      bottomLinkText="Sign up"
      bottomLinkTo="/signup"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {errors.general && (
          <div
            role="alert"
            className="rounded-[16px] bg-bg p-3 text-[13px] font-semibold text-danger"
          >
            {errors.general}
          </div>
        )}

        <TextField
          id="login-email"
          label="College email"
          icon="mail"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@college.edu"
          value={email}
          error={errors.email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
          }}
        />

        <div className="flex flex-col gap-1.5">
          <PasswordField
            id="login-password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            error={errors.password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
            }}
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForgotNotice((prev) => !prev)}
              className="text-[13px] font-semibold text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {showForgotNotice && (
          <div
            role="status"
            className="rounded-[16px] bg-bg p-3 text-[12px] font-medium text-muted"
          >
            Password reset instructions will be sent to your college email address. If you haven't received it, please contact the campus IT desk.
          </div>
        )}

        <PrimaryButton loading={login.isPending}>Sign in</PrimaryButton>
      </form>
    </AuthLayout>
  )
}

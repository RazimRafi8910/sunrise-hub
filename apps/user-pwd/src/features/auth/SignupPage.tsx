import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { AuthLayout } from '../../components/AuthLayout'
import { PasswordField } from '../../components/PasswordField'
import { PrimaryButton } from '../../components/PrimaryButton'
import { SelectField } from '../../components/SelectField'
import { TextField } from '../../components/TextField'
import auth from '../../lib/auth-client';
import type { User } from '@sunrise-hub/shared'

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
]

const COURSE_OPTIONS = [
  'BBA',
  'BCA',
  'BCOM',
]

export function SignupPage() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [campusId, setCampusId] = useState('')
  const [classYear, setClassYear] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState<{
    fullName?: string
    campusId?: string
    classYear?: string
    email?: string
    password?: string
    general?: string
  }>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const nextErrors: typeof errors = {}

    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required'
    }

    if (!campusId.trim()) {
      nextErrors.campusId = 'College ID is required'
    }

    if (!classYear) {
      nextErrors.classYear = 'Please select your academic year'
    }

    if (!email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      nextErrors.password = 'Password is required'
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

    const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setErrors({})

      try {
        const result = await auth.signUp.email({
          name: fullName,
          email: email,
          college_id_no: campusId,
          class_year: classYear,
          department: "computer_application",
          course:"BBA",
          password: password,
          callbackURL: '/'
        });
        console.log(result)
      navigate('/')
      } catch (err: unknown) {
        console.log(err)
      const message = err instanceof Error ? err.message : 'Sign up failed. Please try again.'
      setErrors({ general: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      subtitle="Create your account"
      cardTitle="Create account"
      bottomText="Already have an account?"
      bottomLinkText="Sign in"
      bottomLinkTo="/login"
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
          id="signup-fullname"
          label="Full name"
          icon="user"
          type="text"
          autoComplete="name"
          placeholder="e.g. Ayaan Rahman"
          value={fullName}
          error={errors.fullName}
          onChange={(e) => {
            setFullName(e.target.value)
            if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }))
          }}
        />

        <TextField
          id="signup-campusid"
          label="College ID"
          icon="idCard"
          type="text"
          autoComplete="off"
          placeholder="e.g. 2201-0457"
          value={campusId}
          error={errors.campusId}
          onChange={(e) => {
            setCampusId(e.target.value)
            if (errors.campusId) setErrors((prev) => ({ ...prev, campusId: undefined }))
          }}
        />

        <SelectField
          id="signup-class"
          label="Academic course"
          icon="calendarDays"
          placeholder="Select course"
          options={COURSE_OPTIONS}
          value={classYear}
          error={errors.classYear}
          onChange={(e) => {
            setClassYear(e.target.value)
            if (errors.classYear) setErrors((prev) => ({ ...prev, classYear: undefined }))
          }}
        />

        <SelectField
          id="signup-classyear"
          label="Academic year"
          icon="calendarDays"
          placeholder="Select year"
          options={YEAR_OPTIONS}
          value={classYear}
          error={errors.classYear}
          onChange={(e) => {
            setClassYear(e.target.value)
            if (errors.classYear) setErrors((prev) => ({ ...prev, classYear: undefined }))
          }}
        />

        <TextField
          id="signup-email"
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

        <PasswordField
          id="signup-password"
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          error={errors.password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
          }}
        />

        <PrimaryButton onClick={handleSubmit} loading={loading}>Create account</PrimaryButton>
      </form>
    </AuthLayout>
  )
}

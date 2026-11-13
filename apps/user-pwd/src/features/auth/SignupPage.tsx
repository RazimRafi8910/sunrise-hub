import { useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthLayout } from '../../components/AuthLayout'
import { PasswordField } from '../../components/PasswordField'
import { PrimaryButton } from '../../components/PrimaryButton'
import { SelectField } from '../../components/SelectField'
import { TextField } from '../../components/TextField'
import auth, { getAuthErrorCodeMsg } from '../../lib/auth-client';
import { useForm } from 'react-hook-form';
import { ClassLYears, Course, signupZodSchema } from '@sunrise-hub/shared'
import { zodResolver } from '@hookform/resolvers/zod';

export function SignupPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signupZodSchema) });

  async function onSubmit(data) {
    setLoading(true)
    try {
      const { data:response,error } = await auth.signUp.email({name:data.fullname,...data});
      console.log(data)

      if (error) {
        console.log(error)
        setError(getAuthErrorCodeMsg(error.code));
      }

      if (response) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.log(error)
      setError(error)
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {error && (
          <div
            role="alert"
            className="rounded-[16px] bg-bg p-3 text-[13px] font-semibold text-danger"
          >
            {error}
          </div>
        )}

        <TextField
          id="signup-fullname"
          name='fullname'
          label="Full name"
          icon="user"
          type="text"
          autoComplete="name"
          placeholder="e.g. Ayaan Rahman"
          register={register}
          error={errors.fullname?.message}
        />

        <TextField
          id="signup-campusid"
          label="College ID"
          name="collegeId"
          icon="idCard"
          register={register}
          type="text"
          autoComplete="off"
          placeholder="e.g. 2201-0457"
          error={errors.collegeId?.message}
        />

        <SelectField
          id="signup-class"
          name="course"
          register={register}
          label="Academic course"
          icon="calendarDays"
          placeholder="Select course"
          options={Object.values(Course)}
          error={errors.course?.message}
        />

        <SelectField
          id="signup-classyear"
          label="Academic year"
          name="classYear"
          register={register}
          icon="calendarDays"
          placeholder="Select year"
          options={Object.values(ClassLYears)}
          error={errors.classYear?.message}
        />

        <TextField
          id="signup-email"
          label="College email"
          name="email"
          register={register}
          icon="mail"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@college.edu"
          error={errors.email?.message}
        />

        <PasswordField
          id="signup-password"
          label="Password"
          name="password"
          register={register}
          autoComplete="new-password"
          placeholder="Create a password"
          error={errors.password?.message}
        />

        <PrimaryButton type='submit' onClick={() => { console.log("clicked") }} loading={loading}>Create account</PrimaryButton>
      </form>
    </AuthLayout>
  )
}

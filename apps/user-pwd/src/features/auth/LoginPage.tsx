import { useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthLayout } from '../../components/AuthLayout'
import { PasswordField } from '../../components/PasswordField'
import { PrimaryButton } from '../../components/PrimaryButton'
import { TextField } from '../../components/TextField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginZodSchema } from '@sunrise-hub/shared';
import authClient, { getAuthErrorCodeMsg } from '../../lib/auth-client'

export function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForgotNotice, setShowForgotNotice] = useState(false)
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver:zodResolver(loginZodSchema),
  });

  async function onSubmit(data:{email:string,password:string}) {
    setLoading(true)
    try {
      const result = await authClient.signIn.email(
        { email: data.email, password: data.password },
        {
          onSuccess: () => navigate('/', { replace: true }),
          onError: (ctx) => setError(getAuthErrorCodeMsg(ctx.error.code))
        });
      // if (result.error) {
      //   setError(getAuthErrorCodeMsg(result.error.code));
      //   return
      // }
      // console.log(result.data)
      // if (result.data.token) {
      //   navigate('/', { replace: true });
      // }
    } catch (error) {
      console.log(error)
      setError("Something went wrong");
    } finally {
      setLoading(false);
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {error && (
          <div
            role="alert"
            className="rounded-[16px] px-3 text-[13px] font-semibold text-danger"
          >
            {error}
          </div>
        )}

        <TextField
          id="login-email"
          label="College email"
          icon="mail"
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@college.edu"
          register={register}
          error={errors.email?.message}
        />

        <div className="flex flex-col gap-1.5">
          <PasswordField
            name="password"
            id="login-password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            register={register}
            error={errors.password?.message}
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

        <PrimaryButton type='submit' loading={loading}>Sign in</PrimaryButton>
      </form>
    </AuthLayout>
  )
}

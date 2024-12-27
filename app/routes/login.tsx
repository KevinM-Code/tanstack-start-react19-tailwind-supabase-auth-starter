import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useUserEmail } from '~/utils/context'
import { loginFn } from '~/auth-server'


export const Route = createFileRoute('/login')({
  component: AuthComponent,
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

function AuthComponent() {
  const { state, dispatch } = useUserEmail()
  const router = useRouter()

  if (state.email) {
    router.navigate({ to: '/' })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false)

  const onSubmit = (data: any) => {
    console.log('Login data:', data)

    loginFn({
      data: data,
    })
      .then((res: { email: any }) => {
        reset()
        const { email } = res
        dispatch({ type: 'SET_EMAIL', payload: email })
        router.invalidate()

        router.navigate({ to: '/' })
      })
      .catch((error: any) => {
        console.log('Error', error)
        setIsIncorrectPassword(true)
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        {isIncorrectPassword ? (
          <div
            className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Unauthorized!</span> Please try again!
          </div>
        ) : null}
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            {...register('password')}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  )
}

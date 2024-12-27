import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, useRouter, redirect } from '@tanstack/react-router'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signupFn } from '~/auth-server';
import { useUserEmail } from '~/utils/context';

export const Route = createFileRoute('/signup')({
    component: SignupComponent,
})

const signupSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });


function SignupComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(signupSchema),
    });
    const { state, dispatch } = useUserEmail();
    const router = useRouter();

    if (state.email) {
        router.navigate({ to: '/dashboard' })
    }

    const onSubmit = (data: {user: string, password: any; confirmPassword: any; }) => {
        if (data.password === data.confirmPassword) {
            delete data.confirmPassword;
            console.log('Signup data:', data);

            signupFn({
                data: data
            }).then((res: { email: any }) => {
                reset()
                const { email } = res

                console.log("Signup Email ", email)
                dispatch({ type: 'SET_EMAIL', payload: email });
                router.invalidate()

                router.navigate({ to: '/dashboard' })
            }).catch((error) => {
                console.log("Error", error)
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

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
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-2">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Signup
                </button>
            </form>
        </div>
    );
}

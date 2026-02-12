'use client'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField } from '@/components/ui/form'
import FormItem from '../../ui/FormItem'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import useSignUp from '../../hooks/useSignUp'
import { useErrors } from '@/hooks/useError' // Assuming useErrors is now useBackendErrors
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

// Define the schema for form validation
const formSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    fullName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export default function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            fullName: "",
            password: "",
        }
    });
    const t = useTranslations('auth')
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const { mutate, data, error, isPending } = useSignUp()

    // Use the custom hook to handle backend errors
    useErrors({
        form,
        error,
        fieldNames: ['email', 'fullName', 'password'],

    });

    // Effect to handle successful sign-up and redirection
    useEffect(() => {
        const handleSuccess = async () => {
            if (data && !isPending) { // Ensure data is present and mutation is not pending

                // Attempt to sign in with next-auth
                const result = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false, // Prevent next-auth from redirecting automatically
                    // callbackUrl: '/'  This is the default redirect after successful sign-in if no error
                });

                if (result?.error) {
                    // Handle sign-in error if it occurs after successful registration
                    console.error("NextAuth sign-in error:", result.error);
                    form.setError("root", {
                        type: "manual",
                        message: result.error || "Failed to sign in after registration."
                    });
                } else if (result?.ok) {
                    // If sign-in is successful, explicitly redirect to the root
                    router.push('/');
                }
            }
        };

        handleSuccess();
    }, [data, isPending, router, form]); // Dependencies for the effect

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        mutate({ ...values });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full md:w-2/3 lg:w-1/4 flex flex-col items-center justify-center px-3 gap-8'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem label={t('email')} placeholder={t('email')} type='email' field={field} />
                    )}
                />
                <FormField
                    control={form.control}
                    name='fullName'
                    render={({ field }) => (
                        <FormItem field={field} label={t('fullName')} placeholder={t('fullName')} type='text' />
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem field={field} label={t('password')} placeholder={t('password')} type='password' />
                    )}
                />
                {/* Display a general form error if it exists */}
                {form.formState.errors.root && (
                    <p className="text-red-500 text-sm">{form.formState.errors.root.message}</p>
                )}
                <Button type="submit" disabled={isLoading || isPending}>{!isLoading && !isPending ? t('signUp') : 'Loading...'}</Button>
            </form>
        </Form>
    );
}

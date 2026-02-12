'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormMessage } from '@/components/ui/form'
import FormItem from '../../ui/FormItem'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
const formSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters and have mixed characters" }),
})
export default function SignInForm() {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })
    const router = useRouter()
    const t = useTranslations('auth')
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        console.log(values);
        const x = await signIn('credentials', { ...values, redirect: false })
        setIsLoading(false)
        if (!x?.ok) {
            form.setError('email', { type: 'server', message: '' })
            form.setError('password', { type: 'server', message: '' })
            form.setError('root', { type: 'server', message: x?.error ? x.error : '' })
            form.setFocus('email')

        }
        router.replace('/')

    }
    console.log(t('signIn'))
    return (
        <Form {...form}  >
            {form.formState.errors.root && (
                <FormMessage className="text-red-500 text-base">
                    {form.formState.errors.root.message}
                </FormMessage>
            )}
            <form action="" onSubmit={form.handleSubmit(onSubmit)} className='w-full md:w-2/3 lg:w-1/4 flex flex-col items-center justify-center px-3 gap-8 '>

                <FormField control={form.control} name='email' render={({ field }) => (
                    <FormItem label={t('email')} placeholder={t('email')} type='email' field={field} />
                )}>

                </FormField>

                <FormField control={form.control} name='password' render={({ field }) => (
                    <FormItem field={field} label={t('password')} placeholder={t("password")} type='password' />
                )}>

                </FormField>

                <Button disabled={isLoading}>{!isLoading ? t('signIn') : 'Loading ...'}</Button>


            </form>
        </Form>
    )
}

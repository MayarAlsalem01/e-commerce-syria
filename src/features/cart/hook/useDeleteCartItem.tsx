import useGetUserSession from '@/lib/auth/useGetUserSession'
import { endpoints, httpClient } from '@/lib/httpClient'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useDeleteCartItem() {
    const { status, data: session } = useGetUserSession()
    const router = useRouter()
    return useMutation({
        mutationFn: async ({ cartItemId }: { cartItemId: number }) => {
            if (status !== 'authenticated' || !session?.user?.token) {
                // either ask user to sign in:
                // signIn() // uncomment to open sign-in flow
                router.push('/auth/sign-in')
            }
            return await httpClient.delete(`${endpoints.cart}/${cartItemId}`, {
                headers: {
                    'Authorization': `bearer ${session?.user.token}`
                }
            })
        }
    })
}

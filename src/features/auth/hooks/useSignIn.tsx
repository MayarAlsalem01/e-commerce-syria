import { useMutation } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'

export default function useSignIn() {

    return useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            const response = await axios.post('https://tech-commerce.fractalsgroup.net/api/login', {

                'email': email,
                'password': password
            });
            return { response }
        }
    })
}

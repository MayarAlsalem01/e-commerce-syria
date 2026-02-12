import { endpoints, httpClient } from '@/lib/httpClient';
import { useMutation } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'

export default function useSignUp() {

  return useMutation({
    mutationFn: async ({ email, fullName, password }: { email: string, fullName: string, password: string }) => {
      const response = await httpClient.post(endpoints.signUp, {
        'full_name': fullName,
        'email': email,
        'password': password
      });
      return { response, email, password }
    }
  })
}

// hooks/useHttpClient.js
'use client';

import { useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';
import axios from 'axios';
import { baseUrl } from '@/lib/httpClient';

/**
 * A hook to configure the httpClient with the current locale from next-intl.
 * This should be used in any Client Component that initiates API calls.
 * @returns The configured httpClient instance.
 */
export function useHttpClient() {
    // Get the current locale from next-intl
    const locale = useLocale();

    // Use useMemo to ensure the instance is only recreated when the locale changes
    const instance = useMemo(() => {
        // Create a new instance with the base configuration
        const inst = axios.create({
            baseURL: baseUrl,
            headers: {
                'Accept-Language': locale,
            },
        });

        // Optional: Add logging to verify the header is being set
        inst.interceptors.request.use((config) => {
            console.log(`Setting Accept-Language header to: ${locale}`);
            return config;
        });

        return inst;
    }, [locale]);

    return instance;
}

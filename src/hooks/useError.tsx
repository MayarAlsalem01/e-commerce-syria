import { useEffect } from 'react';
import { FieldValues, UseFormReturn, Path } from 'react-hook-form'; // Import Path
import axios from 'axios';

// Define the shape of the backend error response
interface BackendErrors {
    [key: string]: string[];
}

interface UseBackendErrorsProps<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>;
    error: unknown; // The error object from your mutation/query
    fieldNames: (keyof TFieldValues)[]; // Expected field names for validation
    onBackendError?: (error: unknown) => void; // Optional callback for generic backend errors
}

export function useErrors<TFieldValues extends FieldValues>(
    {
        form,
        error,
        fieldNames,
        onBackendError
    }: UseBackendErrorsProps<TFieldValues>
) {
    useEffect(() => {
        if (error) {
            if (axios.isAxiosError(error) && error.response?.data?.errors) {
                const backendErrors: BackendErrors = error.response.data.errors;

                for (const fieldName in backendErrors) {
                    const messages = backendErrors[fieldName];
                    if (messages && messages.length > 0) {
                        // Check if the fieldName is one of the expected form fields
                        // And cast it to Path<TFieldValues> to satisfy react-hook-form's setError type
                        if (fieldNames.includes(fieldName as keyof TFieldValues)) {
                            form.setError(fieldName as Path<TFieldValues>, {
                                type: 'server',
                                message: messages.join(', ')
                            });
                        } else {
                            console.warn(`Backend error for unknown field: ${fieldName}`);
                        }
                    }
                }
                // If there's a general message from the backend, set it as a root error
                if (error.response.data.message && !Object.keys(backendErrors).length) {
                    form.setError("root", {
                        type: "server",
                        message: error.response.data.message
                    });
                }

            } else {
                // Handle non-backend-validation errors (e.g., network issues, or unexpected backend error format)
                console.error("An unexpected error occurred:", error);
                form.setError("root", {
                    type: "manual",
                    message: "Something went wrong. Please try again."
                });
                onBackendError?.(error);
            }
        }
    }, [error, form]);
}
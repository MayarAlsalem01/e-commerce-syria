import { FormControl, FormItem as FItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function FormItem({ label, placeholder, type, field }: { label: string, placeholder: string, type: string, field: any }) {
    return (
        <FItem className='w-full ' >
            <FormLabel htmlFor={label}>{label}</FormLabel>
            <FormControl >
                <Input id={label} className='bg-[#0E1F2F]/10' type={type} placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
        </FItem>
    )
}
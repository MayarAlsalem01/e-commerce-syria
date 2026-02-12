import React from 'react'
import { Label } from './label'
import { Input } from './input'

export default function InputWithLabel({ id, label, type, placeholder }: { id: string, label?: string, type?: string, placeholder?: string }) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1">
            <Label className=' text-primary' htmlFor={id}>{label}</Label>
            <Input type={type} id={id} placeholder={placeholder} />
        </div>)
}

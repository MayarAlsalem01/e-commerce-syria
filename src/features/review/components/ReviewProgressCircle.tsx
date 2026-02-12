// components/ReviewProgressCircle.tsx
'use client'

import React from 'react'

export type ReviewProgressProps = {
    percentage: number
    size?: number
    strokeWidth?: number
    label?: React.ReactNode
    caption?: React.ReactNode
    color?: string
    bgColor?: string
    className?: string
    animate?: boolean
    /** rotation in degrees; -90 = top (default). 90 = bottom (opposite side). */
    startAngle?: number
    /** 'cw' = clockwise (default), 'ccw' = counter-clockwise */
    direction?: 'cw' | 'ccw'
}

const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v))

export default function ReviewProgressCircle({
    percentage,
    size = 120,
    strokeWidth = 12,
    label,
    caption,
    color = '#f59e0b',
    bgColor = '#e6e6e6',
    className = '',
    animate = true,
    startAngle = -90,
    direction = 'cw',
}: ReviewProgressProps) {
    const pct = clamp(percentage)
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius

    // positive for clockwise, negative for counter-clockwise
    const sign = direction === 'cw' ? 1 : -1
    const dashOffset = sign * circumference * (1 - pct / 100)

    const svgStyle: React.CSSProperties = {
        transform: `rotate(${startAngle}deg)`,
        overflow: 'visible',
    }

    const strokeStyle: React.CSSProperties = {
        transition: animate ? 'stroke-dashoffset 700ms cubic-bezier(.22,.9,.36,1)' : undefined,
        transformOrigin: '50% 50%',
        strokeLinecap: 'round',
    }

    return (
        <div className={`inline-flex flex-col items-center ${className}`}>
            <div
                className="relative"
                style={{ width: size, height: size }}
                role="img"
                aria-label={`Progress: ${Math.round(pct)}%`}
            >
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={svgStyle}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={bgColor}
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        style={strokeStyle}
                    />
                </svg>

                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: 'rotate(0deg)' }}
                >
                    <div className="text-center">
                        <div className="text-lg font-semibold leading-none">
                            {label ?? `${Math.round(pct)}%`}
                        </div>
                    </div>
                </div>
            </div>

            {caption ? <div className="mt-2 text-sm text-gray-500">{caption}</div> : null}
        </div>
    )
}

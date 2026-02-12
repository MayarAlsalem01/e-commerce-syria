'use client'
import React from 'react'
import styles from './loading-dots.module.css'

export default function LoadingDots({ className }: { className?: string }) {
    return (
        <span className={`${styles.ellipsis} ${className ?? ''}`} aria-hidden="true">
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
        </span>
    )
}

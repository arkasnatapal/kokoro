
"use client"

import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode,
  className?: string,
  variant?: 'primary' | 'secondary' | 'ghost' | "none" | 'nav',
  onClick?: () => void,
  disabled?: boolean,
}

export const Button = ({ children, className, variant = 'primary', onClick, disabled }: ButtonProps) => {
  const variants: Record<string, string> = {
    "primary": "bg-[var(--primary)] text-[var(--foreground)]",
    "secondary": "bg-[var(--secondary)] text-[var(--foreground)]",
    "ghost" : "bg-transparent border-4 border-[var(--secondary)] text-[var(--foreground)] ",
    "nav" : "bg-transparent text-[var(--foreground)] hover:bg-[#77777725] !rounded-full active:bg-[#77777750]",
  }

  return (
    <button className={clsx(className,variants[variant],'hover:brightness-120 active:brightness-75 disabled:brightness-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 rounded-xl','flex items-center justify-center')}>
      {children}
    </button>
  )
}

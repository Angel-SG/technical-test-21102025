'use client';

import * as React from 'react';

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }
) {
  const { className = '', loading, children, ...rest } = props;
  return (
    <button
      className={`rounded-md px-3 py-2 text-sm font-medium shadow-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 ${className}`}
      {...rest}
    >
      {loading ? 'Loading…' : children}
    </button>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 ${className}`}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement>
) {
  const { className = '', children, ...rest } = props;
  return (
    <select
      className={`rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800 ${className}`} />;
}

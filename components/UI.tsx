"use client";

import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	variant?: "default" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
}

export function Button({
	className = "",
	loading,
	variant = "default",
	size = "md",
	children,
	...rest
}: ButtonProps) {
	const baseClasses =
		"inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

	const variantClasses = {
		default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
		outline:
			"border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
		ghost: "text-gray-700 hover:bg-gray-100 focus:ring-blue-500",
	};

	const sizeClasses = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
	};

	return (
		<button
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
			disabled={loading || rest.disabled}
			{...rest}
		>
			{loading ? "Loading…" : children}
		</button>
	);
}

export const Input = React.forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
	<input
		ref={ref}
		className={`w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700 ${className}`}
		{...props}
	/>
));
Input.displayName = "Input";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
	const { className = "", children, ...rest } = props;
	return (
		<select
			className={`rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm ${className}`}
			{...rest}
		>
			{children}
		</select>
	);
}

export function Skeleton({ className = "" }: { className?: string }) {
	return (
		<div
			className={`animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800 ${className}`}
		/>
	);
}

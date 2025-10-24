export default function CharacterCardSkeleton() {
	return (
		<div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden animate-pulse">
			<div className="w-full h-48 bg-gray-200"></div>
			<div className="p-4">
				<div className="h-6 bg-gray-200 rounded mb-2"></div>
				<div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
				<div className="flex items-center justify-between">
					<div className="h-3 bg-gray-200 rounded w-16"></div>
					<div className="h-4 bg-gray-200 rounded w-24"></div>
				</div>
			</div>
		</div>
	);
}

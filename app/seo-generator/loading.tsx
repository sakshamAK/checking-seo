export default function Loading() {
	return (
		<div className="flex flex-col gap-16 w-full mt-8">
			<div className="lg:w-1/3 md:w-1/2 sm:w-full h-20 rounded-lg bg-gray-400 animate-pulse flex items-center justify-center p-2">Please wait for the analysis, this may take more than a minute.</div>
			<div className="grid lg:grid-cols-5 gap-8 md:grid-cols-3 grid-cols-1">
				{Array.from(Array(20).keys()).map(() => (
					<div className="rounded-lg bg-gray-400 h-40 w-full animate-pulse"></div>
				))}
			</div>
			<div className="lg:w-1/3 md:w-1/2 sm:w-full h-20 rounded-lg bg-gray-400 animate-pulse"></div>
			<div className="grid lg:grid-cols-5 gap-8 md:grid-cols-3 grid-cols-1">
				{Array.from(Array(20).keys()).map(() => (
					<div className="rounded-lg bg-gray-400 h-40 w-full animate-pulse"></div>
				))}
			</div>
		</div>
	);
}

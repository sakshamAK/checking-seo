import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-8 py-16 md:p-16 xl:p-24">
			<div className="flex flex-col md:flex-row items-center justify-between gap-16">
				<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl sm:leading-normal md:leading-normal lg:leading-normal leading-normal w-10/12">
					Make Search Engine Optimization Easy
				</h1>
				<Link href="seo-generator">
					<ArrowRightCircleIcon className="h-24 w-24 lg:h-28 lg:w-28 cursor-pointer active:ml-10 transition-all" />
				</Link>
			</div>
		</main>
	);
}

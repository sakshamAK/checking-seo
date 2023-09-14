import { flattenObject } from "@/utils/flattenObject";
import { SeoResultsProps } from "./types";

export function SeoResults({ summary, details }: SeoResultsProps) {
	return (
		<main className="flex flex-col items-center justify-center gap-20 p-24">
			{summary && summary?.result && (
				<div className="flex flex-col items-start w-full min-h-screen gap-16">
					<h1 className="dark:text-black text-6xl">Summary: </h1>
					<div className="grid lg:grid-cols-5 gap-8 md:grid-cols-3 grid-cols-1">
						{Object.keys(
							flattenObject(summary?.result[0]["page_metrics"])
						)?.map((item) => {
							return (
								<div className="dark:text-black p-6 bg-white rounded-2xl flex flex-col items-center break-all">
									<h1>
										{flattenObject(summary?.result[0]["page_metrics"])[item]}
									</h1>
									<p className="dark:text-black text-center">
										{item.replaceAll("_", " ").split(".").reverse()[0]}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			)}
			{details && details?.result && (
				<div className="flex flex-col items-start w-full min-h-screen gap-16">
					<h1 className="dark:text-black text-6xl">SEO Details: </h1>
					<div className="grid lg:grid-cols-2 gap-8 grid-cols-1">
						{Object.keys(
							flattenObject(details?.result[0]["items"][0].meta)
						)?.map((item) => {
							return (
								<div className="p-6 bg-white rounded-2xl flex flex-col gap-4 items-center break-all">
									<h2 className="dark:text-black text-center">
										{item.replaceAll("_", " ").split(".").reverse()[0]}
									</h2>
									<p
										dangerouslySetInnerHTML={{
											__html: Array.isArray(
												flattenObject(details?.result[0]["items"][0].meta)[item]
											)
												? flattenObject(details?.result[0]["items"][0].meta)[
														item
												  ].join("<br />")
												: flattenObject(details?.result[0]["items"][0].meta)[
														item
												  ],
										}}
									/>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</main>
	);
}

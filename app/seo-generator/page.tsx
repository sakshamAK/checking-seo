"use client";
import { SeoResults } from "@/components/results/Result";
import { SeoDetails } from "@/sdk/dataForSeo";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, Suspense, useState } from "react";
import Loading from "./loading";

export default function Seo() {
	const [validateURL, setValidateURL] = useState("");
	const [clientURL, setClientURL] = useState("");
	const [summary, setSummary] = useState([]);
	const [details, setDetails] = useState([]);
	const [loading, setLoading] = useState(false);
	const [disableButton, setDisableButton] = useState(true);
	const dataForSeo = new SeoDetails();
	const checkValidity = (e: ChangeEvent) => {
		const { value } = e.target as HTMLInputElement;
		const pattern = /[A-Za-z0-9]+\.[A-Za-z0-9]+/i;

		setClientURL("");
		if (value.toLowerCase().includes("://")) {
			setValidateURL("Please avoid writing protocols");
			setDisableButton(true);
		} else if (value.toLowerCase().includes("www")) {
			setValidateURL("Please avoid 'www'");
			setDisableButton(true);
		} else if (!pattern.test(value)) {
			setValidateURL("Please type domain name");
			setDisableButton(true);
		} else {
			setValidateURL("");
			setClientURL(value);
			setDisableButton(false);
		}
	};

	const setTaskId = async () => {
		try {
			setLoading(true);
			setDisableButton(true);
			const taskId = await dataForSeo.sendUrl(clientURL);
			// const checkQueue = await dataForSeo.checkStatusQueue();
			
			let summaryCheck: ReturnType<typeof setInterval>;
			let detailsCheck: ReturnType<typeof setInterval>;
			
			summaryCheck = setInterval(async () => {
				const resSummary = taskId && (await dataForSeo.getSeoSummary(taskId));
				if (resSummary?.status_message === "Task Not Found.") {
					setDisableButton(false);
					setLoading(false);
					clearInterval(summaryCheck);
					setValidateURL("Please check the URL!");
				}
				if (
					resSummary?.result &&
					resSummary?.result[0]?.crawl_progress === "finished"
				) {
					setDisableButton(false);
					setSummary(resSummary);
					setLoading(false);
					clearInterval(summaryCheck);
				}
			}, 3000);

			detailsCheck = setInterval(async () => {
				const resDetails = taskId && (await dataForSeo.getSeoDetails(taskId));
				if (resDetails?.status_message === "Task Not Found.") {
					setDisableButton(false);
					setLoading(false);
					clearInterval(detailsCheck);
					setValidateURL("Please check the URL!");
				}
				if (
					resDetails?.result &&
					resDetails?.result[0]?.crawl_progress === "finished"
				) {
					setDisableButton(false);
					setDetails(resDetails);
					clearInterval(detailsCheck);
				}
			}, 3000);
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<main className="flex min-h-screen items-center justify-center gap-20 p-8 md:p-16 lg:p-24">
			<div className="flex flex-col items-center w-full gap-4">
				<div className="flex items-center justify-center flex-col lg:items-end lg:flex-row w-full gap-4 lg:w-3/4 lg:gap-16">
					<div className="flex items-center justify-center flex-col w-full gap-4 lg:w-3/4 lg:gap-8">
						<h4 className="dark:text-black text-center sm:text-xl">
							Enter URL without "https" or "http", and "www"
						</h4>
						<input
							type="text"
							placeholder='Enter URL without "https" or "http", and "www"'
							className="dark:text-black px-4 py-2 w-full md:px-8 md:py-4 md:text-xl lg:text-3xl rounded-xl lg:rounded-3xl outline-black-500 backdrop-blur-md bg-white/70 border-2 border-solid border-black-500"
							onChange={(e) => checkValidity(e)}
						/>
					</div>
					<ArrowRightCircleIcon
						className="dark:text-black h-16 w-16 md:h-20 md:w-20 hover:text-red-400 cursor-pointer active:ml-10 transition-all text-black"
						onClick={() => !disableButton && setTaskId()}
					/>
				</div>
				{validateURL && (
					<p className="text-red-500 backdrop-blur-lg bg-white/60 px-4 py-2 rounded-lg">
						{validateURL}
					</p>
				)}
				{loading ? (
					<Loading />
				) : (
					<SeoResults summary={summary} details={details} />
				)}
			</div>
		</main>
	);
}

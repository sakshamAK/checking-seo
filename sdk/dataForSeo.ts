import axios, { AxiosResponse } from "axios";
import {
	Auth,
	SeoSummary,
	Task,
	GetTask,
	TaskPages,
	clientSeoDetails,
	getQueue,
} from "./types";

export class SeoDetails {
	private auth: Auth = {
		username: "fetel85659@ipnuc.com",
		password: "67f997477b4149e2",
	};

	constructor() {}

	async sendUrl(clientUrl: string) {
		try {
			const task: Task[] = [
				{
					target: clientUrl,
					max_crawl_pages: 10,
					load_resources: true,
					enable_javascript: true,
					enable_browser_rendering: true,
					custom_js: "meta = {}; meta.url = document.URL; meta;",
					tag: "Client Url",
				},
			];

			const getTask: AxiosResponse<GetTask> = await axios({
				method: "post",
				url: "https://api.dataforseo.com/v3/on_page/task_post",
				auth: this.auth,
				data: task,
				headers: {
					"content-type": "application/json",
				},
			});
			return getTask["data"]["tasks"][0]["id"];
		} catch (e) {
			console.error(e);
		}
	}

	async getSeoSummary(task_id: string) {
		try {
			const getSeoSummary: AxiosResponse<SeoSummary> = await axios({
				method: "get",
				url: `https://api.dataforseo.com/v3/on_page/summary/${task_id}`,
				auth: this.auth,
				headers: {
					"content-type": "application/json",
				},
			});
			const seoSummary = await getSeoSummary["data"]["tasks"][0];
			return seoSummary;
		} catch (error) {
			console.error(error);
		}
	}

	async getSeoDetails(task_id: string) {
		try {
			const task_pages: TaskPages[] = [
				{
					id: task_id,
					order_by: ["meta.content.plain_text_word_count,desc"],
					limit: 10,
				},
			];

			const getClientSeoDetails: AxiosResponse<clientSeoDetails> = await axios({
				method: "post",
				url: "https://api.dataforseo.com/v3/on_page/pages",
				auth: this.auth,
				data: task_pages,
				headers: {
					"content-type": "application/json",
				},
			});
			const clientSeoDetails = await getClientSeoDetails["data"]["tasks"][0];

			return clientSeoDetails;
		} catch (error) {
			console.error(error);
		}
	}

	async checkStatusQueue() {
		try {
			const getQueue: AxiosResponse<getQueue> = await axios({
				method: "get",
				url: "https://api.dataforseo.com/v3/on_page/tasks_ready",
				auth: this.auth,
				headers: {
					"content-type": "application/json",
				},
			});
			const taskList = getQueue["data"]["tasks"];
			const taskQueue =
				(taskList.length > 0 || taskList[0]["result"]) && taskList[0]["result"];

			if (!taskQueue) throw new Error("nothing to see here");

			const taskInQueue = await getQueue["data"]["tasks"][0];
			return taskInQueue;
		} catch (error) {
			console.error(error);
		}
	}
}

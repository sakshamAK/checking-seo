export interface Task {
	target: string;
	max_crawl_pages: number;
	load_resources: boolean;
	enable_javascript: boolean;
    enable_browser_rendering: boolean;
	custom_js: string;
	tag: string;
}

export interface Auth {
	username: string;
	password: string;
}

export interface GetTask {
	tasks: TaskData[];
}

export interface TaskData {
	id: string;
}

export interface TaskPages {
	id: string;
	order_by: Array<string>;
	limit: number;
}

export interface SeoSummary {
	tasks: Array<any>;
}

export interface clientSeoDetails {
	tasks: Array<any>;
}

export interface getQueue {
	tasks: Array<any>;
}

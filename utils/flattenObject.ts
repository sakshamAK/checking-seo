interface NestedObject {
	[key: string]: any;
}

export function flattenObject(obj: NestedObject, prefix: string = ""): NestedObject {
	let flattenedObj: NestedObject = {};

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			let value = obj[key];

			if (typeof value === "object" && !Array.isArray(value)) {
				let nestedObj = flattenObject(value, prefix + key + ".");
				flattenedObj = { ...flattenedObj, ...nestedObj };
			} else {
				flattenedObj[prefix + key] = value;
			}
		}
	}

	return flattenedObj;
}

const isUndefined = (value: any) => value === undefined;

const isNull = (value: any) => value === null;

const isBoolean = (value: any) => typeof value === 'boolean';

const isObject = (value: any) => value === Object(value);

const isArray = (value: any) => Array.isArray(value);

const isDate = (value: any) => value instanceof Date;

const isBlob = (value: any) =>
	value &&
	typeof value.size === 'number' &&
	typeof value.type === 'string' &&
	typeof value.slice === 'function';

const isFile = (value: any) =>
	isBlob(value) ||
	(typeof value.name === 'string' && typeof value.uri === 'string');

const jsonToForm = (obj: any, cfg?: any, initial?: FormData, prefix = '') => {
	cfg = cfg || {};

	cfg.indices = isUndefined(cfg.indices) ? false : cfg.indices;

	cfg.nullsAsUndefineds = isUndefined(cfg.nullsAsUndefineds)
		? false
		: cfg.nullsAsUndefineds;

	cfg.booleansAsIntegers = isUndefined(cfg.booleansAsIntegers)
		? false
		: cfg.booleansAsIntegers;

	cfg.allowEmptyArrays = isUndefined(cfg.allowEmptyArrays)
		? false
		: cfg.allowEmptyArrays;

	initial = initial || new FormData();

	if (isUndefined(obj)) {
		return initial;
	} else if (isNull(obj)) {
		if (!cfg.nullsAsUndefineds) {
			initial.append(prefix, '');
		}
	} else if (isBoolean(obj)) {
		if (cfg.booleansAsIntegers) {
			initial.append(prefix, obj ? '1' : '0');
		} else {
			initial.append(prefix, obj);
		}
	} else if (isArray(obj)) {
		if (obj.length) {
			obj.forEach((value: any, index: any) => {
				const key = prefix + '[' + (cfg.indices ? index : '') + ']';

				jsonToForm(value, cfg, initial, key);
			});
		} else if (cfg.allowEmptyArrays) {
			initial.append(prefix + '[]', '');
		}
	} else if (isDate(obj)) {
		initial.append(prefix, obj.toISOString());
	} else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
		Object.keys(obj).forEach((prop) => {
			const value = obj[prop];

			if (isArray(value)) {
				while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
					prop = prop.substring(0, prop.length - 2);
				}
			}

			const key = prefix ? prefix + '[' + prop + ']' : prop;

			jsonToForm(value, cfg, initial, key);
		});
	} else {
		initial.append(prefix, obj);
	}

	return initial;
};

export { jsonToForm };

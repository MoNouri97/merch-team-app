type Transformer = <T>(
	data: T[] | undefined,
	config?: { id?: keyof T; name?: keyof T }
) => { id: string; name: string }[];

/**
 * create an array that can be used as data for a picker element
 * @param data data to transform
 * @param config the id and the name column
 */
const createPickerData: Transformer = (data, config) => {
	if (!data) {
		return [];
	}
	const idProp = config?.id ?? ('id' as keyof typeof data[0]);
	const nameProp = config?.name ?? ('name' as keyof typeof data[0]);
	return data.map((el) => ({
		id: `${el[idProp]}`,
		name: `${el[nameProp]}`,
	}));
};

export default createPickerData;

export interface ReportEventFrom {
	setValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
	name: string;
}

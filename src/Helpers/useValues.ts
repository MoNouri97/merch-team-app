/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';

export const useValues = (
	name: string,
	values: any,
	setValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void
) => {
	React.useEffect(() => {
		setValue(name, values, false);
	}, [setValue, name, values]);
};

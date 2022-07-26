/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { EventType } from '~/types/events';

export const useEventValues = (
	name: string,
	value: EventType,
	setValue: (field: string, value: EventType, shouldValidate?: boolean) => void
) => {
	React.useEffect(() => {
		setValue(`${name}.type`, value, false);
	}, []);
};

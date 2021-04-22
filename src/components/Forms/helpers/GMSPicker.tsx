import React from 'react';
import useGetGMS from '~/api/gmsAPI';
import Picker from '~/components/Forms/Picker';
import createPickerData from '~/Helpers/createPickerData';

interface GMSPickerProps {
	name?: string;
	label?: string;
}

const GMSPicker: React.FC<GMSPickerProps> = ({
	name = 'GMS',
	label = 'GMS',
}) => {
	const { data } = useGetGMS();
	return <Picker name={name} label={label} data={createPickerData(data)} />;
};
export default GMSPicker;

import React from 'react';
import useGetAllGMS from '~/api/gmsAPI';
import Picker from '~/components/Forms/Picker';

interface GMSPickerProps {
	name?: string;
	label?: string;
}

const GMSPicker: React.FC<GMSPickerProps> = ({
	name = 'GMS',
	label = 'GMS',
}) => {
	const { data } = useGetAllGMS();
	return <Picker name={name} label={label} data={data} />;
};
export default GMSPicker;

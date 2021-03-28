import React from 'react';
import { useNavigation } from '@react-navigation/core';
import styled from '~/config/styled-components';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';
import Btn from '~/components/Btn';
import Input from '~/components/Forms/Input';
import Form from '~/components/Forms/Form';
import ImageInput from '~/components/Forms/ImageInput';
import Picker from '~/components/Forms/Picker';
import DatePicker from '~/components/Forms/DatePicker';

interface Props {}

const Testing: React.FC<Props> = () => {
	const navigation = useNavigation();
	return (
		<AppScreen navbar>
			<AppText type="subtitle">typography</AppText>
			<Section>
				<AppText type="title">Title</AppText>
				<AppText type="subtitle">subtitle</AppText>
				<AppText type="label">label</AppText>
			</Section>
			<AppText type="subtitle">my buttons</AppText>
			<Btn>secondary</Btn>
			<Btn primary>primary </Btn>
			<AppText type="subtitle">inputs</AppText>
			<Form
				initialValues={{ email: 'nouri@gmail.co', placeholder: '' }}
				onSubmit={() => console.log('sub')}
			>
				<DatePicker />
				<Input name="email" icon="search" />
				<Input name="testing icons" placeholder="any icon" icon="clock" />
				<Picker
					data={['one', 'two', 'three']}
					placeholder="choose a category..."
					name="Categorie"
				/>
				<Input name="placeholder" placeholder="date" icon="calendar" />
				<ImageInput />
				<ImageInput />
				<ImageInput />
			</Form>
			<Btn primary>primary </Btn>
		</AppScreen>
	);
};

const Section = styled.View`
	margin-top: 10px;
	margin-bottom: 20px;
`;
export default Testing;

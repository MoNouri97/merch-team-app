import * as yup from 'yup';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import styled from '~/config/styled-components';
import AppScreen from '~/components/AppScreen';
import AppText from '~/components/AppText';
import Btn from '~/components/Btn';
import Input from '~/components/forms/Input';
import Form from '~/components/forms/Form';
import ImageInput from '~/components/forms/ImageInput';

interface Props {}

const Testing: React.FC<Props> = () => (
	<AppScreen>
		<AppText type="title">my buttons</AppText>
		<Btn onPress={() => console.log('halo')}>secondary</Btn>
		<Btn primary>primary </Btn>
		<AppText size={32} font="DMSans_500Medium">
			inputs
		</AppText>
		<Form
			initialValues={{ email: 'nouri@gmail.co', placeholder: '' }}
			onSubmit={() => console.log('sub')}
		>
			<Input name="email" icon="search" />
			<Input name="placeholder" placeholder="here" icon="chevron-down" />
			<Input name="placeholder" placeholder="date" icon="calendar" />
			<Input name="placeholder" placeholder="date" icon="calendar" />
			<ImageInput />
			<ImageInput />
			<ImageInput />
		</Form>
		<Btn primary>primary </Btn>
	</AppScreen>
);
export default Testing;

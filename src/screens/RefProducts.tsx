import React from 'react';
import AppScreen from '~/components/AppScreen';
import CheckList from '~/components/Forms/CheckList';
import Form from '~/components/Forms/Form';
import Picker from '~/components/Forms/Picker';
import { Subtitle } from '~/components/Forms/styles';
import { fakeCategories, fakeGMSs, fakeProducts } from '~/Helpers/FakeData';

const RefProducts: React.FC = () => (
	// code here ...
	<AppScreen navbar>
		<Form
			onSubmit={() => console.log('submitted')}
			initialValues={{
				GMS: '',
				cat: '',
				products: [],
			}}
		>
			<Picker name="GMS" data={fakeGMSs} />
			<Subtitle>Articles</Subtitle>
			<Picker name="cat" data={fakeCategories} />
			<CheckList name="products" data={fakeProducts} />
		</Form>
	</AppScreen>
);

export default RefProducts;

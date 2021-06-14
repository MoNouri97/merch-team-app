import { useNavigation } from '@react-navigation/core';
import { Formik } from 'formik';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useQueryClient } from 'react-query';
import { useTheme } from 'styled-components';
import useGetProducts from '~/api/productAPI';
import usePostRefProducts from '~/api/refProductsAPI';
import { GMSPicker, ProductsCheckList, SubmitBtn } from '~/components/Forms';
import AppScreen from '~/components/Shared/AppScreen';
import { yup } from '~/config/yupFrLocal';
import ModalContext from '~/context/ModalContext';
import { Product } from '~/types/models/Product';

const initial = {
	GMS: '',
	products: [] as string[],
};
// validation object
const validation = yup.object({
	GMS: yup.string().required(),
	products: yup.array().required(),
});

const RefProducts: React.FC = () => {
	const { mutateAsync } = usePostRefProducts();
	const queryClient = useQueryClient();
	const { showProgress, hideProgress } = useContext(ModalContext)!;
	const { colors } = useTheme();
	const { navigate } = useNavigation();

	return (
		<AppScreen navbar>
			<Formik
				onSubmit={async (values, { resetForm }) => {
					// Alert.alert('ajouté', JSON.stringify(values, null, 2));
					showProgress();
					// invalidate;
					await mutateAsync({
						GMS: { id: values.GMS },
						products: values.products.map((p) => ({ id: p })),
					});
					await queryClient.invalidateQueries('get_products');
					resetForm();
					hideProgress();
					navigate('Accueil');
				}}
				initialValues={initial}
				validationSchema={validation}
			>
				{({ setFieldValue, values, touched, setFieldTouched }) => {
					const GMS = useMemo(() => values.GMS, [values.GMS]);
					const [prevGMS, setPrevGMS] = useState(GMS);

					const { isFetching } = useGetProducts(
						{ gms: prevGMS },
						{
							enabled: !!prevGMS,
							onSettled: (res: Product[], err) => {
								console.log({ err });
								if (err || !res) {
									return setFieldValue('products', []);
								}
								setFieldValue(
									'products',
									res?.map((product) => product.id.toString())
								);
							},
						}
					);
					useEffect(() => {
						if (GMS === prevGMS) return;
						if (!touched.products) {
							setPrevGMS(GMS);
							return;
						}
						Alert.alert('Confirmation', 'Vos modifications seront perdues', [
							{
								text: 'Oui',
								onPress: () => {
									setFieldTouched('products', false);
									setPrevGMS(GMS);
								},
							},
							{
								text: 'Non',
								onPress: () => {
									setFieldValue('GMS', prevGMS);
								},
							},
						]);
					}, [GMS]);

					return (
						<>
							{/* <FormDebug /> */}
							<GMSPicker />
							{isFetching ? (
								<ActivityIndicator
									style={{ marginTop: 20 }}
									color={colors.primary}
									size="large"
								/>
							) : (
								<ProductsCheckList disabled={!GMS || isFetching} />
							)}
							<SubmitBtn>Ajouter</SubmitBtn>
						</>
					);
				}}
			</Formik>
		</AppScreen>
	);
};

export default RefProducts;

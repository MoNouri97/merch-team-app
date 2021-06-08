import { Formik } from 'formik';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useQueryClient } from 'react-query';
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
	const { showProgress, hide } = useContext(ModalContext)!;

	return (
		<AppScreen navbar>
			<Formik
				onSubmit={async (values, { resetForm }) => {
					// Alert.alert('ajouté', JSON.stringify(values, null, 2));
					showProgress(0);
					// invalidate;
					await mutateAsync({
						GMS: { id: values.GMS },
						products: values.products.map((p) => ({ id: p })),
					});
					await queryClient.invalidateQueries('get_products');
					resetForm();
					hide();
				}}
				initialValues={initial}
				validationSchema={validation}
			>
				{({ setFieldValue, values, touched, setFieldTouched }) => {
					const GMS = useMemo(() => values.GMS, [values.GMS]);
					const [prevGMS, setPrevGMS] = useState(GMS);

					useGetProducts(
						{ gms: prevGMS },
						{
							enabled: !!prevGMS,
							onSuccess: (res: Product[]) => {
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
							<ProductsCheckList disabled={!GMS} />
							<SubmitBtn>Ajouter</SubmitBtn>
						</>
					);
				}}
			</Formik>
		</AppScreen>
	);
};

export default RefProducts;

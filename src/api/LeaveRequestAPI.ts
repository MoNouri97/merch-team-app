/* eslint-disable arrow-body-style */
import { useMutation } from 'react-query';
import api from '~/config/api';
import { LeaveRequestData } from '~/types/models/formData/LeaveRequest';

type LeaveResponse = { message: string };
const postLeaveRequest = async (formData: LeaveRequestData) => {
	const { data } = await api.post<LeaveResponse>('/leave', formData);
	return data;
};

const usePostLeaveRequest = () => {
	return useMutation('leave_request', postLeaveRequest);
};

export default usePostLeaveRequest;

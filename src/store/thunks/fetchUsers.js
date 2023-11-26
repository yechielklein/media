import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
	const response = await axios.get('http://localhost:3005/users');

	//  Dev only!
	await pause(1000);

	return response.data;
});

//  Dev only!
const pause = duration => {
	return new Promise(resolve => {
		setTimeout(resolve, duration);
	});
};
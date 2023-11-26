import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';

export const addUser = createAsyncThunk('users/add', async () => {
	const response = await axios.post('http://localhost:3005/users', {
		name: faker.person.fullName()
	});

	return response.data;
});
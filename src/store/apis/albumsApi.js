import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
	reducerPath: 'albums',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005'
	}),
	endpoints(builder) {
		return {
			fetchAlbums: builder.query({
				providesTags: (results, error, user) => {
					return [
						{ type: 'UsersAlbums', id: user.id },
						...results.map(album => ({ type: 'Album', id: album.id }))
					];
				},
				query: user => {
					return {
						url: '/albums',
						params: {
							userId: user.id
						},
						method: 'GET'
					};
				}
			}),
			addAlbum: builder.mutation({
				invalidatesTags: (results, error, user) => {
					return [{ type: 'UsersAlbums', id: user.id }];
				},
				query: user => {
					return {
						url: '/albums',
						method: 'POST',
						body: {
							name: faker.commerce.productName(),
							userId: user.id
						}
					};
				}
			}),
			removeAlbum: builder.mutation({
				invalidatesTags: (results, error, album) => {
					return [{ type: 'Album', id: album.id }];
				},
				query: album => {
					return {
						url: `/albums/${album.id}`,
						method: 'DELETE'
					};
				}
			})
		};
	}
});

export const {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useRemoveAlbumMutation
} = albumsApi;
export { albumsApi };
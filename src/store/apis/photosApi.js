import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const photosApi = createApi({
	reducerPath: 'photos',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005'
	}),
	endpoints(builder) {
		return {
			fetchPhotos: builder.query({
				providesTags: (results, error, album) => {
					return [
						{ type: 'AlbumsPhotos', id: album.id },
						...results.map(photo => ({ type: 'Photo', id: photo.id }))
					];
				},
				query: album => {
					return {
						url: '/photos',
						params: {
							albumId: album.id
						},
						method: 'GET'
					};
				}
			}),
			addPhoto: builder.mutation({
				invalidatesTags: (results, error, album) => {
					return [{ type: 'AlbumsPhotos', id: album.id }];
				},
				query: album => {
					return {
						url: '/photos',
						method: 'POST',
						body: {
							url: faker.image.urlLoremFlickr({ width: 150, height: 150, category: 'abstract' }),
							albumId: album.id
						}
					};
				}
			}),
			removePhoto: builder.mutation({
				invalidatesTags: (results, error, photo) => {
					return [{ type: 'Photo', id: photo.id }];
				},
				query: photo => {
					return {
						url: `/photos/${photo.id}`,
						method: 'DELETE'
					}
				}
			})
		};
	}
});

export const {
	useFetchPhotosQuery,
	useAddPhotoMutation,
	useRemovePhotoMutation
} = photosApi;
export { photosApi };
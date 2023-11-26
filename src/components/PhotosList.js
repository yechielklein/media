import { useFetchPhotosQuery, useAddPhotoMutation } from '../store';

import Button from './Button';
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';

const PhotosList = ({ album }) => {
	const { data, error, isFetching } = useFetchPhotosQuery(album);
	const [addPhoto, results] = useAddPhotoMutation();

	const handleAddPhoto = () => {
		addPhoto(album);
	};

	let content;
	if (isFetching) {
		content = <Skeleton times={4} className="h-20 w-20 m-2" />;
	} else if (error) {
		content = <div>Error Fetching Photos</div>;
	} else {
		content = data.map(photo => <PhotosListItem key={photo.id} photo={photo} />);
	};

	return (
		<div>
			<div className="m-2 flex flex-row items-center justify-between">
				<h3 className="text-lg font-bold">Photos in {album.name}</h3>
				<Button onClick={handleAddPhoto} loading={results.isLoading}>
					+ Add Photo
				</Button>
			</div>
			<div className="mx-8 flex flex-row flex-wrap justify-center">
				{content}
			</div>
		</div>
	);
};

export default PhotosList;
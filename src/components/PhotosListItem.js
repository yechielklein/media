import { GoTrash } from 'react-icons/go';
import { IoSync } from 'react-icons/io5';

import { useRemovePhotoMutation } from '../store';

const PhotosListItem = ({ photo }) => {
	const [removePhoto, { isLoading }] = useRemovePhotoMutation();

	const handleRemovePhoto = () => {
		removePhoto(photo);
	};

	return (
		<div onClick={handleRemovePhoto} className="relative cursor-pointer m-2">
			<img className="h-20 w-20 rounded" src={photo.url} alt="random pic" />
			<div className="
				absolute
				inset-0
				flex
				items-center
				justify-center
				hover:bg-gray-200
				opacity-0
				hover:opacity-90
				rounded
			">
				{isLoading ? <IoSync className="text-3xl animate-spin" /> : <GoTrash className="text-3xl" />}
			</div>
		</div>
	);
};

export default PhotosListItem;
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';

import Skeleton from './Skeleton';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

const AlbumsList = ({ user }) => {
	const { data, error, isFetching } = useFetchAlbumsQuery(user);
	const [addAlbum, results] = useAddAlbumMutation();

	const handleAddAlbum = () => {
		addAlbum(user);
	};

	let content;
	if (isFetching) {
		content = <Skeleton times={3} className="h-12 w-full" />;
	} else if (error) {
		content = <div>Error loading albums.</div>;
	} else {
		content = data.map(album => <AlbumsListItem key={album.id} album={album} />);
	};

	return (
		<div>
			<div className="m-2 flex flex-row justify-between items-center">
				<h3 className="text-lg font-bold">Albums for {user.name}</h3>
				<Button onClick={handleAddAlbum} loading={results.isLoading}>
					+ Add Album
				</Button>
			</div>
			<div>
				{content}
			</div>
		</div>
	);
};

export default AlbumsList;
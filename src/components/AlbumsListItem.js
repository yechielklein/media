import { GoTrash } from "react-icons/go";

import { useRemoveAlbumMutation } from "../store";

import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import PhotosList from "./PhotosList";

const AlbumsListItem = ({ album }) => {
	const [removeAlbum, results] = useRemoveAlbumMutation();

	const handleRemoveAlbum = () => {
		removeAlbum(album);
	}

	const header = <>
		<Button
			onClick={handleRemoveAlbum}
			loading={results.isLoading}
			className="mr-2"
		>
			<GoTrash />
		</Button>
		{album.name}
	</>;

	return (
		<ExpandablePanel header={header}>
			<PhotosList album={album} />
		</ExpandablePanel>
	);
};

export default AlbumsListItem;
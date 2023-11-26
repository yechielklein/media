import { GoTrash } from 'react-icons/go';

import { deleteUser } from '../store';
import { useThunk } from '../hooks/use-thunk';

import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

const UsersListItem = ({ user }) => {
	const [doDeleteUser, isDeletingUser, deletingUserError] = useThunk(deleteUser);

	const handleClick = () => {
		doDeleteUser(user);
	};

	const header = <>
		<Button loading={isDeletingUser} onClick={handleClick} className="mr-3">
			<GoTrash />
		</Button>
		{deletingUserError && <div>Error Deleting User.</div>}
		{user.name}
	</>;

	return (
		<ExpandablePanel header={header}>
			<AlbumsList user={user} />
		</ExpandablePanel>
	);
};

export default UsersListItem;
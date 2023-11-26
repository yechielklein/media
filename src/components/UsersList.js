import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchUsers, addUser } from '../store';
import { useThunk } from '../hooks/use-thunk';

import Skeleton from './Skeleton';
import Button from './Button';
import UsersListItem from './UsersListItem';

const UsersList = () => {
	const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
	const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

	useEffect(() => {
		doFetchUsers()
	}, [doFetchUsers]);

	const handleUserAdd = () => {
		doCreateUser();
	};

	const { data } = useSelector(state => state.users);

	let content;
	if (isLoadingUsers) {
		content = <Skeleton times={6} className="h-12 w-full" />
	} else if (loadingUsersError) {
		content = <div>Error fetching data...</div>;
	} else {
		content = data.map(user => <UsersListItem key={user.id} user={user} />);
	};

	

	return (
		<div>
			<div className="flex flex-row justify-between items-center m-3">
				<h1 className="m-2 text-xl">Users</h1>
				<Button loading={isCreatingUser} onClick={handleUserAdd}>+ Add User</Button>
			</div>
			{content}
		</div>
	);
};

export default UsersList;
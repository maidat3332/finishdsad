import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import { addUser, updateUser, deleteUser } from './app/features/user/userSlice';
import UserForm from './UserForm';

interface User {
  id: string;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAdd = (user: { name: string; email: string }) => {
    dispatch(addUser(user));
  };

  const handleUpdate = (user: User) => {
    dispatch(updateUser(user));
    setEditingUser(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">test</h1>
      <UserForm onSubmit={handleAdd} />
      {editingUser && (
        <UserForm
          user={editingUser}
          onSubmit={(user) => handleUpdate({ ...editingUser, ...user })}
          onCancel={() => setEditingUser(null)}
        />
      )}
      <div className="grid gap-2">
        {users.map(user => (
          <div key={user.id} className="flex justify-between items-center p-2 border rounded">
            <div>
              <p className="font-bold">{user.name}</p>
              <p>{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingUser(user)}
                className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
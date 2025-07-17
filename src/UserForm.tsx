import React, { useState, FormEvent } from 'react';

interface User {
  id?: string;
  name: string;
  email: string;
}

interface UserFormProps {
  user?: User;
  onSubmit: (user: User) => void;
  onCancel?: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onSubmit({ ...user, name, email });
      setName('');
      setEmail('');
      if (onCancel) onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <h2 className="font-bold mb-2">{user ? 'Edit User' : 'Add User'}</h2>
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          {user ? 'Update' : 'Add'}
        </button>
        {onCancel && (
          <button className="bg-gray-500 text-white px-4 py-2 rounded" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UserForm;
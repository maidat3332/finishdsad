import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: []
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      state.users.push({ id: uuidv4(), ...action.payload });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    }
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
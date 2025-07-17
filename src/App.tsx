import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import UserList from './UserList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <UserList />
      </div>
    </Provider>
  );
};

export default App;
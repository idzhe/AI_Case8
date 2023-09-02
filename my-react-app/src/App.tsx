import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; // Assuming this is the path to your store

const App: React.FC = () => {
    return (
        <Provider store={store}>
            Some content...
        </Provider>
    );
}

export default App;

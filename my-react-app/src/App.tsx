import React from 'react';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import { submitUser } from "./redux/actions";
import UserForm from "./components/user-form/UserForm";


const App: React.FC = () => {
    const handleFormSubmit = (data: { firstName: string; lastName: string; email: string; message: string }) => {
        store.dispatch(submitUser(data));
    }

    return (
        <Provider store={store}>
            <div className="App">
                <UserForm onSubmit={handleFormSubmit} />
            </div>
        </Provider>
    );
}

export default App;

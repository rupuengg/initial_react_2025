import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MainContainer } from 'containers';
import { store } from 'store';
import './App.css';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename='/' future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <MainContainer />
      </BrowserRouter>
    </Provider>
  );
};

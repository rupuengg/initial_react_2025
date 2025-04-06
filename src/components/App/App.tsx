import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { MainContainer } from 'containers';
import { store } from 'store';
import './App.css';

export const App = () => {
  return (
    <Provider store={store}>
      <HashRouter basename='/' future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <MainContainer />
      </HashRouter>
    </Provider>
  );
};

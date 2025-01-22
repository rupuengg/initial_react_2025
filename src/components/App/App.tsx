import { MainNavigation } from 'navigation';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from 'store';
import './App.css';

export const App = () => {
  return (
    <Provider store={store}>
      <HashRouter basename='/' future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <MainNavigation />
      </HashRouter>
    </Provider>
  );
};

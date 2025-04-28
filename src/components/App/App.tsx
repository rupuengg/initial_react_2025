import { MainNavigation } from 'navigation';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename='/' future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <MainNavigation />
      </BrowserRouter>
    </Provider>
  );
};

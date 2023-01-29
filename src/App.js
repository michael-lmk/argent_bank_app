import './App.css';
import { Provider } from 'react-redux'
import { store } from './store/Store';
import Navigation from './navigation/Navigation';

function App() {
  return (
    <Provider store={store}>
      <Navigation></Navigation>

    </Provider>
  );
}

export default App;

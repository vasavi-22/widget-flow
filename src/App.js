import { Provider } from 'react-redux';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import "./store/appStore";
import appStore from './store/appStore';

function App() {
  return (
    <div className="App">
      <Provider store={appStore}>
        <Dashboard />
      </Provider>
    </div>
  );
}

export default App;

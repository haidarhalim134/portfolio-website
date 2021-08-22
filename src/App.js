import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import Home from './pages'
import MazePage from './pages/MazePage';
import { StrictMode } from 'react';

function App() {
  return (
    <StrictMode>
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/maze' component={MazePage} exact/>
      </Switch>
    </Router>
    </StrictMode>
  );
}

export default App;

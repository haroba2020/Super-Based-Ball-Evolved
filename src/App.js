import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Play from './Play';


function App() {
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route path={'/play'}>
            <Play/>
          </Route>
          <Route path={'/'}>
            <Navbar/>
          </Route>
        </Switch>
    </div>
  </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar';
import Play from './Play';
import Main from "./Index";


function App() {
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route path={'/play'}>
            <Play/>
          <Route path={"/main"}>
          </Route>
            <Route path={"/"}
          <Route path={'/'}>
            <Navbar/>
          </Route>
        </Switch>
    </div>
  </Router>
  );
}

export default App;

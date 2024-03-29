import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Play from './Play';
import PlayOnline from './PlayOnline';
import Main from "./Main";
import About from "./About";
import Rooms from './Rooms';
import Login from './Login';
import Signup from './Signup';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={"/play"}>
            <Play/>
          </Route>
          <Route path={'/playOnline/:roomID'}>
            <PlayOnline/>
          </Route>
          <Route path={"/about"}>
            <About/>
          </Route>
          <Route path={"/rooms"}>
            <Rooms/>
          </Route>
          <Route path={"/login"}>
            <Login/>
          </Route>
          <Route path={"/signup"}>
            <Signup/>
          </Route>
          <Route path="/">
            <Main/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Play from './Play';
import Main from "./Main";
import About from "./About";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={"/play"}>
            <Play/>
          </Route>
          <Route path={"/about"}>
            <About/>
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
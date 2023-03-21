import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React from "react";
import Navbar from './Navbar';
import Play from './Play';


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <Router>
    <div className="App">
    <p>{!data ? "Loading..." : data}</p>
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

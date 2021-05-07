// React
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Play from './pages/Play';
import Random from './pages/Random';
import About from './pages/About';
// Components
import NavigationBar from './components/navigationBar';
// Styles
import "./components/css/styles.css";

function App() {
  return (
    <div className="App">
        <Router>
          {/** Navigation of the app */}
          <header>
            <NavigationBar/>
          </header>
          {/** Routes of the app */}
          <Switch>
            <Route path={["/", "/home"]} exact component={Home} />
            <Route path="/quiz" exact component={Quiz} />
            <Route path="/quiz/play/:number" exact component={Play} />
            <Route path="/quiz/random" exact component={Random} />
            <Route path="/about" exact component={About} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;

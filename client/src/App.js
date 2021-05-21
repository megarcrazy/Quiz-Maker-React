// React
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import SavedQuizMenu from './pages/SavedQuizMenu';
import PlaySavedQuiz from './pages/PlaySavedQuiz';
import PlayRandomQuiz from './pages/PlayRandomQuiz';
import About from './pages/About';
// Components
import NavigationBar from './components/navigationBar';
// Styles
import './components/css/styles.css';

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
            <Route path="/quiz" exact component={SavedQuizMenu} />
            <Route path="/quiz/play/:quizNumber" exact component={PlaySavedQuiz} />
            <Route path="/quiz/online" exact component={PlayRandomQuiz} />
            <Route path="/about" exact component={About} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;

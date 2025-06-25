// React
import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
// Pages
import Home from './pages/Home';
import MyQuizMenu from './pages/MyQuizMenu';
import PlaySavedQuiz from './pages/PlaySavedQuiz';
import EditSavedQuiz from './pages/EditSavedQuiz';
import AddNewQuiz from './pages/AddNewQuiz';
import PlayRandomQuiz from './pages/PlayRandomQuiz';
// Components
import NavigationBar from './components/navigationBar';


export default function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <NavigationBar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/my-quizzes" element={<MyQuizMenu />} />
          <Route path="/my-quizzes/play/:quizNumber" element={<PlaySavedQuiz />} />
          <Route path="/my-quizzes/edit/:quizNumber" element={<EditSavedQuiz />} />
          <Route path="/my-quizzes/add" element={<AddNewQuiz />} />
          <Route path="/random-online-quiz" element={<PlayRandomQuiz />} />
        </Routes>
      </Router>
    </div>
  );
}
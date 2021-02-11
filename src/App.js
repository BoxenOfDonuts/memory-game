import './App.css';
import Header from './components/Header/Header';
import Board from './components/Board/Board';

const App = () => {
  const mainTitle = 'Memory Game';

  return (
    <div className="main-app">
      <Header title={mainTitle} />
      <Board />
    </div>
  );
};

export default App;

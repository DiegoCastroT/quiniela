import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import {QuinielaProvider}  from "./providers/QuinielaProvider"

function App() {
  return (
    <QuinielaProvider>
      <Header/>
      <MainPage />
    </QuinielaProvider>
  );
}

export default App;

import './App.css';
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <div className="app-container" >
        <Header />
        <List />
        <Footer />
      </div>
    </div>
  );
}

export default App;

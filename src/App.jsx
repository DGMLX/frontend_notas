import './App.css'
import Header from './components/Header';
import AppContextProvider from './context/AppContextProvider';


import AppRouter from './router/AppRouter'
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

function App() {
  return (
    <AppContextProvider>
      <Header/>
      <AppRouter/>
    </AppContextProvider>
  )
}

export default App

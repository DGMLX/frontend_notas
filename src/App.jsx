import './App.css'
import Header from './components/Header';
import AppContextProvider from './context/AppContextProvider';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme.js';


import AppRouter from './router/AppRouter'
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppContextProvider>
        <Header/>
        <AppRouter/>
      </AppContextProvider>
    </ThemeProvider>
  )
}

export default App

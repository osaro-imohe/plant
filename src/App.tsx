import './App.css';
import { StyledEngineProvider } from '@mui/material/styles';
import Navigation from './components/navigation';

function App() {
  return (
    <StyledEngineProvider>
      <Navigation />
    </StyledEngineProvider>
  );
}

export default App;

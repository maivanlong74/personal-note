import { Routers } from './Routers';
import '@assets/css/app.scss';
import { ThemeProvider } from '@material-tailwind/react';
import { theme } from '@assets/themes';
import { AppWrapper } from '@contexts/AppContext';

function App() {
  return (
    <ThemeProvider value={theme}>
      <AppWrapper>
        <Routers />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;

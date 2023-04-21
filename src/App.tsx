import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { AuthProvider } from './hooks/useAuth';
import AppRouter from './AppRouter';

import './styles/index.css';
import 'antd/dist/antd.less';

const App: FC = () => {
  const language = navigator.language.split(/[-_]/)[0];

  return (
    <IntlProvider defaultLocale="en" locale={language}>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;

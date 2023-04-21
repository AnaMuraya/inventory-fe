import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { trns } from './messages';

const NotFound:FC = memo(() => (
  <div className="text-center mx-auto pt-28">
    <div className="h-8 w-32 mx-auto mb-8">
      <img src="/logo.png" alt="MarineMax" className="block mx-auto w-full h-auto" />
    </div>
    <h1 className="text-6xl">404</h1>
    <p><FormattedMessage {...trns.description} /></p>
    <Link to="/"><FormattedMessage {...trns.homeLink} /></Link>
  </div>
));

NotFound.displayName = 'NotFound';

export default NotFound;

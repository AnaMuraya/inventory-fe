import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { trns } from './messages';

const LocationsContainer: FC = memo(() => (
  <div>
    <FormattedMessage {...trns.modelBoatsPage} />
  </div>
));

LocationsContainer.displayName = 'LocationsContainer';

export default LocationsContainer;

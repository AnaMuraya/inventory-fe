import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { trns } from './messages';

const SettingsContainer: FC = memo(() => (
  <div>
    <FormattedMessage {...trns.users} />
  </div>
));

SettingsContainer.displayName = 'SettingsContainer';

export default SettingsContainer;

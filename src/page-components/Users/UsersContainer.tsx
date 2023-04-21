import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { trns } from './messages';

const UsersContainer: FC = memo(() => (
  <div>
    <FormattedMessage {...trns.users} />
  </div>
));

UsersContainer.displayName = 'UsersContainer';

export default UsersContainer;

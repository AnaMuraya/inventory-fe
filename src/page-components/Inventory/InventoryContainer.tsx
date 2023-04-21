import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { trns } from './messages';

const InventoryContainer: FC = memo(() => (
  <div>
    <FormattedMessage {...trns.inventory} />
  </div>
));

InventoryContainer.displayName = 'InventoryContainer';

export default InventoryContainer;

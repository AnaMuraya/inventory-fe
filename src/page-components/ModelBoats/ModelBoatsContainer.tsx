import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { trns } from './messages';

const ModelBoatsContainer: FC = memo(() => (
  <div>
    <FormattedMessage {...trns.modelBoatsPage} />
  </div>
));

ModelBoatsContainer.displayName = 'ModelBoatsContainer';

export default ModelBoatsContainer;

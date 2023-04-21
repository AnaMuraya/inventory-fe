import { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { trns } from './messages';

const ComplianceContainer: FC = memo(() => (
  <div>
    <FormattedMessage {...trns.compliance} />
  </div>
));

ComplianceContainer.displayName = 'ComplianceContainer';

export default ComplianceContainer;

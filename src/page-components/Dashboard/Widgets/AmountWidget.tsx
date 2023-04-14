import { FC, memo } from 'react';
import cn from 'classnames';

interface Props {
  label: string;
  value: string | number;
  highlighted?: boolean;
}

const AmountWidget:FC<Props> = memo(({
  label,
  value,
  highlighted
}) => {
  return (
    <div className="px-2 py-4 rounded flex flex-col items-center justify-center bg-white text-center">
      <div className={cn('text-5xl my-2 font-semibold', {
        'text-blue7': !highlighted,
        'text-red6': highlighted
      })}>{value}</div>
      <div className="text-gray8 text-xs uppercase">{label}</div>
    </div>
  )
});

AmountWidget.displayName = 'AmountWidget';

export default AmountWidget;
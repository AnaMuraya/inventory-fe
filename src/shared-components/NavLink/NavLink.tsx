import { FC, memo } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import cn from 'classnames';

interface Props extends LinkProps {
  label: string;
  icon: JSX.Element;
}

const ActiveLink: FC<Props> = memo(({ to, label, icon,  ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      {...props}
      className={cn('flex items-center w-full py-3 px-4 text-gray9 bg-white', {
        'bg-blue1 text-blue7 rounded': match
      })}
    >
      <span className={cn('flex items-center', {
        'text-blue7': match
      })}>
        {icon}<span className="ml-3">{label}</span>
      </span>
    </Link>
  );
});

ActiveLink.displayName = 'ActiveLink';

export default ActiveLink;

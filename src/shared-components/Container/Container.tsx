import { FC, memo } from 'react';


const Container: FC = memo(({ children }) => {
  return (
    <div className="min-h-[360px]">{children}</div>
  )
});

Container.displayName = 'Container';

export default Container;

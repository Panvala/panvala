import * as React from 'react';
import Link from 'next/link';
import A from './A';

interface IProps {
  children: any;
  href: string;
  as?: string;
  newTab?: boolean;
  disabled?: boolean;
}

const RouterLink: React.SFC<IProps> = ({ children, href, as, newTab, disabled }) => {
  return (
    <>
      {disabled ? (
        children
      ) : (
        <Link prefetch={process.env.NODE_ENV !== 'test'} passHref href={href} as={as}>
          <A className="link" target={newTab ? '_blank' : undefined}>
            {children}
          </A>
        </Link>
      )}
    </>
  );
};

export default RouterLink;

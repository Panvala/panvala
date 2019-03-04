import * as React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Image from './Image';
import Button from './Button';

const Header: React.FunctionComponent = ({ router }: any) => {
  return (
    <header className="mb4">
      <nav>
        <div className="flex justify-between items-center">
          <div className="flex">
            <Link passHref href="/">
              <a className="link">
                <Image src="/static/logo-black.svg" alt="panvala logo" />
              </a>
            </Link>
          </div>
          <div className="flex justify-end">
            <Link passHref href="/">
              <a className="link">
                <Button active={router && router.pathname === '/'}>{'Slates'}</Button>
              </a>
            </Link>
            <Link passHref href="/proposals">
              <a className="link">
                <Button active={router && router.pathname.startsWith('/proposals')}>
                  {'Proposals'}
                </Button>
              </a>
            </Link>
            <Link passHref href="/ballots">
              <a className="link">
                <Button active={router && router.pathname.startsWith('/ballots')}>
                  {'Ballots'}
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default withRouter(Header);

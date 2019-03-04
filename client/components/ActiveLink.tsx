import { withRouter } from 'next/router';

// typically you want to use `next/link` for this usecase
// but this example shows how you can also access the router
// using the withRouter utility.

const ActiveLink = ({ children, router, href }: { children: any; router: any; href: string }) => {
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black',
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};

export default withRouter(ActiveLink);

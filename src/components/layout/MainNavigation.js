import { Navbar } from "./Navbar";

export const MainNavigation = ({children}) => {
  const links = [
    {
      path: '/conversion',
      content: 'Currency Conversion'
    },
    {
      path: '/history',
      content: 'Conversion History'
    },
  ];
  return (
    <>
      <Navbar navLinks={links}/>
      <main className="min-h-screen px-8 bg-stone-300">{children}</main>
    </>
  );
};
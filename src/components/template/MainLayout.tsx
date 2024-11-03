import Navbar from "../organism/Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="sticky">
        <Navbar></Navbar>
      </nav>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};

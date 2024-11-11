import Navbar from "../organism/Navbar";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <nav className="sticky">
        <Navbar></Navbar>
      </nav> */}
      <main className="text-white">{children}</main>
      <footer>footer</footer>
    </>
  );
};

export default MainLayout;

import HeaderComponent from "../organism/header/Header";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header id="header">
        <HeaderComponent />
      </header>
      <main className="text-white w-screen">{children}</main>
    </>
  );
};

export default MainLayout;

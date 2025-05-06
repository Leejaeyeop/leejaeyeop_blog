const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="text-white w-screen">{children}</main>
    </>
  );
};

export default MainLayout;

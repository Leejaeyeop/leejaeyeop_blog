import { useTheaterScreenStore } from "@/store/useTheaterScreenStore";

const Navbar = () => {
  const { currentScreen, setCurrentScreen } = useTheaterScreenStore();
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-zinc-800 backdrop-blur-md gap-6 py-16 px-16 border-b border-white/60 mix-blend-difference text-white pointer-events-auto">
      <ul className="flex leading-10 gap-40 list-none text-6xl italic hover:cursor-pointer">
        <li
          className={`font-bold inline align-middle mr-2 before:content-['•'] before:mr-2 hover:opacity-100 ${
            currentScreen === "main" ? "opacity-100" : "opacity-60"
          }`}
          onClick={() => setCurrentScreen("main")}
        >
          Main
        </li>
        <li
          className={`font-bold inline align-middle mr-2 before:content-['•'] before:mr-2 hover:opacity-100 ${
            currentScreen === "about" ? "opacity-100" : "opacity-60"
          }`}
          onClick={() => setCurrentScreen("about")}
        >
          About
        </li>
        <li
          className={`font-bold inline align-middle mr-2 before:content-['•'] before:mr-2 hover:opacity-100 ${
            currentScreen === "experience" ? "opacity-100" : "opacity-60"
          }`}
          onClick={() => setCurrentScreen("experience")}
        >
          Experience
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

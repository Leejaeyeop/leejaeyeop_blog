import { useTheaterScreenStore } from "@/store/useTheaterScreenStore";
import { Playfair } from "next/font/google";
const playfair = Playfair({
  weight: ["800"],
  style: ["italic"],
  display: "swap",
  subsets: ["latin"],
});
type NavItem = {
  id: "main" | "about" | "experience" | "contact";
  label: string;
};

const navItems: NavItem[] = [
  { id: "main", label: "Main" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const Navbar = ({ className }: { className?: string }) => {
  const { currentScreen, setCurrentScreen } = useTheaterScreenStore();

  return (
    <ul
      className={`flex w-full justify-center leading-10 gap-40 list-none text-4xl italic hover:cursor-pointer ${className} ${playfair.className}`}
    >
      {navItems.map(item => (
        <li
          key={item.id}
          className={`font-bold align-middle mr-2 h-24 flex items-center justify-center before:content-['•'] before:mr-2 hover:opacity-100 ${
            currentScreen === item.id ? "opacity-100" : "opacity-60"
          }`}
          onClick={() => setCurrentScreen(item.id)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default Navbar;

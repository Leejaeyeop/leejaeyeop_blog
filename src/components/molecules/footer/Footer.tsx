import { Courgette } from "next/font/google";
const courgette = Courgette({
  weight: ["400"],
  subsets: ["latin"],
});
const Footer = () => {
  return (
    <footer
      className={courgette.className + " font-extrabold text-9xl h-96 m-40"}
    >
      Thank you!
    </footer>
  );
};

export default Footer;

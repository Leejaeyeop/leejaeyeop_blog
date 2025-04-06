import { Loader } from "lucide-react";

const Pending = () => {
  return (
    <div className="w-full h-full absolute z-10 opacity-90 backdrop-blur-2xl bg-white/30 flex items-center flex-col justify-center text-lg">
      <Loader className="size-1/6 animate-spin shrink-0" />
      please wait...
    </div>
  );
};

export default Pending;

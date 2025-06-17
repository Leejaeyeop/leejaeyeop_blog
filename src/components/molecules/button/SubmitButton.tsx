import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-2xl w-32 h-12 font-semibold bg-white text-black rounded-md flex items-center justify-center disabled:opacity-50"
    >
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

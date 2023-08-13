import { useStatusProvider } from "@/providers/status";

const Button = ({ text, handler, disabled, bg = "bg-primary" }) => {
  const [status] = useStatusProvider();

  return (
    <button
      disabled={status || disabled}
      onClick={handler}
      className={`text-white ${bg} py-3 px-8 rounded-md font-semibold`}
    >
      {text}
    </button>
  );
};

export default Button;

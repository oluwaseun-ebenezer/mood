import { useStatusProvider } from "@/providers/status";

const Input = ({ placeholder, changehandler, field, form, type = "text" }) => {
  const [status] = useStatusProvider();

  return (
    <input
      disabled={status}
      placeholder={placeholder}
      type={type}
      name={field}
      className="rounded-xl py-4 px-10 w-full text-primary text-md bg-white border border-primary focus:outline-primary"
      value={form[field]}
      onChange={(e) => changehandler(field, e.target.value)}
    />
  );
};

export default Input;

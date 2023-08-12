const Button = ({ text, handler, bg = "bg-primary" }) => {
  return (
    <button
      onClick={handler}
      className={`text-white ${bg} py-3 px-8 rounded-md`}
    >
      {text}
    </button>
  );
};

export default Button;

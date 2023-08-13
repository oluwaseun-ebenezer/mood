const Error = ({ text }) => {
  return (
    <p className="text-center gap-12 py-3 px-16 font-bold text-red-800 bg-red-800 bg-opacity-10 rounded-3xl inline">
      {text}
    </p>
  );
};

export default Error;

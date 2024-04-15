const Ribbon = ({ tag }) => {
  return (
    <div className=" absolute top-[20px] left-[-25px] bg-red-400 z-20 px-10 -rotate-45 font-semibold text-base ">
      {tag}
    </div>
  );
};

export default Ribbon;

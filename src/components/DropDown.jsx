import { BiLogOut } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const DropDown = ({ isAccountOpen, handleSignout }) => {
  return (
    <div
      className={`dropDownOpened absolute -bottom-[84px] right-0 bg-[#0D1117] rounded-lg w-44 flex items-center justify-center overflow-hidden ${
        isAccountOpen ? "h-20 border border-gray-800" : "h-0 invisible"
      }`}
    >
      <button onClick={handleSignout}
        className="dropDownOpened p-2 rounded-lg transition-all duration-300 hover:bg-gray-700 flex items-center gap-2 text-xl leading-none"
        type="button"
        title="Logout"
      >
        <BiLogOut className="text-2xl" /> Logout
      </button>
    </div>
  );
};

export default DropDown;

import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineTransaction, AiOutlineInbox } from "react-icons/ai";
import { RiCopperCoinFill } from "react-icons/ri";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Applications", icon: AiOutlineTransaction },
    { title: "Menu1", icon: AiOutlineInbox },
    { title: "Menu2", icon: AiOutlineInbox },
  ];
  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-300 min-h-screen p-5 pt-8 bg-gray-100 relative`}
    >
      <IoIosArrowBack
        className={`absolute cursor-pointer -right-3 top-9 w-5 h-5 border-2 border-gray-700 bg-red rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <RiCopperCoinFill
          className={`cursor-pointer duration-500 text-2xl ${
            open && "rotate-[360deg]"
          }`}
        />
        <span>
          <h1
            className={`text-gray-800 font-medium text-xl  ${
              !open && "hidden"
            }  origin-left duration-200`}
          >
            Loan Management
          </h1>{" "}
        </span>
      </div>
      <ul className="pt-6">
        {Menus.map((menu, id) => {
          const Icon = menu.icon;
          return (
            <li
              key={id}
              className={`text-gray-700 text-sm flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 ${
                id === 0 ? "bg-neon hover:bg-darkneon" : "hover:bg-gray-300"
              }`}
            >
              <Icon className="text-xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

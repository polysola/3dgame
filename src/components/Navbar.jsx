import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className='w-12 h-12 object-contain' />
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='https://t.me/PhoeniXRP_Portal' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          TG
        </NavLink>
        <NavLink to='https://x.com/PhoeniXRP_app' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          X
        </NavLink>
        <NavLink to='https://firstledger.net/' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Buy
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;

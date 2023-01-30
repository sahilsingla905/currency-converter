import { NavLink } from "react-router-dom";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

export const Navbar = ({navLinks}) => {
  return (
    <nav className="px-40">
      <ul className="flex items-center w-full h-16 gap-12 px-5">
        <li className="mx-3">
          <NavLink to="/" className="text-sky-400 !border-0">
            <CurrencyExchangeIcon />&nbsp;Currency Exchange
          </NavLink>
        </li>
        {
          navLinks.map((link) => {
            return (
              <li key={link.path} className="">
                <NavLink to={link.path} className="pb-5">{link.content}</NavLink>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
};
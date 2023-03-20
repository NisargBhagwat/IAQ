import React, { useState } from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../routes";


const AppHeaderDropdown = () => {
  const [toggleHeader, setToggleHeader] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    localStorage.clear();
    dispatch(clearToken());
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        Profile
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          {isAuth ? (
            <Link
              className="menu__btn btn btn_green btn_wide"
              to={`/${login}`}
              onClick={() => {
                setToggleHeader(false);
                logOutHandler();
              }}
            >
              Logout
            </Link>
          ) : (
            <Link
              className="menu__btn btn btn_green btn_wide"
              to={`/${login}`}
              onClick={() => {
                setToggleHeader(false);
                logOutHandler();
              }}
            >
              Logout
            </Link>
          )}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;

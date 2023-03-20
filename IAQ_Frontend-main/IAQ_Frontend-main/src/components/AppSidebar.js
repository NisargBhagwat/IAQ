import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Image } from "antd";
import { AppSidebarNav } from "./AppSidebarNav";

import logo from "../assets/HelixLogo.png";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../_nav";

const AppSidebar = ({ showSidebar }) => {
  return (
    <CSidebar
      position="fixed"
      visible={showSidebar}
      style={{ backgroundColor: "#4f5d73" }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logo} height={35} /> */}
        <Image
          className="sidebar-brand-full"
          height={50}
          width={150}
          src={logo}
          preview={false}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);

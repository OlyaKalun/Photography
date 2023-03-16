import { BurgerMenuIcon, CloseIcon, LogoIcon } from "@/assets/icons";
import { Button, Drawer, DrawerProps, Menu, MenuProps } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { Layout } from "antd";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { useBreakpointValue } from "@/hooks/useBreakpointValue";

const { Header: AntHeader } = Layout;

const items: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "/",
  },
  {
    label: <Link href="/gallery">Gallery</Link>,
    key: "/gallery",
  },
  {
    label: <Link href="/about">About</Link>,
    key: "/about",
  },
];

export const Header = () => {
  const { pathname } = useRouter();
  const isMobile = useBreakpointValue(["xxxs", "xxs", "xs", "sm"]);
  const isSmallMobile = useBreakpointValue(["xxxs", "xxs"]);

  const [current, setCurrent] = useState<string>(pathname);
  const [openMenu, setOpenMenu] = useState(false);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const showDrawer = () => {
    setOpenMenu(true);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <AntHeader className={styles.header}>
      <Link href="/" className={styles.dFlex}>
        <LogoIcon />
      </Link>
      {!isMobile ? (
        <>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className={styles.navMenu}
          />
          <Button type="primary" className={styles.btnLogin}>
            Login
          </Button>
        </>
      ) : (
        <>
          <Button
            shape="circle"
            onClick={showDrawer}
            icon={<BurgerMenuIcon />}
            className={styles.btnBurgerMenu}
          />
          <Drawer
            placement="left"
            closable={false}
            onClose={closeMenu}
            open={openMenu}
            key="left"
            width={isSmallMobile ? "100%" : "375px"}
            className={styles.drawer}
          >
            <div className={styles.sidebarHeader}>
              <Link href="/" className={styles.dFlex}>
                <LogoIcon />
              </Link>
              <Button
                shape="circle"
                onClick={closeMenu}
                icon={<CloseIcon />}
                className={styles.btnBurgerMenu}
              />
            </div>
            <Menu
              onClick={onClick}
              selectedKeys={[current]}
              mode="vertical"
              items={items}
              className={styles.sidebarMenu}
            />
            <Button type="primary" className={styles.btnLogin}>
              Login
            </Button>
          </Drawer>
        </>
      )}
    </AntHeader>
  );
};

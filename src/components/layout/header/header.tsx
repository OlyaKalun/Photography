import { BurgerMenuIcon, CloseIcon, LogoIcon } from "@/assets/icons";
import { Button, Drawer, Menu, MenuProps } from "antd";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { Layout } from "antd";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { useBreakpointValue } from "@/hooks/useBreakpointValue";
import { LoginModalContext } from "../../../context/modal.context";
import { useSession, signOut } from "next-auth/react";

const { Header: AntHeader } = Layout;

type GetItems = ({ statusAuth }: { statusAuth: boolean }) => MenuProps["items"];

const getItems: GetItems = ({ statusAuth }) => {
  const items = [
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

  if (statusAuth) {
    items.push({
      label: <Link href="/profile">Profile</Link>,
      key: "/profile",
    });
  }

  return items;
};

export const Header = () => {
  const { pathname } = useRouter();
  const isMobile = useBreakpointValue(["xxxs", "xxs", "xs", "sm"]);
  const isSmallMobile = useBreakpointValue(["xxxs", "xxs"]);

  const [current, setCurrent] = useState<string>(pathname);
  const [openMenu, setOpenMenu] = useState(false);

  const [statusAuth, setStatusAuth] = useState(false);

  const { status } = useSession();

  const router = useRouter();

  const handleSignOutOAuth = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const showDrawer = () => {
    setOpenMenu(true);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const { toggleModal } = useContext(LoginModalContext);

  useEffect(() => {
    if (status === "authenticated") {
      setStatusAuth(true);
    } else {
      setStatusAuth(false);
    }
  }, [status]);

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
            items={getItems({ statusAuth })}
            className={styles.navMenu}
          />
          {statusAuth ? (
            <Button
              type="primary"
              className={styles.btnLogin}
              onClick={handleSignOutOAuth}
            >
              Sign Out
            </Button>
          ) : (
            <Button
              type="primary"
              className={styles.btnLogin}
              onClick={toggleModal}
            >
              Login
            </Button>
          )}
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
              items={getItems({ statusAuth })}
              className={styles.sidebarMenu}
            />
            {statusAuth ? (
              <Button
                type="primary"
                className={styles.btnLogin}
                onClick={handleSignOutOAuth}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                type="primary"
                className={styles.btnLogin}
                onClick={toggleModal}
              >
                Login
              </Button>
            )}
          </Drawer>
        </>
      )}
    </AntHeader>
  );
};

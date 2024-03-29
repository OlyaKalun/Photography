import Head from "next/head";
import styles from "@/styles/main.module.css";

import { ConfigProvider, Layout as AntLayout } from "antd";
import React from "react";
import { LayoutProps } from "./types";
import { Header } from "./header/header";

const { Content } = AntLayout;

export const Layout = (props: LayoutProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#0000008c",
            colorPrimaryBorderHover: "#ffffff",
          },
        },
      }}
    >
      <Head>
        <title>OPhotography</title>
        <meta name="description" content="Website OPhotography" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AntLayout className={styles.layout}>
        <div className={styles.container}>
          <Header />
          <Content>{props.children}</Content>
        </div>
      </AntLayout>
    </ConfigProvider>
  );
};

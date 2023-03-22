import { Layout } from "@/components/layout";
import React from "react";
import { Button, Input, Tabs } from "antd";
import styles from "./style.module.scss";
import { PlayCircleIcon, SearchIcon } from "@/assets/icons";
import { Typography } from "antd";
import type { TabsProps } from "antd";
// import { SliderEffectCoverflow } from "@/components/slider";
import { SwiperSlide } from "swiper/react";
import { SliderEffectCoverflow } from "@/components/slider";
import { natures, portraits, travells } from "@/MOCK";
import { HeadMetaTags } from "@/components/head-meta-tags/head-meta-tags";

const { Title } = Typography;
const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Portraits`,
    children: (
      <SliderEffectCoverflow>
        {portraits?.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              style={{
                backgroundImage: `url(${item.img.src})`,
                backgroundSize: "cover",
              }}
            ></SwiperSlide>
          );
        })}
      </SliderEffectCoverflow>
    ),
  },
  {
    key: "2",
    label: `Nature`,
    children: (
      <SliderEffectCoverflow>
        {natures?.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              style={{
                backgroundImage: `url(${item.img.src})`,
                backgroundSize: "cover",
              }}
            ></SwiperSlide>
          );
        })}
      </SliderEffectCoverflow>
    ),
  },
  {
    key: "3",
    label: `Travells`,
    children: (
      <SliderEffectCoverflow>
        {travells?.map((item) => {
          return (
            <SwiperSlide
              key={item.id}
              style={{
                backgroundImage: `url(${item.img.src})`,
                backgroundSize: "cover",
              }}
            ></SwiperSlide>
          );
        })}
      </SliderEffectCoverflow>
    ),
  },
];

const Home = () => {
  return (
    <>
      <HeadMetaTags
        metaTitle="OPhotography"
        metaDescription="【OPhotography】- is a photographer who will save your moments correctly and provide quality services."
      />
      <Layout>
        <div className={styles.homeContainer}>
          <Button
            shape="circle"
            icon={<PlayCircleIcon />}
            className={styles.btnPlayCircle}
          />
          <Title className={styles.homeTitle}>OPhotography Studio</Title>
          <div className={styles.dCenter}>
            <div className={styles.inputWrapper}>
              <SearchIcon />
              <Input placeholder="Search" rootClassName={styles.inputSearch} />
            </div>
          </div>
          <Tabs
            defaultActiveKey="1"
            items={items}
            rootClassName={styles.tabsWrapper}
          />
        </div>
      </Layout>
    </>
  );
};

export default Home;

import { Layout } from "@/components/layout";
import React, { useState } from "react";
import { Button, Input, Tabs } from "antd";
import styles from "./style.module.scss";
import { PlayCircleIcon, SearchIcon } from "@/assets/icons";
import { Typography } from "antd";
import type { TabsProps } from "antd";
import { SwiperSlide } from "swiper/react";
import { SliderEffectCoverflow } from "@/components/slider";
import { animals, natures, portraits, travells } from "@/MOCK";
import { HeadMetaTags } from "@/components/head-meta-tags/head-meta-tags";
import { StaticImageData } from "next/image";

const { Title } = Typography;

interface Photo {
  id: number;
  img: StaticImageData;
  tags: string[];
}

type GetItems = (
  portraits: Photo[],
  natures: Photo[],
  travells: Photo[],
  animals: Photo[]
) => TabsProps["items"];
const getItems: GetItems = (portraits, natures, travells, animals) => {
  const items: TabsProps["items"] = [];
  if (portraits.length) {
    items.push({
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
    });
  }

  if (natures.length) {
    items.push({
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
    });
  }

  if (natures.length) {
    items.push({
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
    });
  }

  if (animals.length) {
    items.push({
      key: "4",
      label: `Animals`,
      children: (
        <SliderEffectCoverflow>
          {animals?.map((item) => {
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
    });
  }
  return items;
};

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredPortraits = portraits.filter((portrait) => {
    const tags = portrait.tags.filter((tag) => tag.includes(searchValue));
    return tags.length;
  });

  const filteredNatures = natures.filter((nature) => {
    const tags = nature.tags.filter((tag) => tag.includes(searchValue));
    return tags.length;
  });

  const filteredTravells = travells.filter((travell) => {
    const tags = travell.tags.filter((tag) => tag.includes(searchValue));
    return tags.length;
  });

  const filteredAnimals = animals.filter((animal) => {
    const tags = animal.tags.filter((tag) => tag.includes(searchValue));
    return tags.length;
  });

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
              <Input
                placeholder="Search"
                rootClassName={styles.inputSearch}
                value={searchValue}
                onChange={handleChangeValue}
              />
            </div>
          </div>
          <Tabs
            defaultActiveKey="1"
            items={
              searchValue.length
                ? getItems(
                    filteredPortraits,
                    filteredNatures,
                    filteredTravells,
                    filteredAnimals
                  )
                : getItems(portraits, natures, travells, animals)
            }
            rootClassName={styles.tabsWrapper}
          />
        </div>
      </Layout>
    </>
  );
};

export default Home;

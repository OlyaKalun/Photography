import React from "react";
import { Layout } from "@/components/layout";
import { HeadMetaTags } from "@/components/head-meta-tags/head-meta-tags";
import { Button, Image } from "antd";
import { portraits } from "@/MOCK";
import styles from "./style.module.scss";
import JSZip from "jszip";
import { DownloadCloudIcon } from "@/assets/icons";

const Profile = () => {
  const handleDownload = async () => {
    const promises = portraits.map(async (url) => {
      const res = await fetch(url.img.src);
      const blob = await res.blob();
      return blob;
    });

    const res = await Promise.all(promises);

    const zip = new JSZip();

    res.forEach((blob, index) => {
      zip.file(`image${index + 1}.jpg`, blob);
    });

    const zipFile = await zip.generateAsync({ type: "blob" });

    downloadZip(zipFile);
  };

  function downloadZip(file) {
    const a = document.createElement("a");
    a.download = "photo.zip";

    const url = URL.createObjectURL(file);

    a.href = url;

    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <>
      <HeadMetaTags
        metaTitle="OPhotography"
        metaDescription="【OPhotography】My account."
      />
      <Layout>
        <div>
          <div className={styles.downloadWrapper}>
            <Button
              type="primary"
              className={styles.btnDownload}
              onClick={handleDownload}
              icon={<DownloadCloudIcon />}
            >
              Download all
            </Button>
          </div>
          <div className={styles.imgWrapper}>
            {portraits.map((item) => {
              return (
                <Image
                  src={item.img.src}
                  alt="preview"
                  key={item.id}
                  className={styles.imgContent}
                />
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;

"use client";

import Text from "@/components/Text";
import { TestProps } from "@/utils/services/api";
import "./styles.scss";
import Image from "next/image";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";

export const TestsLayout = ({ code, name, description, image }: TestProps) => {
  const isMobile = useMediaQuery("(max-width: 920px)");

  return (
    <div className="d-flex flex-column gap-24">
      <div className="test-layout">
        <div className={`d-flex gap-8 ${isMobile ? "flex-column" : "align-items-center"}`}>
          <Text className="f-24 semi-bold">{code}</Text>
          <Text className="f-18 light">{name}</Text>
        </div>
        <div className="d-flex gap-8 flex-column">
          <Text styles={{ whiteSpace: 'pre-line' }} className="f-18 light">{description}</Text>
        </div>
      </div>
      {image &&
        <div className="w-100" style={{ maxWidth: isMobile ? "100%" : "300px" }}>
          <Image src={image} alt="Imagem do teste" style={{ objectFit: 'cover' }} />
        </div>
      }
    </div>
  );
};

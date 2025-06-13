"use client";

import Text from "@/components/Text";
import { TestProps } from "@/utils/services/api";
import "./styles.scss";

export const TestsLayout = ({ code, name, description }: TestProps) => {
  return (
    <div className="d-flex flex-column gap-24">
      <div className="test-layout">
        <div className="d-flex align-items-center gap-8">
          <Text className="f-24 semi-bold">{code}</Text>
          <Text className="f-18 light">{name}</Text>
        </div>
        <div className="d-flex gap-8 flex-column">
          <Text className="f-18 light">{description}</Text>
        </div>
      </div>
    </div>
  );
};

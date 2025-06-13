"use client";

import React from "react";
import "./styles.scss";
import Text from "@/components/Text";

export default function PageLoading() {
  return (
    <div className="container">
      {/* <ReactLoading type="spin" color="#D9D9D9" height={22} width={22} /> */}
      <Text className="f-14 gray2-text light">Carregando informações</Text>
    </div>
  );
}

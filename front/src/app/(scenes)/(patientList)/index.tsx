"use client";

import "./styles.scss";
/* import searchFile from "../../../../public/file-search.svg";
import Image from "next/image"; */
import { Table } from "@/components/Table";
import { useState } from "react";
import Text from "@/components/Text";
import { SearchBar } from "@/components/SearchBar";
import Button from "@/components/Button";
import colors from "@/styles/colors.module.scss";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { toast } from "sonner";
import { patientsList } from "@/utils/services/api";

export default function Index(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");
  const isMobile = useMediaQuery("(max-width: 920px)");

  return (
    <div className="container">
      <div className="d-flex flex-column gap-32">
        <div className="d-flex flex-column gap-24">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <Text className="f-24 semi-bold">Lista de pacientes</Text>
            {!isMobile && (
              <Button
                icon="RiAddLine"
                fill={colors.white}
                iconSize={20}
                className="primary"
                onClick={
                  () => toast("Em breve!") /* router.push("/patient/create") */
                }
              >
                <Text color={colors.white} className="semi-bold f-14">
                  Adicionar
                </Text>
              </Button>
            )}
          </div>
          {isMobile && (
            <Button
              icon="RiAddLine"
              fill={colors.white}
              iconSize={24}
              fluid
              className="primary"
              onClick={
                () => toast("Em breve!") /* router.push("/patient/create") */
              }
            >
              <Text color={colors.white} className="semi-bold">
                Adicionar
              </Text>
            </Button>
          )}
          <SearchBar
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Busque por um paciente"
          />
        </div>
        <Table data={patientsList} searchTerm={searchValue} startups={false} />
      </div>
    </div>
  );
}

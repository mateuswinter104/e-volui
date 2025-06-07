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

const patientsList = [
  {
    name: "Maria Oliveira",
    age: 67,
    sex: "Feminino",
    diagnosis: "Osteoporose no joelho direito",
  },
  {
    name: "João Ferreira",
    age: 62,
    sex: "Masculino",
    diagnosis: "Hérnia de disco lombar",
  },
  {
    name: "Ana Beatriz Silva",
    age: 73,
    sex: "Feminino",
    diagnosis: "Tendinite no ombro esquerdo",
  },
  {
    name: "Carlos Eduardo Souza",
    age: 69,
    sex: "Masculino",
    diagnosis: "Artrose bilateral de joelhos",
  },
  {
    name: "Luciana Ribeiro",
    age: 64,
    sex: "Feminino",
    diagnosis: "Lesão de LCA no joelho direito",
  },
  {
    name: "Fernando Gomes",
    age: 69,
    sex: "Masculino",
    diagnosis: "Entorse de tornozelo esquerdo",
  },
  {
    name: "Juliana Mendes",
    age: 61,
    sex: "Feminino",
    diagnosis: "Bursite trocantérica",
  },
  {
    name: "Ricardo Martins",
    age: 65,
    sex: "Masculino",
    diagnosis: "Compressão do nervo ciático",
  },
  {
    name: "Patrícia Lima",
    age: 70,
    sex: "Feminino",
    diagnosis: "Fibromialgia",
  },
  {
    name: "Marcelo Castro",
    age: 68,
    sex: "Masculino",
    diagnosis: "Escoliose leve",
  },
  {
    name: "Tatiane Rocha",
    age: 75,
    sex: "Feminino",
    diagnosis: "Síndrome do impacto no ombro direito",
  },
  {
    name: "Diego Alves",
    age: 63,
    sex: "Masculino",
    diagnosis: "Lombalgia crônica",
  },
  {
    name: "Helena Costa",
    age: 66,
    sex: "Feminino",
    diagnosis: "Artrite reumatoide",
  },
  {
    name: "Fábio Nogueira",
    age: 61,
    sex: "Masculino",
    diagnosis: "Degeneração de disco intervertebral",
  },
  {
    name: "Rafaela Monteiro",
    age: 67,
    sex: "Feminino",
    diagnosis: "Cervicalgia com radiculopatia",
  },
];

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

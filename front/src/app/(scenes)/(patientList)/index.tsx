"use client";

import "./styles.scss";
/* import searchFile from "../../../../public/file-search.svg";
import Image from "next/image"; */
import { Table } from "@/components/Table";
import { useState } from "react";
import Text from "@/components/Text";
import { SearchBar } from "@/components/SearchBar";

const patientsList = [
  {
    name: "Maria Oliveira",
    age: 67,
    sex: "Feminino",
    diagnosis: "Osteoporose no joelho direito",
  },
  {
    name: "João Ferreira",
    age: 52,
    sex: "Masculino",
    diagnosis: "Hérnia de disco lombar",
  },
  {
    name: "Ana Beatriz Silva",
    age: 43,
    sex: "Feminino",
    diagnosis: "Tendinite no ombro esquerdo",
  },
  {
    name: "Carlos Eduardo Souza",
    age: 59,
    sex: "Masculino",
    diagnosis: "Artrose bilateral de joelhos",
  },
  {
    name: "Luciana Ribeiro",
    age: 34,
    sex: "Feminino",
    diagnosis: "Lesão de LCA no joelho direito",
  },
  {
    name: "Fernando Gomes",
    age: 29,
    sex: "Masculino",
    diagnosis: "Entorse de tornozelo esquerdo",
  },
  {
    name: "Juliana Mendes",
    age: 41,
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
    age: 50,
    sex: "Feminino",
    diagnosis: "Fibromialgia",
  },
  {
    name: "Marcelo Castro",
    age: 38,
    sex: "Masculino",
    diagnosis: "Escoliose leve",
  },
  {
    name: "Tatiane Rocha",
    age: 45,
    sex: "Feminino",
    diagnosis: "Síndrome do impacto no ombro direito",
  },
  {
    name: "Diego Alves",
    age: 33,
    sex: "Masculino",
    diagnosis: "Lombalgia crônica",
  },
  {
    name: "Helena Costa",
    age: 56,
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
    age: 47,
    sex: "Feminino",
    diagnosis: "Cervicalgia com radiculopatia",
  },
];

export default function Index(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="container">
      <div className="d-flex flex-column gap-40">
        <div className="d-flex flex-column gap-24">
          <Text className="f-24 bold">Lista de pacientes</Text>
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

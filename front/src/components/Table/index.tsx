"use client";

import { useState, useEffect } from "react";
import Text from "../Text";
import Icon from "../Icon";
import "./styles.scss";
import "react-multi-carousel/lib/styles.css";
import { CardItem } from "./components/CardItem";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";

interface ItemProps {
  name: string;
  age: number;
  diagnosis: string;
  sex: string;
  id: number
}

interface Table {
  data?: ItemProps[];
  searchTerm?: string;
  theme?: "light" | "dark";
  exportData?: boolean;
  startups?: boolean;
}

export const Table: React.FC<Table> = ({ data, searchTerm }) => {
  const isBigScreen = useMediaQuery("(min-width: 1440px)");
  const ITEMS_PER_PAGE = isBigScreen ? 12 : 9;

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = ITEMS_PER_PAGE;

  function normalizeText(text: string) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const filteredData = data?.filter((item) => {
    const search = normalizeText(searchTerm || "");

    return (
      normalizeText(item.name || "").includes(search) ||
      normalizeText(item.diagnosis || "").includes(search) ||
      normalizeText(item.age?.toString() || "").includes(search)
    );
  });


  const totalPages =
    filteredData && Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (!totalPages) return;
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData?.slice(startIndex, endIndex);

  // reseta para página 1 quando a busca mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return filteredData && filteredData.length > 0 && currentItems ? (
    <div className="d-flex flex-column gap-24 w-100">
      <div className="card-container">
        {currentItems.map((item, index) => (
          <CardItem
            key={index}
            item={item}
            route={`/patient/${item?.id}`}
          />
        ))}
      </div>
      <div className="d-flex gap-2 justify-content-end align-items-center">
        <div className="d-flex align-items-center">
          <Text className="f-14">
            {totalPages === 0
              ? "0 - "
              : `${(currentPage - 1) * itemsPerPage + 1} - `}
            {Math.min(currentPage * itemsPerPage, filteredData.length)}
          </Text>
          &nbsp;
          <Text className="f-14">de</Text>
          &nbsp;
          <Text className="f-14">{filteredData.length}</Text>
        </div>

        <div className="d-flex align-items-center">
          <Icon
            name="RiArrowDropLeftLine"
            size={35}
            onClick={() =>
              currentPage === 1 || totalPages === 0
                ? undefined
                : handlePageChange(currentPage - 1)
            }
            fill={currentPage === 1 || totalPages === 0 ? "#d9d9d9" : "#a6a6a6"}
          />
          <Icon
            name="RiArrowDropRightLine"
            size={35}
            onClick={() =>
              currentPage === totalPages || totalPages === 0
                ? undefined
                : handlePageChange(currentPage + 1)
            }
            fill={
              currentPage === totalPages || totalPages === 0
                ? "#d9d9d9"
                : "#a6a6a6"
            }
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="not-found-table-data">
      <Text className="semi-bold">Ops! Não encontramos nada por aqui.</Text>
      <Text className="f-14">
        Tente pesquisar outro paciente ou cadastre novos.
      </Text>
    </div>
  );
};

export default Table;

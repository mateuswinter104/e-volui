"use client";

import { useState, useEffect } from "react";
import Text from "../Text";
import Icon from "../Icon";
import "./styles.scss";
import "react-multi-carousel/lib/styles.css";
/* import { useRouter } from "next/navigation"; */
import { CardItem } from "./components/CardItem";
import { toast } from "sonner";

interface ItemProps {
  name: string;
  age: number;
  diagnosis: string;
  sex: string;
}

interface Table {
  data?: ItemProps[];
  searchTerm?: string;
  theme?: "light" | "dark";
  exportData?: boolean;
  startups?: boolean;
}

const ITEMS_PER_PAGE = 12;

export const Table: React.FC<Table> = ({ data, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = ITEMS_PER_PAGE;

  const filteredData = data?.filter((item) => {
    const search = (searchTerm || "").toLowerCase();
    return (
      item.name?.toLowerCase().includes(search) ||
      item.diagnosis?.toLowerCase().includes(search) ||
      item.age?.toString().toLowerCase().includes(search)
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

  /* const router = useRouter(); */

  return filteredData && filteredData.length > 0 && currentItems ? (
    <div className="d-flex flex-column gap-24 w-100">
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
      <div className="card-container">
        {currentItems.map((item, index) => (
          <CardItem
            key={index}
            item={item}
            onClick={() => toast("Em breve!")}
            /* onClick={() =>
              item.id &&
              (startups
                ? router.push(`/startup/view/${item.id}`)
                : router.push(`/challenge/view/${item.id}`))
            } */
          />
        ))}
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

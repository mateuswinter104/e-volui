"use client";
import Image from "next/image";
import Text from "../../components/Text";
import "./styles.scss";
import menuIcon from "../../../public/evolui-icon.png";
import Icon from "../../components/Icon";
/* import { useRouter } from "next/navigation"; */
import { toast } from "sonner";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { useState } from "react";
import colors from "@/styles/colors.module.scss";

const menuItems = [
  "TUG",
  "OLS",
  "FRT",
  "TST",
  "TSL5",
  "TSL (30s)",
  "DPP",
  "Mini-COG",
];

export const Menu = () => {
  /* const router = useRouter(); */
  const isMobile = useMediaQuery("(max-width: 920px)");

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<number>();

  const handleMenu = () => {
    setMenuOpen((state) => !state);
  };

  const handleMenuItemClick = (i: number) => {
    setMenuActive(i);
    setMenuOpen(false);
  };

  return isMobile ? (
    <>
      <div className="menu">
        {/* <div onClick={() => router.push("https://www.hubgovtechlab.com.br/")}>
            <Image src={menuIcon} alt="Logo" width={25} height={25} />
          </div> */}
        <Icon name="RiMenuLine" size={20} onClick={() => handleMenu()} />
      </div>
      {menuOpen && (
        <div className="menu-opened">
          <div className="menu-header-mobile-opened">
            <Icon name="RiCloseFill" size={25} onClick={() => handleMenu()} />
          </div>
          <div className="d-flex flex-column gap-24">
            <div className="d-flex flex-column gap-8">
              <Text className="f-14" color={colors.gray2}>
                Lista de pacientes
              </Text>
              <div className="menu-item-top">
                <Text>Acessar lista</Text>
                <Text>25</Text>
              </div>
            </div>
            <div className="d-flex flex-column gap-8">
              <Text className="f-14" color={colors.gray2}>
                Avaliações
              </Text>
              <div className="d-flex flex-column gap-8">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleMenuItemClick(index)}
                    className={`menu-item ${
                      menuActive === index ? "active" : ""
                    }`}
                  >
                    <Text>{item}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <div className="menu">
      <div className="menu-content">
        <div className="d-flex align-items-center gap-56">
          <div
            className="d-flex align-items-center gap-3 clickable"
            onClick={() => toast("Em breve!")}
          >
            <Image src={menuIcon} alt="Logo" width={25} height={25} />
          </div>
          <Text onClick={() => toast("Em breve!")} className="f-14">
            Meu perfil
          </Text>
          <Text onClick={() => toast("Em breve!")} className="f-14">
            Desafios
          </Text>
          <Text onClick={() => toast("Em breve!")} className="f-14">
            Startups cadastradas
          </Text>
        </div>
        <Text onClick={() => toast("Em breve!")} className="f-14">
          Minha conta
        </Text>
      </div>
    </div>
  );
};

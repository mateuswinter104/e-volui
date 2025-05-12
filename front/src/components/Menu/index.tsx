"use client";
import Image from "next/image";
import Text from "../../components/Text";
import "./styles.scss";
import menuIcon from "../../../public/evolui-icon.png";
import Icon from "../../components/Icon";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { useState } from "react";

export const Menu = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 920px)");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen((state) => !state);
  };

  return isMobile ? (
    <>
      <div className="menu">
        <div className="menu-header-mobile">
          <div onClick={() => router.push("https://www.hubgovtechlab.com.br/")}>
            <Image src={menuIcon} alt="Logo" width={25} height={25} />
          </div>
          <Icon name="RiMenuLine" size={25} onClick={() => handleMenu()} />
        </div>
      </div>
      {menuOpen && (
        <div className="menu-opened">
          <div className="menu-header-mobile-opened">
            <div
              onClick={() => router.push("https://www.hubgovtechlab.com.br/")}
            >
              <Image src={menuIcon} alt="Logo" width={25} height={25} />
            </div>
            <Icon name="RiCloseFill" size={30} onClick={() => handleMenu()} />
          </div>
          <div className="d-flex flex-column gap-32">
            <Text onClick={() => toast("Em breve!")}>Meu perfil</Text>
            <Text onClick={() => toast("Em breve!")}>Desafios</Text>
            <Text onClick={() => toast("Em breve!")}>Startups cadastradas</Text>
            <Text onClick={() => toast("Em breve!")}>Minha conta</Text>
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

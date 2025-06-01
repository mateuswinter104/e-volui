"use client";
import Image from "next/image";
import Text from "../../components/Text";
import "./styles.scss";
import menuIcon from "../../../public/evolui-icon.png";
import Icon from "../../components/Icon";
/* import { useRouter } from "next/navigation"; */
import { toast } from "sonner";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import colors from "@/styles/colors.module.scss";
import { usePathname } from "next/navigation";

const functionalTests = [
  {
    id: 1,
    code: "TUG",
    name: "Timed Up and Go",
    description:
      "Avalia mobilidade e equilíbrio. O paciente deve levantar de uma cadeira, caminhar 3 metros, retornar e sentar. O tempo é cronometrado.",
  },
  {
    id: 2,
    code: "OLS",
    name: "One-Leg Stand",
    description:
      "Avalia o equilíbrio ao manter-se em um pé só, medindo o tempo máximo de sustentação (até 30 segundos).",
  },
  {
    id: 3,
    code: "FRT",
    name: "Functional Reach Test",
    description:
      "Mede o alcance funcional à frente sem mover os pés, sendo útil para avaliar o risco de queda.",
  },
  {
    id: 4,
    code: "TST",
    name: "Tandem Stance Test",
    description:
      "Avalia o equilíbrio postural ao ficar em pé com um pé diretamente à frente do outro, como se estivesse sobre uma linha reta.",
  },
  {
    id: 5,
    code: "TSL5",
    name: "Timed Sit-to-Stand (5x)",
    description:
      "Avalia força e resistência dos membros inferiores, medindo o tempo necessário para sentar e levantar da cadeira cinco vezes consecutivas, sem uso dos braços.",
  },
  {
    id: 6,
    code: "TSL (30s)",
    name: "Sit-to-Stand (30 segundos)",
    description:
      "Avalia resistência muscular, contando quantas vezes o paciente consegue levantar e sentar em uma cadeira durante 30 segundos.",
  },
  {
    id: 7,
    code: "DPP",
    name: "Duplo Apoio Médio",
    description:
      "Mede o tempo médio em que ambos os pés estão em contato com o chão durante a marcha, sendo um indicador de estabilidade. Termo frequentemente usado em análises de marcha.",
  },
  {
    id: 8,
    code: "Mini-COG",
    name: "Mini Cognitive Assessment",
    description:
      "Teste de triagem cognitiva que combina recordação de palavras com o teste do desenho do relógio, utilizado para detectar déficits cognitivos.",
  },
];

export const Menu = () => {
  /* const router = useRouter(); */
  const isMobile = useMediaQuery("(max-width: 920px)");

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<number>();

  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenu = () => {
    setMenuOpen((state) => !state);
  };

  const handleMenuItemClick = (i: number) => {
    setMenuActive(i);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return isMobile ? (
    <div className={`menu-wrapper ${menuOpen ? "opened" : "closed"}`}>
      <div className="menu">
        <Icon name="RiMenuLine" size={20} onClick={() => handleMenu()} />
      </div>
      <div
        ref={menuRef}
        className={`menu-opened ${menuOpen ? "slide-in" : "slide-out"}`}
      >
        <div className="menu-header-mobile-opened">
          <Icon name="RiCloseFill" size={25} onClick={() => handleMenu()} />
        </div>
        <div className="d-flex flex-column gap-24">
          <div className="d-flex flex-column gap-8">
            <div className={`menu-item ${pathname.match("/") ? "active" : ""}`}>
              <div className="d-flex w-100 gap-32 align-items-center">
                <Text className="f-14">Lista de pacientes</Text>
                <Text className="semi-bold">25</Text>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-8">
            <Text className="f-14" color={colors.gray2}>
              Avaliações
            </Text>
            <div className="d-flex flex-column gap-8">
              {functionalTests.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleMenuItemClick(index)}
                  className={`menu-item ${
                    menuActive === index ? "active" : ""
                  }`}
                >
                  <div className="d-flex flex-column gap-1">
                    <Text className="f-12">{item.name}</Text>
                    <Text className="semi-bold">{item.code}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
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

"use client";
import Text from "../../components/Text";
import "./styles.scss";
import Icon from "../../components/Icon";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import colors from "@/styles/colors.module.scss";
import { usePathname, useRouter } from "next/navigation";

const functionalTests = [
  {
    id: 1,
    code: "TUG",
    name: "Timed Up and Go",
    objective: "Avaliar o equilíbrio dinâmico",
    description:
      "Solicita-se que o paciente levante-se de uma cadeira, caminhe 3 metros, vire, retorne e sente-se novamente na mesma cadeira. O tempo para completar a tarefa é cronometrado.",
    result:
      "O resultado final é obtido em segundos através da média das duas últimas tentativas",
  },
  {
    id: 3,
    code: "FRT",
    name: "Functional Reach Test",
    objective: "Avaliar o equilíbrio durante a inclinação",
    description:
      "Solicita-se que o paciente se posicione ao lado de uma parede com os ombros flexionados em 90° e cotovelos estendidos. O paciente deve inclinar o tronco para frente mantendo os braços estendidos e sem tirar o calcanhar do chão. Mede-se a distância entre a marca inicial e a marca que o paciente alcançou.",
    result: "O resultado final é obtido através da média de três tentativas.",
  },
  {
    id: 4,
    code: "TST",
    name: "Tandem Stand Test",
    objective: "Avaliar o equilíbrio em linha",
    description:
      "Solicita-se que o paciente posicione um pé à frente do outro, encostando o calcanhar do pé à frente nos dedos do pé de trás, e permaneça nessa posição o máximo de tempo possível (até 10 segundos).",
    result: "O resultado final é obtido através da média de três tentativas.",
  },
  {
    id: 5,
    code: "TSL5",
    name: "Teste Senta e Levanta 5 (cinco) vezes",
    objective: "Avaliar o nível do mobilidade",
    description:
      "Avalia força e resistência dos membros inferiores, medindo o tempo necessário para sentar e levantar da cadeira cinco vezes consecutivas, sem uso dos braços.",
    result:
      "O resultado final é obtido através do menor tempo entre duas tentativas.",
  },
  {
    id: 7,
    code: "FMPP",
    name: "Força Máxima de Preensão Palmar",
    objective: "Avaliar força muscular",
    description:
      "Solicita-se que o paciente se posicione em uma cadeira com as costas e braços apoiados, cotovelo flexionado a 90° e realize a maior força de preensão possível na alça de um dinamômetro de preensão palmar.",
    result:
      "O resultado final é obtido através da quantidade de força que o paciente deposita no aparelho.",
  },
  {
    id: 8,
    code: "MEEM",
    name: "Mini-Mental",
    objective: "Avaliar a capacidade cognitiva",
    description:
      "Consiste no preenchimento de questões que envolvem (1) orientação do paciente, questionando o ano, estação, dia/semana, dia/mês e mês; (2) capacidade de registro, solicitando que o paciente repita as palavras “pente, rua e azul”; (3) atenção e cálculo, solicitando que o paciente realize um cálculo de subtração cinco vezes;  (4) evocação, solicitando que o paciente repita as palavras pronunciadas na etapa de “capacidade de registro”; e (5) linguagem, solicitando que o paciente identifique objetos, repita uma frase, siga um comando de três estágios, leia, escreva e copie um desenho.",
    result:
      "O resultado final é obtido através da soma da pontuação que o paciente adquiriu em cada uma das etapas, sendo 30 a pontuação máxima.",
  },
];

export const Menu = () => {
  const isMobile = useMediaQuery("(max-width: 920px)");

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<number>();

  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleMenu = () => {
    setMenuOpen((state) => !state);
  };

  const handleMenuItemClick = (i: number) => {
    setMenuActive(i);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = menuOpen ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
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
    <div className={`menu-wrapper ${menuOpen ? "opened" : ""}`}>
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
              <div className="d-flex w-100 gap-32 align-items-center justify-content-between">
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
        <Text color={colors.primary} className="bold f-20">
          e-volui
        </Text>
        <div
          onClick={() => router.push("/")}
          className={`menu-item ${pathname.match("/") ? "active" : ""}`}
        >
          <Text
            color={pathname.match("/") ? colors.white : ""}
            className="semi-bold"
          >
            Lista de pacientes
          </Text>
        </div>

        {functionalTests.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuItemClick(index)}
            className={`menu-item ${menuActive === index ? "active" : ""}`}
          >
            <div className="d-flex flex-column gap-1">
              <Text
                color={menuActive === index ? colors.white : ""}
                className="f-12"
              >
                {item.name}
              </Text>
              <Text
                color={menuActive === index ? colors.white : ""}
                className="semi-bold"
              >
                {item.code}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

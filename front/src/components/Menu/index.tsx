"use client";
import Text from "../../components/Text";
import "./styles.scss";
import Icon from "../../components/Icon";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import colors from "@/styles/colors.module.scss";
import { usePathname, useRouter } from "next/navigation";
import { functionalTests } from "@/utils/services/api";

export const Menu = () => {
  const isMobile = useMediaQuery("(max-width: 920px)");

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<string>("patientList");

  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleMenu = () => {
    setMenuOpen((state) => !state);
  };

  const handleMenuItemClick = (code: string) => {
    setMenuActive(code);
    setMenuOpen(false);
    if (code === "patientList") {
      router.push(`/`);
    } else {
      router.push(`/${code.toLowerCase()}`);
    }
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
    if (pathname !== "/") {
      const route = pathname.replace("/", "");
      setMenuActive(route.toUpperCase());
    }
  }, []);

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
        <Icon name="RiMenuLine" size={25} onClick={() => handleMenu()} />
      </div>
      <div
        ref={menuRef}
        className={`menu-opened ${menuOpen ? "slide-in" : "slide-out"}`}
      >
        <div className="menu-header-mobile-opened">
          <Icon name="RiCloseFill" size={30} onClick={() => handleMenu()} />
        </div>
        <div className="d-flex flex-column gap-24">
          <div className="d-flex flex-column gap-8">
            <div
              className={`menu-item ${menuActive === "patientList" ? "active" : ""
                }`}
            >
              <div
                onClick={() => handleMenuItemClick("patientList")}
                className="d-flex w-100 gap-32 align-items-center justify-content-between"
              >
                <Text className="f-16" color={menuActive === "patientList" ? colors.white : ""}>
                  Lista de pacientes
                </Text>
                <Text
                  color={menuActive === "patientList" ? colors.white : ""}
                  className="semi-bold"
                >
                  25
                </Text>
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
                  onClick={() => handleMenuItemClick(item.code)}
                  className={`menu-item ${menuActive === item.code ? "active" : ""
                    }`}
                >
                  <div className="d-flex flex-column gap-1">
                    <Text
                      color={menuActive === item.code ? colors.white : ""}
                      className="f-12"
                    >
                      {item.name}
                    </Text>
                    <Text
                      color={menuActive === item.code ? colors.white : ""}
                      className="semi-bold"
                    >
                      {item.code}
                    </Text>
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
          onClick={() => handleMenuItemClick("patientList")}
          className={`menu-item ${menuActive === "patientList" ? "active" : ""
            }`}
        >
          <Text
            color={menuActive === "patientList" ? colors.white : ""}
            className="semi-bold f-16"
          >
            Lista de pacientes
          </Text>
        </div>

        {functionalTests.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuItemClick(item.code)}
            className={`menu-item ${menuActive === item.code ? "active" : ""}`}
          >
            <div className="d-flex flex-column gap-1">
              <Text
                color={menuActive === item.code ? colors.white : ""}
                className="f-1z"
              >
                {item.name}
              </Text>
              <Text
                color={menuActive === item.code ? colors.white : ""}
                className="semi-bold f-16"
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

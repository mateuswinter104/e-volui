"use client";

import "./styles.scss";
import Text from "@/components/Text";
import Button from "@/components/Button";
import colors from "@/styles/colors.module.scss";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { toast } from "sonner";
import { Patient } from "@/utils/services/api";
import TestList from "./components/TestList";

interface Props {
  patient: Patient
}

export default function Index({ patient }: Props): JSX.Element {
  const isMobile = useMediaQuery("(max-width: 920px)");
  console.log("patient: ", patient);


  return (
    <div className="container">
      <div className="d-flex flex-column gap-32">
        <div className="d-flex flex-column gap-24">
          <div className="d-flex w-100 justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-8">
              <Text className="f-24 semi-bold">
                {patient?.name}
              </Text>
              <Text className="f-14">{`${patient?.age} anos`}</Text>
            </div>
            {!isMobile && (
              <div className="d-flex align-items-center gap-24">
                <Button
                  icon="RiFileList2Line"
                  fill={colors.white}
                  iconSize={20}
                  className="secondary"
                  onClick={
                    () => toast("Em breve!") /* router.push("/patient/create") */
                  }
                >
                  <Text color={colors.white} className="semi-bold f-14">
                    Anamnese
                  </Text>
                </Button>
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
                    Adicionar teste
                  </Text>
                </Button>
              </div>
            )}
          </div>
        </div>
        {isMobile && (
          <div className="d-flex gap-16 flex-column">
            <Button
              icon="RiFileList2Line"
              fill={colors.white}
              iconSize={24}
              fluid
              className="secondary"
              onClick={
                () => toast("Em breve!") /* router.push("/patient/create") */
              }
            >
              <Text color={colors.white} className="semi-bold">
                Anamnese
              </Text>
            </Button>
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
                Adicionar teste
              </Text>
            </Button>
          </div>
        )}
        <TestList tests={patient?.tests} />
      </div>
    </div>
  );
}

"use client";

import "./styles.scss";
import Text from "@/components/Text";
import Button from "@/components/Button";
import colors from "@/styles/colors.module.scss";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import { toast } from "sonner";
import { Patient, Test } from "@/utils/services/api";
import TestList from "./components/TestList";
import Link from "next/link";

interface Props {
  patient: Patient
}

export interface TestGrouped {
  id: number
  code: string;
  name: string
  similarTests: Test[];
}

export default function Index({ patient }: Props): JSX.Element {
  const isMobile = useMediaQuery("(max-width: 920px)");

  const groupedTests: TestGrouped[] = Object.values(
    patient?.tests.reduce((acc, test) => {
      if (!acc[test.code]) {
        acc[test.code] = {
          id: test.id,
          code: test.code,
          name: test.name,
          similarTests: [test],
        };
      } else {
        acc[test.code].similarTests.push(test);
      }

      // sempre ordenar os similarTests do mais novo para o mais antigo
      acc[test.code].similarTests.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      return acc;
    }, {} as Record<string, TestGrouped>)
  )

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
                <Link href={`/patient/${patient?.id}/anamnese`}>
                  <Button
                    icon="RiFileList2Line"
                    fill={colors.white}
                    iconSize={20}
                    className="secondary"
                  >
                    <Text color={colors.white} className="semi-bold f-14">
                      Anamnese
                    </Text>
                  </Button></Link>
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
        <TestList tests={groupedTests} />
      </div>
    </div>
  );
}

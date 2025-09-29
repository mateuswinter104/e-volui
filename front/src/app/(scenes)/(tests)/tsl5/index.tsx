"use client";

import { functionalTests, TestProps } from "@/utils/services/api";
import { TestsLayout } from "../components/TestLayout";
import Text from "@/components/Text";
import { usePathname } from "next/navigation";
import testImage from '../../../../../public/teste_tsl5.png'

export default function Index(): JSX.Element {
  const pathname = usePathname();
  const route = pathname.replace("/", "").toUpperCase();

  const test = functionalTests.find((test: TestProps) => test.code === route);

  if (!test) return <Text>Nenhum teste encontrado</Text>;

  return (
    <TestsLayout
      id={test.id}
      objective={test.objective}
      result={test.result}
      code={test?.code}
      name={test?.name}
      description={test?.description}
      image={testImage}
    />
  );
}

import colors from "@/styles/colors.module.scss";
import "./styles.scss";
import Text from "@/components/Text";
import Icon from "@/components/Icon";
import Link from "next/link";

interface ItemProps {
  name: string;
  age: number;
  diagnosis: string;
  sex: string;
}

interface CardItemProps {
  item: ItemProps;
  route: string
}

export const CardItem = ({ item, route }: CardItemProps) => {
  const { sex, name, age, diagnosis } = item;
  const isWoman = sex === "Feminino";

  return (
    <div className="card-wrapper">
      <Link href={route}>
        <div className="card-content">
          <div className="d-flex w-100 flex-column justify-content-between gap-4">
            <Text className="semi-bold">{name}</Text>
            <div className="d-flex align-items-center gap-8">
              <Text className="f-12 light">{`${age} anos`}</Text>
              <Icon
                name={isWoman ? "RiWomenLine" : "RiMenLine"}
                size={20}
                fill={isWoman ? colors.pink : colors.blue}
              />
            </div>
          </div>
          <div className="d-flex flex-column">
            <Text color={colors.primary} className="f-12 semi-bold">
              Diagnóstico
            </Text>
            <Text className="f-14 light">{diagnosis}</Text>
          </div>
        </div>
      </Link>
    </div>
  );
};

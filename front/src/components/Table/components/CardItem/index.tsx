import colors from "@/styles/colors.module.scss";
import "./styles.scss";
import Text from "@/components/Text";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import Icon from "@/components/Icon";

interface ItemProps {
  name: string;
  age: number;
  diagnosis: string;
  sex: string;
}

interface CardItemProps {
  item: ItemProps;
  onClick: () => void;
}

export const CardItem = ({ item, onClick }: CardItemProps) => {
  const smallScreen = useMediaQuery("(max-width: 400px)");
  const { sex, name, age, diagnosis } = item;
  const isWoman = sex === "Feminino";

  return (
    <div className="card-wrapper" onClick={onClick}>
      <div className="card-content">
        <div className="d-flex w-100 justify-content-between">
          <div className="d-flex gap-8 align-items-center">
            <Text>{name}</Text>
            <Text className="f-12 semi-bold">{`${age} anos`}</Text>
          </div>
          {smallScreen ? (
            <Icon
              name={isWoman ? "RiWomenLine" : "RiMenLine"}
              size={15}
              fill={isWoman ? colors.pink : colors.blue}
            />
          ) : (
            <div
              className="card-area"
              style={{
                backgroundColor: isWoman ? colors.pink : colors.blue,
              }}
            >
              <Text color={colors.white} className="f-10 semi-bold truncate">
                {sex}
              </Text>
            </div>
          )}
        </div>
        <div className="d-flex flex-column">
          <Text className="f-12 semi-bold">Diagnóstico</Text>
          <Text className="f-14">{diagnosis}</Text>
        </div>
      </div>
    </div>
  );
};

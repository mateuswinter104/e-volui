import Text from "@/components/Text";
import { Test } from "@/utils/services/api";
import "./styles.scss";
import Icon from "@/components/Icon";
import Checkbox from "@/components/Checkbox";
import { useState } from "react";

interface Props {
    tests: Test[];
}

const TestList: React.FC<Props> = ({ tests }) => {
    const [hoverItem, setHoverItem] = useState<number | null>(null);
    const [openItem, setOpenItem] = useState<number | null>(null);
    const [selectAllCategories, setSelectAllCategories] =
        useState<boolean>(false);
    const [selectedTests, setSelectedTests] = useState<number[]>([]);

    function handleSelectAllCategories() {
        const allSelected = selectAllCategories;
        setSelectAllCategories(!allSelected);

        if (allSelected) {
            setSelectedTests([]);
        } else {
            const filteredCategories = tests?.map((test) => test.id) || [];
            setSelectedTests(filteredCategories);
        }
    }

    function handleClickItem(id: number) {
        setOpenItem((prev) => (prev === id ? null : id));
    }

    return tests?.length > 0 ? (
        <div className="d-flex flex-column gap-24">
            <Text className="f-14 semi-bold">Testes</Text>
            <div className="d-flex flex-column">
                {tests?.map((test) => {
                    const isOpen = openItem === test.id;

                    return (
                        <div
                            key={test.id}
                            className="test-wrapper"
                            onClick={() => handleClickItem(test.id)}
                            onMouseEnter={() => setHoverItem(test.id)}
                            onMouseLeave={() => setHoverItem(null)}
                        >
                            <div className="d-flex gap-8 align-items-center">
                                {hoverItem === test.id && isOpen && (
                                    <div className="hidden-checkbox" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selectAllCategories}
                                            onChange={handleSelectAllCategories}
                                        />
                                    </div>
                                )}
                                <Icon
                                    name={isOpen ? "RiArrowDropUpLine" : "RiArrowDropDownLine"}
                                    size={25}
                                    fill="gray4"
                                />
                                <Text>{test?.name}</Text>
                            </div>

                            {isOpen && (
                                <div className="test-details">
                                    <Text className="f-12">Teste aberto</Text>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    ) : (
        "Nenhum teste encontrado"
    );
};

export default TestList;

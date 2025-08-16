import Text from "@/components/Text";
import { patientsList, Test } from "@/utils/services/api";
import "./styles.scss";
import Icon from "@/components/Icon";
import Checkbox from "@/components/Checkbox";
import { useState, useEffect } from "react";
import { format } from 'date-fns'

interface Props {
    tests: Test[];
}


interface TestGrouped {
    id: number
    code: string;
    name: string
    similarTests: Test[];
}

const TestList: React.FC<Props> = ({ tests }) => {
    const [hoverItem, setHoverItem] = useState<number | null>(null);
    const [openItem, setOpenItem] = useState<number | null>(null);
    const [selectedSimilarTests, setSelectedSimilarTests] = useState<number[]>([]);
    const [isAllSimilarTestsSelected, setIsAllSimilarTestsSelected] = useState<boolean>(false)

    function selectAllSimilarTests() {
        const allSelected = isAllSimilarTestsSelected;
        setIsAllSimilarTestsSelected(!allSelected);

        if (allSelected) {
            setSelectedSimilarTests([]);
        } else {
            const filteredSimilarTests = tests?.map((test) => test.id) || [];
            setSelectedSimilarTests(filteredSimilarTests);
        }
    }

    function handleClickItem(id: number, code: string) {
        setOpenItem((prev) => (prev === id ? null : id));
        setSelectedSimilarTests([])
        setIsAllSimilarTestsSelected(false)
    }

    function selectSimilarTest(id: number) {
        setSelectedSimilarTests((prev) => {
            if (prev?.includes(id)) {
                // remove o id
                return prev.filter((item) => item !== id);
            } else {
                // adiciona o id
                return [...prev, id];
            }
        });
    }


    const groupedTests: TestGrouped[] = Object.values(
        tests.reduce((acc, test) => {
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
            return acc;
        }, {} as Record<string, TestGrouped>)
    );


    useEffect(() => {
        if (openItem !== null) {
            const currentGroup = groupedTests.find((g) => g.id === openItem);
            if (currentGroup) {
                setIsAllSimilarTestsSelected(
                    currentGroup.similarTests.every((t) => selectedSimilarTests.includes(t.id))
                );
            }
        }
    }, [selectedSimilarTests, openItem, groupedTests]);


    return tests?.length > 0 ? (
        <div className="d-flex gap-40 w-100">
            <div className="d-flex flex-column gap-24 w-100">
                <Text className="f-14 semi-bold">Testes</Text>
                <div className="d-flex flex-column">
                    {groupedTests?.map((test) => {
                        const isOpen = openItem === test.id;

                        return (
                            <div
                                key={test.id}
                                className={`test-wrapper ${hoverItem === test.id && !isOpen ? 'onHover' : ''}`}

                            >
                                <div className="d-flex align-items-center" onClick={() => handleClickItem(test.id, test.code)}
                                    onMouseEnter={() => setHoverItem(test.id)}
                                    onMouseLeave={() => setHoverItem(null)}>
                                    {isOpen && (
                                        <div className="hidden-checkbox" onClick={(e) => e.stopPropagation()}>
                                            <Checkbox
                                                checked={isAllSimilarTestsSelected}
                                                onChange={selectAllSimilarTests}
                                            />
                                        </div>
                                    )}
                                    <Icon
                                        name={isOpen ? "RiArrowDropUpLine" : "RiArrowDropDownLine"}
                                        size={25}
                                        fill="gray4"
                                    />
                                    <Text className={isOpen ? 'semi-bold' : ''}>{test?.name}</Text>
                                </div>

                                {isOpen &&
                                    test?.similarTests?.map(test => {
                                        let type
                                        if (test.code === "MEEM") {
                                            type = 'pontos'
                                        } else if (test.code === "FMPP") {
                                            type = 'kgf'
                                        } else if (test.code === 'FRT') {
                                            type = 'cm'
                                        } else {
                                            type = 'segundos'
                                        }
                                        return (
                                            <div key={test.id} className="test-details" onClick={() => selectSimilarTest(test.id)}>
                                                <Checkbox
                                                    checked={selectedSimilarTests?.includes(test.id)}
                                                    onChange={() => ''}
                                                />
                                                <div className="d-flex flex-column w-100">
                                                    <div className="d-flex align-items-center gap-12">
                                                        <Text className="f-14">{test.code}</Text>
                                                        <Text className="f-12">{test?.created_at ? format(test.created_at, "dd/MM/yyyy") : ''}</Text>
                                                    </div>
                                                    <Text className="f-14 semi-bold">{`${test.result} ${type}`}</Text>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="results-table">

            </div>
        </div>
    ) : (
        "Nenhum teste encontrado"
    );
};

export default TestList;

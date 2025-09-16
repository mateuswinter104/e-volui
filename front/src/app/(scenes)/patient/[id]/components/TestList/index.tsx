import Text from "@/components/Text";
import { Test } from "@/utils/services/api";
import "./styles.scss";
import Icon from "@/components/Icon";
import Checkbox from "@/components/Checkbox";
import { useState, useEffect } from "react";
import { format } from 'date-fns'
import colors from "@/styles/colors.module.scss";
import { TestGrouped } from "../..";
import ReactECharts from "echarts-for-react";
import useMediaQuery from "@/app/utils/functions/useMediaQuery";
import Image from "next/image";

interface Props {
    tests: TestGrouped[];
}

const TestList: React.FC<Props> = ({ tests }) => {
    const [hoverItem, setHoverItem] = useState<number | null>(null);
    const [openItem, setOpenItem] = useState<number | null>(null);
    const [selectedSimilarTests, setSelectedSimilarTests] = useState<Test[]>([]);
    const [isAllSimilarTestsSelected, setIsAllSimilarTestsSelected] = useState<boolean>(false)
    const [isAddingTest, setIsAddingTest] = useState<boolean>(false)
    const [result, setResult] = useState<number | undefined>()
    const [groupedTests, setGroupedTests] = useState<TestGrouped[]>(tests)
    const [comparedResults, setComparedResults] = useState<string>()
    const [chartInfo, setChartInfo] = useState<TestGrouped>()
    const goodFeedback = "Paciente apresentou evolução funcional"
    const badFeedback = "Paciente não apresenta evolução funcional no momento"

    function selectAllSimilarTests() {
        const allSelected = isAllSimilarTestsSelected;
        setIsAllSimilarTestsSelected(!allSelected);

        if (allSelected) {
            setSelectedSimilarTests([]);
        } else {
            const openedGroupTest = groupedTests?.filter(test => test.code === chartInfo?.code)
            const filteredSimilarTests = openedGroupTest?.flatMap(test => test?.similarTests?.map((test) => test).sort(
                (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            )) || [];
            setSelectedSimilarTests(filteredSimilarTests);
        }
    }

    function handleClickItem(test: TestGrouped) {
        const { id, code } = test
        setChartInfo(test)
        setOpenItem((prev) => (prev === id ? null : id));
        setSelectedSimilarTests([])
        setIsAllSimilarTestsSelected(false)
    }

    function selectSimilarTest(similarTest: Test) {
        setSelectedSimilarTests((prev) => {
            const exists = prev.some((item) => item.id === similarTest.id);

            if (exists) {
                // remove
                return prev.filter((item) => item.id !== similarTest.id);
            } else {
                // adiciona
                return [...prev, similarTest].sort(
                    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                );;
            }
        });
    }

    function getResultType(code: string, result: number) {
        if (code === "MEEM") {
            return result > 1 ? 'pontos' : 'ponto'
        } else if (code === "FMPP") {
            return 'kgf'
        } else if (code === 'FRT') {
            return 'cm'
        } else {
            return result > 1 ? 'segundos' : 'segundo'
        }
    }

    function cancelTestAdding() {
        setIsAddingTest(false)
        setResult(undefined)
    }

    function addTest(code: string, name: string) {
        if (result === undefined || isNaN(result)) return;

        const newTest: Test = {
            id: Math.random() * 10000,
            name,
            code,
            result,
            created_at: new Date().toISOString(),
        };

        setGroupedTests(prev =>
            prev?.map(test =>
                test.code === code
                    ? {
                        ...test, similarTests: [...test.similarTests, newTest].sort(
                            (a, b) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                        )
                    }
                    : test
            )
        );

        setIsAddingTest(false);
        setResult(undefined);
    }

    function onChange(e: number) {
        setResult((Number(e)))
    }

    useEffect(() => {
        if (openItem !== null) {
            const currentGroup = groupedTests.find((g) => g.id === openItem);
            if (currentGroup) {
                setIsAllSimilarTestsSelected(
                    currentGroup.similarTests.every((t) =>
                        selectedSimilarTests.some((item) => item.id === t.id)
                    )
                );
            }
        }
    }, [selectedSimilarTests, openItem, groupedTests]);


    function getSpecificComparison(greater: 1 | 0, code: string) {
        let resultMessage
        if (code === "MEEM") {
            resultMessage = greater ? goodFeedback : badFeedback
        } else if (code === "FMPP") {
            resultMessage = greater ? goodFeedback : badFeedback
        } else if (code === 'FRT') {
            resultMessage = greater ? goodFeedback : badFeedback
        } else if (code === 'TST') {
            resultMessage = greater ? goodFeedback : badFeedback
        } else {
            resultMessage = greater ? badFeedback : goodFeedback
        }
        return resultMessage
    }

    function compareResults() {
        const selectedTests = groupedTests
            ?.flatMap((test) => test.similarTests)
            .filter((t) =>
                selectedSimilarTests.some((item) => item.id === t.id)
            );

        if (!selectedTests || selectedTests.length < 2) return;

        const sorted = [...selectedTests].sort(
            (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        const oldest = sorted[0];
        const newest = sorted[sorted.length - 1];

        const code = oldest.code;
        const greater = oldest.result < newest.result ? 1 : 0;

        setComparedResults(getSpecificComparison(greater, code));
    }


    useEffect(() => {
        if (selectedSimilarTests && selectedSimilarTests.length > 1) {
            compareResults()
        } else {
            setComparedResults('')
        }
    }, [selectedSimilarTests])

    const option = {
        xAxis: {
            type: "category",
            data: selectedSimilarTests?.map(test => {
                const formattedDate = test.created_at ? format(test.created_at, 'dd/MM') : ''
                return formattedDate
            }),
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: selectedSimilarTests?.map(test => test.result),
                type: "line",
                lineStyle: {
                    color: comparedResults === goodFeedback ? colors.primary : colors.error,
                    width: 2
                },
                itemStyle: {
                    color: comparedResults === goodFeedback ? colors.primary : colors.error
                },
                smooth: true,
            },
        ],
        tooltip: {
            trigger: "axis",
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
    };

    const isMobile = useMediaQuery("(max-width: 920px)");

    return groupedTests?.length > 0 ? (
        <div className="d-flex gap-40 w-100">
            <div className="d-flex gap-32 w-100">
                <div className="d-flex flex-column" style={{ minWidth: isMobile ? '100%' : '550px' }}>
                    <Text className="f-14 semi-bold">Testes</Text>
                    <div className="d-flex flex-column">
                        {groupedTests?.map((test) => {
                            const isOpen = openItem === test.id;

                            return (
                                <div
                                    key={test.id}
                                    className={`test-wrapper ${hoverItem === test.id && !isOpen ? 'onHover' : ''}`}

                                >
                                    <div className="d-flex align-items-center" onClick={() => handleClickItem(test)}
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
                                            fill={colors.gray3}
                                        />
                                        <Text className={isOpen ? 'semi-bold' : ''}>{test?.name}</Text>
                                    </div>

                                    {isOpen && (
                                        <>
                                            <div className={`add-test-button ${!isAddingTest ? 'canHover' : ''}`} onClick={() => !isAddingTest && setIsAddingTest(true)}>
                                                {isAddingTest ? (
                                                    <>
                                                        <div className="test-icon cancel">
                                                            <Icon name="RiCloseFill" size={15} fill={colors.gray3} onClick={cancelTestAdding} />
                                                        </div>
                                                        <div className="test-icon add">
                                                            <Icon name="RiCheckFill" size={15} fill={colors.gray3} onClick={() => addTest(test.code, test.name)} />
                                                        </div>
                                                        <input
                                                            type="number"
                                                            step="0.1"
                                                            placeholder='Digite o resultado'
                                                            value={result ?? ''}
                                                            onChange={(e) => onChange(Number(e.target.value))}
                                                            className="checkbox-write-input"
                                                            onClick={(e) => e.stopPropagation()}
                                                            autoFocus
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Icon name="RiAddFill" size={15} fill={colors.gray3} />
                                                        <Text className="f-12">Adicionar avaliação</Text>
                                                    </>
                                                )}
                                            </div>
                                            {test?.similarTests?.map((test, i) => {
                                                let type = getResultType(test.code, test.result)

                                                return (
                                                    <div key={test.id} className="test-details" onClick={() => selectSimilarTest(test)}>
                                                        <Checkbox
                                                            checked={selectedSimilarTests.some((item) => item.id === test.id)}
                                                            onChange={() => selectSimilarTest(test)}
                                                        />

                                                        <div className="d-flex flex-column w-100">
                                                            <div className="d-flex align-items-center gap-12">
                                                                <Text className="f-14">{test.code}</Text>
                                                                <Text className="f-12">
                                                                    {test?.created_at ? format(new Date(test.created_at), "dd/MM/yyyy") : ""}
                                                                </Text>

                                                            </div>
                                                            <Text className="f-14 semi-bold">{`${test.result} ${type}`}</Text>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="chart-wrapper">
                    {selectedSimilarTests?.length > 1 ? (
                        <>
                            <div className="d-flex gap-4 flex-column w-100">
                                <div className="w-100 d-flex align-items-center gap-8">
                                    <div className={`feedback-circle ${comparedResults === goodFeedback ? "good-feedback" : "bad-feedback"}`} />
                                    <Text className="semi-bold">{chartInfo?.name}</Text>
                                </div>
                                {comparedResults ?
                                    <Text color={colors.gray3} className="f-14">{comparedResults}</Text> : <Text color={colors.gray3} className="f-12">Selecione duas ou mais avaliações para iniciar a comparação.</Text>
                                }
                            </div>
                            <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
                        </>
                    ) : (
                        <>
                            <Image src="/no-chart.png" alt="No chart" width={250} height={250} />
                            <Text color={colors.gray2} className="f-14">Selecione duas ou mais avaliações para iniciar a comparação.</Text>
                        </>
                    )}
                </div>
            </div>
        </div>
    ) : (
        "Nenhum teste encontrado"
    );
};

export default TestList;

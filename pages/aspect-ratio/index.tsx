import { useState } from "react";
import { Container, Grid, NumberInput } from "@mantine/core";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getAspectRatio, getResolution } from "../../utils/calculations";

interface Props {
    host?: string;
}

export default function AspectRatioPage({ host }: Props) {
    const [heightValue, setHeightValue] = useState(0);
    const [widthValue, setWidthValue] = useState(0);
    const [aspectRatioLeftValue, setAspectRatioLeftValue] = useState(0);
    const [aspectRatioRightValue, setAspectRatioRightValue] = useState(0);

    let wasSetByCode = true;

    // state handle functions
    const handleHeightChange = (value: number) => {
        setHeightValue(value);

        if (widthValue === 0) return;
        calculateAspectRatio();
    };

    const handleWidthChange = (value: number) => {
        setWidthValue(value);

        if (heightValue === 0) return;
        calculateAspectRatio();
    };

    const handleAspectRatioLeftChange = (value: number, fromCode?: boolean) => {
        if(fromCode !== undefined) wasSetByCode = fromCode;
        setAspectRatioLeftValue(value);
        calculateResolution();
    };

    const handleAspectRatioRightChange = (value: number, fromCode?: boolean) => {
        if(fromCode !== undefined) wasSetByCode = fromCode;
        setAspectRatioRightValue(value);
        calculateResolution();
    };

    // other functions
    const calculateAspectRatio = () => {
        wasSetByCode = true;
        const ratio = getAspectRatio(widthValue, heightValue);
        handleAspectRatioLeftChange(ratio.width);
        handleAspectRatioRightChange(ratio.height);
    };

    const calculateResolution = () => {
        if(widthValue === 0 || heightValue === 0) return;
        if(wasSetByCode) return;
        const resolution = getResolution({ aspectLeft: aspectRatioLeftValue, aspectRight: aspectRatioRightValue, width: widthValue, height: heightValue });
        setWidthValue(resolution.width);
        setHeightValue(resolution.height);
    };

    return (
        <>
            <Head>
                <title>Aspect Ratio - Calculators | {host}</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <h1>Aspect Ratio Calculator</h1>
                <h2>Screen Resolution</h2>
                <Grid>
                    <Grid.Col span={4}>
                        <NumberInput
                            label="Width"
                            aria-label="Width value input"
                            value={widthValue}
                            min={0}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) =>
                                Math.max(1000 / t ** 2, 25)
                            }
                            onChange={(val: number) => handleWidthChange(val)}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}></Grid.Col>
                    <Grid.Col span={4}>
                        <NumberInput
                            label="Height"
                            aria-label="Height value input"
                            value={heightValue}
                            min={0}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) =>
                                Math.max(1000 / t ** 2, 25)
                            }
                            onChange={(val: number) => handleHeightChange(val)}
                        />
                    </Grid.Col>
                </Grid>
                <h2>Aspect Ratio</h2>
                <Grid>
                    <Grid.Col span={4}>
                        <NumberInput
                            label="Width"
                            aria-label="Width value input"
                            value={aspectRatioLeftValue}
                            min={0}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) =>
                                Math.max(1000 / t ** 2, 25)
                            }
                            onChange={(val: number) =>
                                handleAspectRatioLeftChange(val, false)
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={4}></Grid.Col>
                    <Grid.Col span={4}>
                        <NumberInput
                            label="Height"
                            aria-label="Height value input"
                            value={aspectRatioRightValue}
                            min={0}
                            stepHoldDelay={500}
                            stepHoldInterval={(t) =>
                                Math.max(1000 / t ** 2, 25)
                            }
                            onChange={(val: number) =>
                                handleAspectRatioRightChange(val, false)
                            }
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
    context
) => {
    return {
        props: {
            host: context.req.headers.host,
        },
    };
};

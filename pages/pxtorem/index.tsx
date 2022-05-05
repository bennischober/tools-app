import { useState } from "react";
import { Container, Grid, NumberInput } from "@mantine/core";
import Head from "next/head";
import { getREMFromPX, getPXFromREM } from "../../utils/calculations";

export default function PXToRemPage() {
    const [pxValue, setPxValue] = useState(0);
    const [remValue, setRemValue] = useState(0);
    const [fontValue, setFontValue] = useState(16);

    const handlePXChange = (value: number) => {
        setPxValue(value);
        setRemValue(getREMFromPX(value, fontValue));
    };

    const handleREMChange = (value: number) => {
        setPxValue(getPXFromREM(value, fontValue));
        setRemValue(value);
    };

    const handleFontChange = (value: number) => {
        setFontValue(value);
        // update REM value
        setRemValue(getREMFromPX(pxValue, value));
    };

    return (
        <>
            <Head>
                <title>
                    PX to REM - Calculators | tools.benjaminschober.de
                </title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <h1>Pixel to REM Calculator</h1>
                <Grid>
                    <Grid.Col span={4}>
                        <NumberInput
                            // hideControls
                            size="xl"
                            label="Pixel"
                            aria-label="Pixel value input"
                            min={0}
                            value={pxValue}
                            onChange={(val: number) => handlePXChange(val)}
                        />
                    </Grid.Col>
                    <Grid.Col
                        span={4}
                        style={{ textAlign: "center" }}
                    ></Grid.Col>
                    <Grid.Col span={4}>
                        <NumberInput
                            // hideControls
                            size="xl"
                            precision={2}
                            label="REM"
                            aria-label="REM value input"
                            min={0}
                            value={remValue}
                            onChange={(val: number) => handleREMChange(val)}
                        />
                    </Grid.Col>
                </Grid>
                <Grid>
                    <Grid.Col span={6}>
                        Calculation is based on 16px as base. Change
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <NumberInput
                            size="xs"
                            label="Font Size"
                            min={0}
                            value={fontValue}
                            onChange={(val: number) => handleFontChange(val)}
                        />
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
}
import React from "react";
import {
    ActionIcon,
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineColorScheme,
    useMantineTheme,
    Tooltip,
    Anchor,
    Group,
    createStyles,
    Code,
} from "@mantine/core";
import {
    MdOutlineDarkMode,
    MdOutlineLightMode,
    MdLogin,
    MdLogout,
    MdOutlineSettings,
} from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";
import { CompleteHeaderProps } from "../../types/interfaces";
import metadata from  "../../metadata.json";

const useStyles = createStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 0,
        margin: 0,
        width: "100%",
    },
}));

export function CompleteHeader({
    handleNavigation,
    opened,
}: CompleteHeaderProps) {
    const { classes } = useStyles();

    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const router = useRouter();

    const { data: session, status } = useSession();

    const handleSession = () => {
        if (session && status && status === "authenticated") {
            handleLogOut();
            return;
        }
        handleLogin();
    };

    const handleLogOut = () => {
        signOut();
    };

    const handleLogin = () => {
        router.push("/auth/login");
    };

    return (
        <Header height={70} p="sm">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                        opened={opened}
                        onClick={() => handleNavigation(!opened)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>
                <div className={classes.container}>
                    <Group>
                        <Text>Tools Application</Text>
                        <Group position="apart">
                            <Code sx={{ fontWeight: 700 }}>v{metadata.buildMajor}.{metadata.buildMinor}.{metadata.buildRevision}-{metadata.buildTag}</Code>
                        </Group>
                    </Group>

                    <Group position="right" spacing="xs">
                        <Tooltip label="Github" openDelay={500}>
                            <Anchor
                                href="https://www.github.com/bennischober"
                                rel="noopener noreferer"
                                target="_blank"
                            >
                                <ActionIcon
                                    variant="default"
                                    size={34}
                                    radius="md"
                                >
                                    <FaGithub size={22} />
                                </ActionIcon>
                            </Anchor>
                        </Tooltip>
                        <Tooltip
                            label={
                                theme?.colorScheme === "dark"
                                    ? "Light Mode"
                                    : "Dark Mode"
                            }
                            openDelay={500}
                        >
                            <ActionIcon
                                variant="default"
                                onClick={() => toggleColorScheme()}
                                size={34}
                                radius="md"
                            >
                                {colorScheme === "dark" ? (
                                    <MdOutlineLightMode size={22} />
                                ) : (
                                    <MdOutlineDarkMode size={22} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                        {session && status && status === "authenticated" ? (
                            <Tooltip label="Settings" openDelay={500}>
                                <ActionIcon
                                    variant="default"
                                    onClick={() =>
                                        router.push("/user/settings")
                                    }
                                    size={34}
                                    radius="md"
                                >
                                    <MdOutlineSettings size={22} />
                                </ActionIcon>
                            </Tooltip>
                        ) : (
                            <></>
                        )}
                        <Tooltip
                            label={session ? "Logout" : "Login"}
                            openDelay={500}
                        >
                            <ActionIcon
                                variant="default"
                                size={34}
                                radius="md"
                                onClick={() => handleSession()}
                            >
                                {session ? (
                                    <MdLogout size={22} />
                                ) : (
                                    <MdLogin size={22} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </div>
            </div>
        </Header>
    );
}

import { MantineTheme } from "@mantine/core";
import { NextRouter } from "next/router";

// handle theme, language, and other app settings

/** --- THEME HANDLE --- **/
export function getBackgroundColor(theme: MantineTheme) {
    return theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0];
}

export function getMenuButtonHover(theme: MantineTheme) {
    return theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2];
}

/** --- ROUTING HANDLE --- **/
export function getLastRoute(router: NextRouter) {
    
}


/** --- OTHER HADNLE --- **/

export function getCurrentYear() {
    return new Date().getFullYear();
}

export function getNameInitials(name: string) {
    return name.split(" ").map(word => word[0]).join("");
}
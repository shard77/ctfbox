import Reeact, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";

export default function NavBar() {
    const [activeRoute, setActiveRoute] = useState(window.location.pathname);

    useEffect(() => {
        const handleRouteChange = () => {
            setActiveRoute(window.location.pathname);
        };

        window.addEventListener("popstate", handleRouteChange);

        return () => {
            windows.removeEventListener("popstate", handleRouteChange);
        };
    }, []);
    return (
        <Navbar className="bg-transparent">
            <NavbarBrand>
                <p className="font-jersey text-2xl">CTFBox</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={activeRoute === "/"}>
                    <Link color={activeRoute === "/" ? "secondary" : "foreground"} href="/" aria-current={activeRoute === "/" ? "page" : undefined}>
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeRoute === "leaderboard"}>
                    <Link color={activeRoute === "/ctf-repository" ? "secondary" : "foreground"} href="/ctf-repository" aria-current={activeRoute === "/ctf-repository" ? "page" : undefined}>
                        CTF Repository
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={activeRoute === "leaderboard"}>
                    <Link color={activeRoute === "/leaderboard" ? "secondary" : "foreground"} href="/leaderboard" aria-current={activeRoute === "/leaderboard" ? "page" : undefined}>
                        Leaderboard
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="/images/default-user-icon.jpg"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}

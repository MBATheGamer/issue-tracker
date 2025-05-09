"use client";

import { Container, Flex } from "@radix-ui/themes";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import AuthStatus from "./AuthStatus";
import NavLinks from "./NavLinks";

const NavBar = () => {
  return (
    <nav className="border-b mb-4 px-4 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};
export default NavBar;

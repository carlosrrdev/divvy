import React from 'react'
import {Outlet} from "react-router";
import {IconButton, Container, Flex, Grid, Link, Text} from "@radix-ui/themes";
import {SunIcon} from "@radix-ui/react-icons";

export const Layout: React.FC = () => {
  return (
    <Flex style={{backgroundColor: "var(--accent-1)"}} width={"100%"} height={"100dvh"} direction={"column"}>
      <Grid height={"100%"} rows={"auto 1fr auto"} p={"5"} gap={"7"}>
        <header>
          <Container>
            <Flex justify={"between"} align={"center"}>
              <Link style={{color: "var(--gray-12)", fontWeight: "bold", fontSize: "1.4rem", textDecoration: "none"}}
                    href={"/"}>divvy</Link>
              <IconButton type={"button"} size={"4"} color={"gray"} variant={"ghost"}>
                <SunIcon/>
              </IconButton>
            </Flex>
          </Container>
        </header>
        <main>
          <Outlet/>
        </main>
        <footer>
          <Flex maxWidth={"var(--container-4)"} mx={"auto"} justify={"between"} align={"center"}>
            <Text size={"1"}>Made with &hearts; by Carlos Rodriguez</Text>
            <Text size={"1"}>&copy; 2024</Text>
          </Flex>
        </footer>
      </Grid>
    </Flex>
  )
}

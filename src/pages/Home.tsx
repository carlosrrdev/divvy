import React from "react";
import {Link} from "react-router";
import {Button, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import {BookmarkIcon, Component1Icon} from "@radix-ui/react-icons";

export const Home: React.FC = () => {
  return (
    <Flex direction={"column"} mx={"auto"} maxWidth={"var(--container-4)"} height={"100%"} justify={"center"} gap={"6"} align={"center"}>
      <Heading as={"h1"} align={"center"} size={"9"}>Divvy up your expenses</Heading>
      <Text style={{maxWidth: "var(--container-2)"}} align={"center"}>
        No account needed. Split expenses evenly between party members, or take control and assign expenses
        individually. Let's get started!
      </Text>
      <Grid rows={{
        sm: "1fr 1fr",
        md: "1fr"
      }} columns={{
        sm: "1fr",
        md: "1fr 1fr"
      }} gap={"4"}>
        <Link to={"/new"} style={{
          backgroundColor: "var(--gray-12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-3)",
          borderRadius: "var(--radius-4)",
          padding: "12px 24px",
          textDecoration: "none",
          color: "var(--gray-1)",
        }}>
          <Component1Icon/>
          Create new Divvy
        </Link>
        <Button type={"button"} variant={"outline"} size={"4"}>
          <BookmarkIcon/>
          View saved
        </Button>
      </Grid>
    </Flex>
  )
}
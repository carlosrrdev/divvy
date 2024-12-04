import React from 'react'
import {Container, Flex, Heading, Text} from "@radix-ui/themes";
import {Link} from "react-router";

export const NotFound: React.FC = () => {
  return (
    <Container>
      <Flex gap={"4"} direction={"column"} height={"100dvh"} justify={"center"} align={"center"}>
        <Heading size={"9"}>404</Heading>
        <Text>Hmm...seems like this page no longer exists.</Text>
        <Link to={"/"}>Back to Divvy home page</Link>
      </Flex>
    </Container>
  )
}

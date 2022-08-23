import { Button, Center, Container, Heading } from "@chakra-ui/react";
import Link from "next/link";

function NotFound() {
  return (
    <Container>
      <Heading fontSize="2xl" mb="4" textAlign="center">
        Sorry, the page you were looking for was not found.
      </Heading>
      <Center>
        <Link href="/">
          <Button colorScheme="blue">Return home</Button>
        </Link>
      </Center>
    </Container>
  );
}

export default NotFound;

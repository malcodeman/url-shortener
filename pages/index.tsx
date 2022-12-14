import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useLocalStorageValue } from "@react-hookz/web";
import { map } from "ramda";
import { FiRefreshCw } from "react-icons/fi";
import { useSWRConfig } from "swr";

import { Url } from "../types";
import LinkDetails from "../components/LinkDetails";
import ShortUrlForm from "../components/ShortUrlForm";
import ColorModeToggle from "../components/ColorModeToggle";

const Home: NextPage = () => {
  const [urls] = useLocalStorageValue<undefined | Url[]>("urls", [], {
    initializeWithStorageValue: false,
  });
  const hasLinks = urls?.length;
  const gridTemplateColumns = [
    "1fr",
    "1fr",
    `1fr ${hasLinks ? "365px" : "auto"}`,
  ];
  const { mutate } = useSWRConfig();
  const borderColor = useColorModeValue(
    "rgba(0,0,0,0.1)",
    "rgba(255,255,255,0.1)"
  );

  const handleOnRefreshClicks = async () => {
    if (urls) {
      map((item) => mutate(`/api/urls/${item.id}`), urls);
    }
  };

  return (
    <Grid
      height={["auto", "auto", "100vh"]}
      gridTemplateColumns={gridTemplateColumns}
    >
      <Center paddingTop="16">
        <Container>
          <Box>
            <Heading fontSize="2xl" mb="4" textAlign="center">
              Top TIER Shortener
            </Heading>
            <ShortUrlForm />
          </Box>
        </Container>
      </Center>
      {hasLinks ? (
        <Container
          overflowY="auto"
          paddingY="4"
          borderLeft={["none", "none", `1px solid ${borderColor}`]}
          style={{ scrollbarWidth: "thin" }}
        >
          <Flex mb="4" justifyContent="space-between" alignItems="center">
            <Heading fontSize="xl">Links</Heading>
            <Button
              size="sm"
              leftIcon={<FiRefreshCw />}
              onClick={handleOnRefreshClicks}
            >
              Refresh clicks
            </Button>
          </Flex>

          {map(
            (item) => (
              <LinkDetails
                key={item.id}
                id={item.id}
                originalUrl={item.originalUrl}
                createdAt={item.createdAt}
              />
            ),
            urls
          )}
        </Container>
      ) : null}
      <ColorModeToggle />
    </Grid>
  );
};

export default Home;

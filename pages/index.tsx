import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useLocalStorageValue } from "@react-hookz/web";
import { map } from "ramda";
import { FiRefreshCw } from "react-icons/fi";
import { useSWRConfig } from "swr";

import LinkDetails from "../components/LinkDetails";

type Url = {
  id: string;
  originalUrl: string;
  createdAt: string;
  clicks: number;
};

const defaultValues = {
  longUrl: "",
};
const schema = yup
  .object({
    longUrl: yup
      .string()
      .url("URL needs to be valid")
      .required("URL is required"),
  })
  .required();

const Home: NextPage = () => {
  const form = useForm({ defaultValues, resolver: yupResolver(schema) });
  const toast = useToast();
  const [urls, setUrls] = useLocalStorageValue<undefined | Url[]>("urls", [], {
    initializeWithStorageValue: false,
  });
  const hasLinks = urls?.length;
  const gridTemplateColumns = [
    "1fr",
    "1fr",
    `1fr ${hasLinks ? "365px" : "auto"}`,
  ];
  const { mutate } = useSWRConfig();

  const handleOnSubmit = async (values: { longUrl: string }) => {
    try {
      const resp = await axios.post("/api/urls", values);
      if (urls) {
        setUrls([...urls, resp.data]);
      }
      form.reset();
    } catch (err) {
      if (err instanceof Error) {
        toast({
          description: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

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
      <Center paddingY="4">
        <Container>
          <Box>
            <Heading fontSize="2xl" mb="4" textAlign="center">
              Top TIER Shortener
            </Heading>
            <form
              style={{ marginBottom: "var(--chakra-space-4)" }}
              onSubmit={form.handleSubmit(handleOnSubmit)}
            >
              <FormControl
                isInvalid={Boolean(form.formState.errors.longUrl)}
                mb="2"
              >
                <FormLabel>Long URL</FormLabel>
                <Input {...form.register("longUrl")} variant="filled" />
                <FormHelperText>
                  {form.formState.errors.longUrl?.message}
                </FormHelperText>
              </FormControl>
              <Button type="submit" width="full" colorScheme="blue">
                Shorten it
              </Button>
            </form>
          </Box>
        </Container>
      </Center>
      {hasLinks ? (
        <Container
          overflowY="auto"
          paddingY="4"
          borderLeft={["none", "none", "1px solid rgba(0,0,0,0.1)"]}
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
    </Grid>
  );
};

export default Home;

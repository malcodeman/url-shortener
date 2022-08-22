import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useLocalStorageValue } from "@react-hookz/web";
import { map } from "ramda";

type Url = {
  id: string;
  originalUrl: string;
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

  return (
    <Center minH="100vh">
      <Container maxW="365px">
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
              <Input {...form.register("longUrl")} />
              <FormHelperText>
                {form.formState.errors.longUrl?.message}
              </FormHelperText>
            </FormControl>
            <Button type="submit" width="full" colorScheme="blue">
              Shorten it
            </Button>
          </form>
          <Box>
            <Text>Your URLs</Text>
            {urls
              ? map(
                  (item) => (
                    <Stack key={item.id}>
                      <Link
                        isExternal
                        href={`${window.location.href}/${item.id}`}
                      >
                        {item.id}
                      </Link>
                    </Stack>
                  ),
                  urls
                )
              : null}
          </Box>
        </Box>
      </Container>
    </Center>
  );
};

export default Home;

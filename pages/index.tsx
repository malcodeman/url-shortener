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
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

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

  const handleOnSubmit = async (values: { longUrl: string }) => {
    try {
      await axios.post("/api/urls", values);
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
          <form onSubmit={form.handleSubmit(handleOnSubmit)}>
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
        </Box>
      </Container>
    </Center>
  );
};

export default Home;

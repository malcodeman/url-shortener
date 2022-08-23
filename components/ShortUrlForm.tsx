import React from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocalStorageValue } from "@react-hookz/web";
import axios, { AxiosError } from "axios";
import { includes } from "ramda";

import { Url } from "../types";

const defaultValues = {
  longUrl: "",
  alias: "",
};
const schema = yup
  .object({
    longUrl: yup
      .string()
      .url("URL needs to be valid")
      .required("URL is required"),
  })
  .required();

function ShortUrlForm() {
  const form = useForm({ defaultValues, resolver: yupResolver(schema) });
  const toast = useToast();
  const [urls, setUrls] = useLocalStorageValue<undefined | Url[]>("urls", [], {
    initializeWithStorageValue: false,
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOnSubmit = async (values: { longUrl: string; alias: string }) => {
    try {
      setIsLoading(true);
      const resp = await axios.post("/api/urls", values);
      if (urls) {
        setUrls([...urls, resp.data]);
        form.reset();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (
          includes(
            "Unique constraint failed on the constraint",
            err.response?.data
          )
        ) {
          form.setError("alias", { message: "Not available" });
        } else {
          toast({
            description: err.message,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      style={{ marginBottom: "var(--chakra-space-4)" }}
      onSubmit={form.handleSubmit(handleOnSubmit)}
    >
      <Grid gridTemplateColumns={["1fr", "3fr 1fr"]} gridGap="2" mb="2">
        <FormControl isInvalid={Boolean(form.formState.errors.longUrl)}>
          <FormLabel>Long URL</FormLabel>
          <Input
            {...form.register("longUrl")}
            variant="filled"
            data-test-id="long-url-input"
          />
          <FormHelperText>
            {form.formState.errors.longUrl?.message}
          </FormHelperText>
        </FormControl>
        <FormControl isInvalid={Boolean(form.formState.errors.alias)}>
          <FormLabel>Alias</FormLabel>
          <Input
            {...form.register("alias")}
            variant="filled"
            data-test-id="alias-input"
          />
          <FormHelperText>
            {form.formState.errors.alias?.message}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Button
        isLoading={isLoading}
        type="submit"
        width="full"
        colorScheme="blue"
        data-test-id="shorten-it-button"
      >
        Shorten it
      </Button>
    </form>
  );
}

export default ShortUrlForm;

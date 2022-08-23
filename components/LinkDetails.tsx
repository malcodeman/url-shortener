import React from "react";
import { Box, Text, Link, useToast } from "@chakra-ui/react";
import { format } from "date-fns";
import axios from "axios";

import utils from "../lib/utils";
import ClipboardInput from "./ClipboardInput";

type Props = {
  id: string;
  originalUrl: string;
  createdAt: string;
  initialClicks: number;
};

function LinkDetails(props: Props) {
  const { id, originalUrl, createdAt, initialClicks } = props;
  const [clicks, setClicks] = React.useState(initialClicks);
  const clipboardValue = `${window.location.href}${id}`;
  const toast = useToast();

  React.useEffect(() => {
    const getUrl = async (id: string) => {
      try {
        const resp = await axios.get(`/api/urls/${id}`);
        setClicks(resp.data.clicks);
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
    getUrl(id);
  }, [id, toast]);

  return (
    <Box mb="4">
      <Text>{format(new Date(createdAt), "MMM d, kk:mm")}</Text>
      <ClipboardInput label="" value={clipboardValue} />
      <Text fontSize="sm">
        Destination:{" "}
        <Link isExternal href={originalUrl}>
          {utils.getUrlHost(originalUrl)}
        </Link>
      </Text>
      <Text fontSize="sm">Clicks: {clicks}</Text>
    </Box>
  );
}

export default LinkDetails;

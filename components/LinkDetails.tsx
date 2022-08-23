import React from "react";
import {
  Box,
  Text,
  Link,
  useToast,
  Button,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import axios from "axios";
import useSWR from "swr";
import { ImQrcode } from "react-icons/im";

import utils from "../lib/utils";
import ClipboardInput from "./ClipboardInput";
import QrCodeModal from "./QrCodeModal";

type Props = {
  id: string;
  originalUrl: string;
  createdAt: string;
};

function LinkDetails(props: Props) {
  const { id, originalUrl, createdAt } = props;
  const clipboardValue = `${window.location.href}${id}`;
  const toast = useToast();
  const qrCodeModal = useDisclosure();
  const { data } = useSWR(
    `/api/urls/${id}`,
    () => axios.get(`/api/urls/${id}`),
    {
      onError: (err) => {
        toast({
          description: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );

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
      <Divider marginY="2" />
      <Text fontSize="sm">Clicks: {data?.data.clicks}</Text>
      <Divider marginY="2" />
      <Button leftIcon={<ImQrcode />} size="sm" onClick={qrCodeModal.onOpen}>
        QR Code
      </Button>
      <QrCodeModal
        isOpen={qrCodeModal.isOpen}
        value={clipboardValue}
        onClose={qrCodeModal.onClose}
      />
    </Box>
  );
}

export default LinkDetails;

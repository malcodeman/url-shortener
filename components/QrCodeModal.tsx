import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";

type Props = {
  isOpen: boolean;
  value: string;
  onClose: () => void;
};

function QrCodeModal(props: Props) {
  const { isOpen, value, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>QR Code</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <QRCodeSVG value={value} />
          </Center>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default QrCodeModal;

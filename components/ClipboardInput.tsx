import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useClipboard,
} from "@chakra-ui/react";

type Props = {
  label: string;
  value: string;
};

function ClipboardInput(props: Props) {
  const { label, value } = props;
  const { hasCopied, onCopy } = useClipboard(value);
  return (
    <FormControl mb="2">
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input variant="filled" value={value} readOnly />
        <InputRightElement width="4rem">
          <Button size="xs" onClick={onCopy}>
            {hasCopied ? "Copied" : "Copy"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default ClipboardInput;

import {
    Button,
    Modal,
    Group,
    Stack,
    Text,
    Textarea,
    NumberInput,
    Box,
    TextInput,
    SimpleGrid,
    Title,
    MultiSelect,
    Image,
    rem,
    Alert,
    Center,
  } from "@mantine/core";
  import { useEffect, useState } from "react";
  import { TbPhoto, TbUpload, TbX } from "react-icons/tb";
  import { showNotification } from "@mantine/notifications";
  import { useNavigate, useRevalidator } from "@remix-run/react";
  import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";

  interface UploadModalProps {
    opened: boolean;
    close: () => void;
    open: () => void;
  }
  
  export function UploadModal(props: UploadModalProps) {
      const { opened, close } = props;
      const revalidator = useRevalidator();
      const navigate = useNavigate();
      const [isUpdating, setIsUpdating] = useState(false);
      const [errorMessage, setErrorMessage] = useState<string | null>(null);

      // Field states
      const [files, setFiles] = useState<FileWithPath[]>([]);
      const [fileError, setFileError] = useState<string | null>();

    return (
        <>
        <Modal opened={opened} onClose={close} title={``} radius="lg" centered>
            <Stack mt="20" mx={"50"} display={"flex"} >
              <Box>
                {/* Product Images section */}
                <Stack>
                    <Dropzone
                    name="images"
                    multiple
                    onDrop={(acceptedFiles) => {
                        setFiles(acceptedFiles);
                        setFileError(null); // Reset any previous errors
                    }}
                    onReject={(fileRejections) => {
                        setFileError(fileRejections[0].errors[0].message);
                    }}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    >
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                        <Dropzone.Accept>
                        <TbUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            fontWeight={1.5}
                        />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                        <TbX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            fontWeight={1.5}
                        />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                        <TbPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            fontWeight={1.5}
                        />
                        </Dropzone.Idle>

                        <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                        </div>
                    </Group>
                    </Dropzone>
                    {fileError && <Alert variant="outline" color="error.5" title="Error uploading file">{fileError}</Alert>}
                    <SimpleGrid cols={{ base: 1, sm: 4 }} mt={[].length > 0 ? 'xl' : 0}>
                    {}
                    </SimpleGrid>
                </Stack>
              </Box>
            {errorMessage && (
              <Text c="error.5" size={"xs"}>
                {errorMessage}
              </Text>
            )}

            {/* Action Buttons */}
            <Group justify="center" mt="lg">
              <Button w="200" radius="xl" loading={isUpdating} >Upload</Button>
            </Group>
          </Stack>
        </Modal>
      </>
    )
  }

import {
    Button,
    Modal,
    Group,
    Stack,
    Text,
    Box,
    SimpleGrid,
    rem,
    Alert,
    Image,
  } from "@mantine/core";
  import { FormEvent, useEffect, useState } from "react";
  import { TbPhoto, TbUpload, TbX } from "react-icons/tb";
  import { showNotification } from "@mantine/notifications";
  import { useFetcher, useRevalidator } from "@remix-run/react";
  import { Dropzone, FileWithPath } from "@mantine/dropzone";

  interface UploadModalProps {
    opened: boolean;
    close: () => void;
    open: () => void;
  }

  type ActionData = {
    error?: string;
    urls?: string[];
  };
  
  export function UploadModal(props: UploadModalProps) {
      const { opened, close } = props;
      const revalidator = useRevalidator();
      const [errorMessage, setErrorMessage] = useState<string | null>(null);
      const fetcher = useFetcher();
      const isUploading = fetcher.state === 'submitting';

      // Field states
      const [files, setFiles] = useState<FileWithPath[]>([]);
      const [fileError, setFileError] = useState<string | null>();

      const reset = () => {
        setErrorMessage(null);
        setFileError(null);
      };

      const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Text key={index}>{file.name}</Text>;
      });

      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        reset();

        if (!files.length) {
            setErrorMessage('Please upload at least 1 file');
            return;
        }

        files.forEach((file) => {
            formData.append('file', file);
          });

        const formData = new FormData(event.currentTarget);

        fetcher.submit(formData, { action: "/api/upload", method: 'post', encType: 'multipart/form-data' });
      };

      useEffect(() => {
        if (fetcher.data && (fetcher.data as ActionData).error) {
            setErrorMessage((fetcher.data as ActionData).error || 'An error occurred');
        } else if (fetcher.data && (fetcher.data as ActionData).urls) {
            showNotification({
                title: 'File uploaded',
                message: 'Your file has been uploaded successfully',
                color: 'teal',
            });
            close();
        }

      }, [fetcher.data])

    return (
        <>
        <Modal opened={opened} onClose={close} title={``} radius="lg" centered>
            <fetcher.Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <Stack mt="20" mx={"50"} display={"flex"} >
                    <Box>
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
                            accept={["mp4", "mov", "webm"]}
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
                                    Drag videos here or click to select files
                                </Text>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    Attach as many files as you like, each file should not exceed 5mb
                                </Text>
                                </div>
                            </Group>
                            </Dropzone>
                            {fileError && <Alert variant="outline" color="red" title="Error uploading file">{fileError}</Alert>}
                            <SimpleGrid cols={{ base: 1, sm: 4 }} mt={[].length > 0 ? 'xl' : 0}>
                            {previews}
                            </SimpleGrid>
                        </Stack>
                    </Box>
                    {(errorMessage) && (
                    <Text c="red" size={"xs"}>
                        {errorMessage}
                    </Text>
                    )}

                    {/* Action Buttons */}
                    <Group justify="center" mt="lg">
                    <Button w="200" radius="xl" loading={isUploading} type="submit">Upload</Button>
                    </Group>
                </Stack>
            </fetcher.Form>
        </Modal>
      </>
    )
  }

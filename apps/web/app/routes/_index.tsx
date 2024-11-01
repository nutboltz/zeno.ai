import { prisma } from "@zeno-ai/database";
import { ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Button, Group, TextInput, Text, MultiSelect, Flex, Stack, Grid, Card, Badge, Avatar, SimpleGrid } from "@mantine/core";
import { TbSearch } from "react-icons/tb";
import { useAtom } from "jotai";
import { searchTermAtom } from "@app/store";
import { useNavigate } from "@remix-run/react";
import { useDisclosure } from "@mantine/hooks";
import { UploadModal } from "@app/components/UploadModal";

export const meta: MetaFunction = () => {
  return [
    { title: "Zeno" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {

  const files = await prisma.originalFile.findMany({
    where: {
      ownerEmail: "eunicehx920@gmail.com",
    },
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return typedjson({ data: files });
};

export default function Index() {
  const { data: files } = useTypedLoaderData<typeof loader>()
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [uploadModalOpened, { open: openUploadModal, close: closeUploadModal }] = useDisclosure();

  return (
    <Stack display={"flex"} mb="md" mt="xl" px={{ base: 30, sm: 40, lg: 40 }} style={{
        width: "100%",
    }}>
      <Stack gap={0}>
        <Group justify="apart" mb="lg">
          <TextInput leftSection={<TbSearch/>} placeholder="Search anything..." size={"md"} style={{ flex: 1, marginRight: '10px' }} radius={"md"} onChange={(e) => setSearchTerm(e.target.value)}/>
          <Button size="md" radius={"md"} onClick={openUploadModal}>
            New Video
          </Button>
        </Group>

      <Text fw={500} size="lg" mb="xs">Videos</Text>
      <SimpleGrid cols={{ base: 3, sm: 4, md: 5, lg: 6  }} spacing={{ base: "lg", sm: "sm", md: "md", lg: "lg"  }} verticalSpacing={{ base: 'md', sm: 'xl' }}>
        {files.map((file, index) => (
            <Card shadow="sm" radius="md" p="md" withBorder key={file.name}>
              <Card.Section>
                <img src={file.thumbnail || ""} alt="Video thumbnail" />
              </Card.Section>

              <Group gap="apart" mt="md" mb="xs">
                <Text fw={500}>{file.name}</Text>
                <Group gap="xs">
                  <Badge color="pink" variant="light">Design</Badge>
                  <Badge color="teal" variant="light">Web Design</Badge>
                </Group>
              </Group>

              <Text size="sm" color="dimmed">1 hour ago</Text>

            </Card>
        ))}
      </SimpleGrid>
      </Stack>
      {uploadModalOpened ? <UploadModal opened={uploadModalOpened} open={openUploadModal} close={closeUploadModal} /> : null}
    </Stack>
  );
}

// export async function action({
//   request,
//   params,
// }: ActionFunctionArgs) {

  
// }
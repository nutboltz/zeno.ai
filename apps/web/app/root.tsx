/* eslint-disable @typescript-eslint/no-unused-vars */
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import 'mantine-datatable/styles.layer.css';
import '@mantine/dropzone/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider, ColorSchemeScript, AppShell, ScrollArea, NavLink, Image, Center, useMantineTheme} from "@mantine/core";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  NavLink as RemixNavLink,
} from "@remix-run/react";
import { Provider as JotaiProvider } from 'jotai';
import { useState } from "react";
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import { useDisclosure } from "@mantine/hooks";
import { TbFiles } from "react-icons/tb";

const navRoutes = [
  {
    icon: TbFiles,
    label: "My Files",
    description: "",
    rightSection: null,
    href: "/myfiles",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JotaiProvider>
          <MantineProvider>
            <Notifications />
              <QueryClientProvider client={queryClient}>
                <AppShell
                  layout="alt"
                  header={{ height: "5rem" }}
                  navbar={{
                    width: "15%",
                    breakpoint: "500px",
                    collapsed: { desktop: false, mobile: false },
                  }}
                  padding={"xl"}
                >
                  {children}
                </AppShell>
              </QueryClientProvider>
          </MantineProvider>
        </JotaiProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] =
    useDisclosure(true);

  const navItems = navRoutes.map((item, index) => (
    <NavLink
      px="md"
      c="dark"
      fw={500}
      component={RemixNavLink}
      to={item.href}
      key={item.label}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      leftSection={<item.icon size="1rem" />}
    />
  ));
  
  return (
    <AppShell padding="md"
      header={{ height: 0 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}>
      <AppShell.Navbar display="flex">
        <AppShell.Section grow component={ScrollArea}>
          {navItems}
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main display="flex">
        <Outlet/>
      </AppShell.Main>
    </AppShell>
  )
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  return (
    <>
      <h1>Error!</h1>
    </>
  );
}


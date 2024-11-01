// import type { AppRouter } from "@zeno-ai/api/src/trpc/appRouter";
// import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
// import {
//   createTRPCReact,
//   type inferReactQueryProcedureOptions,
//   createTRPCProxyClient,
//   httpBatchLink,
//   httpLink,
//   loggerLink
// } from '@trpc/react-query';
// import { SuperJSON } from 'superjson';
// import { getBaseUrl } from "./misc";

// // Create fetch based trpc client
// export const useTRPC = (request?: Request) => {
//   return createTRPCProxyClient<AppRouter>({
//     transformer: SuperJSON,
//     links: [
//       loggerLink({
//         enabled: (opts) =>
//           process.env.NODE_ENV === 'development' ||
//           (opts.direction === 'down' && opts.result instanceof Error),
//       }),
//       httpLink({
//         url: `${getBaseUrl()}/api/trpc`, // We need to setup Server Side API to point to this
//       }),
//       httpBatchLink({
//         url: `${getBaseUrl()}/api/trpc`,
//         fetch(url, options) {
//           return fetch(url, {
//             ...options,
//             credentials: "include",
//           });
//         },
//         headers: () => {
//           const cookie = request?.headers.get("Cookie") || "";
//           return { cookie };
//         },
//       }),
//     ],
//   });
// };

// // Infer types
// export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
// export type RouterInputs = inferRouterInputs<AppRouter>;
// export type RouterOutputs = inferRouterOutputs<AppRouter>;

// // Create react query trpc client
// export const clientTRPC = createTRPCReact<AppRouter>();
// import { createTRPCFetchContext } from "@cha-li/api/src/trpc/context";
// import { appRouter } from "@cha-li/api/src/trpc/appRouter";
// import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
// import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
// // Both Action and Loaders will point to tRPC Router
// export const loader = async (args: LoaderFunctionArgs) => {
//  return handleRequest(args);
// };

// export const action = async (args: ActionFunctionArgs) => {
//  return handleRequest(args);
// };

// function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
//  return fetchRequestHandler({
//    endpoint: '/api/trpc',
//    req: args.request,
//    router: appRouter,
//    createContext: createTRPCFetchContext,
//  });
// }

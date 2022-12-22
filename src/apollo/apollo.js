import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, concat } from "apollo-link";
import { getCookie } from "@/functions/getCookie";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql",
  // uri: "https://api.my-page.co.kr/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getCookie("token");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

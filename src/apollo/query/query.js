import gql from "graphql-tag";

export const Query = {
  meForInfo: gql`
    query ($id: ID!) {
      me(id: $id) {
        id
        email
        nickname
        githubUrl
      }
    }
  `,
  meForDashboard: gql`
    query ($id: ID!) {
      me(id: $id) {
        nickname
      }
    }
  `,
};

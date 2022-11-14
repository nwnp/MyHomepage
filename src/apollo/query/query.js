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
  postForDashboard: gql`
    query Posts($id: ID!) {
      getPostsByUserId(id: $id) {
        id
        title
        content
        imageUrl
      }
    }
  `,
};

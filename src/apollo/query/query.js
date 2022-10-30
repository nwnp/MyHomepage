import gql from "graphql-tag";

export const Query = {
  me: gql`
    query ($id: ID!) {
      me(id: $id) {
        id
        email
        nickname
        githubUrl
        blogUrl
        job
        gender
      }
    }
  `,
};

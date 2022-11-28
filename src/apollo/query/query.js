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
  getPostWithComment: gql`
    query ($postId: ID!) {
      getPostWithComment(postId: $postId) {
        id
        post_comment
        CommentedUserId
        post {
          title
          content
        }
        user {
          id
          email
          nickname
        }
      }
    }
  `,
  getLimitedPosts: gql`
    query ($count: Int!) {
      getLimitedPosts(count: $count) {
        id
        title
        content
        user {
          email
          nickname
        }
      }
    }
  `,
  getComments: gql`
    query {
      getComments {
        id
        comment
        secret
        user {
          id
          email
          nickname
        }
      }
    }
  `,
};

import gql from "graphql-tag";

export const Query = {
  me: gql`
    query Me($id: ID!) {
      me(id: $id) {
        id
        githubUrl
        name
        email
        githubUrl
        blogUrl
        gender
        nickname
        job
      }
    }
  `,
  followsForLogin: gql`
    query ($id: ID!) {
      followsForLogin(id: $id) {
        following_me
        im_following
      }
    }
  `,
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
    query ($info: PostWithComment!) {
      getPostWithComment(info: $info) {
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
    query ($post: LimitedPosts!) {
      getLimitedPosts(post: $post) {
        id
        title
        content
        createdAt
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
  getLimitedTils: gql`
    query ($til: LimitedTils!) {
      getLimitedTils(til: $til) {
        id
        til_content
        title
        UserId
        createdAt
      }
    }
  `,
  getTilWithComment: gql`
    query ($tilId: ID!) {
      getTilWithComment(tilId: $tilId) {
        id
        createdAt
        CommentedUserId
        til_comment
        user {
          id
          email
          nickname
        }
        til {
          til_content
          title
        }
      }
    }
  `,
  getTilsByUserId: gql`
    query ($UserId: Int!) {
      getTilsByUserId(UserId: $UserId) {
        id
        title
        til_content
        createdAt
      }
    }
  `,
  getPostsByUserId: gql`
    query ($id: ID!) {
      getPostsByUserId(id: $id) {
        id
        title
        content
        imageUrl
      }
    }
  `,
};

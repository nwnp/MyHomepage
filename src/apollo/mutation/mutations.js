import gql from "graphql-tag";

export const Mutation = {
  signup: gql`
    mutation ($user: UserData!) {
      signup(user: $user) {
        email
        nickname
        job
        gender
        githubUrl
        blogUrl
      }
    }
  `,
  login: gql`
    mutation ($userInfo: UserLoginInfo!) {
      login(userInfo: $userInfo) {
        accessToken
      }
    }
  `,
  updatePost: gql`
    mutation ($post: Update!) {
      updatePost(post: $post)
    }
  `,
  deletePost: gql`
    mutation ($id: ID!) {
      deletePost(id: $id)
    }
  `,
};

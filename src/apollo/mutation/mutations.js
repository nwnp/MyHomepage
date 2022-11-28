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
    mutation ($postId: ID!) {
      deletePost(postId: $postId)
    }
  `,
  registerPostComment: gql`
    mutation ($post: PostCommentRegister!) {
      registerPostComment(post: $post)
    }
  `,
  deletePostComment: gql`
    mutation ($post: PostCommentDelete!) {
      deletePostComment(post: $post)
    }
  `,
  updatePostComment: gql`
    mutation ($post: PostCommentUpdate!) {
      updatePostComment(post: $post)
    }
  `,
};

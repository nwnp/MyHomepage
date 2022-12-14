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
  registerPost: gql`
    mutation ($post: Register!) {
      registerPost(post: $post) {
        id
        title
        content
      }
    }
  `,
  updatePost: gql`
    mutation ($post: Update!) {
      updatePost(post: $post)
    }
  `,
  deletePost: gql`
    mutation ($post: Delete!) {
      deletePost(post: $post)
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
  registerTilComment: gql`
    mutation ($til: RegisterTilComment!) {
      registerTilComment(til: $til)
    }
  `,
  deleteTilComment: gql`
    mutation ($til: DeleteTil!) {
      deleteTilComment(til: $til)
    }
  `,
  updateTilComment: gql`
    mutation ($til: UpdateTilComment!) {
      updateTilComment(til: $til)
    }
  `,
  registerTil: gql`
    mutation ($til: RegisterTil!) {
      registerTil(til: $til)
    }
  `,
  deleteTil: gql`
    mutation ($til: DeleteTil!) {
      deleteTil(til: $til)
    }
  `,
  updateTil: gql`
    mutation ($til: UpdateTil!) {
      updateTil(til: $til)
    }
  `,
};

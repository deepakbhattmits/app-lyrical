import { gql } from '@apollo/client'
export const GET_SONGS = gql`
  query Songs {
    songs {
      title
      id
    }
  }
`

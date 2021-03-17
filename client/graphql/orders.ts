import { gql } from '@apollo/client';

export const ORDERS_QUERY = gql`
  query ORDERS_QUERY {
    orders(sortBy: _ID_DESC) {
      _id
      for
      syrups
      itemId {
        _id
        desc
        icon
        name
        type
      }
      owner {
        _id
        email
        firstName
        isAdmin
        lastName
        name
        pictureUrl
      }
      status {
        name
        tag
        time
      }
    }
  }
`;

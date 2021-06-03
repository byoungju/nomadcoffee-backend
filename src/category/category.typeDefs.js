import { gql } from "apollo-server";

export default gql`
  type Category {
    id:         Int!
    name:       String!
    slug:       String!
    shops(lastId: Int): [CoffeeShop]!
    totalShops: Int!
  }
`;

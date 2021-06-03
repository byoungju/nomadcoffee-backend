import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String
      longitude: String
      photo: Upload!
      categories: String!
    ): MutationResponse!
  }
`;

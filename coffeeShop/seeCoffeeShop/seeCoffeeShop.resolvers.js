import client from "../../client";

export default {
  Query: {
    seeCoffeeShop: (_, { id }, { client }) =>
      client.coffeeShop.findUnique({
        where: { id },
        include: { categories: true },
      }),
  },
};

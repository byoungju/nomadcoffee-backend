import client from "../client";

export default {
  Category: {
    totalShops: ({ name }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              name,
            },
          },
        },
      }),
    shops: ({ id }, { lastId }) =>
      client.category
        .findUnique({
          where: { id },
        })
        .shops({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        }),
  },
};

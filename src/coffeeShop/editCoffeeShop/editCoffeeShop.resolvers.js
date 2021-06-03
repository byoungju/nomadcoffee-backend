import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, photo, categories },
        { loggedInUser }
      ) => {

        const oldCoffeeShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: { select: { name: true } },
            photo: { select: { id: true } },
          },
        });
        if (!oldCoffeeShop) {
          return {
            ok: false,
            error: "CoffeeShop not found.",
          };
        }

        try {
          await client.coffeeShop.update({
            where: { id },
            data: {
              name,
              latitude,
              longitude,
              ...(categories && {
                categories: {
                  disconnect: oldCoffeeShop.categories,
                  connectOrCreate: processCategory(categories),
                },
              }),
            },
          });

          if (photo) {
            const photoUrl = await filesHandler(photo, loggedInUser.id);
            await client.coffeeShopPhoto.create({
              data: {
                url: photoUrl,
                shop: {
                  connect: {
                    id,
                  },
                },
              },
            });
          }
          return {
            ok: true,
            error: null
          };
        } catch (err) {
          return {
            ok: false,
            error: "Cant edit coffeeShop.",
          };
        }
      }
    ),
  },
};
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
          },
          include: {
            categories: {
              select: {
                id: true,
              },
            },
          },
        });

        if (!oldCoffeeShop) {
          return {
            ok: false,
            error: "CoffeeShop not found.",
          };
        }
        try {
          let photoUrl = null
          if (photo) {
            photoUrl = await filesHandler(photo, loggedInUser.id);
            await client.coffeeShopPhoto.deleteMany({
              where: {
                shop: {
                  id,
                },
              },
            });
          }

          await client.coffeeShop.update({
            where: { id },
            data: {
              name,
              latitude,
              longitude,
              ...(photoUrl && {
                photos: {
                  create: {
                    url: photoUrl,
                  },
                },
              }),
              ...(categories && {
                categories: {
                  disconnect: oldCoffeeShop.categories,
                  connectOrCreate: processCategory(categories),
                },
              }),
            },
          });

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
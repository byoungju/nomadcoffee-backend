import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { filesHandler, processCategory } from '../coffeeShop.utiles';
export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (_, { name, latitude, longitude, photo, categories }, { loggedInUser }) => {
        try {
          const coffeeShop = await client.coffeeShop.create({
            data: {
              name,
              latitude,
              longitude,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              categories: {
                connectOrCreate: processCategory(categories),
              },
            },
          });

          console.log(photo)
          console.log(loggedInUser)

          if (photo) {
            const photoUrl = await filesHandler(photo, loggedInUser.id);
            await client.coffeeShopPhoto.create({
              data: {
                url: photoUrl,
                shop: {
                  connect: {
                    id: coffeeShop.id,
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
            error: err,
          };
        }
      }
    ),
  },
};
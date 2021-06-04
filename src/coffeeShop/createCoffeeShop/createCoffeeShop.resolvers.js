import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { filesHandler, processCategory } from '../coffeeShop.utiles';
export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (_, { name, latitude, longitude, photo, categories }, { loggedInUser }) => {
        let photoUrl = null
        if (photo) {
          photoUrl = await filesHandler(photo, loggedInUser.id);
        }
        try {
          await client.coffeeShop.create({
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
              ...(photoUrl && {
                photos: {
                  create: {
                    url: photoUrl,
                  },
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
            error: err,
          };
        }
      }
    ),
  },
};
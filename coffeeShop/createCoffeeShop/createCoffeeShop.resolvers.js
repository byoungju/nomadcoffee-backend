import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { createWriteStream } from "fs";
export default {
  Mutation: {
    createCoffeeShop: protectedResolver(
      async (_, { name, photos, categories }, { loggedInUser }) => {
        try {
          let categoriesObjs = [];
          let photosObjs = [];

          if (categories) {
            const hashtags = categories.match(/#[\w]+/g) || [];
            categoriesObjs = hashtags.map(
              (hashtag) => ({
                where: { hashtag },
                create: { hashtag },
              })
            );
          }
          if (photos) {
            photosObjs = photos.map(
              async (photoURL) => {
                const { filename, createReadStream } = await photoURL;
                const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
                const readStream = createReadStream();
                const writeStream = createWriteStream(
                  process.cwd() + "/uploads/" + newFilename
                );
                readStream.pipe(writeStream);
                const url = `http://localhost:4000/static/${newFilename}`;
                return url;
              }
            );
          }

          const coffeeShop = await client.coffeeShop.create({
            data: {
              name,
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              ...(categoriesObjs.length > 0 && {
                categories: {
                  connectOrCreate: categoriesObjs,
                },
              }),
            },
          });


          photosObjs.map(async (url) => {
            await client.coffeeShopPhoto.create({
              data: {
                url,
                shop: {
                  connect: {
                    id: coffeeShop.id,
                  },
                },
              },
            });
          })

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
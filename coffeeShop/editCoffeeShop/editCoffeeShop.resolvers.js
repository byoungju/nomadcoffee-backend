import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { createWriteStream } from "fs";
export default {
  Mutation: {
    editCoffeeShop: protectedResolver(
      async (
        _,
        { id, name, latitude, longitude, photos, categories },
        { loggedInUser }
      ) => {
        try {
          const oldCoffeeShop = await client.coffeeShop.findFirst({
            where: {
              id,
              userId: loggedInUser.id,
            },
            include: {
              categories: { select: { name: true } },
              photos: { select: { id: true } },
            },
          });
          if (!oldCoffeeShop) {
            return {
              ok: false,
              error: "CoffeeShop not found.",
            };
          }

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
                const url = `http://localhost:4000/static/${newFilename}`

                return ({ where: { url }, create: { url } });
              }
            );
          }

          await client.coffeeShop.update({
            where: { id },
            data: {
              name,
              latitude,
              longitude,
              ...(photosObjs.length > 0 && {
                photos: {
                  deleteMany: oldShop.photos,
                  connectOrCreate: photosObjs,
                },
              }),
              ...(categoriesObjs.length > 0 && {
                categories: {
                  disconnect: oldShop.categories,
                  connectOrCreate: categoriesObjs,
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
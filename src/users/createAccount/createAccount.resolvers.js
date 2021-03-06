import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, name, location, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          return {
            ok: false,
            error: "This username / email is already taken",
          };
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        const createUser = await client.user.create({
          data: {
            username,
            email,
            name,
            location,
            password: uglyPassword,
          },
        });
        if (createUser.id) {
          return {
            ok: true,
            error: null
          };
        } else {
          return {
            ok: false,
            error: "Could not create account",
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: "Cant create account.",
        };
      }
    },
  },
};

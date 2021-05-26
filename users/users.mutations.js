import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, name, location, password, avatarURL, githubUsername }) => {
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
          avatarURL,
          githubUsername,
        },
      });
      if (createUser.id) {
        return {
          ok: true,
          error: null
        };
      }
    },
  },
};
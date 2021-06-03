import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { filesHandler } from '../../coffeeShop/coffeeShop.utiles';

const resolverFn = async (
  _,
  { username, email, name, location, password: newPassword, avatarURL, githubUsername },
  { loggedInUser }
) => {
  let avatar = null;
  if (avatarURL) {
    avatar = await filesHandler(file, loggedInUser.id);
  }
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      email,
      name,
      location,
      githubUsername,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatar && { avatarURL: avatar }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

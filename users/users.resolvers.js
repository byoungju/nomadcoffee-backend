import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    followers: async ({ id }, { lastId }) => {
      const ok = await client.user.findUnique({ where: { id }, select: { id: true } });
      if (!ok) {
        return [];
      }
      const followers = await client.user.findUnique({ where: { id } }).followers({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return followers;
    },
    following: async ({ id }, { lastId }) => {
      const ok = await client.user.findUnique({ where: { id }, select: { id: true } });
      if (!ok) {
        return [];
      }
      const following = await client.user.findUnique({ where: { id } }).following({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return following;
    },
  },
};

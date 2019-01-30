export default {
  Query: {
    allICOs: async (parent, args, { models }) => {
      const icos = await models.ICO.find();
      return icos.map((ico) => {
        ico._id = ico._id.toString();
        return ico;
      });
    },
  },

  Mutation: {
    createICO: async (parent, args, { models }) => {
      // const ico = await models.ICO.create({
      //   ...args
      // });
      // return ico
      const ico = await new models.ICO(args).save();
      ico._id = ico._id.toString();
      return ico;
    },
  },
};

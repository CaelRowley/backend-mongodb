export default {
  Query: {
    allICOs: async (parent, args, { ICO }) => {
      const icos = await ICO.find();
      return icos.map((ico) => {
        ico._id = ico._id.toString();
        return ico;
      });
    },
  },

  Mutation: {
    createICO: async (parent, args, { ICO }) => {
      const ico = await new ICO(args).save();
      ico._id = ico._id.toString();
      return ico;
    },
  },
};

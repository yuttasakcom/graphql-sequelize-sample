import Product from "./models/product";
import User from "./models/user";

export default {
  Query: {
    products: async () => {
      const products = await Product.findAll();
      return products;
    },
  },
  Mutation: {
    addProduct: async (parent, { data }) => {
      const result = await Product.create({
        title: data.title,
        price: data.price,
        imageUrl: data.imageUrl,
        description: data.description,
        userId: data.userId,
      });
      return result;
    },
    editProduct: async (parent, { data }) => {
      const product = await Product.findByPk(data.id);
      product.title = data.title;
      product.price = data.price;
      product.description = data.description;
      product.imageUrl = data.imageUrl;
      await product.save();
      return product;
    },
  },
  Product: {
    userId: async parent => {
      const user = await User.findByPk(parent.userId);
      return user;
    },
  },
  User: {
    products: async parent => {
      const products = await Product.findAll({ where: { userId: parent.id } });
      return products;
    },
  },
};

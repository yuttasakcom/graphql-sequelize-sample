import Product from "./models/product";

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
};

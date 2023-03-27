import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const products = await Product.find();
    return response.status(200).json(products);
  }

  if (request.method === "POST") {
    try {
      const productData = request.body;
      const product = new Product(productData);
      await product.save();

      response.status(201).json({ status: "Product created." });
    } catch (error) {
      console.log(error);
      response.status(404).json({ error: error.message });
    }
  }
}

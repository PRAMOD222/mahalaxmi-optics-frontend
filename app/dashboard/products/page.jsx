"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image";


const baseApi = process.env.NEXT_PUBLIC_BASE_API;


const Products = () => {
  // State for form fields
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    addInfo: '',
    category: '',
    images: [],
  });



  const [products, setProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addproductopen, setAddProductOpen] = useState(false);


  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseApi}/api/products/all`);
      const data = await response.json();
      setProducts(data);
      console.log("Products fetched:", data);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle image file uploads
  const handleFileChange = (e) => {
    setProduct({ ...product, images: e.target.files });
  };


  const handleEdit = (product) => {
    console.log(product);

    setProduct({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
      addInfo: product.addInfo,
      images: product.image,
    });
    setIsEditMode(true);
    setAddProductOpen(true);
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("barcode", product.barcode);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("discount", product.discount);
    formData.append("discountedPrice", product.discountedPrice);
    formData.append("addInfo", product.addInfo);
    formData.append("volume", product.volume);
    formData.append("veg", product.veg);
    formData.append("category", product.category); // Append the category

    // Append images to form data
    for (let i = 0; i < product.images.length; i++) {
      formData.append("image", product.images[i]);
    }

    // Send the form data to the backend
    try {

      if (isEditMode) {
        // Update product
        const response = await fetch(`${baseApi}/api/products/edit/${product._id}`, {
          method: "PUT",
          body: formData,
        });

        if (response.ok) {
          const updatedProduct = await response.json();

          // Update the products state
          setProducts((prevProducts) =>
            prevProducts.map((prod) => (prod._id === updatedProduct._id ? updatedProduct : prod))
          );

          console.log("Product updated successfully");
          fetchProducts();
        } else {
          console.error("Failed to update product");
        }
      } else {
        const res = await axios.post(`${baseApi}/api/products/add-product`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product added successfully!");
        console.log(res.data);
        fetchProducts();
      }

      setIsEditMode(false);
    } catch (error) {
      console.error("Error adding product", error);
      alert("Failed to add product.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`${baseApi}/api/products/delete/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update the products state by filtering out the deleted product
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
        console.log("Product deleted successfully");
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

const closeAddProduct = () => {
  setAddProductOpen(false);
}
  useEffect(() => {


    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">

      <div className="flex gap-10 my-10">

        <h2 onClick={() => setAddProductOpen(true)} className='px-4 py-2 rounded-md text-white bg-blue-500'>
          Add Product
        </h2>

        <Dialog open={addproductopen} onOpenChange={closeAddProduct}>
          {/*<DialogTrigger>

          </DialogTrigger>*/}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>

              <form className="space-y-2" onSubmit={handleSubmit} encType="multipart/form-data">

                <div className="">
                  <input
                    placeholder="Product Name"
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md focus:outline-[#c19f5f] "
                    required
                  />
                </div>

                <div className="">
                  <textarea
                    placeholder="Product Description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md focus:outline-[#c19f5f]"
                    required
                  ></textarea>
                </div>

                <div className="w-full">
                  <select name="category" value={product.category} onChange={handleChange} className="border p-2 w-full rounded-md focus:outline-[#c19f5f]" required >
                    <option value="">Select a Category</option>
                    <option value="category1" >Category1</option>
                    <option value="category2" >Category2</option>
                    <option value="category3" >Category3</option>
                  </select>


                </div>

                <div className="flex  gap-3">
                  <div className=" w-full">
                    <input
                      placeholder="Quantity"
                      type="text"
                      name="quantity"
                      value={product.quantity}
                      onChange={handleChange}
                      className="border p-2 w-full rounded-md focus:outline-[#c19f5f]"
                      required
                    />
                  </div>

                  <div className=" w-full">
                    <input
                      placeholder="Price"
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className="border p-2 w-full rounded-md focus:outline-[#c19f5f]"
                      required
                    />
                  </div>
                </div>



                <div className="">
                  <input
                    placeholder="Additional Info"
                    type="text"
                    name="addInfo"
                    value={product.addInfo}
                    onChange={handleChange}
                    className="border p-2 w-full rounded-md focus:outline-[#c19f5f]"
                    required
                  />
                </div>

                <div className=" flex gap-4">
                  <input
                    placeholder="Product Image"
                    type="file"
                    name="image"
                    multiple
                    onChange={handleFileChange}
                    className="border p-2 w-full rounded-md focus:outline-[#c19f5f]"
                    required
                  />
                  {isEditMode && <Image className="aspect-square object-cover" src={`${baseApi}/api/${product.images[0]}`} alt={product.name} width={200} height={200} />}
                  {/* <p>{`${baseApi}/api/${product.images[0]}`}</p> */}
                </div>


                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Add Product
                </button>
              </form>

            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>

      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-4 mb-4">
            <Image className="aspect-square object-cover" src={`${baseApi}/api/${product.image[0]}`} alt={product.name} width={200} height={200} />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Price: {product.price}</p>
            <p className="text-gray-600">Quantity: {product.quantity}</p>
            <p className="text-gray-600">Additional Info: {product.addInfo}</p>

            <button className="bg-red-500 text-white px-4 py-2 rounded mt-4" onClick={() => handleDelete(product._id)} >Delete</button>

            <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2" >Edit</button>
          </div>
        ))}
      </div>



    </div>
  );
};


export default Products;

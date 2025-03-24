"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import BlogSequence from "@/components/dashboard/BlogSequence";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";
import { CiEdit } from "react-icons/ci";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const Blogs = () => {
  // State for form fields
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
    content: [],
  });

  const [defaultContent, setDefaultContent] = useState({
    title: "",
    description: "",
  });

  const [blogs, setBlogs] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addBlogopen, setAddBlogOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState("blogs");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Track which testimonial to delete

  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const addContent = () => {
    if (defaultContent.title.trim()) {
      setBlog((prevBlog) => ({
        ...prevBlog,
        content: [...prevBlog.content, defaultContent],
      }));
      setDefaultContent({ title: "", description: "" });
    }
  };

  const clearAllFields = () => {
    setBlog({
      title: "",
      description: "",
      date: "",
      image: null,
      content: [],
    });
  };

  const removeContent = (index) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: prevBlog.content.filter((_, i) => i !== index),
    }));
  };

  const editContent = (index) => {
    const content = blog.content[index];
    setBlog((prevBlog) => ({
      ...prevBlog,
      content: prevBlog.content.filter((_, i) => i !== index),
    }));
    setDefaultContent(content);
  };
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${baseApi}/blogs/`);
      const data = await response.json();
      setBlogs(data);
      console.log("Blogs fetched:", data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle image file uploads
  const handleFileChange = (e) => {
    setBlog({ ...blog, image: e.target.files });
  };

  const handleEdit = (blog) => {
    console.log(blog);

    setBlog({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      date: blog.date,
      image: blog.image,
      content: blog.content ? blog.content : [],
    });
    setIsEditMode(true);
    setAddBlogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    formData.append("date", blog.date);
    formData.append("content", JSON.stringify(blog.content));
    if (blog.image) formData.append("image", blog.image);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }


    // Send the form data to the backend
    try {
      if (isEditMode) {
        const response = await fetch(`${baseApi}/blogs/${blog._id}`, {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`, // Send the token along with the request
          },
        });

        if (response.ok) {
          const updatedBlog = await response.json();
          setBlogs((prevBlogs) =>
            prevBlogs.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
          );
          console.log("Blog updated successfully");
          fetchBlogs();
          await fetch(`/revalidate?tag=cleardata`, { method: "POST" });
        } else {
          console.error("Failed to update blog");
        }
      } else {
        // Create a new blog
        const res = await axios.post(`${baseApi}/blogs/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Blog added successfully!");
        console.log(res.data);
        fetchBlogs();
        await fetch(`/revalidate?tag=cleardata`, { method: "POST" });
      }

      setIsEditMode(false);
      setAddBlogOpen(false);
      // clearAllFields();
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add blog.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseApi}/blogs/${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update the case study state by filtering out the deleted casestudy
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== deleteId)
        );
        setOpenDeleteDialog(false); // Close the delete dialog after successful deletion
        setDeleteId(null);
        console.log("blog deleted successfully");
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const closeAddBlog = () => {
    setAddBlogOpen(false);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="w-fit mb-8 bg-gray-100 p-1 flex space-x-2 rounded-sm shadow-md mx-auto">
        <Button
          onClick={() => setCurrentTab("blogs")}
          className={`w-full py-0 border-none shadow-none text-md text-black bg-white hover:bg-white  ${currentTab === "blogs" &&
            "text-white hover:bg-[#00a651] bg-[#00a651]"
            }  `}
        >
          Blogs
        </Button>
        <Button
          onClick={() => setCurrentTab("blogsSequence")}
          className={`w-full py-0 border-none shadow-none text-md text-black bg-white hover:bg-white  ${currentTab === "blogsSequence" &&
            "text-white hover:bg-[#00a651] bg-[#00a651]"
            }  `}
        >
          Blogs Sequence
        </Button>
      </div>

      {currentTab === "blogs" ? (
        <section>
          <div className="flex gap-10 my-10">
            <h2
              onClick={() => setAddBlogOpen(true)}
              className="px-4 py-2 rounded-md text-white bg-blue-500"
            >
              Add Blog
            </h2>

            <Dialog open={addBlogopen} onOpenChange={closeAddBlog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isEditMode ? "Update Blog" : "Add Blog"}
                  </DialogTitle>

                  <form
                    className="space-y-2"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                  >
                    <div className="">
                      <input
                        placeholder="Blog Title"
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-[#c19f5f] "
                        required
                      />
                    </div>

                    <div className="">
                      <textarea
                        placeholder="Blog Description"
                        name="description"
                        value={blog.description}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-[#c19f5f]"
                        required
                      ></textarea>
                    </div>

                    <div className="">
                      <input
                        placeholder=" Date"
                        type="date"
                        name="date"
                        value={blog.date}
                        onChange={handleChange}
                        className="border p-2 w-full rounded-md focus:outline-[#c19f5f]"
                        required
                      />
                    </div>

                    <div className=" flex gap-4">
                      <input
                        placeholder="Image"
                        type="file"
                        name="image"
                        multiple
                        onChange={handleFileChange}
                        className="border p-2 w-full rounded-md focus:outline-[#c19f5f]"
                      />
                      {isEditMode && (
                        <Image
                          className="aspect-square object-cover"
                          src={`${baseApi}/${blog.image}`}
                          alt={blog.title}
                          width={200}
                          height={200}
                        />
                      )}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Label>Content</Label>
                      <Input
                        value={defaultContent.title}
                        onChange={(e) =>
                          setDefaultContent({
                            ...defaultContent,
                            title: e.target.value,
                          })
                        }
                        placeholder="Title"
                      />
                      <Textarea
                        value={defaultContent.description}
                        onChange={(e) =>
                          setDefaultContent({
                            ...defaultContent,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description"
                      />

                      <Button
                        type="button"
                        className="bg-white border text-black hover:bg-white shadow-none hover:shadow-sm"
                        onClick={addContent}
                      >
                        Add Content
                      </Button>

                      {blog?.content?.length > 0 && (
                        <div className="space-y-2">
                          {blog.content.map((content, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <p>{index + 1}.</p>
                              <div key={index}>{content.title}</div>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => removeContent(index)}
                              >
                                Remove
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => editContent(index)}
                              >
                                Edit
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* <p className="w-full border">{`${baseApi}/${blog.image}`}</p> */}

                    <Button
                      type="submit"
                      className="bg-blue-500 font-[800] mt-12 text-white px-4 py-2 rounded"
                    >
                      {isEditMode ? "Update Blog" : "Add Blog"}
                    </Button>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="border rounded p-4 mb-4">
                <Image
                  className="aspect-square object-cover"
                  src={`${baseApi}${blog.image}`}
                  alt={blog.title}
                  width={200}
                  height={200}
                />
                {/* <p>{`${baseApi}/${blog.image}`}</p> */}
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <p className="text-gray-600">
                  {blog.description.slice(0, 100)}
                </p>
                <p className="text-gray-600">
                  {new Date(blog.date).toLocaleDateString()}
                </p>

                <div className="flex gap-4 my-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded "
                    onClick={() => {
                      setDeleteId(blog._id); // Set the id of the testimonial to delete
                      setOpenDeleteDialog(true); // Open the confirm delete dialog
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded "
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section>
          {/* <BlogSequence blogs={blogs} fetchBlogs={fetchBlogs} /> */}
        </section>
      )}

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default Blogs;

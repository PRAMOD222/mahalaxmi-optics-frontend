"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const LandingPages = () => {
  const [landingPages, setLandingPages] = useState([]);
  const [deleteLandingPageId, setDeleteLandingPageId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    fetchLandingPages();
  }, []);

  const fetchLandingPages = async () => {
    try {
      const response = await fetch(`${baseApi}/landingpage`);
      const data = await response.json();
      setLandingPages(data.data);
    } catch (error) {
      console.error("Error fetching landing pages:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${baseApi}/landingpage/${deleteLandingPageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setLandingPages((prev) =>
          prev.filter((lp) => lp._id !== deleteLandingPageId)
        );
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: "/" }),
      });
      } else {
        console.error("Failed to delete landing page");
      }
    } catch (error) {
      console.error("Error deleting landing page:", error);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Button asChild className="bg-[#763f98] text-white">
        <Link href="./landingpage/add">Add Landing Page</Link>
      </Button>

      <div className="grid grid-cols-3 gap-6 mt-4">
        {landingPages.map((lp) => (
          <div key={lp._id} className="border rounded-sm p-3 shadow-md">
            <h2 className="text-lg font-semibold mt-2">{lp.thumbnail_title}</h2>
            <p className="text-gray-600">{lp.description}</p>
            <p className="text-gray-700">Visibility: {lp.isVisible ? "Visible" : "Hidden"}</p>
            <div className="flex gap-2 mt-4">
              <Button asChild className="bg-yellow-500 text-white">
                <Link href={`./landingpage/${lp._id}`}>Edit</Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => {
                      setDeleteLandingPageId(lp._id);
                      setIsDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                {isDialogOpen && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      Are you sure you want to delete this landing page?
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                      <Button className="bg-red-500 text-white" onClick={handleDelete}>
                        Confirm
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPages;

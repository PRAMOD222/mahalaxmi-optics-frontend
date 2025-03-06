"use client";
import { useEffect, useRef } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const SearchBar = () => {
    const inputRef = useRef(null);

    useEffect(() => {
        const handleDialogOpen = () => {
            setTimeout(() => {
                inputRef.current?.focus(); // Focus the input field after the dialog opens
            }, 100); // Small delay to ensure dialog is fully rendered
        };

        document.addEventListener("open-dialog", handleDialogOpen);

        return () => {
            document.removeEventListener("open-dialog", handleDialogOpen);
        };
    }, []);

    return (
        <Dialog>
            <DialogTrigger
                onClick={() => {
                    document.dispatchEvent(new Event("open-dialog"));
                }}
            >
                <h2 className="px-2 text-white flex items-center gap-2 bg-[#763f98] py-2 rounded-md">
                    <span className="text-sm">SEARCH</span>
                    <Image alt="search icon" width={18} height={18} src="/search.svg" />
                </h2>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Search for best brands</DialogTitle>

                    <div className="flex border border-gray-300 focus-within:border-[#763f98] rounded-md overflow-hidden">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for best brands"
                            className="py-1 px-2 focus:outline-none text-lg flex-1"
                        />
                        <h2 className="p-2 text-white flex items-center gap-2 bg-[#763f98] w-max">
                            <span className="text-sm block">SEARCH</span>
                            <Image alt="search icon" width={18} height={18} src="/search.svg" />
                        </h2>
                    </div>
                    <ScrollArea className="h-[80vh] md:h-[50vh]"></ScrollArea>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default SearchBar;

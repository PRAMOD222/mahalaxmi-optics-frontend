import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Image from "next/image";
import { RiArrowRightWideLine } from "react-icons/ri";

export function BreadcrumbWithCustomSeparator({ paths, imageSrc }) {
  return (
    <div className="relative flex flex-col h-56 px-6 md:px-28 xl:px-36 space-y-3 bg-gray-200 justify-center overflow-hidden">
      <Image
        src={imageSrc}
        alt="breadcrumb background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <Breadcrumb className="pt-16 h-full font-[700] z-10">
        <BreadcrumbList>
          {paths?.map((path, index) => {
            return (
              <div key={index} className="flex h-fit w-fit items-center">
                <BreadcrumbItem>
                  {path.href ? (
                    <BreadcrumbLink
                      href={path.href}
                      className="font-[700] text-lg text-[#763f98] hover:text-[#925cb3] capitalize"
                    >
                      {path.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="font-[700] text-[#763f98] text-lg capitalize">
                      {path.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < paths.length - 1 && (
                  <BreadcrumbSeparator className="text-[#763f98] text-3xl pl-0 ml-0 flex py-0 my-0">
                    <RiArrowRightWideLine className="" /> {/* Adjust size here */}
                  </BreadcrumbSeparator>
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Image from "next/image";

export function BreadcrumbWithCustomSeparator({ paths, imageSrc }) {
  return (
    <div className="relative flex flex-col h-fit py-28 px-6 md:px-32 xl:px-44 space-y-3 bg-gray-200 justify-center overflow-hidden">
      <Image
        src={imageSrc}
        alt="breadcrumb background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <Breadcrumb className="font-[700] z-10">
        <BreadcrumbList>
          {paths?.map((path, index) => {
            return (
              <div key={index} className="flex space-x-1 items-center">
                <BreadcrumbItem>
                  {path.href ? (
                    <BreadcrumbLink
                      href={path.href}
                      className="font-[700] text-2xl text-black capitalize"
                    >
                      {path.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="font-[700] text-2xl capitalize">
                      {path.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < paths.length - 1 && (
                  <BreadcrumbSeparator className="text-black text-2xl px-1">
                    {"/"}
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

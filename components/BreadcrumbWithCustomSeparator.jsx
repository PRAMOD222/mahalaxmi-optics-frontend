import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Image from "next/image";

export function BreadcrumbWithCustomSeparator({ paths }) {
  return (
    <div className="relative flex flex-col h-fit px-6 md:px-32 xl:px-32 space-y-3 bg-inherit justify-center overflow-hidden">

      <Breadcrumb className="font-[400] z-10">
        <BreadcrumbList>
          {paths?.map((path, index) => {
            return (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {path.href ? (
                    <BreadcrumbLink
                      href={path.href}
                      className="font-[400] text-sm text-black underline underline-offset-2 capitalize"
                    >
                      {path.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="font-[400] text-sm capitalize">
                      {path.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < paths.length - 1 && (
                  <BreadcrumbSeparator className="text-gray-300 px-2 text-sm">
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

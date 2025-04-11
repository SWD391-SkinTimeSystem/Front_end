import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Fragment, ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface PageProps {
  children: ReactNode;
  role: string;
}

export default function Page({ children, role }: PageProps) {
 const location = useLocation();
 const pathname = location.pathname;
 
 const breadcrumbs = useMemo(() => {
   const segments = pathname.split('/').filter(segment => segment);
   
   return segments.map((segment, index) => {
     const href = `/${segments.slice(0, index + 1).join('/')}`;
     
     const label = segment
       .split('-')
       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
       .join(' ');
     
     return { href, label };
   });
 }, [pathname]);

 return (
   <SidebarProvider>
     <AppSidebar role={role}/>
     <SidebarInset>
       <header className="flex h-16 shrink-0 items-center gap-2">
         <div className="flex items-center gap-2 px-4">
           <SidebarTrigger className="-ml-1" />
           <Separator orientation="vertical" className="mr-2 h-4" />
           <Breadcrumb>
             <BreadcrumbList>
               <BreadcrumbItem className="hidden md:block">
                 <BreadcrumbLink href="/">
                   Dashboard
                 </BreadcrumbLink>
               </BreadcrumbItem>
               
               {breadcrumbs.map((breadcrumb, index) => (
                 <Fragment key={breadcrumb.href}>
                   <BreadcrumbSeparator className="hidden md:block" />
                   <BreadcrumbItem className="hidden md:block">
                     {index === breadcrumbs.length - 1 ? (
                       <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                     ) : (
                       <BreadcrumbLink href={breadcrumb.href}>
                         {breadcrumb.label}
                       </BreadcrumbLink>
                     )}
                   </BreadcrumbItem>
                 </Fragment>
               ))}
               
              
             </BreadcrumbList>
           </Breadcrumb>
         </div>
       </header>
       {/* */}
       {children}
     </SidebarInset>
   </SidebarProvider>
 )
}
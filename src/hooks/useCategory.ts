import { categoryService } from "@/services/categoryService";
import { Category } from "@/types/category";
import { useEffect, useState } from "react";

export const useCategory = () => {
     const [categories, setCategories] = useState<Category[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchEvent = async () => {
          try {
               const data = await categoryService.getCategory();
               setCategories(data);
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }

     useEffect(() => {
          fetchEvent();
     }, []);
 

     return { categories, loading, error };
}
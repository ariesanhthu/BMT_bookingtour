// import Link from "next/link";
import React from 'react';
import { simplifiedProduct, categoryProps } from "../interface";
import { client } from "../lib/sanity";
// import Image from "next/image";
// import category from "@/sanity/schemas/category";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const dynamic = "force-dynamic";

async function getData() {
    const query = `*[_type == "tour" && isHot == true]{
        name,
        slug,
        price,
        "imageUrl": images[0].asset->url,
        categories[]-> {
          _id,
          name
        }
      }
      `;
  const data = await client.fetch(query);

  return data;
}
async function getCategory()
{
    const data = await client.fetch(`*[_type == "category"]{
        _id,
        name,
        slug
      }`);

    return data;
}

async function fetchCategories()
{
  // const res = await fetch('/api/category');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/category`);
  
  const data = await res.json();

  if (data.success) return data.data;
};

function getMatchingCategories(data: simplifiedProduct[], cateList: categoryProps[]): categoryProps[] {
  return cateList.filter((category) => {
    return data.some((product) => {
      return product.categories.some((productCategory : any) => {
        return productCategory.name === category.name;
      });
    });
  });
}
import Tab from "./Tab";
export default async function HotTour() {
    // const data: simplifiedProduct[] = await getData();
    // const cateList: categoryProps[] = await getCategory();
    // const categories = getMatchingCategories(data, cateList);

    // const [Categories, setCategories] = useState<[]>([]);
    // Fetch all categories
    // const Categories: categoryProps[] = await fetchCategories();
    const Categories: categoryProps[] = [
      {_id : "1",
      slug: "mien-nam",
      name: "Miền Nam"},
      {_id : "2",
      slug: "bien-dao",
      name: "Biển Đảo"},
      {_id : "3",
      slug: "mien-bac",
      name: "Miền Bắc"}
    ]

    // console.log(Categories);
  return (
    <div className="m-10">
        
        <h4 className="text-2xl bold font-bold">Tour HOT 🔥</h4>
        
        <Tab tabs = {Categories}/>
    </div>
  );
}

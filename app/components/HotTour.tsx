"use client"
import Link from "next/link";
import React, { useState } from 'react';
import { simplifiedProduct, categoryProps } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";
import category from "@/sanity/schemas/category";
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
    const data: simplifiedProduct[] = await getData();
    const cateList: categoryProps[] = await getCategory();
    const categories = getMatchingCategories(data, cateList);

    // write to console
    console.log(categories);

  return (
    <div className="m-10">
        
        <h4 className="text-2xl bold font-bold">Tour HOT 🔥</h4>
        
        <Tab tabs = {categories}/>
    </div>
  );
}

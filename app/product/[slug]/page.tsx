// import AddToBag from "@/app/components/AddToBag";
// import CheckoutNow from "@/app/components/CheckoutNow";
// import ImageGallery from "@/app/components/ImageGallery";
// import { fullProduct } from "@/app/interface";
// import { client } from "@/app/lib/sanity";
// import { Button } from "@/components/ui/button";
// import { Star, Truck } from "lucide-react";

// async function getData(slug: string) {
//   const query = `*[_type == "product" && slug.current == "${slug}"][0] {
//         _id,
//           images,
//           price,
//           name,
//           description,
//           "slug": slug.current,
//           "categoryName": category->name,
//           price_id
//       }`;

//   const data = await client.fetch(query);

//   return data;
// }

// export const dynamic = "force-dynamic";

export default async function ProductPge() {

  return (
    <h1>
      product
    </h1>
  );
}

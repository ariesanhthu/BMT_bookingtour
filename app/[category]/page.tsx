"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productProps } from "../interface";

export default function ProductCategoryPage() {
  const { category } = useParams() as { category: string };
  const [products, setProducts] = useState<productProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Call your API to get products by category
        const { data } = await axios.get(`/api/product/category/${category}`);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Có lỗi xảy ra khi tải dữ liệu sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Danh sách sản phẩm - {category}
      </h1>

      {loading && <p className="text-center">Đang tải dữ liệu...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product._id}
            className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <Image
                        src={product.url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-xl font-semibold">
                {product.name}
              </CardTitle>
              <p className="mt-2 text-sm text-gray-300 text-muted-foreground mb-4 line-clamp-2 h-[2.5em]">
                {product.description}
              </p>
              <p className="mt-4 font-bold text-lg">{product.price} ₫</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nếu muốn thêm button refresh hoặc load thêm, bạn có thể thêm ở đây */}
      <div className="mt-8 flex justify-center">
        <Button onClick={() => window.location.reload()}>Tải lại</Button>
      </div>
    </div>
  );
}

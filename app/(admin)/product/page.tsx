'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash, Sun, Sunset, Moon, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Product } from '@/app/lib/models/Product';

import { categoryProps } from '@/app/interface';
import { productProps } from '@/app/interface';

import UploadFile from '@/app/components/uploadFile/UploadFile';
import mongoose from 'mongoose';

enum TimeOfDay {
    Morning = 'buổi sáng',
    Midday = 'buổi trưa',
    Afternoon = 'buổi chiều',
    Evening = 'buổi tối',
  }
  
interface TourStop {
    day: number;
    timeOfDay: TimeOfDay;
    time?: string | null;
    place: string;
    description?: string | null;
    image: string;
  }
  
  interface Product {
    name: string;
    category: string;
    url?: string | null;
    duration ?: string | null;
    groupSize ?: string | null;
    price ?: string | null;
    rating ?: number | 0;
    reviewCount ?: number | 0;
    description ?: string | null;
    highlights ?: string[];
    included ?: string[];
    notIncluded ?: string[];
    tourData ?: TourStop[];
  }
  
  const INITIAL_PRODUCT: Product = {
    name: '',
    category: '',
    url: '',
    duration: '',
    groupSize: '',
    price: '',
    rating: 0,
    reviewCount: 0,
    description: '',
    highlights: [''],
    included: [''],
    notIncluded: [''],
    tourData: [],
  };
export default function AdProducts() {
    const [newProduct, setProduct] = useState<Product>(INITIAL_PRODUCT);
    
    const [products, setProducts] = useState<productProps[]>([]);
    const [categories, setCategories] = useState<categoryProps[]>([]);
    
    const [editingProduct, setEditingProduct] = useState<Product>();

  
    // -------------------- FETCH DATA -----------------------------
    useEffect(() => {
        fetchProducts();
        fetchCategories();
      }, []);

    const fetchCategories = async () => {
    try {
        console.log('fetch categories');

        const res = await fetch('/api/category');
        if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.success) {
        setCategories(data.data || []);
        } else {
        console.error('Error fetching categories: Invalid response format');
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
    };
    
    const fetchProducts = async () => {
    try {
        const response = await fetch('/api/product');
        const data = await response.json();
        console.log('products data: ', data);
        setProducts(data);
    } catch (error) {
        console.error('Failed to fetch products:', error);
    }
    };
    

    //---------------------------------------------------------------   


    const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setProduct(INITIAL_PRODUCT);
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to create product:', error);
    }
    };

    const handleDelete = async (id: string) => {
      if (!confirm('Are you sure you want to delete this product?')) return;
      console.log(id);
      try {
        const response = await fetch(`/api/product/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          fetchProducts();
        }
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    };
    // ===================== THÊM TRƯỜNG =====================
  const addArrayItem = (
    product: Product | typeof newProduct,
    field: keyof Pick<Product, 'highlights' | 'included' | 'notIncluded'>,
  ): void => {
    
    // Nếu product là null, thoát hàm
    if (!product) return; 
    
    // Sử dụng giá trị mặc định [] nếu product[field] là undefined
    const updatedArray = [...(product[field] ?? []), ''];
    
    // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
    setProduct({ ...(product as Product), [field]: updatedArray });
    
    console.log(`Updated ${field}:`, updatedArray);
  };
  
  // ===================== XÓA TRƯỜNG =====================
  const removeArrayItem = (
    product: Product | typeof newProduct | null,
    field: keyof Pick<Product,'highlights' | 'included' | 'notIncluded'>,
    index: number
  ): void => {
    if (!product) return; // Nếu product là null, thoát hàm
  
    // Sử dụng giá trị mặc định [] nếu product[field] là undefined
    const updatedArray = (product.notIncluded ?? []).filter((_, i) => i !== index);

      setProduct({ ...(product as Product), notIncluded: updatedArray });
    
      console.log(`REMOVE ${field}:`, updatedArray);
  };
  // edit
  const handleInputChangeArrayItem = (
    product: Product | typeof newProduct,
    field: keyof Pick<Product, 'highlights' | 'included' | 'notIncluded'>,
    index: number,
    value: string
  ): void => {
    
    // Nếu product là null, thoát hàm
    if (!product) return; 
    
    // Sử dụng giá trị mặc định [] nếu product[field] là undefined
    const updatedArray = [...(product[field] ?? [])];
    updatedArray[index] = value;

    // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
    setProduct({ ...(product as Product), [field]: updatedArray });
    
    console.log(`CHANGE ${field}:`, updatedArray);
  };
  
// ===================== CRUD TOUR STOP =====================

const addTourStop = (product: Product | typeof newProduct) => {
    const updatedTourData : TourStop[] = [
      ...(product.tourData ?? []), // Provide a default empty array if tourData is undefined
      {
        day: (product.tourData?.length ?? 0) + 1, // Use 0 if tourData is undefined
        timeOfDay: TimeOfDay.Morning, // Use the enum value
        time: null,
        place: '',
        description: null,
        image: '',
      },
    ];

    // if (typeof product === 'object' && 'id' in product) {
    //   // Nếu product có trường 'id', nghĩa là đang chỉnh sửa sản phẩm hiện tại
    //   setEditingProduct({ ...(product as Product), tourData: updatedTourData });
    // } else if (product === INITIAL_PRODUCT) {
    //   // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
      setProduct({ ...(product as Product), tourData: updatedTourData });
    // }
  };

  const updateTourStop = (
    product: Product | typeof newProduct,
    index: number,
    updates: Partial<TourStop>
  ) => {
    const updatedTourData = [...(product.tourData ?? [])];
    updatedTourData[index] = { ...(updatedTourData[index] ?? {}), ...updates };

    // if ('id' in product) {
    //   setEditingProduct({ ...(product as Product), tourData: updatedTourData });
    // } else {
      setProduct({ ...(product as Product), tourData: updatedTourData });
    // }
  };


  const removeTourStop = (product: Product | typeof newProduct, index: number) => {
    const updatedTourData = product.tourData?.filter((_, i) => i !== index) ?? [];

    // if ('id' in product) {
    //   setEditingProduct({ ...(product as Product), tourData: updatedTourData });
    // } else {
      setProduct({ ...(product as Product), tourData: updatedTourData });
    // }
  };
  const handleUploadSuccess = (url: string) => {
    setProduct((prev) => ({ ...prev, url }));
    console.log(newProduct);
  };

  const renderProductForm = (product: Product | typeof newProduct, onSubmit: (e: React.FormEvent) => Promise<void>) => (
    <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* NAME */}
            <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                    <Input
                    id="name"
                    value= {newProduct.name ?? ''}
                    onChange={(e) =>
                    //   'id' in product
                    //     ? setEditingProduct({ ...(product as Product), name: e.target.value })
                        setProduct({ ...(newProduct as Product), name: e.target.value })
                    }
                    required
                    />
            </div>
            {/* CATEGORIES */}
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                    value={product.category}
                    onValueChange={(value) =>
                        setProduct({ ...(product as Product), category: value })
                    }
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                    {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                        {category.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              
                <Label htmlFor="url">Image URL</Label>
                <UploadFile onUploadSuccess={handleUploadSuccess}/>
                <Input
                id="url"
                value={product.url ?? ''}
                onChange={(e) =>
                   setProduct({ ...(product as Product), url: e.target.value })
                }
                required
                />
            </div>

            {/* Duration */}
            <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                id="duration"
                value={product.duration ?? ''}
                onChange={(e) =>
                    setProduct({ ...(product as Product), duration: e.target.value })
                }
                required
                />
            </div>

            {/* Group Size */}
            <div className="space-y-2">
                <Label htmlFor="groupSize">Group Size</Label>
                <Input
                id="groupSize"
                value={product.groupSize ?? ''}
                onChange={(e) =>
                    setProduct({ ...(product as Product), groupSize: e.target.value })
                }
                required
                />
            </div>
            {/* Price */}
            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                id="price"
                value={product.price ?? ''}
                onChange={(e) => setProduct({ ...(product as Product), price: e.target.value })
                }
                required
                />
            </div>
        
            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                id="description"
                value={product.description ?? ''}
                onChange={(e) => setProduct({ ...(product as Product), description: e.target.value })
                }
                required
                />
            </div>
        </div>

          {/* Highlights */}
          <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Highlights</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(product, 'highlights')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Highlight
          </Button>
        </div>
        {product.highlights?.map((highlight, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={highlight}
              onChange={(e) =>
                handleInputChangeArrayItem(product, 'highlights', index, e.target.value)
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeArrayItem(product, 'highlights', index)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Included */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Included</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(product, 'included')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Included Item
          </Button>
        </div>
        {product.included?.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) =>
                handleInputChangeArrayItem(product, 'included', index, e.target.value)
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeArrayItem(product, 'included', index)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

    {/* NOT INCLUDED */}
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <Label>Not Included</Label>
            <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addArrayItem(product, 'notIncluded')}
            >
            <Plus className="w-4 h-4 mr-2" />
            Add Not Included Item
            </Button>
        </div>
        {product.notIncluded?.map((item, index) => (
            <div key={index} className="flex gap-2">
            <Input
                value={item}
                onChange={(e) => 
                handleInputChangeArrayItem(product, 'notIncluded', index, e.target.value)
                }
            />
            {item}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(product, 'notIncluded', index)}
            >
                <Trash className="w-4 h-4" />
            </Button>
            </div>
        ))}
    </div>
  {/* Tour Data */}
  <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Tour Schedule</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addTourStop(product)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Tour Stop
          </Button>
        </div>
        {product.tourData?.map((stop, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                <Input
                  type="number"
                  value={stop.day}
                  onChange={(e) =>
                    updateTourStop(product, index, { day: Number(e.target.value) })
                  }
                  className="w-20 inline-block mr-2"
                  min="1"
                />
                Day
              </CardTitle>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeTourStop(product, index)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Time of Day</Label>
                  <select
                    value={stop.timeOfDay}
                    onChange={(e) =>
                      updateTourStop(product, index, {
                        timeOfDay: e.target.value as TimeOfDay,
                      })
                    }
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="buổi sáng">Buổi sáng</option>
                    <option value="buổi trưa">Buổi trưa</option>
                    <option value="buổi chiều">Buổi chiều</option>
                    <option value="buổi tối">Buổi tối</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Time (optional)</Label>
                  <Input
                    type="text"
                    value={stop.time || ''}
                    onChange={(e) =>
                      updateTourStop(product, index, { time: e.target.value })
                    }
                    placeholder="HH:MM"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Place</Label>
                <Input
                  value={stop.place}
                  onChange={(e) =>
                    updateTourStop(product, index, { place: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description (optional)</Label>
                <Textarea
                  value={stop.description || ''}
                  onChange={(e) =>
                    updateTourStop(product, index, { description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={stop.image}
                  onChange={(e) =>
                    updateTourStop(product, index, { image: e.target.value })
                  }
                  required
                />
                
                <UploadFile onUploadSuccess={handleUploadSuccess}/>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

        <Button type="submit" className="w-full">
            Create Product
        </Button>
    </form>
  );
    return (
        <div className="space-y-8">
         
            <Card>
                <CardHeader>
                    <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderProductForm(newProduct, handleSubmit)}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                    <Card key={product._id}>
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">{product.description}</p>
                                <p className="text-sm">Duration: {product.duration}</p>
                                <p className="text-sm">Price: {product.price}</p>
                            </div>
                        </CardContent>

                        <CardFooter className="flex justify-end space-x-2">
                          {/* <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingProduct(product);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </Button> */}

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(product._id)}
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                          {product._id}
                      </CardFooter>
                    </Card>
                ))}
            </div>

            {/* <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-4xl">
            <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            {editingProduct && renderProductForm(editingProduct, handleEdit)}
            </DialogContent>
            </Dialog> */}
        </div>
    )
}
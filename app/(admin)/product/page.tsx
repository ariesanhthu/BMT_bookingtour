// // 'use client';

// // import { useState, useEffect } from 'react';

// // export default function ProductPage() {
// //   const [products, setProduct] = useState([]);
// //   const [name, setName] = useState('');
// //   const [editProduct, setEditProduct] = useState<string | null>(null);
// //   const [status, setStatus] = useState<string | null>(null);

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   // Fetch all roles
// //   const fetchProducts = async () => {
// //     try {
// //       const res = await fetch('/api/product');
// //       const data = await res.json();
// //       if (data.success) {
// //         setProduct(data.data || []);
// //         setStatus(null); // Clear any previous status
// //       } else {
// //         setStatus('Failed to fetch products');
// //       }
// //     } catch (error) {
// //       setStatus('Error fetching products');
// //     }
// //   };

// //   // Create or update role
// //   const handleCreateOrUpdate = async () => {
// //     if (!name) {
// //       setStatus('name is required');
// //       return;
// //     }

// //     const url = '/api/product';
// //     const method = editProduct ? 'PUT' : 'POST';
// //     const body = JSON.stringify({
// //       _id: editProduct,
// //       name,
// //     });

// //     try {
// //       const res = await fetch(url, {
// //         method,
// //         headers: { 'Content-Type': 'application/json' },
// //         body,
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         fetchProducts();
// //         resetForm();
// //         setStatus(editProduct ? 'product updated successfully' : 'product created successfully');
// //       } else {
// //         setStatus(data.error || 'Failed to save product');
// //       }
// //     } catch (error) {
// //       setStatus('Error saving product');
// //     }
// //   };

// //   // Delete role
// //   const handleDelete = async (id: string) => {
// //     try {
// //       const res = await fetch('/api/product', {
// //         method: 'DELETE',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ id }),
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         fetchProducts();
// //         setStatus('product deleted successfully');
// //       } else {
// //         setStatus(data.error || 'Failed to delete product');
// //       }
// //     } catch (error) {
// //       setStatus('Error deleting product');
// //     }
// //   };

// //   // Edit role (populate form fields)
// //   const handleEdit = (product: any) => {
// //     setEditProduct(product._id);
// //     setName(product.name);
// //     setStatus(null);
// //   };

// //   // Reset form fields
// //   const resetForm = () => {
// //     setName('');
// //     setEditProduct(null);
// //   };

// //   return (
// //     <div>
// //       <h1>product Management</h1>

// //       {/* Status Message */}
// //       {status && <p style={{ color: 'red'}}>{status}</p>}

// //       {/* Form for Create/Update */}
// //       <div>
// //         <input
// //           type="text"
// //           placeholder="name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //         />
// //         <button onClick={handleCreateOrUpdate}>
// //           {editProduct ? 'Update product' : 'Create product'}
// //         </button>
// //         {editProduct && <button onClick={resetForm}>Cancel</button>}
// //       </div>

// //       {/* Role List */}
// //       <ul>
// //         {products.map((product: any) => (
// //           <li key={product._id}>
// //             <strong>name:  {product.name}</strong>
// //             <button onClick={() => handleEdit(product._id)}>Edit</button> 
// //             <button onClick={() => handleDelete(product._id)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Plus, Trash, Edit3 } from 'lucide-react';
// import { Calendar } from '@/components/ui/calendar';
// import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


// interface categoryProps {
//   _id: any;
//   name: string;
//   slug: string;
// }


// type TimeOfDay = 'buổi sáng' | 'buổi trưa' |'buổi chiều' | 'buổi tối';

// interface TourStop {
//     day: number;
//     timeOfDay?: TimeOfDay | null;
//     time?: string | null;
//     place: string;
//     description?: string | null;
//     image?: string | null;
//   }

// export default function AddProductPage() {
//   const [productName, setProductName] = useState('');
  
//   const [categories, setCategories] = useState<categoryProps[]>([]);
//   const [category, setCategory] = useState<string | null>(null);
//   const [image, setImage] = useState<File | null>(null);



//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       console.log('fetch categories');

//       const res = await fetch('/api/category');
//       if (!res.ok) {
//         throw new Error(`Failed to fetch categories: ${res.statusText}`);
//       }
//       const data = await res.json();
//       if (data.success) {
//         setCategories(data.data || []);
//       } else {
//         console.error('Error fetching categories: Invalid response format');
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const [tourData, setTourData] = useState<TourStop[]>([]);
//   const [newTour, setNewTour] =useState<TourStop>({
//     day: 1,
//     timeOfDay: null,
//     time: null,
//     place: '',
//     description: null,
//     image: null,
//   });
//   const [isTourDialogOpen, setIsTourDialogOpen] = useState(false);

//   const handleAddTourData = () => {
//   if (!newTour.day || !newTour.place || !newTour.timeOfDay) {
//     alert('Vui lòng nhập đầy đủ thông tin của tour.');
//     return;
//   }
  
//   //
//   console.log(categories)

//   // Thêm tour mới vào danh sách
//   setTourData((prev) => [...prev, newTour]);

//   // Reset `newTour` về giá trị mặc định
//   setNewTour({
//     day: 1,
//     timeOfDay: null,
//     time: null,
//     place: '',
//     description: null,
//     image: null,
//   });

//   setIsTourDialogOpen(false);
// };


//   const handleDeleteTour = (index : any) => {
//     const updatedTourData = [...tourData];
//     updatedTourData.splice(index, 1);
//     setTourData(updatedTourData);
//   };

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setImage(event.target.files[0]);
//     }
//   };

//   const handleProductSubmit = () => {
//     if (!productName || !category || !image || tourData.length === 0) {
//       alert('Vui lòng nhập đầy đủ thông tin sản phẩm.');
//       return;
//     }

//   const productData = {
//     name: productName,
//     category,
//     image,
//     tourData,
//   };

//     console.log('Product Data:', productData);
//     // Gửi productData tới API
//   };

//   return (
//     <div className="space-y-8">
//       <Card>
//         <CardHeader>
//           <CardTitle>Thêm sản phẩm</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="productName">Tên sản phẩm</Label>
//             <Input
//               id="productName"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               placeholder="Nhập tên sản phẩm"
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Danh mục</Label>
//             <Select onValueChange={setCategory}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Chọn danh mục" />
//               </SelectTrigger>
//               <SelectContent>
//                   {categories.map((category: any) => (
//                     <SelectItem key={category._id} value={category._id}>
//                       {category.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="productImage">Ảnh sản phẩm</Label>
            
//               <Input
//                 id="productImage"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   if (e.target.files && e.target.files.length > 0) {
//                     setImage(e.target.files[0]); // Safely set the first file
//                   }
//                 }}
//               />
//           </div>
//         </CardContent>

//         <CardFooter className="justify-center">
//           <Button onClick={() => setIsTourDialogOpen(true)}>
//             <Plus className="w-4 h-4 mr-2" /> Thêm tourData
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* Hiển thị danh sách tourData */}
//       <div className="space-y-4">
//         {tourData.map((tour, index) => (
//           <Card key={index}>
//             <CardContent className="space-y-2">
//               <p><strong>Ngày:</strong> {tour.day}</p>
//               <p><strong>Thời gian:</strong> {tour.timeOfDay} {tour.time}</p>
//               <p><strong>Địa điểm:</strong> {tour.place}</p>
//               <p><strong>Mô tả:</strong> {tour.description}</p>
//               {tour.image && <img src={tour.image} alt="Tour Image" className="w-full h-auto" />}
//             </CardContent>
//             <CardFooter className="flex justify-end space-x-2">
//               <Button variant="destructive" size="sm" onClick={() => handleDeleteTour(index)}>
//                 <Trash className="w-4 h-4 mr-2" /> Xóa
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       {/* Dialog thêm tourData */}
//       <Dialog open={isTourDialogOpen} onOpenChange={setIsTourDialogOpen}>
//         <DialogContent  aria-describedby="dialog-description">
//           <DialogHeader>
//             <DialogTitle>Thêm tourData</DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="day">Ngày</Label>
//               <Input
//                 id="day"
//                 value={newTour.day}
//                 onChange={(e) => setNewTour({ ...newTour, day: parseInt(e.target.value, 10) || 1  })}
//                 placeholder="Nhập ngày"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Thời gian trong ngày</Label>
//               <Select
//                 onValueChange={(value) => setNewTour({ ...newTour, timeOfDay: value  as TimeOfDay })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Chọn thời gian" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="buổi sáng">Buổi sáng</SelectItem>
//                   <SelectItem value="buổi chiều">Buổi chiều</SelectItem>
//                   <SelectItem value="buổi tối">Buổi tối</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="time">Giờ</Label>
//               <Input
//                 id="time"
//                 type="time"
//                 value={newTour.time ?? ''}
//                 onChange={(e) => setNewTour({ ...newTour, time: e.target.value })}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="place">Địa điểm</Label>
//               <Input
//                 id="place"
//                 value={newTour.place}
//                 onChange={(e) => setNewTour({ ...newTour, place: e.target.value })}
//                 placeholder="Nhập địa điểm"
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Mô tả</Label>
//               <Input
//                 id="description"
//                 value={newTour.description ?? ''} // Fallback to an empty string
//                 onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
//                 placeholder="Nhập mô tả"
//               />

//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="tourImage">Ảnh</Label>
//               <Input
//                 id="tourImage"
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   if (e.target.files && e.target.files[0]) {
//                     setNewTour({ ...newTour, image: URL.createObjectURL(e.target.files[0]) });
//                   }
//                 }}
//               />
//             </div>
//           </div>

//           <DialogFooter>
//             <Button onClick={handleAddTourData}>
//               <Plus className="w-4 h-4 mr-2" /> Thêm
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Button onClick={handleProductSubmit} className="w-full text-white">
//         Lưu sản phẩm
//       </Button>
//     </div>
//   );
// }
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

enum TimeOfDay {
  Morning = 'buổi sáng',
  Midday = 'buổi trưa',
  Afternoon = 'buổi chiều',
  Evening = 'buổi tối',
}

interface Category {
  _id: string;
  name: string;
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

const getTimeIcon = (timeOfDay: TimeOfDay) => {
  switch (timeOfDay) {
    case 'buổi sáng':
    case 'buổi trưa':
      return <Sun className="w-5 h-5 text-yellow-500" />;
    case 'buổi chiều':
      return <Sunset className="w-5 h-5 text-orange-500" />;
    case 'buổi tối':
      return <Moon className="w-5 h-5 text-blue-500" />;
  }
};


export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>(INITIAL_PRODUCT);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch('/api/categories');
  //     const data = await response.json();
  //     setCategories(data);
  //   } catch (error) {
  //     console.error('Failed to fetch categories:', error);
  //   }
  // };

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
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  
  // ===================== CHỈNH SỬA HOẶC THÊM MỚI =====================
  // const handleArrayInputChange = (
  //   product: Product | typeof newProduct | null,
  //   field: 'highlights' | 'included' | 'notIncluded',
  //   index: number,
  //   value: string
  // ) => {
  //   if (!product) return; // Nếu product là null, thoát hàm

  //   // Sử dụng giá trị mặc định [] nếu product[field] là undefined
  //   const updatedArray = [...(product[field] ?? [])];
  //   updatedArray[index] = value;

  //   if (typeof product === 'object' && 'id' in product) {
  //     // Nếu product có trường 'id', nghĩa là đang chỉnh sửa sản phẩm hiện tại
  //     setEditingProduct({ ...(product as Product), [field]: updatedArray });
  //   } else if (product === INITIAL_PRODUCT) {
  //     // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
  //     setNewProduct({ ...(product as Product), [field]: updatedArray });
  //   }
  // };
  const handleArrayInputChange = (
    product: Product | typeof newProduct | null,
    field: 'highlights' | 'included' | 'notIncluded',
    index: number,
    value: string
  ) => {
    if (!product) return; // Nếu product là null, thoát hàm
  
    // Sử dụng giá trị mặc định [] nếu product[field] là undefined
    const updatedArray = [...(product[field] ?? [])];
    updatedArray[index] = value;
  
    if (product && 'id' in product) {
      // Nếu product có trường 'id', nghĩa là đang chỉnh sửa sản phẩm hiện tại
      setEditingProduct({ ...(product as Product), [field]: updatedArray });
    } else {
      // Giả định product là sản phẩm mới nếu không có 'id'
      setNewProduct({ ...(product as Product), [field]: updatedArray });
    }
  };
  
  // ===================== THÊM SẢN PHẨM =====================
  const addArrayItem = (
    product: Product | typeof newProduct | null,
    field: keyof Pick<Product, 'highlights' | 'included' | 'notIncluded'>
  ) => {
    
    // Nếu product là null, thoát hàm
    if (!product) return; 
  
    // Sử dụng giá trị mặc định [] nếu product[field] là undefined
    const updatedArray = [...(product[field] ?? []), ''];
  
    if (typeof product === 'object' && 'id' in product) {
      // Nếu product có trường 'id', nghĩa là đang chỉnh sửa sản phẩm hiện tại
      setEditingProduct({ ...(product as Product), [field]: updatedArray });
    } else if (product === INITIAL_PRODUCT) {
      // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
      setNewProduct({ ...(product as Product), [field]: updatedArray });
    }
  };
  
  
  // ===================== XÓA SẢN PHẨM =====================
  const removeArrayItem = (
    product: Product | typeof newProduct | null,
    field: 'highlights' | 'included' | 'notIncluded',
    index: number
  ) => {
    if (!product) return; // Nếu product là null, thoát hàm
  
    // Sử dụng giá trị mặc định [] nếu product[field] là undefined
    const updatedArray = (product[field] ?? []).filter((_, i) => i !== index);
  
    if (typeof product === 'object' && 'id' in product) {
      // Nếu product có trường 'id', nghĩa là đang chỉnh sửa sản phẩm hiện tại
      setEditingProduct({ ...(product as Product), [field]: updatedArray });
    } else if (product === INITIAL_PRODUCT) {
      // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
      setNewProduct({ ...(product as Product), [field]: updatedArray });
    }
  };
  

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

    if (typeof product === 'object' && 'id' in product) {
      // Nếu product có trường 'id', nghĩa là đang chỉnh sửa sản phẩm hiện tại
      setEditingProduct({ ...(product as Product), tourData: updatedTourData });
    } else if (product === INITIAL_PRODUCT) {
      // Nếu product là sản phẩm mới (INITIAL_PRODUCT)
      setNewProduct({ ...(product as Product), tourData: updatedTourData });
    }
  };

  const updateTourStop = (
    product: Product | typeof newProduct,
    index: number,
    updates: Partial<TourStop>
  ) => {
    const updatedTourData = [...(product.tourData ?? [])];
    updatedTourData[index] = { ...(updatedTourData[index] ?? {}), ...updates };

    if ('id' in product) {
      setEditingProduct({ ...(product as Product), tourData: updatedTourData });
    } else {
      setNewProduct({ ...(product as Product), tourData: updatedTourData });
    }
  };


  const removeTourStop = (product: Product | typeof newProduct, index: number) => {
    const updatedTourData = product.tourData?.filter((_, i) => i !== index) ?? [];

    if ('id' in product) {
      setEditingProduct({ ...(product as Product), tourData: updatedTourData });
    } else {
      setNewProduct({ ...(product as Product), tourData: updatedTourData });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setNewProduct(INITIAL_PRODUCT);
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        setIsEditDialogOpen(false);
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const renderProductForm = (product: Product | typeof newProduct, onSubmit: (e: React.FormEvent) => Promise<void>) => (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={product.name}
            onChange={(e) =>
              'id' in product
                ? setEditingProduct({ ...(product as Product), name: e.target.value })
                : setNewProduct({ ...(product as Product), name: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={product.category}
            onValueChange={(value) =>
              'id' in product
                ? setEditingProduct({ ...(product as Product), category: value })
                : setNewProduct({ ...(product as Product), category: value })
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Image URL</Label>
        <Input
          id="url"
          value={product.url ?? ''}
          onChange={(e) =>
            'id' in product
              ? setEditingProduct({ ...(product as Product), url: e.target.value })
              : setNewProduct({ ...(product as Product), url: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration</Label>
        <Input
          id="duration"
          value={product.duration ?? ''}
          onChange={(e) =>
            'id' in product
              ? setEditingProduct({ ...(product as Product), duration: e.target.value })
              : setNewProduct({ ...(product as Product), duration: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="groupSize">Group Size</Label>
        <Input
          id="groupSize"
          value={product.groupSize ?? ''}
          onChange={(e) =>
            'id' in product
              ? setEditingProduct({ ...(product as Product), groupSize: e.target.value })
              : setNewProduct({ ...(product as Product), groupSize: e.target.value })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          value={product.price ?? ''}
          onChange={(e) =>
            'id' in product
              ? setEditingProduct({ ...(product as Product), price: e.target.value })
              : setNewProduct({ ...(product as Product), price: e.target.value })
          }
          required
        />
      </div>
   
  
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={product.description ?? ''}
          onChange={(e) =>
            'id' in product
              ? setEditingProduct({ ...product, description: e.target.value } as Product)
              : setNewProduct({ ...(product as Product), description: e.target.value })
          }
          required
        />
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
                handleArrayInputChange(product, 'highlights', index, e.target.value)
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
                handleArrayInputChange(product, 'included', index, e.target.value)
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

      {/* Not Included */}
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
                handleArrayInputChange(product, 'notIncluded', index, e.target.value)
              }
            />
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="submit" className="w-full">
        {'id' in product ? 'Save Changes' : 'Create Product'}
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
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <p className="text-sm">Category: {product.category}</p>
                <p className="text-sm">Duration: {product.duration}</p>
                <p className="text-sm">Price: {product.price}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingProduct(product);
                  setIsEditDialogOpen(true);
                }}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product.id)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editingProduct && renderProductForm(editingProduct, handleEdit)}
        </DialogContent>
      </Dialog>
    </div>
  );
}
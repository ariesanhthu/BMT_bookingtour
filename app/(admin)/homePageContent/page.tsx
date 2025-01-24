'use client';

import React, { useEffect, useState } from 'react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';

import { Plus, Trash, Sun, Sunset, Moon, Pencil, ChevronsUpDown } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { useEdgeStore } from '@/lib/edgestore';
import {
  MultiImageDropzone,
  type FileState,
} from '@/app/components/uploadFile/MultiImageDropzone';


import seedData from '@/app/lib/seedData';
import { set } from 'mongoose';

const AdminHomePage = () => {
    const [formData, setFormData] = useState({
        _id: '',
        images: [] as string[],
        navbar: [
            {
                name: '',
                href: '',
                sublinks: [{ name: '', href: '' }]
            }
        ],
        logo: '',
        slogan: '',
        subSlogan: '',
        footer: {
            email: '',
            phone: '',
            address: '',
        },
    });

    const [isLoaded, setIsLoaded] = useState(false); // Kiểm tra dữ liệu đã được tải chưa
    const [isNew, setIsNew] = useState(false); // Dữ liệu mới hay không

    //  --------------- IMAGE UPLOAD ----------------    
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const [urls, setUrls] = useState<string[]>([]);
    const { edgestore } = useEdgeStore();
    
    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
          const newFileStates = structuredClone(fileStates);
          const fileState = newFileStates.find(
            (fileState) => fileState.key === key,
          );
          if (fileState) {
            fileState.progress = progress;
          }
          return newFileStates;
        });
      }

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

 

    // Lấy dữ liệu từ server
    const fetchHomePageData = async () => {
        try {
            const response = await fetch('/api/homepage');
            if (response.ok) {
                const data = await response.json();
                setFormData(data.data);
                setIsNew(false); // Đã có dữ liệu
            } else {
                // Không có dữ liệu, tạo mới
                const newResponse = await fetch('/api/homepage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(seedData),
                });

                const newData = await newResponse.json();
                setFormData(newData.data);
                setUrls(newData.data.images); // Set ảnh
                setIsNew(true); // Đây là dữ liệu mới
            }
            setIsLoaded(true); // Đánh dấu dữ liệu đã được tải
        } catch (error) {
            console.error('Error fetching homepage data:', error);
        }
    };

    useEffect(() => {
        fetchHomePageData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData({
            ...formData,
            footer: { ...formData.footer, [field]: e.target.value },
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // for (const imageUrl of formData.images) {
            //     await edgestore.publicFiles.confirmUpload({
            //         url : imageUrl
            //     });
            // }
            // console.log(formData);
            
            // await setFormData({ ...formData, images: urls });
            // await console.log("images", formData.images);

            setIsSubmitted(true);

            const response = await fetch('/api/homepage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Content updated successfully');
            } else {
                alert('Failed to update content');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
    <div className="container mx-auto px-4 py-8 w-full">
    <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto">
        {/* Image Upload Section */}
        <Card className="w-full">
            <CardHeader>
                <Collapsible className="w-full">
                    <CollapsibleTrigger className="flex items-center w-full space-x-4 p-2 hover:bg-primary rounded-lg">
                        <Button type="button" variant="secondary" size="sm">
                            <ChevronsUpDown className="h-5 w-5" />
                        </Button>
                        <Label className="text-lg font-medium">
                            Tùy chỉnh hình ảnh trang bìa
                        </Label>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {formData.images.map((image, index) => (
                                <div key={index} className="relative aspect-square">
                                    <Image
                                        src={image}
                                        alt={`Image ${index + 1}`}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                            <div className="aspect-square grid grid-cols-3">
                                <MultiImageDropzone
                                    value={fileStates}
                                    dropzoneOptions={{
                                        maxFiles: 6,
                                    }}
                                    onChange={(files) => {
                                        setFileStates(files);
                                    }}
                                    onFilesAdded={async (addedFiles) => {
                                        setFileStates([...fileStates, ...addedFiles]);
                                        await Promise.all(
                                            addedFiles.map(async (addedFileState) => {
                                                try {
                                                    const res = await edgestore.publicFiles.upload({
                                                        file: (addedFileState.file as File),
                                                        onProgressChange: async (progress) => {
                                                            updateFileProgress(addedFileState.key, progress);
                                                            if (progress === 100) {
                                                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                                                updateFileProgress(addedFileState.key, 'COMPLETE');
                                                            }
                                                        },
                                                    });
                                                    // ------------- fix bug ----------------
                                                    // just upload 1 image (useState), in eagestore it still working
                                                    const imageUrls = [...formData.images, res.url];
                                                    await setFormData({ ...formData, images: imageUrls });
                                                    // setUrls((prev) => [...prev, res.url]);
                                                    console.log(formData.images);
                                                } catch (err) {
                                                    updateFileProgress(addedFileState.key, 'ERROR');
                                                }
                                            }),
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardHeader>
        </Card>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Slogan</Label>
                        <Input
                            type="text"
                            value={formData.slogan}
                            onChange={(e) => handleChange(e, 'slogan')}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Sub Slogan</Label>
                        <Input
                            type="text"
                            value={formData.subSlogan}
                            onChange={(e) => handleChange(e, 'subSlogan')}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Logo</Label>
                        <Input
                            type="text"
                            value={formData.logo}
                            onChange={(e) => handleChange(e, 'logo')}
                            className="w-full"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Navigation Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Navigation Menu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formData.navbar.map((item, index) => (
                        <div key={index} className="space-y-4 p-4 border rounded-lg">
                            <div className="space-y-2">
                                <Label>Menu Name</Label>
                                <Input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => {
                                        const updatedNavbar = [...formData.navbar];
                                        updatedNavbar[index] = { ...item, name: e.target.value };
                                        setFormData({ ...formData, navbar: updatedNavbar });
                                    }}
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Link</Label>
                                <Input
                                    type="text"
                                    value={item.href}
                                    onChange={(e) => {
                                        const updatedNavbar = [...formData.navbar];
                                        updatedNavbar[index] = { ...item, href: e.target.value };
                                        setFormData({ ...formData, navbar: updatedNavbar });
                                    }}
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-4">
                                <Label>Sublinks</Label>
                                {item.sublinks.map((sublink, subIndex) => (
                                    <div key={subIndex} className="grid grid-cols-2 gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Name"
                                            value={sublink.name}
                                            onChange={(e) => {
                                                const updatedNavbar = [...formData.navbar];
                                                const updatedSublinks = [...updatedNavbar[index].sublinks];
                                                updatedSublinks[subIndex] = { ...sublink, name: e.target.value };
                                                updatedNavbar[index].sublinks = updatedSublinks;
                                                setFormData({ ...formData, navbar: updatedNavbar });
                                            }}
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Link"
                                            value={sublink.href}
                                            onChange={(e) => {
                                                const updatedNavbar = [...formData.navbar];
                                                const updatedSublinks = [...updatedNavbar[index].sublinks];
                                                updatedSublinks[subIndex] = { ...sublink, href: e.target.value };
                                                updatedNavbar[index].sublinks = updatedSublinks;
                                                setFormData({ ...formData, navbar: updatedNavbar });
                                            }}
                                        />
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const updatedNavbar = [...formData.navbar];
                                        updatedNavbar[index].sublinks.push({ name: '', href: '' });
                                        setFormData({ ...formData, navbar: updatedNavbar });
                                    }}
                                    className="w-full"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Sublink
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Footer Section */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Thông tin liên lạc</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={formData.footer.email}
                            onChange={(e) => handleFooterChange(e, 'email')}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                            type="text"
                            value={formData.footer.phone}
                            onChange={(e) => handleFooterChange(e, 'phone')}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Địa chỉ</Label>
                        <Input
                            value={formData.footer.address}
                            onChange={(e) => handleFooterChange(e, 'address')}
                            className="w-full"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
                Save Changes
            </Button>
        </div>
    </form>
    </div>
    );
    };

export default AdminHomePage;

// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import { useEdgeStore } from '@/lib/edgestore';
// import {
//   MultiImageDropzone,
//   type FileState,
// } from '@/app/components/uploadFile/MultiImageDropzone';

// const AdminHomePage = () => {
//     const [images, setImages] = useState<string[]>([]);
//     const [navbar, setNavbar] = useState([
//         { name: "", link: "", sublinks: [{ name: "", link: "" }] },
//     ]);
//     const [logo, setLogo] = useState<string>("");

//     const [fileStates, setFileStates] = useState<FileState[]>([]);
    
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [isCancelled, setIsCancelled] = useState(false);

//     const { edgestore } = useEdgeStore();
    
//     function updateFileProgress(key: string, progress: FileState['progress']) {
//         setFileStates((fileStates) => {
//           const newFileStates = structuredClone(fileStates);
//           const fileState = newFileStates.find(
//             (fileState) => fileState.key === key,
//           );
//           if (fileState) {
//             fileState.progress = progress;
//           }
//           return newFileStates;
//         });
//       }

//     const handleAddImage = () => {
//         setImages([...images, ""]);
//     };

//     const handleNavbarChange = (index: number, field: string, value: string) => {
//         const updatedNavbar = [...navbar];
//         updatedNavbar[index] = { ...updatedNavbar[index], [field]: value };
//         setNavbar(updatedNavbar);
//     };

//     const handleSublinkChange = (
//         index: number,
//         subIndex: number,
//         field: string,
//         value: string
//     ) => {
//         const updatedNavbar = [...navbar];
//         const sublinks = [...updatedNavbar[index].sublinks];
//         sublinks[subIndex] = { ...sublinks[subIndex], [field]: value };
//         updatedNavbar[index].sublinks = sublinks;
//         setNavbar(updatedNavbar);
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             for (const imageUrl of images) {
//                 await edgestore.publicFiles.confirmUpload({
//                     url : imageUrl
//                 });
//               }
//             await setIsSubmitted(true);

//             const response = await fetch("/api/homepage", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ images, navbar, logo }),
//             });

//             if (response.ok) {
//                 alert("Home page content updated successfully!");
//             } else {
//                 alert("Failed to update home page content.");
//             }
//         } catch (error) {
//             console.error("Error updating home page content:", error);
//         }
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Admin - Edit Home Page</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block font-semibold">Logo URL</label>
//                     <Input
//                         type="text"
//                         value={logo}
//                         onChange={(e) => setLogo(e.target.value)}
//                         placeholder="Enter logo URL"
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-semibold">Images</label>
//                     {/* {images.map((image, index) => (
//                         <div key={index} className="flex gap-2 mb-2">
//                             <Input
//                                 type="text"
//                                 value={image}
//                                 onChange={(e) => {
//                                     const updatedImages = [...images];
//                                     updatedImages[index] = e.target.value;
//                                     setImages(updatedImages);
//                                 }}
//                                 placeholder="Enter image URL"
//                             />
//                             <Button
//                                 type="button"
//                                 onClick={() => {
//                                     const updatedImages = images.filter((_, i) => i !== index);
//                                     setImages(updatedImages);
//                                 }}
//                             >
//                                 Remove
//                             </Button>
//                         </div>
//                     ))}
//                     <Button type="button" onClick={handleAddImage}>
//                         Add Image
//                     </Button> */}
                    
//                     <MultiImageDropzone
//                         value={fileStates}
//                         dropzoneOptions={{
//                         maxFiles: 6,
//                         }}
//                         onChange={(files) => {
//                         setFileStates(files);
//                         }}
//                         onFilesAdded={async (addedFiles) => {
//                         setFileStates([...fileStates, ...addedFiles]);
//                         await Promise.all(
//                             addedFiles.map(async (addedFileState) => {
//                             try {
//                                 const res = await edgestore.publicFiles.upload(
//                                 {
//                                 file: (addedFileState.file as File),
//                                 options:{
//                                     temporary: true
//                                 },
//                                 onProgressChange: async (progress) => {
//                                     updateFileProgress(addedFileState.key, progress);
//                                     if (progress === 100) {
//                                     // wait 1 second to set it to complete
//                                     // so that the user can see the progress bar at 100%
//                                     await new Promise((resolve) => setTimeout(resolve, 1000));
//                                     updateFileProgress(addedFileState.key, 'COMPLETE');
//                                     }
//                                 },
//                                 });

//                                 setImages((prev) => [...prev, res.url]);
//                                 console.log(res);
//                             } catch (err) {
//                                 updateFileProgress(addedFileState.key, 'ERROR');
//                             }
//                             }),
//                         );
//                         }}
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-semibold">Navbar</label>
//                     {navbar.map((item, index) => (
//                         <div key={index} className="space-y-2 mb-4">
//                             <Input
//                                 type="text"
//                                 value={item.name}
//                                 onChange={(e) =>
//                                     handleNavbarChange(index, "name", e.target.value)
//                                 }
//                                 placeholder="Enter navbar name"
//                             />
//                             <Input
//                                 type="text"
//                                 value={item.link}
//                                 onChange={(e) =>
//                                     handleNavbarChange(index, "link", e.target.value)
//                                 }
//                                 placeholder="Enter navbar link"
//                             />
//                             <div className="ml-4">
//                                 <label className="block font-semibold">Sublinks</label>
//                                 {item.sublinks.map((sublink, subIndex) => (
//                                     <div key={subIndex} className="flex gap-2 mb-2">
//                                         <Input
//                                             type="text"
//                                             value={sublink.name}
//                                             onChange={(e) =>
//                                                 handleSublinkChange(
//                                                     index,
//                                                     subIndex,
//                                                     "name",
//                                                     e.target.value
//                                                 )
//                                             }
//                                             placeholder="Enter sublink name"
//                                         />
//                                         <Input
//                                             type="text"
//                                             value={sublink.link}
//                                             onChange={(e) =>
//                                                 handleSublinkChange(
//                                                     index,
//                                                     subIndex,
//                                                     "link",
//                                                     e.target.value
//                                                 )
//                                             }
//                                             placeholder="Enter sublink URL"
//                                         />
//                                     </div>
//                                 ))}
//                                 <Button
//                                     type="button"
//                                     onClick={() => {
//                                         const updatedNavbar = [...navbar];
//                                         updatedNavbar[index].sublinks.push({
//                                             name: "",
//                                             link: "",
//                                         });
//                                         setNavbar(updatedNavbar);
//                                     }}
//                                 >
//                                     Add Sublink
//                                 </Button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <Button type="submit">Save Changes</Button>
//             </form>
//         </div>
//     );
// };

// export default AdminHomePage;


// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useEdgeStore } from "@/lib/edgestore";
// import {
//   MultiImageDropzone,
//   type FileState,
// } from "@/app/components/uploadFile/MultiImageDropzone";

// const AdminHomePage = () => {
//   const [images, setImages] = useState<string[]>([]);
//   const [navbar, setNavbar] = useState([
//     { name: "", link: "", sublinks: [{ name: "", link: "" }] },
//   ]);
//   const [logo, setLogo] = useState<string>("");
//   const [slogan, setSlogan] = useState<string>("");
//   const [subSlogan, setSubSlogan] = useState<string>("");
//   const [footer, setFooter] = useState({
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [fileStates, setFileStates] = useState<FileState[]>([]);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const { edgestore } = useEdgeStore();

//   function updateFileProgress(key: string, progress: FileState["progress"]) {
//     setFileStates((fileStates) => {
//       const newFileStates = structuredClone(fileStates);
//       const fileState = newFileStates.find(
//         (fileState) => fileState.key === key
//       );
//       if (fileState) {
//         fileState.progress = progress;
//       }
//       return newFileStates;
//     });
//   }

//   const handleFooterChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     setFooter({ ...footer, [field]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       for (const imageUrl of images) {
//         await edgestore.publicFiles.confirmUpload({
//           url: imageUrl,
//         });
//       }
//       setIsSubmitted(true);

//       const response = await fetch("/api/homepage", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           images,
//           navbar,
//           logo,
//           slogan,
//           subSlogan,
//           footer,
//         }),
//       });

//       if (response.ok) {
//         alert("Home page content updated successfully!");
//       } else {
//         alert("Failed to update home page content.");
//       }
//     } catch (error) {
//       console.error("Error updating home page content:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Images */}
//         <div>
//           <label className="block font-semibold">Images</label>
//           <MultiImageDropzone
//             value={fileStates}
//             dropzoneOptions={{
//               maxFiles: 6,
//             }}
//             onChange={(files) => {
//               setFileStates(files);
//             }}
//             onFilesAdded={async (addedFiles) => {
//               setFileStates([...fileStates, ...addedFiles]);
//               await Promise.all(
//                 addedFiles.map(async (addedFileState) => {
//                   try {
//                     const res = await edgestore.publicFiles.upload({
//                       file: addedFileState.file as File,
//                       options: {
//                         temporary: true,
//                       },
//                       onProgressChange: async (progress) => {
//                         updateFileProgress(addedFileState.key, progress);
//                         if (progress === 100) {
//                           await new Promise((resolve) =>
//                             setTimeout(resolve, 1000)
//                           );
//                           updateFileProgress(addedFileState.key, "COMPLETE");
//                         }
//                       },
//                     });

//                     setImages((prev) => [...prev, res.url]);
//                   } catch (err) {
//                     updateFileProgress(addedFileState.key, "ERROR");
//                   }
//                 })
//               );
//             }}
//           />
//         </div>

//         {/* Logo */}
//         <div>
//           <label className="block font-semibold">Logo</label>
//           <Input
//             type="text"
//             value={logo}
//             onChange={(e) => setLogo(e.target.value)}
//           />
//         </div>

//         {/* Slogan */}
//         <div>
//           <label className="block font-semibold">Slogan</label>
//           <Input
//             type="text"
//             value={slogan}
//             onChange={(e) => setSlogan(e.target.value)}
//           />
//         </div>

//         {/* Sub Slogan */}
//         <div>
//           <label className="block font-semibold">Sub Slogan</label>
//           <Input
//             type="text"
//             value={subSlogan}
//             onChange={(e) => setSubSlogan(e.target.value)}
//           />
//         </div>

//         {/* Footer */}
//         <div>
//           <label className="block font-semibold">Footer</label>
//           <Input
//             type="email"
//             placeholder="Email"
//             value={footer.email}
//             onChange={(e) => handleFooterChange(e, "email")}
//           />
//           <Input
//             type="text"
//             placeholder="Phone"
//             value={footer.phone}
//             onChange={(e) => handleFooterChange(e, "phone")}
//           />
//           <Input
//             type="text"
//             placeholder="Address"
//             value={footer.address}
//             onChange={(e) => handleFooterChange(e, "address")}
//           />
//         </div>

//         {/* Submit Button */}
//         <Button type="submit">Save Changes</Button>
//       </form>
//     </div>
//   );
// };

// export default AdminHomePage;
'use client';

import React, { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { useEdgeStore } from '@/lib/edgestore';
import {
  MultiImageDropzone,
  type FileState,
} from '@/app/components/uploadFile/MultiImageDropzone';


import seedData from '@/app/lib/seedData';

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
        <form onSubmit={handleSubmit}>
            <div>
                {formData._id}
        {/* ----------------------------------------------------------------------- */}
                
                <h1>Hình ảnh trang bìa</h1>
                {
                    formData.images.map((image, index) => (
                    <div>
                            <Image
                                src={image}
                                alt="Picture of the author"
                                width={500}
                                height={500}
                            />
                    </div>
                ))}
                
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
                                const res = await edgestore.publicFiles.upload(
                                {
                                file: (addedFileState.file as File),
                                // options:{
                                //     temporary: true
                                // },
                                onProgressChange: async (progress) => {
                                    updateFileProgress(addedFileState.key, progress);
                                    if (progress === 100) {
                                    // wait 1 second to set it to complete
                                    // so that the user can see the progress bar at 100%
                                    await new Promise((resolve) => setTimeout(resolve, 1000));
                                    updateFileProgress(addedFileState.key, 'COMPLETE');
                                    }
                                },
                                });

                                await setFormData({...formData, images: [...formData.images, res.url]});
                                console.log(res);

                            } catch (err) {
                                updateFileProgress(addedFileState.key, 'ERROR');
                            }
                            }),
                        );
                        }}
                    />
                
        {/* ----------------------------------------------------------------------- */}
                <label>Slogan:</label>
                <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => handleChange(e, 'slogan')}
                />
            </div>
            <div>
                <label>Sub Slogan:</label>
                <input
                    type="text"
                    value={formData.subSlogan}
                    onChange={(e) => handleChange(e, 'subSlogan')}
                />
            </div>
            <div>
                <label>Logo:</label>
                <input
                    type="text"
                    value={formData.logo}
                    onChange={(e) => handleChange(e, 'logo')}
                />
            </div>
            <div>
                <label>Navbar name:</label>
                {formData.navbar.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                                const updatedNavbar = [...formData.navbar];
                                updatedNavbar[index] = { ...item, name: e.target.value };
                                setFormData({ ...formData, navbar: updatedNavbar });
                            }}
                        />
                        <input
                            type="text"
                            value={item.href}
                            onChange={(e) => {
                                const updatedNavbar = [...formData.navbar];
                                updatedNavbar[index] = { ...item, href: e.target.value };
                                setFormData({ ...formData, navbar: updatedNavbar });
                            }}
                        />
            
                        <div>
                            
                            <label>Sublinks:</label>

                            {item.sublinks.map((sublink, subIndex) => (
                                <div key={subIndex}>
                                    <input
                                        type="text"
                                        value={sublink.name}
                                        onChange={(e) => {
                                            const updatedNavbar = [...formData.navbar];
                                            const updatedSublinks = [...updatedNavbar[index].sublinks];
                                            updatedSublinks[subIndex] = { ...sublink, name: e.target.value };
                                            updatedNavbar[index].sublinks = updatedSublinks;
                                            setFormData({ ...formData, navbar: updatedNavbar });
                                        }}
                                    />
                                    <input
                                        type="text"
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
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedNavbar = [...formData.navbar];
                                    updatedNavbar[index].sublinks.push({ name: '', href: '' });
                                    setFormData({ ...formData, navbar: updatedNavbar });
                                }}
                            >
                                Add Sublink
                            </button>
                        </div>
                    </div>
             ))}  
            </div>
                     
            <h1>FOOTER</h1>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={formData.footer.email}
                    onChange={(e) => handleFooterChange(e, 'email')}
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    value={formData.footer.phone}
                    onChange={(e) => handleFooterChange(e, 'phone')}
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    value={formData.footer.address}
                    onChange={(e) => handleFooterChange(e, 'address')}
                ></input>
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default AdminHomePage;

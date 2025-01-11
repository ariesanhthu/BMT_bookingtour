'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Category } from '@/app/lib/models/Category';
import { categoryProps } from '@/app/interface';

export default function AdminCategoryPage() {
  const [Categories, setCategories] = useState<[]>([]);
  // new category
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const [editingCategory, setEditingCategory] = useState<categoryProps | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  //???
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all roles
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/category');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
        setStatus(null); // Clear any previous status
      } else {
        setStatus('Failed to fetch Categories');
      }
    } catch (error) {
      setStatus('Error fetching Categories');
    }
  };

  // Create or update role
  const handleCreateOrUpdate = async () => {
    if (!name) {
      setStatus('Category name is required');
      return;
    }

    const url = '/api/category';
    const method = editingCategory ? 'PUT' : 'POST';
    const body = JSON.stringify({
      _id: editingCategory,
      name,
      slug
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      const data = await res.json();
      if (data.success) {
        fetchCategories();
        resetForm();
        setStatus(editingCategory ? 'Category updated successfully' : 'Category created successfully');
      } else {
        setStatus(data.error || 'Failed to save Category');
      }
    } catch (error) {
      setStatus('Error saving Category');
    }
  };

  // Delete role
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/category', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      
      if (data.success) {
        fetchCategories();
        setStatus('Category deleted successfully');
      } else {
        setStatus(data.error || 'Failed to delete Category');
      }
    } catch (error) {
      setStatus('Error deleting Category');
    }
  };

  // Edit role (populate form fields)
  const handleEdit = (Category: any) => {
    setEditingCategory(Category._id);
    setName(Category.name);
    setSlug(Category.slug || '  ');
    setStatus(null);
  };

  // Reset form fields
  const resetForm = () => {
    setName('');
    setSlug('');
    setEditingCategory(null);
  };

  return (
    <div className="space-y-8">
      {/* Status Message */}
      {status && <p style={{ color: 'red'}}>{status}</p>}
      <Card>
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
        </CardHeader>
        <form onSubmit={handleCreateOrUpdate}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={name}
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ten loai"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categorySlug">Category Slug</Label>
                <Input
                  id="categorySlug"
                  value={slug}
                  type='text'
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Ten-loai"
                  required
                />
              </div>
          </CardContent>

          {/* // BUTTON FOOTER SUBMIT*/}
          <CardFooter className="justify-center">
            <Button type="submit" className="text-white">
              <Plus className="w-4 h-4 mr-2 text-white" />
              Thêm mới
            </Button>
          </CardFooter>

        </form>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Categories.map((Category: any) => (
          <Card key={Category._id}>
            <CardHeader>
              <CardTitle>{Category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tên: {Category.name}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingCategory(Category);
                  setIsEditDialogOpen(true);
                }}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(Category._id)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="editCategoryName">Category Name</Label>
                <Input
                  id="editCategoryName"
                  value={editingCategory?.name || ''}
                  onChange={(e) =>
                    setEditingCategory(
                      editingCategory
                        ? { ...editingCategory, name: e.target.value }
                        : null
                    )
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Role List */}
    </div>
  );
}

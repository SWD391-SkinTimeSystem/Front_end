import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, ToastContainer } from 'react-toastify';

const colors = {
  primary: '#326e51', 
  secondary: '#4CAF50', 
  background: '#f0fdf4', 
  text: '#064e3b', 
  accent: '#e6f3e6', 
};

const SkinTypeSchema = z.object({
  name: z.string().min(2, { message: "Tên loại da phải có ít nhất 2 ký tự" }),
  description: z.string().optional()
});

type SkinType = {
  id?: string;
  name: string;
  description?: string;
};

export const SkinTypeManagementTable: React.FC = () => {
  const [skinTypes, setSkinTypes] = useState<SkinType[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<SkinType>({
    resolver: zodResolver(SkinTypeSchema)
  });

  const fetchSkinTypes = async () => {
    try {
      const response = await fetch('http://swd291-api.duckdns.org/all-decription');
      const result = await response.json();
      if (result.success) {
        setSkinTypes(result.data);
      }
    } catch (error) {
      console.error('Error fetching skin types:', error);
      toast.error('Không thể tải danh sách loại da');
    }
  };
  
  useEffect(() => {
    fetchSkinTypes();
  }, []); 

  const filteredSkinTypes = skinTypes.filter(skinType => 
    skinType.name && skinType.name.toLowerCase().includes(nameFilter.toLowerCase())
  );
  
  const onSubmit = async (data: SkinType) => {
    const isDuplicate = skinTypes.some(
      (skinType) => skinType.name.toLowerCase() === data.name.toLowerCase()
    );
  
    if (isDuplicate) {
      toast.error('Tên loại da đã tồn tại');
      return;
    }
  
    try {
      console.log("(trước khi call")
      const response = await fetch('http://swd291-api.duckdns.org/api/skinType', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name: data.name,
          description: data.description || '',
        }),
      });
      console.log("sau khicallss")

  
      const result = await response.json();
      console.log(result)
      if (result.success) {
        setSkinTypes(prevSkinTypes => [
          result.data,
          ...prevSkinTypes,
        ]);
        
        console.log(result.data)
  
        setIsDialogOpen(false);
        reset();
        fetchSkinTypes();
        toast.success('Thêm loại da thành công');
      } else {
        toast.error(result.message || 'Có lỗi xảy ra khi thêm loại da');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Không thể thêm loại da');
    }
  };
  

  return (
    <Card className="w-full" style={{ backgroundColor: colors.background }}>
      <ToastContainer />
      
      <CardHeader className="flex justify-between items-center">
        <CardTitle
          className="text-2xl font-bold"
          style={{ color: colors.text }}
        >
          Quản lý Loại Da
        </CardTitle>
        <Button
          className="flex items-center gap-2"
          style={{
            backgroundColor: colors.primary,
            color: 'white'
          }}
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-5 w-5" /> Thêm Loại Da
        </Button>
      </CardHeader>

      <CardContent>
        {/* Search Input */}
        <Input
          placeholder="Tìm kiếm loại da"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="mb-6"
          style={{
            borderColor: colors.primary,
            backgroundColor: 'white'
          }}
        />

        {/* Skin Types Table */}
        <Table>
          <TableHeader style={{ backgroundColor: colors.primary }}>
            <TableRow>
              <TableHead style={{ color: 'white' }}>STT</TableHead>
              <TableHead style={{ color: 'white' }}>Tên Loại Da</TableHead>
              <TableHead style={{ color: 'white' }}>Mô Tả</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSkinTypes.map((skinType, index) => (
              <TableRow key={skinType.id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{skinType.name}</TableCell>
                <TableCell>{skinType.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Create Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Thêm Loại Da Mới</DialogTitle>
              <DialogDescription>
                Nhập thông tin loại da mới.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="Tên loại da"
                  {...register('name')}
                  style={{
                    borderColor: errors.name ? 'red' : colors.primary
                  }}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}

                <Input 
                  placeholder="Mô tả (tùy chọn)"
                  {...register('description')}
                  className="mt-2"
                  style={{
                    borderColor: colors.primary
                  }}
                />
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button 
                  type="submit"
                  style={{
                    backgroundColor: colors.primary,
                    color: 'white'
                  }}
                >
                  Thêm Mới
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SkinTypeManagementTable;
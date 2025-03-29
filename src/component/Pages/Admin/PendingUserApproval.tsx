import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Check, X } from 'lucide-react';

interface PendingUser {
  id: string;
  username: string;
  email: string;
  role: 'customer' | 'staff' | 'skin_therapist' | 'manager';
  created_time: string;
}

const initialPendingUsers: PendingUser[] = [
  {
    id: 'pending-1',
    username: 'diemstaff',
    email: 'diemstaff@example.com',
    role: 'staff',
    created_time: new Date('2024-03-26').toISOString(),
  },
  {
    id: 'pending-2',
    username: 'Thư Therapist',
    email: 'thutherapist@example.com',
    role: 'skin_therapist',
    created_time: new Date('2024-03-27').toISOString(),
  },
  {
    id: 'pending-3',
    username: 'new customer',
    email: 'customer@example.com',
    role: 'skin_therapist',
    created_time: new Date('2024-03-27').toISOString(),
  }
];

const PendingUserApproval: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>(initialPendingUsers);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  
  // Filters and search state
  const [filters, setFilters] = useState({
    username: '',
    role: 'all',
    sortOrder: 'newest' as 'newest' | 'oldest'
  });

  const handleApproveUser = (user: PendingUser) => {
    setSelectedUser(user);
    setIsConfirmDialogOpen(true);
  };

  const confirmApproval = () => {
    if (!selectedUser) return;

    // In a real scenario, this would call an API to approve the user
    // For now, we'll just remove the user from the pending list
    setPendingUsers(pendingUsers.filter(u => u.id !== selectedUser.id));
    
    // Reset states
    setSelectedUser(null);
    setIsConfirmDialogOpen(false);
  };

  const handleRejectUser = (userId: string) => {
    // In a real scenario, this would call an API to reject the user
    setPendingUsers(pendingUsers.filter(u => u.id !== userId));
  };

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    return pendingUsers
      .filter(user => 
        user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
        (filters.role === 'all' || user.role === filters.role)
      )
      .sort((a, b) => {
        const dateA = new Date(a.created_time).getTime();
        const dateB = new Date(b.created_time).getTime();
        return filters.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [pendingUsers, filters]);

  return (
    <div className="container mx-auto p-6 bg-white">
      <Card className="bg-green-50">
        <CardHeader className="bg-[#326e51]">
          <CardTitle className="text-white flex justify-between items-center">
            Phê Duyệt Người Dùng
            <div className="flex items-center space-x-2">
              {/* Filters */}
              <Input
                placeholder="Tìm kiếm theo tên đăng nhập"
                value={filters.username}
                onChange={(e) => setFilters({ ...filters, username: e.target.value })}
                className="w-60 mr-2 placeholder-white text-white bg-transparent border border-white"
              />
              <Select
                value={filters.role}
                onValueChange={(value) => setFilters({ ...filters, role: value })}
              >
                <SelectTrigger className="w-40 mr-2">
                  <SelectValue placeholder="Lọc theo vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả vai trò</SelectItem>
                  <SelectItem value="customer">Khách hàng</SelectItem>
                  <SelectItem value="staff">Nhân viên</SelectItem>
                  <SelectItem value="skin_therapist">Chuyên viên da</SelectItem>
                  <SelectItem value="manager">Quản lý</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.sortOrder}
                onValueChange={(value) => setFilters({ ...filters, sortOrder: value as 'newest' | 'oldest' })}
              >
                <SelectTrigger className="w-40 mr-2">
                  <SelectValue placeholder="Sắp xếp theo ngày" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-green-200 w-full">
              <TableRow>
                <TableHead>Tên đăng nhập</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === 'customer' ? 'Khách hàng' : 
                     user.role === 'staff' ? 'Nhân viên' : 
                     user.role === 'skin_therapist' ? 'Chuyên viên da' : 
                     'Quản lý'}
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_time).toLocaleString()}
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-green-600 hover:bg-green-50"
                      onClick={() => handleApproveUser(user)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleRejectUser(user.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog 
        open={isConfirmDialogOpen} 
        onOpenChange={setIsConfirmDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác Nhận Phê Duyệt Người Dùng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn phê duyệt người dùng này không?
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <p><strong>Tên đăng nhập:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Vai trò:</strong> 
                {selectedUser.role === 'customer' ? 'Khách hàng' : 
                 selectedUser.role === 'staff' ? 'Nhân viên' : 
                 selectedUser.role === 'skin_therapist' ? 'Chuyên viên ' : 
                 'Quản lý'}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsConfirmDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button 
              onClick={confirmApproval}
              className="bg-green-600 hover:bg-green-700"
            >
              Xác Nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingUserApproval;
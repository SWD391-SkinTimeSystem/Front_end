import React, { useState, useMemo, useEffect } from 'react';
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
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  ChevronDown,
  Trash2,
  UserPlus
} from 'lucide-react';
import { AccountDetail } from '@/types/account';

interface User {
  id: string;
  username: string;
  fullname: string;
  avatar?: string;
  email: string;
  phone?: string;
  date_of_birth: string;
  gender?: 'male' | 'female' | 'other';
  role: 'customer' | 'staff' | 'skin_therapist' | 'manager' | 'admin';
  status: 'active' | 'inactive' | 'deleted';
  created_time: string;
  last_modified: string;
}

const initialUsers: User[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    username: 'admin',
    fullname: 'Admin User',
    email: 'admin@example.com',
    role: 'manager',
    status: 'active',
    phone: '0123456789',
    gender: 'male',
    date_of_birth: '1990-01-01',
    created_time: new Date('2024-03-20').toISOString(),
    last_modified: new Date().toISOString()
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
    username: 'staff1',
    fullname: 'Staff User',
    email: 'staff1@example.com',
    role: 'staff',
    status: 'active',
    phone: '0987654321',
    gender: 'female',
    date_of_birth: '1995-05-15',
    created_time: new Date('2024-03-25').toISOString(),
    last_modified: new Date().toISOString()
  }
];

const UserManagement: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '12345678', 

    role: 'customer'
  });
  
  const [filters, setFilters] = useState({
    username: null as string | null,
    role: null as string | null,
    status: null as string | null,
    sortOrder: 'newest' as 'newest' | 'oldest'
  });
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };


  useEffect(() => {
    if (users) {
      setUsers(users?.content ?? []);
    }
  }, [users]);

  const handleCreateUser = () => {
    const requiredFields = ['username', 'email', 'role'];
    const missingFields = requiredFields.filter(field => !newUser[field]?.trim());
  
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
  
    if (!validateEmail(newUser.email)) {
      alert('Please enter a valid email address');
      return;
    }
  

    const userToAdd: AccountDetail = {
      ...newUser,
      id:'',
      status: 'active',
      created_time: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      avatar:'',
      fullname: '', 
      phone: '', 
      date_of_birth: '',
    };

  console.log(userToAdd)
    const updatedUsers = [...users, userToAdd];
    // setUsers(updatedUsers);

  
    // Reset form về mặc định
    setNewUser({
      username: '',
      email: '',
      password: '12345678',
      role: 'customer'
    });
  
    setIsOpen(false);
  
    // document.querySelector('button[data-close="true"]')?.dispatchEvent(new MouseEvent('click'));
  };

  // Soft delete user handler
  const handleSoftDelete = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: 'deleted', last_modified: new Date().toISOString() }
        : user
    ));
  };

  // Filtered and sorted users
  const filteredUsers = useMemo(() => {
    return users

      .filter(user => user.status !== 'Deleted')
      .filter(user =>
        (!filters.username || user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
        (!filters.role || user.role === filters.role) &&
        (!filters.status || user.status === filters.status)
      )
      .sort((a, b) => {
        const dateA = new Date(a.created_time).getTime();
        const dateB = new Date(b.created_time).getTime();
        return filters.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [users, filters]);

  return (
    <div className="container mx-auto p-6 bg-white">
      <Card className="bg-green-50">
        <CardHeader className="bg-[#326e51]">
          <CardTitle className="text-gray-100 flex justify-between items-center">
            User Management
            <div className="flex items-center space-x-2">
              {/* Filters */}
              <Input
                placeholder="Filter by Username"
                value={filters.username || ""}
                onChange={(e) => setFilters({ ...filters, username: e.target.value })}
                className="w-60 mr-2 placeholder-white text-white bg-transparent border border-white"
              />
              <Select
                value={filters.role || "all"}
                onValueChange={(value) => setFilters({ ...filters, role: value === "all" ? null : value })}
              >
                <SelectTrigger className="w-40 mr-2">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>

                  <SelectItem value="custommer">Customer</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="therapist">Skin Therapist</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.status || "all"}
                onValueChange={(value) => setFilters({ ...filters, status: value === "all" ? null : value })}
              >
                <SelectTrigger className="w-40 mr-2">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>

                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.sortOrder}
                onValueChange={(value) => setFilters({ ...filters, sortOrder: value as 'newest' | 'oldest' })}
              >
                <SelectTrigger className="w-40 mr-2">
                  <SelectValue placeholder="Sort by Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isOpen}
                onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700">
                    <UserPlus className="mr-2" /> Create User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username*
                      </Label>
                      <Input
                        id="username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className="col-span-3"
                        required
                      />
                    </div>
                   
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email*
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="col-span-3"
                        required
                      />
                    </div>
                   
                 
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role*
                      </Label>
                      <Select
                        value={newUser.role}

                        onValueChange={(value) => setNewUser({ ...newUser, role: value as AccountDetail['role'] })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>

                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                          <SelectItem value="skin_therapist">Skin Therapist</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button

                      onClick={handleCreateUser}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Create User
                    </Button>
                    <DialogClose asChild>
                      <button data-close="true" className="hidden">Close</button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full overflow-x-auto">
          <Table className="w-full table-fixed">
            <TableHeader className="bg-green-200 w-full">
              <TableRow>
                <TableHead >Expand</TableHead>
                <TableHead >Username</TableHead>
                <TableHead >Email</TableHead>
                <TableHead >Role</TableHead>
                <TableHead >Status</TableHead>
                <TableHead >Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers
                .filter((user) => user.role !== "admin")
                .map((user) => (
                  <>
                    <TableRow key={user.id} className="hover:bg-green-50">
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setExpandedUserId(expandedUserId === user.id ? null : user.id)}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${expandedUserId === user.id ? 'rotate-180' : 'null'}`} />
                        </Button>
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <span className={`
                        px-2 py-1 rounded-full text-xs 
                        ${user.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}
                      `}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (window.confirm("Bạn chắc bạn muốn xóa người dùng này chứ?")) {
                              handleSoftDelete(user.id);
                            }
                          }}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedUserId === user.id && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <div className="p-4 bg-green-50 grid grid-cols-2 gap-4">
                            <div>
                              <p><strong>Full Name:</strong> {user.fullname}</p>
                              <p><strong>Phone:</strong> {user.phone}</p>

                              <p><strong>Last Modified:</strong> {user.last_modified}</p>
                            </div>
                            <div>
                              <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
                              <p><strong>Created Time:</strong> {new Date(user.created_time).toLocaleString()}</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
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

interface ApiResponse {
  success: boolean;
  errorCode: string;
  message: string;
  data: {
    content: User[];
    itemAmount: number;
    pageSize: number;
    pageCount: number;
    currentPage: number;
  };
}

interface CreateUserResponse {
  success: boolean;
  errorCode: string;
  message: string;
  data: User;
}

interface DeleteUserResponse {
  success: boolean;
  errorCode: string;
  message: string;
}

const UserManagement: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingUser, setCreatingUser] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    pageCount: 1,
    itemAmount: 0
  });

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

  const fetchUsers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5062/api/account/list?page=${page}&page_size=${pageSize}`);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data: ApiResponse = await response.json();

      if (data.success) {
        setUsers(data.data.content);
        setPagination({
          currentPage: data.data.currentPage,
          pageSize: data.data.pageSize,
          pageCount: data.data.pageCount,
          itemAmount: data.data.itemAmount
        });
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    const requiredFields = ['username', 'email', 'role', 'password'];
    const missingFields = requiredFields.filter(field => !newUser[field as keyof typeof newUser]?.toString().trim());

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!validateEmail(newUser.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setCreatingUser(true);

    try {
      const userData = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role
      };

      const response = await fetch('http://localhost:5062/api/account/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: CreateUserResponse = await response.json();

      if (data.success) {
        alert('User created successfully!');

        fetchUsers(pagination.currentPage, pagination.pageSize);

        setNewUser({
          username: '',
          email: '',
          password: '12345678',
          role: 'customer'
        });

        setIsOpen(false);
      } else {
        alert(`Failed to create user: ${data.message}`);
      }
    } catch (err) {
      console.error('Error creating user:', err);
      alert(err instanceof Error ? err.message : 'An unknown error occurred while creating user');
    } finally {
      setCreatingUser(false);
    }
  };

  const handleSoftDelete = async (userId: string) => {
    setDeletingUser(true);
    try {
      const response = await fetch(`http://localhost:5062/api/account/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Delete request failed with status ${response.status}`);
      }

      const data: DeleteUserResponse = await response.json();

      if (data.success) {
        setUsers(users.map(user =>
          user.id === userId
            ? { ...user, status: 'deleted', last_modified: new Date().toISOString() }
            : user
        ));

        alert('User deleted successfully!');

        fetchUsers(pagination.currentPage, pagination.pageSize);
      } else {
        alert(`Failed to delete user: ${data.message}`);
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      alert(err instanceof Error ? err.message : 'An unknown error occurred while deleting user');
    } finally {
      setDeletingUser(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter(user =>
        user.status !== 'deleted' &&
        user.role !== 'admin'
      )
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

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= pagination.pageCount) {
      fetchUsers(newPage, pagination.pageSize);
    }
  };

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
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="skin_therapist">Skin Therapist</SelectItem>
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                      <Label htmlFor="password" className="text-right">
                        Password*
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
                        onValueChange={(value) => setNewUser({ ...newUser, role: value as User['role'] })}
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
                      disabled={creatingUser}
                    >
                      {creatingUser ? 'Creating...' : 'Create User'}
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
          {loading ? (
            <div className="text-center py-8">Loading users...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : (
            <>
              <Table className="w-full table-fixed">
                <TableHeader className="bg-green-200 w-full">
                  <TableRow>
                    <TableHead>Expand</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers
                    .filter((user) => user.role !== "admin")
                    .map((user) => (
                      <React.Fragment key={user.id}>
                        <TableRow className="hover:bg-green-50">
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setExpandedUserId(expandedUserId === user.id ? null : user.id)}
                            >
                              <ChevronDown className={`h-4 w-4 transition-transform ${expandedUserId === user.id ? 'rotate-180' : ''}`} />
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
                                if (window.confirm("Are you sure you want to delete this user?")) {
                                  handleSoftDelete(user.id);
                                }
                              }}
                              className="text-red-500 hover:bg-red-50"
                              disabled={deletingUser}
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
                                  <p><strong>Last Modified:</strong> {new Date(user.last_modified).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
                                  <p><strong>Created Time:</strong> {new Date(user.created_time).toLocaleString()}</p>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              {pagination.pageCount > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={page === pagination.currentPage ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.pageCount}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
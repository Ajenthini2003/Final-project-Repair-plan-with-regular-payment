import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import {
  Search,
  MoreVertical,
  Edit,
  Ban,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { toast } from 'sonner';

const mockUsers = [
  {
    id: 'U001',
    name: 'Pradeep Silva',
    email: 'pradeep@email.com',
    phone: '+94 77 123 4567',
    location: 'Colombo',
    plan: 'Premium',
    status: 'active',
    joinDate: '2025-11-15',
    totalBookings: 24,
  },
  {
    id: 'U002',
    name: 'Nishadi Fernando',
    email: 'nishadi@email.com',
    phone: '+94 71 234 5678',
    location: 'Kandy',
    plan: 'Standard',
    status: 'active',
    joinDate: '2025-12-01',
    totalBookings: 12,
  },
  {
    id: 'U003',
    name: 'Kasun Rajapaksa',
    email: 'kasun@email.com',
    phone: '+94 76 345 6789',
    location: 'Galle',
    plan: 'Basic',
    status: 'active',
    joinDate: '2026-01-10',
    totalBookings: 5,
  },
  {
    id: 'U004',
    name: 'Thilini Wickramasinghe',
    email: 'thilini@email.com',
    phone: '+94 70 456 7890',
    location: 'Colombo',
    plan: 'Standard',
    status: 'suspended',
    joinDate: '2025-10-20',
    totalBookings: 18,
  },
  {
    id: 'U005',
    name: 'Dilshan Mendis',
    email: 'dilshan@email.com',
    phone: '+94 77 567 8901',
    location: 'Negombo',
    plan: 'Premium',
    status: 'active',
    joinDate: '2025-09-05',
    totalBookings: 31,
  },
];

export default function UsersManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuspendUser = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
          : user
      )
    );
    toast.success('User status updated successfully');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
      toast.success('User updated successfully');
      setIsEditDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage customer accounts and subscriptions</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            Total Users: {users.length}
          </Badge>
          <Badge variant="outline" className="text-sm text-green-600">
            Active: {users.filter((u) => u.status === 'active').length}
          </Badge>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name, email, or user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    User ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Bookings
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">Joined: {user.joinDate}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-gray-700">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-700">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <MapPin className="w-3 h-3" />
                        {user.location}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          user.plan === 'Premium'
                            ? 'default'
                            : user.plan === 'Standard'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {user.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{user.totalBookings}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={user.status === 'active' ? 'default' : 'destructive'}
                        className={
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                            {user.status === 'active' ? (
                              <>
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend User
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Activate User
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={selectedUser.phone}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={selectedUser.location}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, location: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
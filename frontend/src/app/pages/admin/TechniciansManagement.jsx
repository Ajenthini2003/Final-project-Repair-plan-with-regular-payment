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
  Star,
  MapPin,
  Phone,
  Award,
  Calendar,
  Plus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { toast } from 'sonner';

const mockTechnicians = [
  {
    id: 'T001',
    name: 'Ravi Kumar',
    phone: '+94 77 111 2222',
    location: 'Colombo',
    specialization: ['Electrical', 'AC Service'],
    rating: 4.8,
    totalJobs: 156,
    availability: 'available',
    joinDate: '2024-08-15',
  },
  {
    id: 'T002',
    name: 'Anil Perera',
    phone: '+94 71 222 3333',
    location: 'Kandy',
    specialization: ['Plumbing', 'Appliances'],
    rating: 4.6,
    totalJobs: 142,
    availability: 'busy',
    joinDate: '2024-09-10',
  },
  {
    id: 'T003',
    name: 'Sunil Bandara',
    phone: '+94 76 333 4444',
    location: 'Galle',
    specialization: ['Electrical', 'Painting'],
    rating: 4.9,
    totalJobs: 187,
    availability: 'available',
    joinDate: '2024-07-20',
  },
  {
    id: 'T004',
    name: 'Chamara Dias',
    phone: '+94 70 444 5555',
    location: 'Colombo',
    specialization: ['Plumbing', 'Cleaning'],
    rating: 4.7,
    totalJobs: 124,
    availability: 'available',
    joinDate: '2024-10-05',
  },
  {
    id: 'T005',
    name: 'Lakmal Fernando',
    phone: '+94 77 555 6666',
    location: 'Negombo',
    specialization: ['Home Tech', 'Security'],
    rating: 4.5,
    totalJobs: 98,
    availability: 'off-duty',
    joinDate: '2024-11-12',
  },
];

export default function TechniciansManagement() {
  const [technicians, setTechnicians] = useState(mockTechnicians);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredTechnicians = technicians.filter(
    (tech) =>
      tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEditTechnician = (technician) => {
    setSelectedTechnician(technician);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedTechnician) {
      setTechnicians(
        technicians.map((t) => (t.id === selectedTechnician.id ? selectedTechnician : t))
      );
      toast.success('Technician updated successfully');
      setIsEditDialogOpen(false);
    }
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'off-duty':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Technician Management</h1>
          <p className="text-gray-600 mt-1">Manage service technicians and assignments</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Technician
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{technicians.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Technicians</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {technicians.filter((t) => t.availability === 'available').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">
                {technicians.filter((t) => t.availability === 'busy').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Busy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-600">
                {technicians.filter((t) => t.availability === 'off-duty').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Off Duty</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name, ID, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Technicians Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Technicians</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Tech ID
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
                    Specialization
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Rating
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Jobs
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Availability
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTechnicians.map((tech) => (
                  <tr key={tech.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{tech.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          Since {tech.joinDate}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Phone className="w-3 h-3" />
                        {tech.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <MapPin className="w-3 h-3" />
                        {tech.location}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {tech.specialization.map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">{tech.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Award className="w-3 h-3" />
                        {tech.totalJobs}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getAvailabilityColor(tech.availability)}>
                        {tech.availability}
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
                          <DropdownMenuItem onClick={() => handleEditTechnician(tech)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            View Schedule
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Technician</DialogTitle>
          </DialogHeader>
          {selectedTechnician && (
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={selectedTechnician.name}
                  onChange={(e) =>
                    setSelectedTechnician({ ...selectedTechnician, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={selectedTechnician.phone}
                  onChange={(e) =>
                    setSelectedTechnician({ ...selectedTechnician, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={selectedTechnician.location}
                  onChange={(e) =>
                    setSelectedTechnician({ ...selectedTechnician, location: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Availability</Label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedTechnician.availability}
                  onChange={(e) =>
                    setSelectedTechnician({
                      ...selectedTechnician,
                      availability: e.target.value,
                    })
                  }
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="off-duty">Off Duty</option>
                </select>
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
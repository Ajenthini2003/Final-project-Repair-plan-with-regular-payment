import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card'; 
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { toast } from 'sonner';

export default function Profile() {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  // Keep form in sync if user updates from elsewhere
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  }, [user]);

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      return toast.error("Name and email cannot be empty");
    }

    if (user) {
      setUser({ ...user, ...formData });
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      {/* Personal Info */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Personal Information</CardTitle>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="space-y-2">
            <Label>
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </Label>
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </Label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label>
              <MapPin className="w-4 h-4 inline mr-2" />
              Address
            </Label>
            <Input
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="flex gap-2 mt-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                Cancel
              </Button>
            </div>
          )}

        </CardContent>
      </Card>

      {/* Account Type */}
      <Card>
        <CardHeader>
          <CardTitle>Account Type</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">Current Role</p>
          <p className="text-sm text-gray-600 capitalize">{user?.role || "User"}</p>
        </CardContent>
      </Card>

    </div>
  );
}

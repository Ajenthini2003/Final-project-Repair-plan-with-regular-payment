import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Plus, Edit, Users, DollarSign, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const mockPlans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 2500,
    duration: 'month',
    activeUsers: 680,
    features: [
      'Up to 2 minor repairs per month',
      'Free inspection visits',
      'Standard response time (24-48 hours)',
      'Basic electrical & plumbing',
      '10% discount on parts',
    ],
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: 6500,
    duration: 'quarter',
    activeUsers: 420,
    features: [
      'Up to 5 repairs per quarter',
      'Free monthly inspection',
      'Priority response (12-24 hours)',
      'All electrical, plumbing & appliances',
      '20% discount on parts',
      'Emergency on-call support',
      '30-day repair warranty',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 22000,
    duration: 'year',
    activeUsers: 290,
    features: [
      'Unlimited minor repairs',
      'Up to 15 major service visits',
      'Emergency response (2-4 hours)',
      'All categories covered',
      'AC servicing (2x per year)',
      '30% discount on all parts',
      '90-day repair warranty',
      '24/7 priority support',
    ],
  },
];

export default function PlansManagement() {
  const [plans, setPlans] = useState(mockPlans);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedPlan) {
      setPlans(plans.map((p) => (p.id === selectedPlan.id ? selectedPlan : p)));
      toast.success('Plan updated successfully');
      setIsEditDialogOpen(false);
    }
  };

  const totalRevenue = plans.reduce((sum, plan) => {
    const monthlyPrice =
      plan.duration === 'month' ? plan.price : plan.duration === 'quarter' ? plan.price / 3 : plan.price / 12;
    return sum + monthlyPrice * plan.activeUsers;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Plan Management</h1>
          <p className="text-gray-600 mt-1">Create and manage subscription plans</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Plan
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{plans.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Plans</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">
                {plans.reduce((sum, p) => sum + p.activeUsers, 0)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Total Subscribers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                Rs. {(totalRevenue / 1000).toFixed(1)}K
              </p>
              <p className="text-sm text-gray-600 mt-1">Monthly Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    Rs. {plan.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-600">/{plan.duration}</span>
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleEditPlan(plan)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pb-4 border-b">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Subscribers</p>
                    <p className="font-semibold text-gray-900">{plan.activeUsers}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Revenue</p>
                    <p className="font-semibold text-gray-900">
                      Rs.{' '}
                      {(
                        (plan.duration === 'month'
                          ? plan.price
                          : plan.duration === 'quarter'
                          ? plan.price / 3
                          : plan.price / 12) * plan.activeUsers
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Features:</p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Plan Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <div className="space-y-4">
              <div>
                <Label>Plan Name</Label>
                <Input
                  value={selectedPlan.name}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Price (Rs.)</Label>
                <Input
                  type="number"
                  value={selectedPlan.price}
                  onChange={(e) =>
                    setSelectedPlan({ ...selectedPlan, price: parseFloat(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label>Duration</Label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedPlan.duration}
                  onChange={(e) =>
                    setSelectedPlan({ ...selectedPlan, duration: e.target.value })
                  }
                >
                  <option value="month">Month</option>
                  <option value="quarter">Quarter (3 months)</option>
                  <option value="year">Year</option>
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
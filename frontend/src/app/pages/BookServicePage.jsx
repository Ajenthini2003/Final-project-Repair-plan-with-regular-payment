import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../contexts/AppContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";


export  default function BookServicePage() {
  const { user, plans, subscribedPlans, addBooking } = useApp();
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [issue, setIssue] = useState('');

  const availablePlans = plans.filter((p) => subscribedPlans.includes(p.id));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPlan || !date || !time || !issue) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!user) {
      toast.error('Please login to book a service');
      return;
    }

    const booking = {
      userId: user.id,
      planId: selectedPlan,
      technicianId: 'tech-1', // Mock technician
      date,
      time,
      issue,
      status: 'pending',
    };

    addBooking(booking);
    toast.success('Service booked successfully!');
    navigate('/dashboard');
  };

  if (availablePlans.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Plans</CardTitle>
          <CardDescription>
            You need to subscribe to a plan before booking a service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/plans')}>Browse Plans</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Book a Repair Service</CardTitle>
          <CardDescription>
            Schedule a service appointment with our expert technicians
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="plan">Select Plan</Label>
              <select
                id="plan"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="">Choose a plan...</option>
                {availablePlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issue">Describe the Issue</Label>
              <Textarea
                id="issue"
                placeholder="Please describe what needs to be repaired..."
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Booking Information:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• A technician will be assigned to your booking</li>
                <li>• You will receive a confirmation notification</li>
                <li>• The technician will contact you before arrival</li>
                <li>• Service time may vary depending on the issue</li>
              </ul>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Confirm Booking
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

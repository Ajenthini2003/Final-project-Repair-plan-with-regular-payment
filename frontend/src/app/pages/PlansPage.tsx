import { useApp } from '@/app/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { CheckCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export function PlansPage() {
  const { plans, subscribedPlans, subscribeToPlan, unsubscribeFromPlan, user } = useApp();

  const handleSubscribe = (planId: string) => {
    if (!user) {
      toast.error('Please login to subscribe');
      return;
    }

    const isSubscribed = subscribedPlans.includes(planId);
    
    if (isSubscribed) {
      unsubscribeFromPlan(planId);
      toast.success('Unsubscribed successfully');
    } else {
      subscribeToPlan(planId);
      toast.success('Subscribed successfully!');
    }
  };

  const getDurationLabel = (duration: string) => {
    switch (duration) {
      case 'monthly':
        return 'per month';
      case 'quarterly':
        return 'per 3 months';
      case 'yearly':
        return 'per year';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3">Choose Your Repair Plan</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the perfect subscription plan for your needs. All plans include quality service and expert technicians.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const isSubscribed = subscribedPlans.includes(plan.id);
          const isPopular = index === 1;

          return (
            <Card
              key={plan.id}
              className={`relative ${
                isPopular ? 'border-blue-500 border-2 shadow-lg' : ''
              } ${isSubscribed ? 'ring-2 ring-green-500' : ''}`}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-4 py-1">
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    Most Popular
                  </Badge>
                </div>
              )}

              {isSubscribed && (
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="bg-green-500">
                    Active
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">Rs. {plan.price.toLocaleString()}</span>
                    <span className="text-gray-600">{getDurationLabel(plan.duration)}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full"
                  variant={isSubscribed ? 'outline' : 'default'}
                  disabled={!user}
                >
                  {isSubscribed ? 'Unsubscribe' : 'Subscribe Now'}
                </Button>

                {!user && (
                  <p className="text-xs text-center text-gray-500">
                    Login required to subscribe
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Features Section */}
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 border-none">
        <CardHeader>
          <CardTitle className="text-center">All Plans Include</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Verified and trained technicians',
              'Quality parts and materials',
              'Service guarantee',
              'Flexible scheduling',
              'Transparent pricing',
              'Easy payment options',
              'Service history tracking',
              'Priority customer support',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Can I cancel my subscription anytime?',
              a: 'Yes, you can cancel your subscription at any time. You will continue to have access until the end of your current billing period.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept credit/debit cards, online banking, and mobile wallets.',
            },
            {
              q: 'How quickly can a technician arrive?',
              a: 'For emergency services, we aim to have a technician at your location within 2-4 hours. Regular services can be scheduled at your convenience.',
            },
            {
              q: 'Are there any hidden fees?',
              a: 'No hidden fees! The subscription price covers all included services. Any additional parts or services outside your plan will be communicated upfront.',
            },
          ].map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
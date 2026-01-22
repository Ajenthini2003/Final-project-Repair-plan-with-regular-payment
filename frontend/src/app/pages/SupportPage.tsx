import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';
import { MessageCircle, Phone, Mail, HelpCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'How do I book a repair service?',
        a: 'Go to "Book Service" from the dashboard, select your plan, choose a date and time, describe the issue, and submit. A technician will be assigned to you.',
      },
      {
        q: 'What areas do you cover in Sri Lanka?',
        a: 'We provide services across all major cities including Colombo, Kandy, Galle, Jaffna, and surrounding areas. Contact us to check availability in your area.',
      },
    ],
  },
  {
    category: 'Plans & Pricing',
    questions: [
      {
        q: 'Can I cancel my subscription anytime?',
        a: 'Yes, you can cancel your subscription at any time. You will continue to have access until the end of your current billing period.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept credit/debit cards, eZ Cash, mCash, and bank transfers.',
      },
      {
        q: 'Is there a warranty on repairs?',
        a: 'Yes, all repairs come with a 30-day warranty. Premium plan members get extended 90-day warranty.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'How quickly can a technician arrive?',
        a: 'For emergency services, we aim to have a technician at your location within 2-4 hours. Regular services can be scheduled at your convenience.',
      },
      {
        q: 'Are technicians verified?',
        a: 'Yes, all our technicians are background-checked, trained, and certified.',
      },
    ],
  },
];

export function SupportPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Support ticket submitted! We will get back to you soon.');
    setSubject('');
    setMessage('');
    setEmail('');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/94771234567', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
        <p className="text-gray-600">Get help or contact our support team</p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleWhatsApp}>
          <CardContent className="pt-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm text-gray-600">Chat with us on WhatsApp</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-sm text-gray-600">+94 11 234 5678</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-gray-600">support@fixmate.lk</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Submit a Support Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="What do you need help with?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue in detail..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <CardTitle>Frequently Asked Questions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {faqs.map((category, catIdx) => (
            <div key={catIdx} className="mb-6 last:mb-0">
              <h3 className="font-semibold text-lg mb-3 text-blue-600">
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, idx) => (
                  <AccordionItem key={idx} value={`${catIdx}-${idx}`}>
                    <AccordionTrigger className="text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

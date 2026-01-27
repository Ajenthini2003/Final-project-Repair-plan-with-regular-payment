import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card'; // CardContent instead of CardBody
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion'; // ✅ named imports
import { MessageCircle, Phone, Mail, HelpCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
  {
    category: 'General',
    questions: [
      { q: 'How do I book a repair service?', a: 'Go to "Book Service" from the dashboard...' },
      { q: 'What areas do you cover in Sri Lanka?', a: 'We provide services across major cities...' },
    ],
  },
  {
    category: 'Plans & Pricing',
    questions: [
      { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel at any time...' },
      { q: 'What payment methods do you accept?', a: 'We accept credit/debit cards, eZ Cash...' },
      { q: 'Is there a warranty on repairs?', a: 'All repairs come with a 30-day warranty...' },
    ],
  },
  {
    category: 'Technical',
    questions: [
      { q: 'How quickly can a technician arrive?', a: 'For emergency services, we aim to arrive within 2-4 hours.' },
      { q: 'Are technicians verified?', a: 'Yes, all our technicians are background-checked, trained, and certified.' },
    ],
  },
];

export default function SupportPage() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Support ticket submitted! We will get back to you soon.');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/94771234567', '_blank');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
        <p className="text-gray-600">Get help or contact our support team</p>
      </div>

      {/* Quick Contact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition cursor-pointer" onClick={handleWhatsApp}>
          <CardContent className="text-center pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm text-gray-600">Chat with us on WhatsApp</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardContent className="text-center pt-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-sm text-gray-600">+94 11 234 5678</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardContent className="text-center pt-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                placeholder={user?.email || 'your@email.com'}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                value={subject}
                placeholder="What do you need help with?"
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                rows={5}
                value={message}
                placeholder="Describe your issue in detail..."
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full flex items-center justify-center">
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
              <h3 className="font-semibold text-lg mb-3 text-blue-600">{category.category}</h3>
              <Accordion type="single" collapsible>
                {category.questions.map((faq, idx) => (
                  <AccordionItem key={idx} value={`${catIdx}-${idx}`}>
                    <AccordionTrigger>{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.a}</AccordionContent>
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

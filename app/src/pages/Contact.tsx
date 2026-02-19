import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiCheck } from 'react-icons/fi';
import { SectionTitle } from '@/components/common/SectionTitle';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Animate success message
    if (successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Us',
      details: ['123 Fashion Avenue', 'New York, NY 10001']
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: ['+1 (234) 567-890', 'Mon-Fri, 9am-6pm EST']
    },
    {
      icon: FiMail,
      title: 'Email Us',
      details: ['hello@noiratelier.com', 'support@noiratelier.com']
    },
    {
      icon: FiClock,
      title: 'Working Hours',
      details: ['Monday - Friday: 9am - 6pm', 'Saturday: 10am - 4pm']
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-32 section-padding">
        <div 
          ref={successRef}
          className="max-w-xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-600" size={40} />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl mb-4">
            Message Sent!
          </h1>
          
          <p className="text-[var(--noir-gray)] mb-8">
            Thank you for reaching out. We've received your message and will get back to you 
            within 24-48 hours.
          </p>
          
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', subject: '', message: '' });
            }}
            className="btn-primary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="section-padding py-12 border-b border-[var(--noir-border)]">
        <SectionTitle 
          title="Get in Touch" 
          subtitle="Contact Us"
        />
        <p className="text-center text-[var(--noir-gray)] max-w-2xl mx-auto mt-4">
          We'd love to hear from you. Whether you have a question about our products, 
          need styling advice, or just want to say hello, our team is here to help.
        </p>
      </div>

      {/* Contact Info Cards */}
      <section className="section-padding section-y bg-[var(--noir-cream)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info) => (
            <div 
              key={info.title}
              className="bg-white p-6 text-center"
            >
              <info.icon className="mx-auto mb-4 text-[var(--noir-gray)]" size={28} />
              <h3 className="font-medium mb-2">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-sm text-[var(--noir-gray)]">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding section-y">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl mb-6">
              Send Us a Message
            </h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-luxury ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-luxury ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`input-luxury ${errors.subject ? 'border-red-500' : ''}`}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="returns">Returns & Exchanges</option>
                  <option value="product">Product Information</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`input-luxury resize-none ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="How can we help you?"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map Placeholder */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl mb-6">
              Visit Our Studio
            </h2>
            
            <div className="aspect-[4/3] bg-[var(--noir-light-gray)] relative overflow-hidden">
              {/* Map Image */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Map location"
                className="w-full h-full object-cover"
              />
              
              {/* Location Pin Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--noir-black)] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <FiMapPin className="text-white" size={24} />
                  </div>
                  <div className="bg-white px-4 py-2 shadow-lg">
                    <p className="font-medium text-sm">NOIR ATELIER</p>
                    <p className="text-xs text-[var(--noir-gray)]">123 Fashion Avenue</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-[var(--noir-cream)]">
              <h3 className="font-medium mb-2">Showroom Hours</h3>
              <p className="text-sm text-[var(--noir-gray)]">
                Our New York showroom is open for private appointments. 
                Schedule a visit to experience our collection in person.
              </p>
              <button className="mt-4 text-sm font-medium underline hover:text-[var(--noir-gray)] transition-colors">
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-padding section-y border-t border-[var(--noir-border)]">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--noir-gray)] mb-6">
            Find quick answers to common questions about shipping, returns, sizing, and more.
          </p>
          <Link to="/faq" className="btn-outline">
            View FAQs
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Contact;

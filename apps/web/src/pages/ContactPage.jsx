import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Twitter, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/davivinicius/',
      color: 'hover:text-blue-500',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/davi1710231',
      color: 'hover:text-gray-400',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:davivinicius1710@gmail.com',
      color: 'hover:text-red-500',
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.errors.nameReq');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailReq');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInv');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.msgReq');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: t('contact.errors.valTitle'),
        description: t('contact.errors.valDesc'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      // Store in localStorage
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

      toast({
        title: t('contact.success.title'),
        description: t('contact.success.desc'),
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.metaTitle')}</title>
        <meta name="description" content={t('contact.metaDesc')} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                {t('contact.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      {t('contact.formTitle')}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Field */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">
                          {t('contact.nameLabel')}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t('contact.namePlaceholder')}
                          className={`bg-background border-border text-foreground placeholder:text-muted-foreground ${
                            errors.name ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          {t('contact.emailLabel')}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t('contact.emailPlaceholder')}
                          className={`bg-background border-border text-foreground placeholder:text-muted-foreground ${
                            errors.email ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">
                          {t('contact.messageLabel')}
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t('contact.messagePlaceholder')}
                          rows={6}
                          className={`bg-background border-border text-foreground placeholder:text-muted-foreground resize-none ${
                            errors.message ? 'border-red-500' : ''
                          }`}
                        />
                        {errors.message && (
                          <p className="text-sm text-red-500">{errors.message}</p>
                        )}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
                      >
                        {isSubmitting ? (
                          <>
                            <CheckCircle className="w-5 h-5 mr-2 animate-spin" />
                            {t('contact.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {t('contact.send')}
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-8"
                >
                  {/* Social Links */}
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      {t('contact.connectTitle')}
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.href}
                            {...(social.href.startsWith('mailto:') ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                            className={`flex flex-col items-center justify-center p-6 bg-background border border-border rounded-xl hover:border-primary transition-all group ${social.color}`}
                          >
                            <Icon className="w-8 h-8 mb-3 text-foreground group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-foreground">
                              {social.name}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {t('contact.collabTitle')}
                    </h2>
                    <p className="text-foreground leading-relaxed mb-4">
                      {t('contact.collabP1')}
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {t('contact.collabP2')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
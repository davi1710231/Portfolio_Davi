import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const ExperiencePage = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      id: 1,
      role: t('experience.items.e1.role'),
      company: t('experience.items.e1.company'),
      duration: t('experience.items.e1.duration'),
      description: t('experience.items.e1.description'),
      icon: Briefcase,
      color: 'from-cyan-500 to-blue-500',
      highlights: t('experience.items.e1.highlights'),
    },
    {
      id: 2,
      role: t('experience.items.e2.role'),
      company: t('experience.items.e2.company'),
      duration: t('experience.items.e2.duration'),
      description: t('experience.items.e2.description'),
      icon: Code,
      color: 'from-emerald-500 to-teal-500',
      highlights: t('experience.items.e2.highlights'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('experience.metaTitle')}</title>
        <meta name="description" content={t('experience.metaDesc')} />
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
                {t('experience.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('experience.subtitle')}
              </p>
            </motion.div>

            {/* Experience Cards */}
            <div className="max-w-5xl mx-auto space-y-8">
              {experiences.map((exp, index) => {
                const Icon = exp.icon;
                return (
                  <motion.div
                    key={exp.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    whileHover={{
                      y: -4,
                      boxShadow: '0 20px 40px -12px rgba(0,0,0,0.25)',
                      transition: { duration: 0.2 },
                    }}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/60 transition-colors group cursor-default"
                  >
                    {/* Gradient Header bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${exp.color}`} />

                    <div className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0 mb-4 md:mb-0 shadow-lg`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1">
                          {/* Role and Company */}
                          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {exp.role}
                          </h3>
                          <p className="text-lg font-semibold text-primary mb-2">
                            {exp.company}
                          </p>
                          <p className="text-muted-foreground mb-4 text-sm">
                            {exp.duration}
                          </p>

                          {/* Description */}
                          <p className="text-foreground leading-relaxed mb-6">
                            {exp.description}
                          </p>

                          {/* Highlights */}
                          <div className="space-y-2">
                            <span className="text-sm font-semibold text-foreground block mb-3">
                              {t('experience.highlights')}
                            </span>
                            <ul className="space-y-2">
                              {Array.isArray(exp.highlights) && exp.highlights.map((highlight, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: index * 0.1 + idx * 0.06 + 0.3 }}
                                  className="flex items-start space-x-3"
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${exp.color} mt-2 flex-shrink-0`} />
                                  <span className="text-foreground">{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ExperiencePage;

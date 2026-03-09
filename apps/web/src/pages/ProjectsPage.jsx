import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useLanguage } from '@/context/LanguageContext.jsx';

const ProjectsPage = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: t('projects.items.p1.title'),
      description: t('projects.items.p1.description'),
      date: t('projects.items.p1.date'),
      technologies: t('projects.items.p1.technologies'),
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 2,
      title: t('projects.items.p2.title'),
      description: t('projects.items.p2.description'),
      date: t('projects.items.p2.date'),
      technologies: t('projects.items.p2.technologies'),
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 3,
      title: t('projects.items.p3.title'),
      description: t('projects.items.p3.description'),
      date: t('projects.items.p3.date'),
      technologies: t('projects.items.p3.technologies'),
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('projects.metaTitle')}</title>
        <meta name="description" content={t('projects.metaDesc')} />
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
                {t('projects.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('projects.subtitle')}
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block"></div>

                {/* Projects */}
                <div className="space-y-12">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background hidden md:block z-10"></div>

                      {/* Project Card */}
                      <div className="md:ml-20 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-all group">
                        <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                        <div className="p-8">
                          {/* Date Badge */}
                          <div className="flex items-center space-x-2 mb-4">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">
                              {project.date}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-foreground leading-relaxed mb-6">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {Array.isArray(project.technologies) && project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <Button
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary hover:text-white"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              {t('projects.sourceCode')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectsPage;
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, LogInIcon, UserPlusIcon } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from 'react-router-dom';

const CommenHomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  const carouselImages = [
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1476&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 transition-all duration-300">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/50 dark:bg-gray-900/50 border-b">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            RP2 - Rounded Professional Programme
          </div>
          <div className="flex items-center gap-4">
            
            <Link to="/auth">
            <Button 
              variant="ghost" 
              className="hover:scale-105 transition-transform bg-gradient-to-r from-gray-400 to-gray-700 hover:from-gray-700 hover:to-gray-400 text-white"
            >
              <LogInIcon className="mr-2 h-4 w-4" /> Login
            </Button>
            </Link>
            <Button 
              className="bg-gradient-to-r from-gray-400 to-gray-700 hover:from-gray-700 hover:to-gray-400 text-white hover:scale-105 transition-transform"
            >
              <UserPlusIcon className="mr-2 h-4 w-4" /> Register
            </Button>
             <Button className= "border-2 bg-gradient-to-r from-gray-400 to-gray-700 hover:from-gray-700 hover:to-gray-400 text-white hover:scale-105 transition-transform" variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-24">
        <section className="text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
            Welcome to RP2
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Empowering professionals through comprehensive, industry-aligned training
          </p>
        </section>

        <section className="space-y-8 animate-fade-in">
          <h2 className="text-3xl font-semibold text-center">Our Courses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Data Science",
                description: "Comprehensive program covering data analysis, machine learning, and statistical modeling."
              },
              {
                title: "Data Analyst",
                description: "Learn to transform data into actionable insights using advanced analytical tools."
              },
              {
                title: "MERN Stack",
                description: "Master MongoDB, Express.js, React, and Node.js for full-stack web development."
              }
            ].map((course, index) => (
              <Card key={index} className="hover:scale-105 transition-transform duration-300 bg-white/50 backdrop-blur-sm border dark:bg-gray-800/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{course.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8 animate-fade-in">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Success Stories</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="border-0 shadow-none">
                    <CardContent className="flex aspect-video items-center justify-center p-6">
                      <img 
                        src={image} 
                        alt={`Success story ${index + 1}`} 
                        className="rounded-lg object-cover w-full h-full shadow-lg hover:scale-105 transition-all duration-300"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hover:scale-105 transition-transform" />
            <CarouselNext className="hover:scale-105 transition-transform" />
          </Carousel>
        </section>

        <section className="text-center space-y-6 animate-fade-in">
          <h2 className="text-3xl font-semibold">About RP2</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            RP2 program is all about helping you land the job of your dreams. There is a huge gap between what you have learned in classrooms and what IT hiring managers expect of you to be successful in a job. We have designed the RP2 program keeping just this in mind. 
          </p>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 mt-4">
            RP2 is not a classroom training program. You will gain real-life professional experience and acquire the necessary skills (technical and non-technical) through hands-on projects. RP2 program will focus on four mainstays designed to address skillset gaps in a holistic manner.
          </p>
        </section>

        <section className="text-center space-y-6 animate-fade-in bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-8">
          <h2 className="text-3xl font-semibold">Part of iDatalytics</h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            RP2 is a child company of iDatalytics, a full-service technology consulting and solutions firm. As a certified WBE and MBE business, iDatalytics serves clients ranging from mid-size companies to large, multinational enterprises.
          </p>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            iDatalytics is an Equal Opportunity Employer and a certified E-Verify employer, dedicated to being a partner of choice to clients and an employer of choice to associates.
          </p>
          <a 
            href="https://www.idatalytics.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Visit iDatalytics Website →
          </a>
        </section>
      </main>

      <footer className="border-t bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg mt-24">
        <div className="container mx-auto p-4 text-center text-gray-600 dark:text-gray-400">
          © 2024 RP2 - Rounded Professional Programme
        </div>
      </footer>
    </div>
  );
};

export default CommenHomePage;

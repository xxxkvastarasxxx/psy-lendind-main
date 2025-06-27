"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Play,
  CheckCircle,
  Heart,
  Brain,
  MessageCircle,
  Sparkles,
  Target,
  AlertTriangle,
  Users,
  Shield,
  Star,
  Award,
  Lightbulb,
  TrendingUp,
  Eye,
  Search,
  Clock,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SparkleEffects } from "@/components/ui/sparkle-effects";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";

const fadeInUp = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { redirectToCheckout, loading } = useStripeCheckout();

  // Function to scroll to pricing section
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle video playback when isVideoPlaying state changes
  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current
        .play()
        .catch((error: Error) => console.error("Video play failed:", error));
    }
  }, [isVideoPlaying]);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "Подходит ли курс, если измена произошла давно?",
      answer:
        "Да, курс эффективен независимо от того, когда произошла измена. Травма от предательства может влиять на вас годами, и техники курса помогут проработать как свежие, так и застарелые эмоциональные раны.",
    },
    {
      question: "Что если я не уверена, была ли измена?",
      answer:
        "Курс поможет и в ситуации неопределенности. Вы получите инструменты для создания 'пространства правды', которые позволят прояснить ситуацию без разрушительных конфронтаций.",
    },
    {
      question: "Поможет ли курс сохранить отношения?",
      answer:
        "Курс не гарантирует сохранение отношений, но дает вам инструменты для принятия осознанного решения. Некоторые выпускницы восстанавливают отношения, другие находят силы для нового начала. Главное — вы будете действовать из позиции силы, а не страха.",
    },
    {
      question: "Сколько времени нужно уделять курсу?",
      answer:
        "Рекомендуется 1-2 часа в неделю на изучение материалов и выполнение упражнений. Курс можно проходить в своем темпе, доступ к материалам остается навсегда.",
    },
    {
      question: "Что если партнер узнает о курсе?",
      answer:
        "Курс полностью конфиденциален. Вы можете изучать материалы в удобное время, а техники применять естественно, без привлечения внимания. Многие клиентки отмечают, что партнеры замечают позитивные изменения, но не понимают их источник.",
    },
    {
      question: "Есть ли гарантия результата?",
      answer:
        "Мы гарантируем качество материалов и их практическую применимость. Если в течение 14 дней вы поймете, что курс вам не подходит, мы вернем деньги без вопросов.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
              "radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.15) 0%, transparent 60%)",
              "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
              "radial-gradient(circle at 60% 30%, rgba(37, 99, 235, 0.12) 0%, transparent 60%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)",
            ],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating mesh gradients */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(96, 165, 250, 0.1) 50%, transparent 100%)",
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)",
            filter: "blur(50px)",
          }}
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      {/* Sparkle effects */}
      <SparkleEffects count={15} />

      {/* Geometric shapes */}
      <motion.div
        className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-primary/20"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        animate={{
          rotate: [0, -360],
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: 5,
        }}
      />

      {/* Light rays */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        animate={{
          opacity: [0, 0.5, 0],
          scaleY: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
        animate={{
          opacity: [0, 0.4, 0],
          scaleY: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Hero Section - Full Screen */}
      <motion.section
        className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-4 overflow-hidden"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Wave SVG Background */}
        <div className="absolute bottom-0 left-0 w-full h-20 sm:h-28 md:h-32 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ transform: "translateY(1px)" }}
          >
            <motion.path
              d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
              fill="rgba(59, 130, 246, 0.15)"
              animate={{
                d: [
                  "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
                  "M0,80 C300,20 600,100 900,40 C1050,10 1150,80 1200,50 L1200,120 L0,120 Z",
                  "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 12,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M0,80 C300,40 600,120 900,80 C1050,50 1150,100 1200,70 L1200,120 L0,120 Z"
              fill="rgba(96, 165, 250, 0.1)"
              animate={{
                d: [
                  "M0,80 C300,40 600,120 900,80 C1050,50 1150,100 1200,70 L1200,120 L0,120 Z",
                  "M0,50 C300,100 600,30 900,90 C1050,120 1150,40 1200,80 L1200,120 L0,120 Z",
                  "M0,80 C300,40 600,120 900,80 C1050,50 1150,100 1200,70 L1200,120 L0,120 Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 15,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 py-4 sm:py-2">
          <motion.div variants={fadeInUp} className="mb-4 sm:mb-4 md:mb-6">
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-3 sm:mb-2 md:mb-3 leading-tight px-1">
              Скорая помощь
              <span className="block text-primary/70 font-normal mt-1 sm:mt-1 md:mt-2">
                при измене
              </span>
            </h1>
            <p className="text-base sm:text-base md:text-lg text-primary/80 max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-4 mt-3 sm:mt-2">
              Пошаговое руководство после измены партнера для женщин, которые
              хотят справиться с болью и принять решение, о котором не придется
              жалеть.
            </p>
          </motion.div>

          {/* Enhanced Floating elements */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-secondary/25 rounded-full blur-xl"
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-40 right-10 w-40 h-40 bg-muted/15 rounded-full blur-3xl"
            animate={{
              y: [0, 20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              delay: 3,
            }}
          />

          <motion.div variants={fadeInUp} className="mb-5 sm:mb-6 px-0 sm:px-2">
            <div className="relative max-w-lg sm:max-w-xl md:max-w-2xl mx-auto rounded-lg sm:rounded-xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl bg-white/30 backdrop-blur-sm border border-primary/20">
              <div className="aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                {!isVideoPlaying ? (
                  <>
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      poster="/image.png"
                      preload="metadata"
                    >
                      <source src="/my_video.mp4" type="video/mp4" />
                      Ваш браузер не поддерживает видео.
                    </video>
                    <motion.button
                      onClick={() => setIsVideoPlaying(true)}
                      className="group flex items-center justify-center w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-700 relative z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary ml-1 group-hover:text-primary/80" />
                    </motion.button>
                  </>
                ) : (
                  <video
                    className="w-full h-full object-cover"
                    ref={videoRef}
                    controls
                    playsInline
                    autoPlay
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src="/my_video.mp4" type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                  </video>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-5 sm:mb-4 md:mb-6">
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6 text-primary/70">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 bg-primary rounded-full"></div>
                <span className="text-sm sm:text-sm font-medium">25 лет опыта</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 bg-secondary rounded-full"></div>
                <span className="text-sm sm:text-sm font-medium">1000+ женщин</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 sm:w-2.5 sm:h-2.5 bg-muted rounded-full"></div>
                <span className="text-sm sm:text-sm font-medium">Научный подход</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <motion.button
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-7 sm:px-8 py-3 sm:py-3 rounded-full text-base sm:text-base font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-700 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToPricing}
            >
              НАЧАТЬ ВОССТАНОВЛЕНИЕ СЕЙЧАС
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Chaos Section */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(239, 246, 255, 0.8) 0%, 
            rgba(219, 234, 254, 0.9) 50%, 
            rgba(191, 219, 254, 0.8) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Внутри вас сейчас хаос
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8 sm:mb-12"></div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="space-y-6 sm:space-y-8 text-center"
          >
            <p className="text-lg sm:text-xl text-primary/80 leading-relaxed max-w-3xl mx-auto">
              Вы узнали об измене партнера. И мир, который казался надежным и
              понятным, разлетелся на осколки.
            </p>
            <p className="text-lg sm:text-xl text-primary/80 leading-relaxed max-w-3xl mx-auto">
              Но самое страшное — не сам факт измены, а то, в кого мы после нее
              превращаемся:
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 sm:mt-16">
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  text: "Женщину с токсичными мыслями, которые крутятся в голове без остановки",
                  icon: Brain,
                },
                {
                  text: "Женщину, которая чувствует себя нежеланной, брошенной, преданной. С низкой самооценкой",
                  icon: Heart,
                },
                {
                  text: "Женщину, которая теряет сон, аппетит и саму себя",
                  icon: AlertTriangle,
                },
                {
                  text: "Женщину, которая раскачивается от ненависти до отчаянного желания все вернуть",
                  icon: TrendingUp,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-lg"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-4 h-4 text-primary/70" />
                    </div>
                    <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Doubts Section */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(96, 165, 250, 0.15) 50%, 
            rgba(59, 130, 246, 0.1) 100%)`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-lg sm:text-xl text-primary/80 leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12">
              После измены партнера сомнения атакуют вас с двух сторон:
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              variants={fadeInUp}
              className="bg-white/80 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-primary/20 shadow-xl"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-xl sm:text-2xl font-light text-primary mb-6 sm:mb-8 text-center">
                Сомнения в партнере:
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    text: "Говорит ли он правду о том, что произошло?",
                    icon: Search,
                  },
                  {
                    text: "Действительно ли он сожалеет или просто боится последствий?",
                    icon: Eye,
                  },
                  {
                    text: "Можно ли верить его обещаниям, что это больше не повторится?",
                    icon: Shield,
                  },
                  {
                    text: "Что происходит, когда он не отвечает на звонки или задерживается?",
                    icon: Clock,
                  },
                ].map((doubt, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <doubt.icon className="w-3 h-3 text-primary/70" />
                    </div>
                    <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                      {doubt.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white/80 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-primary/20 shadow-xl"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-xl sm:text-2xl font-light text-primary mb-6 sm:mb-8 text-center">
                И что еще более разрушительно — сомнения в себе:
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {[
                  {
                    text: "Почему я не заметила? Неужели я настолько слепа?",
                    icon: AlertTriangle,
                  },
                  {
                    text: "Что со мной не так, если он искал другую?",
                    icon: HelpCircle,
                  },
                  {
                    text: "Если я в этом не разобралась, могу ли я доверять своей интуиции?",
                    icon: Brain,
                  },
                  {
                    text: "Стоит ли пытаться сохранить отношения или это потеря времени?",
                    icon: Target,
                  },
                ].map((doubt, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <doubt.icon className="w-3 h-3 text-secondary" />
                    </div>
                    <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                      {doubt.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-secondary/50 to-muted/50 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-primary/20 shadow-lg">
              <p className="text-base sm:text-lg text-primary/80 leading-relaxed max-w-4xl mx-auto mb-6">
                Эта неопределенность парализует. Она превращает каждый день в
                мучительное зависание между противоречивыми импульсами:
                уйти/остаться, простить/наказать, верить/контролировать.
              </p>
              <p className="text-base sm:text-lg text-primary/80 leading-relaxed max-w-4xl mx-auto mb-6">
                При этом рядом нет никого, кто мог бы дать четкие,
                структурированные ответы. Друзья и родные будут советовать из
                собственного опыта, который может кардинально отличаться от
                вашей ситуации.
              </p>
              <p className="text-base sm:text-lg text-primary/80 leading-relaxed max-w-4xl mx-auto">
                В результате вы оказываетесь в информационном вакууме в момент,
                когда больше всего нуждаетесь в ясности и понимании.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Consequences Section */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(239, 246, 255, 0.8) 0%, 
            rgba(219, 234, 254, 0.9) 50%, 
            rgba(191, 219, 254, 0.8) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <p className="text-lg sm:text-xl text-primary/80 leading-relaxed max-w-3xl mx-auto mb-8">
              Женщины, которые не получают квалифицированной помощи, часто
              совершают непоправимые ошибки:
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
            {[
              {
                text: "Превращаются в домашнего прокурора и следователя, разрушая последние шансы на восстановление отношений",
                icon: Search,
              },
              {
                text: "Теряют самоуважение, пытаясь удержать партнера любой ценой",
                icon: TrendingUp,
              },
              {
                text: "Принимают решения из страха и боли, о которых потом жалеют годами",
                icon: AlertTriangle,
              },
              {
                text: "Переносят травму во все последующие отношения, даже если решаются начать новую жизнь",
                icon: Heart,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-lg"
                variants={fadeInUp}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4 min-h-[40px]">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <p className="text-primary/80 leading-relaxed text-sm sm:text-base my-auto">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <p className="text-lg sm:text-xl text-primary/80 leading-relaxed font-medium">
              И если вы сейчас именно там — внутри этой боли — этот курс поможет
              вам выбраться.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Course Structure */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(96, 165, 250, 0.15) 50%, 
            rgba(59, 130, 246, 0.1) 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Курс состоит из пяти трансформационных модулей
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <div className="space-y-8 sm:space-y-12">
            {[
              {
                title: "Модуль 1: Защита от тревоги и саморазрушения",
                benefits: [
                  "Способность останавливать деструктивные мысли, которые сейчас крутятся в голове против вашей воли",
                  "Восстановление ясности мышления и способности концентрироваться на работе и других аспектах жизни",
                  "Вы вернете контроль над своим внутренним миром вместо того, чтобы быть заложницей разрушительных образов и догадок",
                ],
                icon: Brain,
                color: "from-blue-600 via-blue-700 to-blue-800",
              },
              {
                title: "Модуль 2: «Скандалы не работают. А что работает?»",
                benefits: [
                  "Детальный анализ 7 поведенческих паттернов, которые отталкивают партнера и усугубляют ситуацию после измены",
                  "Конкретные стратегии сохранения достоинства в самых болезненных и провокационных ситуациях",
                  "Вы будете контролировать ситуацию вместо того, чтобы эмоции контролировали вас",
                  "Вы прекратите совершать действия, о которых потом жалеете и которые разрушают ваше самоуважение",
                ],
                icon: MessageCircle,
                color: "from-indigo-600 via-indigo-700 to-blue-700",
              },
              {
                title:
                  "Модуль 3: Главный принцип, который позволит вам управлять отношениями",
                benefits: [
                  'Протокол создания "пространства правды" — коммуникационной среды, в которой партнер сам захочет быть честным без манипуляций и давления',
                  "Вы получите истинную картину произошедшего без изматывающих допросов и проверок",
                  'Технику "Глубинного интервью" для выявления истинных потребностей партнера (и ваших собственных)',
                  'Методику формирования "общего языка пары", позволяющую избегать недопонимания и конфликтов в будущем',
                ],
                icon: Heart,
                color: "from-cyan-600 via-blue-600 to-indigo-700",
              },
              {
                title:
                  "Модуль 4: Реконструкция самооценки чувства собственной ценности",
                benefits: [
                  "Инвентаризацию личного капитала — методику восстановления контакта с собственной уникальностью и ценностью",
                  "Вы вернете себе ощущение привлекательности, разрушенное изменой",
                  "Вы откроете новые женские роли, о которых раньше не догадывались",
                  "Техники для восстановления и усиления своей сексуальной привлекательности",
                ],
                icon: Sparkles,
                color: "from-blue-700 via-indigo-600 to-purple-600",
              },
              {
                title: "Модуль 5: План БУДУЩЕГО",
                benefits: [
                  "Пошаговую систему для объективной оценки перспектив отношений на основе конкретных критериев",
                  "Вы примете решение о будущем отношений из позиции силы, а не страха или отчаяния",
                  "Вы создадите чёткое видение своего будущего вместо неопределенности и тревоги",
                ],
                icon: Target,
                color: "from-indigo-700 via-blue-600 to-cyan-600",
              },
            ].map((module, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-700"
                whileHover={{ scale: 1.01, y: -8 }}
              >
                <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-light text-primary mb-4 sm:mb-6">
                      {module.title}
                    </h3>
                    <h4 className="text-base sm:text-lg font-medium text-primary/80 mb-3 sm:mb-4">
                      Что вы получите:
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      {module.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle className="w-4 h-4 text-primary/70" />
                          </div>
                          <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                            {benefit}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Results Section */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(239, 246, 255, 0.9) 0%, 
            rgba(219, 234, 254, 0.95) 50%, 
            rgba(191, 219, 254, 0.9) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Гарантированные результаты для вас
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
            {[
              {
                title: "Эмоциональная свобода:",
                text: "Вы освободитесь от навязчивых мыслей, обретете спокойствие и ясность мышления",
                icon: Brain,
              },
              {
                title: "Личная сила:",
                text: "Вы восстановите самооценку и уверенность в себе независимо от действий партнера",
                icon: Star,
              },
              {
                title: "Стратегическая ясность:",
                text: "Вы получите инструменты для управления отношениями",
                icon: Target,
              },
              {
                title: "Коммуникационное мастерство:",
                text: "Вы научитесь вести сложные разговоры с достоинством и эффективностью",
                icon: MessageCircle,
              },
              {
                title: "Личностная трансформация:",
                text: "Вы превратите кризис в возможность усилить личную гравитацию",
                icon: Sparkles,
              },
            ].map((result, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-lg"
                variants={fadeInUp}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <result.icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-primary mb-2">
                      {result.title}
                    </h3>
                    <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                      {result.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Imagine Section */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(96, 165, 250, 0.2) 50%, 
            rgba(59, 130, 246, 0.15) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Представьте, как вы:
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
            {[
              {
                text: "Смотрите в зеркало и видите женщину, которую хотят",
                icon: Eye,
              },
              {
                text: "Ведете разговор с партнером из позиции внутренней уверенности, а не отчаяния или гнева",
                icon: MessageCircle,
              },
              {
                text: "Принимаете решения о своем будущем не из страха одиночества, а из глубокого понимания своих истинных желаний",
                icon: Target,
              },
              {
                text: "Обнаруживаете в себе энергию, магнетизм и жизненную силу, которых раньше не замечали",
                icon: Sparkles,
              },
              {
                text: "Оглядываетесь назад и понимаете, что этот кризис стал катализатором самого важного роста в вашей жизни",
                icon: TrendingUp,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-lg"
                variants={fadeInUp}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4 min-h-[40px]">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <p className="text-primary/80 leading-relaxed text-sm sm:text-base my-auto">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <p className="text-lg sm:text-xl text-primary/80 leading-relaxed font-medium">
              Это не фантазия. Это реальные результаты, которых достигли
              выпускницы программы "СКОРАЯ ПОМОЩЬ ПРИ ИЗМЕНЕ".
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Unique Section */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(239, 246, 255, 0.9) 0%, 
            rgba(219, 234, 254, 0.95) 50%, 
            rgba(191, 219, 254, 0.9) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Что делает "Скорую помощь" уникальной:
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8">
            {[
              {
                title: "Научная основа:",
                text: "Программа опирается на современные исследования в области неврологии травмы, когнитивной психологии и психологии отношений",
                icon: Lightbulb,
              },
              {
                title: "Практическая эффективность:",
                text: "Каждая техника проверена на практике с сотнями реальных клиенток и дает конкретные, измеримые результаты",
                icon: Award,
              },
              {
                title: "Целостный подход:",
                text: "Программа работает одновременно на эмоциональном, когнитивном, поведенческом и физиологическом уровнях",
                icon: Target,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-lg"
                variants={fadeInUp}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <item.icon className="w-4 h-4 text-primary/70" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12">
            <div className="bg-gradient-to-r from-secondary/50 to-muted/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-primary/20">
              <p className="text-base sm:text-lg text-primary/80 leading-relaxed text-center">
                В отличие от общих психологических программ или книг по
                самопомощи, мини-курс "Скорая помощь при измене" создан
                специально для женщин, переживающих измену партнера. Методика
                учитывает все нюансы этой специфической травмы и предлагает не
                абстрактные советы, а конкретные, пошаговые протоколы
                восстановления влияния и ясности.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="py-16 sm:py-24 px-4 sm:px-6 relative"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(239, 246, 255, 0.8) 0%, 
            rgba(219, 234, 254, 0.9) 50%, 
            rgba(191, 219, 254, 0.8) 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Что говорят женщины
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-xl text-primary/80 max-w-3xl mx-auto">
              Реальные истории женщин, которые прошли через измену и нашли свой путь к исцелению
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Анна, 34 года",
                text: "После курса я поняла, что измена партнера — это не приговор моей женственности. Я научилась управлять своими эмоциями и принимать решения из позиции силы, а не отчаяния.",
                rating: 5,
                situation: "Сохранила отношения",
                avatar: "/first_testimo.jpg"
              },
              {
                name: "Мария, 28 лет", 
                text: "Самое ценное — это техники работы с тревогой. Раньше я не могла ни на чем сосредоточиться, постоянно прокручивала в голове болезненные сценарии. Теперь у меня есть инструменты контроля.",
                rating: 5,
                situation: "Новые отношения",
                avatar: "/second_testimo.jpg"
              },
              {
                name: "Елена, 42 года",
                text: "Курс помог мне понять настоящие причины измены и то, как восстановить доверие. Мы с мужем не только сохранили семью, но и вышли на новый уровень близости.",
                rating: 5,
                situation: "Восстановили семью",
                avatar: "/third_testimo.jpg"
              },
              {
                name: "Ольга, 31 год",
                text: "Я благодарна за модуль о самооценке. Измена разрушила мою уверенность, но курс показал, как вернуть ощущение собственной ценности и привлекательности.",
                rating: 5,
                situation: "Работа над собой",
                avatar: "/fourth_testimo.jpg"
              },
              {
                name: "Светлана, 37 лет",
                text: "Техника 'пространства правды' изменила наше общение кардинально. Партнер начал быть честным без скандалов и допросов. Это было именно то, что нам нужно было.",
                rating: 5,
                situation: "Улучшили отношения",
                avatar: "/fifth_testimo.jpg"
              },
              {
                name: "Виктория, 29 лет",
                text: "Решение расстаться далось нелегко, но курс помог принять его осознанно, без сожалений. Сейчас я строю новую жизнь и чувствую себя сильной и уверенной.",
                rating: 5,
                situation: "Новая жизнь",
                avatar: "/sixs_testimo.jpg"
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500"
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                
                <blockquote className="text-primary/80 mb-6 leading-relaxed">
                  "{review.text}"
                </blockquote>
                
                <div className="border-t border-primary/10 pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover border-3 border-primary/30 shadow-lg"
                        style={{
                          aspectRatio: '1/1',
                          objectFit: 'cover'
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-white rounded-full shadow-sm"></div>
                    </div>
                    <div className="flex-1">
                      <cite className="font-medium text-primary not-italic block">
                        {review.name}
                      </cite>
                      <span className="text-xs px-3 py-1 bg-primary/10 text-primary/70 rounded-full inline-block mt-1">
                        {review.situation}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            className="text-center mt-12 sm:mt-16"
          >
            <div className="bg-gradient-to-r from-secondary/50 to-muted/50 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-primary/20 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-1 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-2xl font-light text-primary">4.9/5</span>
              </div>
              <p className="text-lg text-primary/80 mb-2">
                Средняя оценка курса
              </p>
              <p className="text-primary/70">
                Основано на отзывах 240+ женщин
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing-section"
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(96, 165, 250, 0.2) 50%, 
            rgba(59, 130, 246, 0.15) 100%)`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Инвестиция в новую ВАС
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 sm:mb-8"></div>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-lg sm:text-xl text-primary/80">
                Полная стоимость курса:{" "}
                <span className="line-through text-muted-foreground">$249</span>
              </p>
              <p className="text-xl sm:text-2xl text-primary/70 font-medium">
                Специальное предложение:{" "}
                <span className="text-3xl sm:text-4xl font-light text-primary/80">
                  $49
                </span>
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              variants={fadeInUp}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-xl flex flex-col h-full"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-light text-primary mb-2">
                  Стандарт
                </h3>
                <div className="text-3xl sm:text-4xl font-light text-primary/80">
                  $49
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {[
                  "5 уроков теории — четкие, структурированные знания без воды",
                  "5 практических занятий с проверенными техниками восстановления",
                  "Рабочая тетрадь с упражнениями для глубокой проработки",
                  "Доступ к материалам навсегда — возвращайтесь к ним в любой момент",
                  "Поддержку единомышленниц в закрытом чате курса (конфиденциальность по вашему запросу)",
                  'Бонус: Чек-лист "8 признаков, что отношения стоит сохранять"',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-1" />
                    <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <motion.button
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  onClick={() => redirectToCheckout('standard')}
                  disabled={loading}
                >
                  {loading ? 'ОБРАБОТКА...' : 'ЗАПИСАТЬСЯ НА КУРС СТАНДАРТ'}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-secondary/60 to-muted/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border-2 border-primary/30 shadow-2xl relative overflow-hidden flex flex-col h-full"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                ПОПУЛЯРНЫЙ
              </div>

              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-light text-primary mb-2">
                  VIP
                </h3>
                <div className="text-3xl sm:text-4xl font-light text-primary/80">
                  $100
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-1" />
                  <p className="text-primary/80 leading-relaxed font-medium text-sm sm:text-base">
                    Всё, что в тарифе "Стандарт"
                  </p>
                </div>
                {[
                  "Индивидуальная консультация с автором курса",
                  "Персональная обратная связь по домашним заданиям (в течение месяца)",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-1" />
                    <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <motion.button
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-700 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  onClick={() => redirectToCheckout('vip')}
                  disabled={loading}
                >
                  {loading ? 'ОБРАБОТКА...' : 'ЗАПИСАТЬСЯ НА КУРС VIP'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Author Section */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(239, 246, 255, 0.95) 0%, 
            rgba(219, 234, 254, 1) 50%, 
            rgba(191, 219, 254, 0.95) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Об авторе
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-primary/20 shadow-xl"
            whileHover={{ scale: 1.01, y: -5 }}
          >
            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
              <div className="w-64 h-64 sm:w-80 sm:h-80 relative rounded-3xl flex-shrink-0 shadow-xl overflow-hidden">
                <Image
                  src="/my_photo.webp"
                  alt="Светлана Цыганова - кризисный психолог-психотерапевт"
                  fill
                  className="object-cover rounded-3xl"
                  sizes="(max-width: 640px) 256px, 320px"
                />
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-light text-primary mb-3 sm:mb-4">
                  Светлана Цыганова
                </h3>
                <p className="text-lg sm:text-xl text-primary/70 mb-6 sm:mb-8">
                  кризисный психолог-психотерапевт с 25-летним опытом работы
                </p>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[
                    {
                      text: "Специалист по отношениям и семейным кризисам",
                      icon: Heart,
                    },
                    {
                      text: "Эксперт по работе с травмой и ПТСР",
                      icon: Shield,
                    },
                    {
                      text: "Помогла более 1000 женщин пережить измену и восстановить себя",
                      icon: Users,
                    },
                    {
                      text: "Проповедую экологию в отношениях – желание вместо долга",
                      icon: Sparkles,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <item.icon className="w-3 h-3 text-primary/70" />
                      </div>
                      <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-secondary/50 to-muted/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-primary/20">
                  <p className="text-base sm:text-lg text-primary/80 leading-relaxed italic">
                    "Я знаю эту тему не только как теоретик, не только на
                    примере клиентских кейсов, но и на личном опыте. Поэтому
                    имею право говорить об этом с полным пониманием того, что вы
                    сейчас чувствуете."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(96, 165, 250, 0.2) 50%, 
            rgba(59, 130, 246, 0.15) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Часто задаваемые вопросы
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-4 sm:space-y-6">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-lg overflow-hidden"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between hover:bg-secondary/20 transition-colors duration-300"
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="text-base sm:text-lg font-medium text-primary pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-primary/70 flex-shrink-0" />
                  </motion.div>
                </motion.button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 pb-12 lg:pb-16 sm:pb-8 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(239, 246, 255, 0.95) 0%, 
            rgba(219, 234, 254, 1) 50%, 
            rgba(191, 219, 254, 0.95) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8">
              Вы не обязаны справляться с этим одна
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8 sm:mb-12"></div>

            <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
              <p className="text-lg sm:text-xl text-primary/80 leading-relaxed">
                Вы не обязаны быстро "забыть" или "простить". Вы не обязаны
                ничего никому доказывать.
              </p>
              <p className="text-lg sm:text-xl text-primary/80 leading-relaxed">
                Но у вас есть возможность — очень бережно и по-взрослому — шаг
                за шагом вернуть себе себя.
              </p>
              <p className="text-lg sm:text-xl text-primary/80 leading-relaxed font-medium">
                И выстроить свою жизнь так, как решите ВЫ. Не ваша боль. Не ваш
                страх. А ВЫ САМИ.
              </p>
            </div>

            <motion.button
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-12 sm:px-16 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-medium hover:from-primary/90 hover:to-primary/70 transition-all duration-700 shadow-xl hover:shadow-2xl mb-6 sm:mb-8"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToPricing}
            >
              ЗАПИСАТЬСЯ НА КУРС
            </motion.button>

            <p className="text-base sm:text-lg text-primary/70 leading-relaxed mb-8 sm:mb-12">
              Позаботьтесь о себе сегодня, чтобы завтра снова почувствовать
              уверенность и радость жизни.
            </p>

            <div className="pt-6 sm:pt-8 border-t border-primary/30">
              <p className="text-primary/70 text-sm sm:text-base">
                📞 Остались вопросы? Напишите нам:
                <a
                  href="mailto:twizug55@gmail.com"
                  className="text-primary/80 hover:text-primary font-medium ml-2 transition-colors duration-300"
                >
                  twizug55@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}








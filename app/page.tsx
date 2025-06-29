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
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";

// Add CSS keyframes for testimonial carousel
const styles = `
  @keyframes autoSlide {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
`;

// Inject styles into document head
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// Enhanced SparkleEffects component with hydration-safe implementation
function SparkleEffects({ count = 15 }) {
  const [sparkles, setSparkles] = useState<Array<{
    id: number;
    left: string;
    top: string;
    duration: number;
    delay: number;
    size: number;
    color: string;
  }>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const colors = [
      'bg-blue-400/60',
      'bg-indigo-400/60', 
      'bg-purple-400/50',
      'bg-cyan-400/50',
      'bg-pink-400/40'
    ];
    
    // Use deterministic values to avoid hydration mismatch
    const newSparkles = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * 17 + 23) % 100}%`,
      top: `${(i * 13 + 37) % 100}%`,
      duration: 3 + (i % 3),
      delay: (i * 0.5) % 5,
      size: 1 + (i % 2) * 0.5,
      color: colors[i % colors.length],
    }));
    setSparkles(newSparkles);
  }, [count, isClient]);

  if (!isClient) {
    return null; // Avoid rendering on server
  }

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className={`absolute ${sparkle.color} rounded-full`}
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
          animate={{
            opacity: [0, 1, 0.6, 0],
            scale: [0, 1.5, 1, 0],
            rotate: [0, 180],
            y: [0, -15, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

// Enhanced FloatingOrbs component with hydration-safe implementation
function FloatingOrbs() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Avoid rendering on server
  }

  const orbConfigs = [
    {
      color: 'rgba(59, 130, 246, 0.3)',
      size: { width: 180, height: 180 },
      position: { left: '25%', top: '20%' },
      delay: 0
    },
    {
      color: 'rgba(168, 85, 247, 0.25)',
      size: { width: 150, height: 150 },
      position: { left: '70%', top: '60%' },
      delay: 3
    },
    {
      color: 'rgba(14, 165, 233, 0.3)',
      size: { width: 120, height: 120 },
      position: { left: '15%', top: '70%' },
      delay: 6
    },
    {
      color: 'rgba(236, 72, 153, 0.25)',
      size: { width: 160, height: 160 },
      position: { left: '80%', top: '30%' },
      delay: 9
    }
  ];

  return (
    <>
      {orbConfigs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full opacity-15 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            width: `${orb.size.width}px`,
            height: `${orb.size.height}px`,
            left: orb.position.left,
            top: orb.position.top,
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 70, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.1, 0.25, 0.1, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Enhanced Auto-Sliding Testimonials Carousel (Pure CSS Animation - No User Interaction)
function TestimonialsCarousel() {
  const [isClient, setIsClient] = useState(false);

  const testimonials = [
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
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="h-96 bg-white/50 rounded-3xl animate-pulse mx-4" />
    );
  }

  return (
    <motion.div 
      variants={fadeInUp}
      className="relative overflow-hidden"
      style={{ 
        isolation: 'isolate',
        contain: 'layout style paint'
      }}
    >
      {/* Pure CSS Auto-Sliding Carousel Container - Completely Isolated */}
      <div
        className="flex gap-6"
        style={{ 
          width: '200%',
          animation: 'autoSlide 45s linear infinite',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)', // Force hardware acceleration
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
          touchAction: 'none',
          animationFillMode: 'forwards',
          animationTimingFunction: 'linear'
        }}
      >
        {/* First set of testimonials */}
        {testimonials.map((review, index) => (
          <div
            key={`set1-${index}`}
            className="min-w-[300px] w-[300px] flex-shrink-0 pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-primary/20 shadow-lg h-full relative overflow-hidden pointer-events-none">
              {/* Static gradient overlay - no hover effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/20 opacity-20" />
              
              <div className="relative z-10">
                {/* Stars rating */}
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                {/* Testimonial text */}
                <blockquote className="text-primary/80 mb-4 leading-relaxed text-sm italic line-clamp-4">
                  "{review.text}"
                </blockquote>
                
                {/* Author info */}
                <div className="border-t border-primary/10 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border-2 border-primary/30"
                        style={{
                          aspectRatio: '1/1',
                          objectFit: 'cover'
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <cite className="font-medium text-primary not-italic block text-sm truncate">
                        {review.name}
                      </cite>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary/70 rounded-full inline-block mt-1">
                        {review.situation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Second set of testimonials (duplicate for seamless loop) */}
        {testimonials.map((review, index) => (
          <div
            key={`set2-${index}`}
            className="min-w-[300px] w-[300px] flex-shrink-0 pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 border border-primary/20 shadow-lg h-full relative overflow-hidden pointer-events-none">
              {/* Static gradient overlay - no hover effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/20 opacity-20" />
              
              <div className="relative z-10">
                {/* Stars rating */}
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                {/* Testimonial text */}
                <blockquote className="text-primary/80 mb-4 leading-relaxed text-sm italic line-clamp-4">
                  "{review.text}"
                </blockquote>
                
                {/* Author info */}
                <div className="border-t border-primary/10 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border-2 border-primary/30"
                        style={{
                          aspectRatio: '1/1',
                          objectFit: 'cover'
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <cite className="font-medium text-primary not-italic block text-sm truncate">
                        {review.name}
                      </cite>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary/70 rounded-full inline-block mt-1">
                        {review.situation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { redirectToCheckout, loading, resetLoading } = useStripeCheckout();

  // Client-side detection
  useEffect(() => {
    setIsClient(true);
    // Reset loading state when component mounts
    resetLoading();
  }, [resetLoading]);

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
    if (!isClient) return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Show floating CTA after scrolling 800px
      setShowFloatingCTA(currentScrollY > 800);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 overflow-hidden relative">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.15) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 60%), radial-gradient(circle at 60% 10%, rgba(34, 197, 94, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Enhanced Floating mesh gradients */}
        <motion.div
          className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 30%, rgba(96, 165, 250, 0.1) 60%, transparent 100%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -50, 80, 0],
            scale: [1, 1.3, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 35,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, rgba(59, 130, 246, 0.2) 40%, rgba(34, 197, 94, 0.1) 70%, transparent 100%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: [0, -60, 100, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.7, 1.4, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 40,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 8,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 69, 19, 0.2) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 100%)",
            filter: "blur(50px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.5, 0.9, 1],
            rotate: [0, 360],
            opacity: [0.1, 0.2, 0.05, 0.15],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 12,
          }}
        />
      </div>

      {/* Enhanced Sparkle effects - reduced count for performance */}
      <SparkleEffects count={15} />
      
      {/* Floating Orbs */}
      <FloatingOrbs />

      {/* Enhanced Geometric shapes with fixed positioning */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 border-2 border-primary/30 shadow-lg"
        style={{ 
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)"
        }}
        animate={{
          rotate: [0, -360],
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: 5,
        }}
      />

      <motion.div
        className="absolute top-1/3 left-1/5 w-24 h-24 border-2 border-secondary/40 rounded-full shadow-lg"
        style={{
          background: "linear-gradient(45deg, rgba(96, 165, 250, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)"
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Enhanced Light rays with gradient */}
      <motion.div
        className="absolute top-0 left-1/4 w-1 h-full opacity-30"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(59, 130, 246, 0.4) 20%, rgba(168, 85, 247, 0.3) 50%, rgba(59, 130, 246, 0.4) 80%, transparent 100%)"
        }}
        animate={{
          opacity: [0, 0.6, 0],
          scaleY: [0.5, 1, 0.5],
          scaleX: [1, 1.5, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-0 right-1/3 w-1 h-full opacity-25"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(236, 72, 153, 0.3) 25%, rgba(34, 197, 94, 0.2) 50%, rgba(236, 72, 153, 0.3) 75%, transparent 100%)"
        }}
        animate={{
          opacity: [0, 0.5, 0],
          scaleY: [0.3, 1, 0.3],
          scaleX: [1, 2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 6,
        }}
      />

      <motion.div
        className="absolute top-0 right-1/5 w-1 h-full opacity-20"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(139, 69, 19, 0.2) 30%, rgba(168, 85, 247, 0.15) 50%, rgba(139, 69, 19, 0.2) 70%, transparent 100%)"
        }}
        animate={{
          opacity: [0, 0.4, 0],
          scaleY: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 9,
        }}
      />

      {/* Hero Section - Full Screen */}
      <motion.section
        className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-4 overflow-hidden"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        {/* Enhanced Wave SVG Background with parallax */}
        <div 
          className="absolute bottom-0 left-0 w-full h-20 sm:h-28 md:h-32 overflow-hidden"
          style={{
            transform: isClient ? `translateY(${scrollY * 0.1}px)` : 'translateY(0px)',
          }}
        >
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            style={{ transform: "translateY(1px)" }}
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.15)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(96, 165, 250, 0.15)" />
                <stop offset="50%" stopColor="rgba(236, 72, 153, 0.1)" />
                <stop offset="100%" stopColor="rgba(96, 165, 250, 0.15)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
              fill="url(#waveGradient1)"
              animate={{
                d: [
                  "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
                  "M0,80 C300,20 600,100 900,40 C1050,10 1150,80 1200,50 L1200,120 L0,120 Z",
                  "M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 15,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M0,80 C300,40 600,120 900,80 C1050,50 1150,100 1200,70 L1200,120 L0,120 Z"
              fill="url(#waveGradient2)"
              animate={{
                d: [
                  "M0,80 C300,40 600,120 900,80 C1050,50 1150,100 1200,70 L1200,120 L0,120 Z",
                  "M0,50 C300,100 600,30 900,90 C1050,120 1150,40 1200,80 L1200,120 L0,120 Z",
                  "M0,80 C300,40 600,120 900,80 C1050,50 1150,100 1200,70 L1200,120 L0,120 Z",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 18,
                ease: "easeInOut",
                delay: 3,
              }}
            />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 py-4 sm:py-2">
          <motion.div variants={fadeInUp} className="mb-4 sm:mb-4 md:mb-6">
            <motion.h1 
              className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-primary mb-3 sm:mb-2 md:mb-3 leading-tight px-1"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="inline-block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Скорая помощь
              </motion.span>
              <motion.span 
                className="block text-primary/70 font-normal mt-1 sm:mt-1 md:mt-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                при измене
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-base sm:text-base md:text-lg text-primary/80 max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-4 mt-3 sm:mt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Пошаговое руководство после измены партнера для женщин, которые
              хотят справиться с болью и принять решение, о котором не придется
              жалеть.
            </motion.p>
          </motion.div>

          {/* Enhanced Floating elements with deterministic positioning */}
          <motion.div
            className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl shadow-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 100%)"
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 rounded-full blur-2xl shadow-xl"
            style={{
              background: "linear-gradient(45deg, rgba(236, 72, 153, 0.4) 0%, rgba(34, 197, 94, 0.25) 100%)"
            }}
            animate={{
              y: [0, 35, 0],
              x: [0, -25, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 14,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-40 right-10 w-48 h-48 rounded-full blur-3xl shadow-2xl"
            style={{
              background: "linear-gradient(225deg, rgba(139, 69, 19, 0.2) 0%, rgba(59, 130, 246, 0.15) 100%)"
            }}
            animate={{
              y: [0, 25, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 0.7, 1],
            }}
            transition={{
              duration: 16,
              repeat: Number.POSITIVE_INFINITY,
              delay: 3,
            }}
          />

          <motion.div
            className="absolute bottom-60 left-16 w-28 h-28 rounded-full blur-xl shadow-lg"
            style={{
              background: "linear-gradient(315deg, rgba(168, 85, 247, 0.35) 0%, rgba(14, 165, 233, 0.2) 100%)"
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: 2,
            }}
          />

          <motion.div variants={scaleIn} className="mb-5 sm:mb-6 px-0 sm:px-2">
            <motion.div 
              className="relative max-w-lg sm:max-w-xl md:max-w-2xl mx-auto rounded-lg sm:rounded-xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl bg-white/40 backdrop-blur-lg border border-primary/30"
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
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
                      className="group flex items-center justify-center w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/95 rounded-full shadow-2xl hover:bg-white transition-all duration-700 relative z-10 backdrop-blur-sm border border-white/50"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.7)",
                            "0 0 0 20px rgba(59, 130, 246, 0)",
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="absolute inset-0 rounded-full"
                      />
                      <Play className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary ml-1 group-hover:text-primary/80 drop-shadow-lg" />
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
            </motion.div>
          </motion.div>

          <motion.div variants={slideInLeft} className="mb-5 sm:mb-4 md:mb-6">
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6 text-primary/70">
              {[
                { text: "25 лет опыта", color: "bg-primary" },
                { text: "1000+ женщин", color: "bg-secondary" },
                { text: "Научный подход", color: "bg-muted" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <motion.div 
                    className={`w-3 h-3 sm:w-2.5 sm:h-2.5 ${item.color} rounded-full shadow-md`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                  />
                  <span className="text-sm sm:text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={scaleIn}>
            <motion.button
              className="bg-gradient-to-r from-primary via-blue-600 to-primary/80 text-primary-foreground px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-700 shadow-xl hover:shadow-2xl relative overflow-hidden group"
              whileHover={{ 
                scale: 1.08, 
                y: -3,
                boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToPricing}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">НАЧАТЬ ВОССТАНОВЛЕНИЕ СЕЙЧАС</span>
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
                      <doubt.icon className="w-3 h-3 text-primary/70" />
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
            <p className="text-lg sm:text-2xl text-primary/80 leading-relaxed font-medium">
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
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-700 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.02, 
                  y: -12,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Enhanced hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.4 }}
                />
                
                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-transparent"
                  whileHover={{
                    borderImage: "linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.5)) 1",
                  }}
                />

                <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-6 relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden`}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <module.icon className="w-8 h-8 text-white relative z-10" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3 
                      className="text-xl sm:text-2xl font-light text-primary mb-4 sm:mb-6"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {module.title}
                    </motion.h3>
                    <h4 className="text-base sm:text-lg font-medium text-primary/80 mb-3 sm:mb-4">
                      Что вы получите:
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                      {module.benefits.map((benefit, benefitIndex) => (
                        <motion.div
                          key={benefitIndex}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * benefitIndex }}
                        >
                          <motion.div 
                            className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <CheckCircle className="w-4 h-4 text-primary/70" />
                          </motion.div>
                          <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                            {benefit}
                          </p>
                        </motion.div>
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

          {/* Enhanced Swipeable Auto-Sliding Testimonials Carousel */}
          <TestimonialsCarousel />

          {/* Enhanced summary stats */}
          <motion.div
            variants={fadeInUp}
            className="text-center mt-12 sm:mt-16"
          >
            <div className="bg-gradient-to-r from-secondary/60 to-muted/60 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-primary/20 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-4">
                {/* Stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-current drop-shadow-lg" />
                    </motion.div>
                  ))}
                </div>
                
                {/* Rating */}
                <motion.span 
                  className="text-3xl font-light text-primary"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  4.9/5
                </motion.span>
                
                {/* Testimonial count */}
                <div className="text-center sm:text-left">
                  <p className="text-lg text-primary/80 font-medium">
                    Средняя оценка курса
                  </p>
                  <p className="text-primary/70">
                    Основано на отзывах 240+ женщин
                  </p>
                </div>
              </div>
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
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-light text-primary mb-6 sm:mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Инвестиция в новую ВАС
            </motion.h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 sm:mb-8"></div>
            <div className="space-y-3 sm:space-y-4">
              <motion.p 
                className="text-lg sm:text-xl text-primary/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Полная стоимость курса:{" "}
                <span className="line-through text-muted-foreground">$249</span>
              </motion.p>
              <motion.p 
                className="text-xl sm:text-2xl text-primary/70 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Специальное предложение:{" "}
                <motion.span 
                  className="text-3xl sm:text-4xl font-light text-primary/80"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  $49
                </motion.span>
              </motion.p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            <motion.div
              variants={scaleIn}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-xl flex flex-col relative overflow-hidden group min-h-[600px]"
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Enhanced hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-light text-primary mb-2">
                    Стандарт
                  </h3>
                  <motion.div 
                    className="text-3xl sm:text-4xl font-light text-primary/80"
                    whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    $49
                  </motion.div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                  {[
                    "5 уроков теории — четкие, структурированные знания без воды",
                    "5 практических занятий с проверенными техниками восстановления",
                    "Рабочая тетрадь с упражнениями для глубокой проработки",
                    "Доступ к материалам навсегда — возвращайтесь к ним в любой момент",
                    "Поддержку единомышленниц в закрытом чате курса (конфиденциальность по вашему запросу)",
                    'Бонус: Чек-лист "8 признаков, что отношения стоит сохранять"',
                  ].map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-1" />
                      </motion.div>
                      <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                        {feature}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto">
                  <motion.button
                    className={`w-full ${loading 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-primary to-primary/80'
                    } text-primary-foreground py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-medium transition-all duration-500 shadow-xl relative overflow-hidden group`}
                    whileHover={{ 
                      scale: loading ? 1 : 1.02, 
                      y: loading ? 0 : -3,
                      boxShadow: loading ? undefined : "0 15px 35px -10px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    onClick={() => !loading && redirectToCheckout('standard')}
                    disabled={loading}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading && (
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      )}
                      {loading ? 'ОБРАБОТКА...' : 'ЗАПИСАТЬСЯ НА КУРС СТАНДАРТ'}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="bg-gradient-to-br from-secondary/60 to-muted/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border-2 border-primary/30 shadow-2xl relative overflow-hidden flex flex-col group min-h-[600px]"
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: "0 30px 60px -12px rgba(59, 130, 246, 0.3)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Popular badge with animation */}
              <motion.div 
                className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.7)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                ПОПУЛЯРНЫЙ
              </motion.div>

              {/* Enhanced hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-blue-50/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-light text-primary mb-2">
                    VIP
                  </h3>
                  <motion.div 
                    className="text-3xl sm:text-4xl font-light text-primary/80"
                    whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    $100
                  </motion.div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                  <motion.div 
                    className="flex items-start space-x-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-1" />
                    </motion.div>
                    <p className="text-primary/80 leading-relaxed font-medium text-sm sm:text-base">
                      Всё, что в тарифе "Стандарт"
                    </p>
                  </motion.div>
                  {[
                    "Индивидуальная консультация с автором курса (60 минут)",
                    "Персональная обратная связь по домашним заданиям (в течение месяца)",
                    "Приоритетная поддержка в чате курса",
                    "Дополнительные материалы и техники для VIP-участниц",
                    "Возможность задать личные вопросы автору курса",
                  ].map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + 1) * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <CheckCircle className="w-5 h-5 text-primary/70 flex-shrink-0 mt-1" />
                      </motion.div>
                      <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                        {feature}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto">
                  <motion.button
                    className={`w-full ${loading 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-primary via-blue-600 to-purple-600'
                    } text-white py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-medium transition-all duration-500 shadow-xl relative overflow-hidden group`}
                    whileHover={{ 
                      scale: loading ? 1 : 1.02, 
                      y: loading ? 0 : -3,
                      boxShadow: loading ? undefined : "0 20px 40px -10px rgba(59, 130, 246, 0.5)"
                    }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    onClick={() => !loading && redirectToCheckout('vip')}
                    disabled={loading}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading && (
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      )}
                      {loading ? 'ОБРАБОТКА...' : 'ЗАПИСАТЬСЯ НА КУРС VIP'}
                    </span>
                  </motion.button>
                </div>
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
                  <p className="text-base sm:text-lg text-primary/80 leading-relaxed text-center">
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

      {/* Floating CTA Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ 
          opacity: showFloatingCTA ? 1 : 0, 
          scale: showFloatingCTA ? 1 : 0,
          y: showFloatingCTA ? 0 : 100
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
      >
        <motion.button
          className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm sm:text-base flex items-center gap-2 backdrop-blur-sm border border-white/20"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToPricing}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3
            }}
          >
            💝
          </motion.div>
          Получить курс
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Number.POSITIVE_INFINITY 
            }}
          >
            →
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}








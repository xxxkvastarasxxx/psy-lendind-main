"use client";

import { motion, useReducedMotion } from "framer-motion";
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
import { useState, useEffect, useRef, useCallback } from "react";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";

// Add CSS keyframes for testimonial carousel
const styles = `
  @keyframes autoSlide {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
`;

// Inject styles into document head
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// Enhanced SparkleEffects component with hydration-safe implementation and reduced motion support
function SparkleEffects({ count = 15 }) {
  const [sparkles, setSparkles] = useState<
    Array<{
      id: number;
      left: string;
      top: string;
      duration: number;
      delay: number;
      size: number;
      color: string;
    }>
  >([]);
  const [isClient, setIsClient] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || shouldReduceMotion) return;

    const colors = [
      "bg-softred-300/60",
      "bg-peach-300/60",
      "bg-softred-200/50",
      "bg-peach-200/50",
      "bg-rose-300/40",
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
  }, [count, isClient, shouldReduceMotion]);

  if (!isClient || shouldReduceMotion) {
    return null; // Avoid rendering on server or if reduced motion is preferred
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {sparkles.slice(0, 3).map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className={`absolute ${sparkle.color} rounded-full opacity-20`}
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
          }}
        />
      ))}
    </div>
  );
}

// Enhanced FloatingOrbs component with hydration-safe implementation and reduced motion support
function FloatingOrbs() {
  const [isClient, setIsClient] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || shouldReduceMotion) {
    return null; // Avoid rendering on server or if reduced motion is preferred
  }

  const orbConfigs = [
    {
      color: "rgba(59, 130, 246, 0.3)",
      size: { width: 180, height: 180 },
      position: { left: "25%", top: "20%" },
      delay: 0,
    },
    {
      color: "rgba(168, 85, 247, 0.25)",
      size: { width: 150, height: 150 },
      position: { left: "70%", top: "60%" },
      delay: 3,
    },
    {
      color: "rgba(14, 165, 233, 0.3)",
      size: { width: 120, height: 120 },
      position: { left: "15%", top: "70%" },
      delay: 6,
    },
    {
      color: "rgba(236, 72, 153, 0.25)",
      size: { width: 160, height: 160 },
      position: { left: "80%", top: "30%" },
      delay: 9,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {orbConfigs.slice(0, 2).map((orb, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full opacity-10 blur-2xl"
          style={{
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            width: `${orb.size.width}px`,
            height: `${orb.size.height}px`,
            left: orb.position.left,
            top: orb.position.top,
          }}
        />
      ))}
    </div>
  );
}

// Optimized animation variants - focus on transform and opacity only
const fadeInUp = {
  initial: { opacity: 0, transform: "translateY(60px)" },
  animate: { opacity: 1, transform: "translateY(0px)" },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slideInLeft = {
  initial: { opacity: 0, transform: "translateX(-60px)" },
  animate: { opacity: 1, transform: "translateX(0px)" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const slideInRight = {
  initial: { opacity: 0, transform: "translateX(60px)" },
  animate: { opacity: 1, transform: "translateX(0px)" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const scaleIn = {
  initial: { opacity: 0, transform: "scale(0.9)" },
  animate: { opacity: 1, transform: "scale(1)" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

// Optimized stagger container with reduced children delay
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listItemVariants = {
  initial: { opacity: 0, transform: "translateY(20px)" },
  animate: { opacity: 1, transform: "translateY(0px)" },
};

// Enhanced Auto-Sliding Testimonials Carousel with performance optimizations
function TestimonialsCarousel() {
  const [isClient, setIsClient] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const testimonials = [
    {
      name: "Анна, 34 года",
      text: "После курса я поняла, что измена партнера — это не приговор моей женственности. Я научилась управлять своими эмоциями и принимать решения из позиции силы, а не отчаяния.",
      rating: 5,
      situation: "Сохранила отношения",
      avatar: "/first_testimo.jpg",
    },
    {
      name: "Мария, 28 лет",
      text: "Самое ценное — это техники работы с тревогой. Раньше я не могла ни на чем сосредоточиться, постоянно прокручивала в голове болезненные сценарии. Теперь у меня есть инструменты контроля.",
      rating: 5,
      situation: "Новые отношения",
      avatar: "/second_testimo.jpg",
    },
    {
      name: "Елена, 42 года",
      text: "Курс помог мне понять настоящие причины измены и то, как восстановить доверие. Мы с мужем не только сохранили семью, но и вышли на новый уровень близости.",
      rating: 5,
      situation: "Восстановили семью",
      avatar: "/third_testimo.jpg",
    },
    {
      name: "Ольга, 31 год",
      text: "Я благодарна за модуль о самооценке. Измена разрушила мою уверенность, но курс показал, как вернуть ощущение собственной ценности и привлекательности.",
      rating: 5,
      situation: "Работа над собой",
      avatar: "/fourth_testimo.jpg",
    },
    {
      name: "Светлана, 37 лет",
      text: "Техника 'пространства правды' изменила наше общение кардинально. Партнер начал быть честным без скандалов и допросов. Это было именно то, что нам нужно было.",
      rating: 5,
      situation: "Улучшили отношения",
      avatar: "/fifth_testimo.jpg",
    },
    {
      name: "Виктория, 29 лет",
      text: "Решение расстаться далось нелегко, но курс помог принять его осознанно, без сожалений. Сейчас я строю новую жизнь и чувствую себя сильной и уверенной.",
      rating: 5,
      situation: "Новая жизнь",
      avatar: "/sixs_testimo.jpg",
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-96 bg-white/50 rounded-3xl animate-pulse mx-4" />;
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="relative overflow-hidden"
      style={{
        isolation: "isolate",
        contain: "layout style paint",
      }}
    >
      {/* Optimized CSS Auto-Sliding Carousel Container */}
      <div
        className="flex gap-6"
        style={{
          width: "200%",
          animation: shouldReduceMotion
            ? "none"
            : "autoSlide 45s linear infinite",
          willChange: shouldReduceMotion ? "auto" : "transform",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)", // Force hardware acceleration
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
          touchAction: "none",
          animationFillMode: "forwards",
          animationTimingFunction: "linear",
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
              <div className="absolute inset-0 bg-gradient-to-br from-peach-50/30 to-softred-50/20 opacity-20" />

              <div className="relative z-10">
                {/* Stars rating */}
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-peach-400 fill-current"
                      />
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
                          aspectRatio: "1/1",
                          objectFit: "cover",
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
              <div className="absolute inset-0 bg-gradient-to-br from-peach-50/30 to-softred-50/20 opacity-20" />

              <div className="relative z-10">
                {/* Stars rating */}
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-peach-400 fill-current"
                      />
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
                          aspectRatio: "1/1",
                          objectFit: "cover",
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
  const shouldReduceMotion = useReducedMotion();

  // Client-side detection
  useEffect(() => {
    setIsClient(true);
    // Reset loading state when component mounts
    resetLoading();
  }, [resetLoading]);

  // Function to scroll to pricing section
  const scrollToPricing = useCallback(() => {
    const pricingSection = document.getElementById("pricing-section");
    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [shouldReduceMotion]);

  // Throttled scroll handler to improve performance
  const throttledScrollHandler = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    // Show floating CTA after scrolling 800px
    setShowFloatingCTA(currentScrollY > 800);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(throttledScrollHandler, 16); // ~60fps throttling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isClient, throttledScrollHandler]);

  // Handle video playback when isVideoPlaying state changes
  useEffect(() => {
    if (isVideoPlaying && videoRef.current) {
      videoRef.current
        .play()
        .catch((error: Error) => console.error("Video play failed:", error));
    }
  }, [isVideoPlaying]);

  const toggleFAQ = useCallback(
    (index: number) => {
      setOpenFAQ(openFAQ === index ? null : index);
    },
    [openFAQ]
  );

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-peach-50/30 to-softred-100/50 overflow-hidden relative">
      {/* Optimized Animated Background Elements - Single wrapper for better performance */}
      {!shouldReduceMotion && (
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(251, 113, 133, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(244, 114, 182, 0.15) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 80%, rgba(239, 68, 68, 0.15) 0%, transparent 60%), radial-gradient(circle at 60% 10%, rgba(252, 165, 165, 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(251, 113, 133, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Optimized Floating mesh gradients - Combined in single container */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full opacity-25 blur-[60px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, rgba(251, 113, 133, 0.2) 30%, rgba(244, 114, 182, 0.1) 60%, transparent 100%)",
              }}
              animate={{
                x: [0, 80, -50, 0],
                y: [0, -50, 80, 0],
                scale: [1, 1.3, 0.8, 1],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute bottom-10 left-10 w-[400px] h-[400px] rounded-full opacity-20 blur-[70px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(251, 146, 60, 0.25) 0%, rgba(239, 68, 68, 0.2) 40%, rgba(252, 165, 165, 0.1) 70%, transparent 100%)",
              }}
              animate={{
                x: [0, -60, 100, 0],
                y: [0, 60, -40, 0],
                scale: [1, 0.7, 1.4, 1],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 8,
              }}
            />

            <motion.div
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-15 blur-[50px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(244, 114, 182, 0.2) 0%, rgba(251, 113, 133, 0.15) 50%, transparent 100%)",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.5, 0.9, 1],
                opacity: [0.1, 0.2, 0.05, 0.15],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 12,
              }}
            />
          </motion.div>
        </div>
      )}

      {/* Enhanced Sparkle effects - reduced count for performance */}
      <SparkleEffects count={shouldReduceMotion ? 0 : 10} />

      {/* Floating Orbs */}
      <FloatingOrbs />

      {/* Hero Section - Full Screen */}
      <motion.section
        className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 py-6 sm:py-4 overflow-hidden"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
      >
        {/* Enhanced Wave SVG Background with parallax */}
        {!shouldReduceMotion && (
          <div
            className="absolute bottom-0 left-0 w-full h-20 sm:h-28 md:h-32 overflow-hidden"
            style={{
              transform: isClient
                ? `translateY(${scrollY * 0.05}px)`
                : "translateY(0px)",
            }}
          >
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              style={{ transform: "translateY(1px)" }}
            >
              <defs>
                <linearGradient
                  id="waveGradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                  <stop offset="50%" stopColor="rgba(168, 85, 247, 0.15)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                </linearGradient>
                <linearGradient
                  id="waveGradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
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
                  repeat: Infinity,
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
                  repeat: Infinity,
                  duration: 18,
                  ease: "easeInOut",
                  delay: 3,
                }}
              />
            </svg>
          </div>
        )}

        <div className="max-w-4xl mx-auto text-center relative z-10 py-4 sm:py-2">
          {/* Optimized hero content with grouped animations */}
          <motion.div variants={fadeInUp} className="mb-4 sm:mb-4 md:mb-6">
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-prata font-medium text-primary mb-3 sm:mb-2 md:mb-3 leading-tight px-1">
              <span className="block">Скорая помощь</span>
              <span className="block text-primary/70 font-medium mt-0 md:mt-2">
                при измене
              </span>
            </h1>
            <p className="text-base sm:text-base md:text-lg text-primary/80 max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-4 mt-3 sm:mt-2">
              Пошаговое руководство после измены партнера для женщин, которые
              хотят справиться с болью и принять решение, о котором не придется
              жалеть
            </p>
          </motion.div>

          {/* Optimized Floating elements with single container */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <motion.div
                className="absolute top-20 left-10 w-40 h-40 rounded-full blur-3xl shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 100%)",
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, 30, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 12, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-40 right-20 w-32 h-32 rounded-full blur-2xl shadow-xl"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(236, 72, 153, 0.4) 0%, rgba(34, 197, 94, 0.25) 100%)",
                }}
                animate={{
                  y: [0, 35, 0],
                  x: [0, -25, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 14, repeat: Infinity, delay: 1 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-15 blur-[50px]"
                style={{
                  background:
                    "radial-gradient(circle, rgba(244, 114, 182, 0.2) 0%, rgba(251, 113, 133, 0.15) 50%, transparent 100%)",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  scale: [1, 1.5, 0.9, 1],
                  opacity: [0.1, 0.2, 0.05, 0.15],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 12,
                }}
              />
            </motion.div>
          )}

          <motion.div variants={scaleIn} className="mb-5 sm:mb-6 px-0 sm:px-2">
            <div className="relative max-w-lg sm:max-w-xl md:max-w-2xl mx-auto rounded-lg sm:rounded-xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl border border-primary/20">
              <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
                {!isVideoPlaying ? (
                  <>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                      {/* Fallback background image */}
                      <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-60"
                        style={{ backgroundImage: `url('/image.png')` }}
                      />
                      <video
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                        muted
                        preload="metadata"
                        poster="/image.png"
                        onLoadedData={() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 1; // Show first frame
                          }
                        }}
                        ref={videoRef}
                      >
                        <source src="/my_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <motion.button
                      onClick={() => {
                        setIsVideoPlaying(true);
                        // Ensure video starts playing
                        setTimeout(() => {
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                            videoRef.current.play().catch(console.error);
                          }
                        }, 100);
                      }}
                      className="group flex items-center justify-center w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-full shadow-2xl hover:bg-white/90 transition-all duration-300 relative z-10"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.5,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      {!shouldReduceMotion && (
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(59, 130, 246, 0.7)",
                              "0 0 0 20px rgba(59, 130, 246, 0)",
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className="absolute inset-0 rounded-full"
                        />
                      )}
                      <Play className="w-6 h-6 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary ml-1 group-hover:text-primary/80 drop-shadow-lg" />
                    </motion.button>
                  </>
                ) : (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    ref={videoRef}
                    controls
                    playsInline
                    autoPlay
                    poster="/image.png"
                    onEnded={() => setIsVideoPlaying(false)}
                  >
                    <source src="/my_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={slideInLeft} className="mb-5 sm:mb-4 md:mb-6">
            <motion.div
              className="flex flex-wrap justify-center gap-5 sm:gap-6 text-primary/70"
              variants={staggerContainer}
            >
              {[
                { text: "25 лет опыта", color: "bg-primary" },
                { text: "1000+ женщин", color: "bg-secondary" },
                { text: "Научный подход", color: "bg-muted" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg"
                  variants={listItemVariants}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                >
                  <motion.div
                    className={`w-3 h-3 sm:w-2.5 sm:h-2.5 ${item.color} rounded-full shadow-md`}
                    animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                  <span className="text-sm sm:text-sm font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={scaleIn}>
            <motion.button
              className="bg-primary text-primary-foreground px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-700 shadow-xl hover:shadow-2xl relative overflow-hidden group"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 20px 40px -12px rgba(239, 68, 68, 0.5)",
                    }
              }
              whileTap={{ scale: 0.98 }}
              onClick={scrollToPricing}
            >
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <span className="relative z-10">
                НАЧАТЬ ВОССТАНОВЛЕНИЕ СЕЙЧАС
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Chaos Section */}
      <motion.section
        className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-20%" }}
        variants={staggerContainer}
        style={{
          background: `linear-gradient(135deg, 
            rgba(254, 238, 224, 0.8) 0%, 
            rgba(251, 217, 192, 0.6) 30%,
            rgba(248, 191, 149, 0.4) 70%, 
            rgba(254, 238, 224, 0.8) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-softred-800 mb-6 sm:mb-8">
              Внутри вас сейчас хаос
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-softred-400 to-softred-300 mx-auto rounded-full mb-8 sm:mb-12"></div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="space-y-6 sm:space-y-8 text-center"
          >
            <p className="text-lg sm:text-xl text-softred-700 leading-relaxed max-w-3xl mx-auto">
              Вы узнали об измене партнера. И мир, который казался надежным и
              понятным, разлетелся на осколки.
            </p>
            <p className="text-lg sm:text-xl text-softred-700 leading-relaxed max-w-3xl mx-auto">
              Но самое страшное — не сам факт измены, а то, в кого мы после нее
              превращаемся:
            </p>
          </motion.div>

          {/* Optimized list with single container animation */}
          <motion.div
            variants={staggerContainer}
            className="mt-12 sm:mt-16 grid sm:grid-cols-2 gap-6 sm:gap-8"
          >
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
                className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-peach-200 shadow-lg"
                variants={listItemVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-softred-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <item.icon className="w-4 h-4 text-softred-600" />
                  </div>
                  <p className="text-softred-800 leading-relaxed text-sm sm:text-base">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
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
            rgba(254, 242, 242, 0.7) 0%, 
            rgba(252, 215, 207, 0.6) 25%,
            rgba(254, 235, 200, 0.4) 50%,
            rgba(253, 230, 221, 0.6) 75%,
            rgba(254, 242, 242, 0.7) 100%)`,
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8">
              После измены партнера сомнения атакуют вас с двух сторон:
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <motion.div
              variants={fadeInUp}
              className="bg-white/80 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-primary/20 shadow-xl"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-xl sm:text-2xl font-prata text-primary mb-6 sm:mb-8 text-center">
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
              <h3 className="text-xl sm:text-2xl font-prata text-primary mb-6 sm:mb-8 text-center">
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
              <p className="text-base sm:text-lg text-primary/80 leading-relaxed max-w-4xl mx-auto mb-6 text-left">
                Эта неопределенность парализует. Она превращает каждый день в
                мучительное зависание между противоречивыми импульсами:
                уйти/остаться, простить/наказать, верить/контролировать.
              </p>
              <p className="text-base sm:text-lg text-primary/80 leading-relaxed max-w-4xl mx-auto mb-6 text-left">
                При этом рядом нет никого, кто мог бы дать четкие,
                структурированные ответы. Друзья и родные будут советовать из
                собственного опыта, который может кардинально отличаться от
                вашей ситуации.
              </p>
              <p className="text-base sm:text-lg text-primary/80 leading-relaxed max-w-4xl mx-auto text-left">
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
            rgba(253, 213, 213, 0.6) 0%, 
            rgba(251, 183, 183, 0.5) 35%,
            rgba(248, 180, 136, 0.4) 65%, 
            rgba(253, 213, 213, 0.6) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-softred-700 leading-relaxed max-w-3xl mx-auto mb-8">
              Женщины, которые не получают квалифицированной помощи, часто
              совершают непоправимые ошибки:
            </h2>
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
                className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-peach-200 shadow-lg"
                variants={fadeInUp}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center space-x-4 min-h-[40px]">
                  <div className="w-8 h-8 bg-softred-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-softred-600" />
                  </div>
                  <p className="text-softred-800 leading-relaxed text-sm sm:text-base my-auto">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <p className="text-lg sm:text-2xl text-softred-700 leading-relaxed font-medium">
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
            rgba(252, 228, 236, 0.7) 0%, 
            rgba(254, 242, 242, 0.8) 25%,
            rgba(251, 207, 232, 0.5) 50%,
            rgba(252, 231, 243, 0.6) 75%,
            rgba(252, 228, 236, 0.7) 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8">
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
                color: "from-softred-400 via-softred-500 to-softred-600",
              },
              {
                title: "Модуль 2: «Скандалы не работают. А что работает?»",
                benefits: [
                  "Детальный анализ 7 поведенческих паттернов, которые отталкивают партнера и усугубляют ситуацию после измены",
                  "Конкретные стратегии сохранения достоинства в самых болезненных и провокационных ситуациях",
                  "Вы будете контролировать ситуацию вместо того, чтобы эмоции контролировали вас",
                  "Вы прекратите совершать действия, о которых потом жалеете и которые разрушают ваше самоважение",
                ],
                icon: MessageCircle,
                color: "from-peach-400 via-peach-500 to-softred-500",
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
                color: "from-rose-400 via-peach-400 to-softred-400",
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
                color: "from-peach-500 via-softred-400 to-rose-500",
              },
              {
                title: "Модуль 5: План БУДУЩЕГО",
                benefits: [
                  "Пошаговую систему для объективной оценки перспектив отношений на основе конкретных критериев",
                  "Вы примете решение о будущем отношений из позиции силы, а не страха или отчаяния",
                  "Вы создадите чёткое видение своего будущего вместо неопределенности и тревоги",
                ],
                icon: Target,
                color: "from-softred-500 via-peach-500 to-rose-400",
              },
            ].map((module, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-lg relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }
                }
              >
                <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-6 relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-prata text-primary mb-4 sm:mb-6">
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
            rgba(254, 242, 242, 0.8) 0%, 
            rgba(252, 228, 236, 0.6) 25%,
            rgba(251, 232, 252, 0.4) 50%,
            rgba(254, 235, 200, 0.5) 75%,
            rgba(254, 242, 242, 0.8) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8">
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
            rgba(254, 235, 200, 0.6) 0%, 
            rgba(251, 191, 183, 0.4) 25%,
            rgba(252, 165, 165, 0.3) 50%,
            rgba(254, 202, 202, 0.5) 75%,
            rgba(254, 235, 200, 0.6) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8">
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
            rgba(254, 247, 244, 0.8) 0%, 
            rgba(253, 230, 221, 0.7) 30%,
            rgba(251, 191, 183, 0.4) 70%, 
            rgba(254, 247, 244, 0.8) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8">
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
            rgba(252, 231, 243, 0.8) 0%, 
            rgba(251, 207, 232, 0.6) 50%, 
            rgba(254, 235, 200, 0.4) 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8">
              Что говорят женщины
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 sm:mb-8"></div>
            <p className="text-lg sm:text-xl text-primary/80 max-w-3xl mx-auto">
              Реальные истории женщин, которые прошли через измену и нашли свой
              путь к исцелению
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
                      transition={{
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 400,
                      }}
                    >
                      <Star className="w-6 h-6 text-peach-400 fill-current drop-shadow-lg" />
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
            rgba(255, 228, 196, 0.6) 0%, 
            rgba(254, 202, 202, 0.5) 25%,
            rgba(252, 165, 165, 0.4) 50%,
            rgba(254, 215, 215, 0.5) 75%,
            rgba(255, 228, 196, 0.6) 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8"
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

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Базовый тариф */}
            <motion.div
              variants={scaleIn}
              className="bg-gradient-to-br from-slate-50/90 to-blue-50/70 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-slate-300 shadow-lg flex flex-col relative overflow-hidden group min-h-[600px]"
              whileHover={{
                scale: 1.02,
                y: -5,
                boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Enhanced hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-slate-50/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-prata text-slate-700 mb-1">
                    Базовый
                  </h3>
                  <p className="text-sm text-slate-600 mb-3 font-medium">
                    "Самостоятельная работа"
                  </p>
                  <motion.div
                    className="text-3xl sm:text-4xl font-light text-slate-600"
                    whileHover={{ scale: 1.1, color: "hsl(215, 16%, 47%)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    $29
                  </motion.div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                  {[
                    {
                      text: "5 теоретических видеоуроков",
                      icon: "🎓",
                    },
                    {
                      text: "Рабочая тетрадь с упражнениями",
                      icon: "📝",
                    },
                    {
                      text: "Доступ к материалам на 30 дней",
                      icon: "📂",
                    },
                    {
                      text: "Без поддержки и чата",
                      icon: "🚫",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 3 }}
                    >
                      <motion.div
                        className="w-10 h-10 bg-gradient-to-br from-blue-100 via-slate-100 to-blue-50 border border-blue-200/50 rounded-xl flex items-center justify-center flex-shrink-0 text-lg shadow-sm"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, -5, 5, 0],
                          backgroundColor: "rgba(59, 130, 246, 0.15)",
                          borderColor: "rgba(59, 130, 246, 0.3)",
                          boxShadow: "0 8px 25px -8px rgba(59, 130, 246, 0.3)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          duration: 0.6,
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                        {feature.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto">
                  <p className="text-slate-600 text-sm text-center mb-4 leading-relaxed">
                    Для тех, кто хочет работать в своём темпе и без лишнего
                    шума.
                  </p>
                  <motion.button
                    className={`w-full ${
                      loading
                        ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-slate-500 to-slate-600"
                    } text-white py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-medium transition-all duration-500 shadow-xl relative overflow-hidden group`}
                    whileHover={{
                      scale: loading ? 1 : 1.02,
                      y: loading ? 0 : -3,
                      boxShadow: loading
                        ? undefined
                        : "0 15px 35px -10px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    onClick={() => !loading && redirectToCheckout("basic")}
                    disabled={loading}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading && (
                        <motion.div
                          className="w-4 h-4 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                      )}
                      {loading ? "ОБРАБОТКА..." : "ЗАПИСАТЬСЯ НА КУРС"}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Стандарт тариф */}
            <motion.div
              variants={scaleIn}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-xl flex flex-col relative overflow-hidden group min-h-[600px]"
              whileHover={{
                scale: 1.03,
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.25)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Enhanced hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-peach-50/30 to-softred-50/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-prata text-primary mb-1">
                    Стандарт
                  </h3>
                  <p className="text-sm text-primary/70 mb-3 font-medium">
                    "Поддержка и сообщество"
                  </p>
                  <motion.div
                    className="text-3xl sm:text-4xl font-light text-primary/80"
                    whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    $59
                  </motion.div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                  {[
                    {
                      text: "Всё из базового тарифа",
                      icon: "✅",
                    },
                    {
                      text: "Доступ в закрытый чат с участницами",
                      icon: "💬",
                    },
                    {
                      text: "Ответы от автора на общие вопросы",
                      icon: "👩‍🏫",
                    },
                    {
                      text: "Пожизненный доступ к материалам",
                      icon: "♾️",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 3 }}
                    >
                      <motion.div
                        className="w-10 h-10 bg-gradient-to-br from-rose-100 via-peach-100 to-rose-50 border border-rose-200/50 rounded-xl flex items-center justify-center flex-shrink-0 text-lg shadow-sm"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, -5, 5, 0],
                          backgroundColor: "rgba(239, 68, 68, 0.15)",
                          borderColor: "rgba(239, 68, 68, 0.3)",
                          boxShadow: "0 8px 25px -8px rgba(239, 68, 68, 0.3)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          duration: 0.6,
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <p className="text-primary/80 leading-relaxed text-sm sm:text-base">
                        {feature.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto">
                  <p className="text-primary/70 text-sm text-center mb-4 leading-relaxed">
                    Поддержка и сообщество единомышленниц для комфортного
                    восстановления.
                  </p>
                  <motion.button
                    className={`w-full ${
                      loading
                        ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-primary to-primary/80"
                    } text-primary-foreground py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-medium transition-all duration-500 shadow-xl relative overflow-hidden group`}
                    whileHover={{
                      scale: loading ? 1 : 1.02,
                      y: loading ? 0 : -3,
                      boxShadow: loading
                        ? undefined
                        : "0 15px 35px -10px rgba(239, 68, 68, 0.4)",
                    }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    onClick={() => !loading && redirectToCheckout("standard")}
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
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                      )}
                      {loading ? "ОБРАБОТКА..." : "ЗАПИСАТЬСЯ НА КУРС"}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* VIP тариф */}
            <motion.div
              variants={scaleIn}
              className="bg-gradient-to-br from-softred-50/80 to-peach-50/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border-2 border-softred-200 shadow-2xl relative overflow-hidden flex flex-col group min-h-[600px]"
              whileHover={{
                scale: 1.03,
                y: -8,
                boxShadow: "0 30px 60px -12px rgba(232, 93, 93, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Popular badge with animation */}
              <motion.div
                className="absolute top-4 right-4 bg-softred-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(232, 93, 93, 0.7)",
                    "0 0 0 10px rgba(232, 93, 93, 0)",
                  ],
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
                className="absolute inset-0 bg-gradient-to-br from-softred-50/30 to-peach-50/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-prata text-softred-700 mb-1">
                    VIP
                  </h3>
                  <p className="text-sm text-softred-600 mb-3 font-medium">
                    "Личное сопровождение"
                  </p>
                  <motion.div
                    className="text-3xl sm:text-4xl font-light text-softred-600"
                    whileHover={{ scale: 1.1, color: "hsl(0, 69%, 57%)" }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    $129
                  </motion.div>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
                  {[
                    {
                      text: "Всё из тарифа «Стандарт»",
                      icon: "🌟",
                    },
                    {
                      text: "Индивидуальная консультация (60 минут)",
                      icon: "🧭",
                    },
                    {
                      text: "Возможность задать личные вопросы напрямую",
                      icon: "📩",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 3 }}
                    >
                      <motion.div
                        className="w-10 h-10 bg-gradient-to-br from-softred-400 to-softred-300 border border-softred-400/30 rounded-xl flex items-center justify-center flex-shrink-0 text-lg shadow-md"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, -10, 10, 0],
                          backgroundColor: "rgba(232, 93, 93, 0.4)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          duration: 0.6,
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <p className="text-softred-700 leading-relaxed font-medium text-sm sm:text-base">
                        {feature.text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto">
                  <p className="text-softred-600 text-sm text-center mb-4 leading-relaxed">
                    Для тех, кто хочет глубоко, прицельно и под чутким
                    вниманием.
                  </p>
                  <motion.button
                    className={`w-full ${
                      loading
                        ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-softred-500 via-softred-600 to-rose-600"
                    } text-white py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-medium transition-all duration-500 shadow-xl relative overflow-hidden group`}
                    whileHover={{
                      scale: loading ? 1 : 1.02,
                      y: loading ? 0 : -3,
                      boxShadow: loading
                        ? undefined
                        : "0 20px 40px -10px rgba(232, 93, 93, 0.5)",
                    }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    onClick={() => !loading && redirectToCheckout("vip")}
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
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                      )}
                      {loading ? "ОБРАБОТКА..." : "ЗАПИСАТЬСЯ НА КУРС"}
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
            rgba(254, 252, 252, 0.95) 0%, 
            rgba(254, 242, 242, 1) 50%, 
            rgba(252, 228, 236, 0.95) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8">
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
                <h3 className="text-2xl sm:text-3xl font-prata text-primary mb-3 sm:mb-4">
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
            rgba(255, 247, 237, 0.8) 0%, 
            rgba(254, 228, 226, 0.7) 50%, 
            rgba(253, 216, 213, 0.6) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8">
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
                  <div className="px-3 sm:px-4 pb-4 sm:pb-6 pt-3 sm:pt-4">
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
            rgba(255, 251, 248, 0.95) 0%, 
            rgba(254, 235, 236, 1) 50%, 
            rgba(252, 216, 218, 0.95) 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-prata text-primary mb-6 sm:mb-8">
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
          y: showFloatingCTA ? 0 : 100,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <motion.button
          className="bg-gradient-to-r from-softred-500 via-peach-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-2xl font-semibold text-sm sm:text-base flex items-center gap-2 backdrop-blur-sm border-2 border-white/30 relative overflow-hidden group"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToPricing}
        >
          {/* Анимированный фоновый эффект */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-rose-400 via-softred-400 to-peach-400 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          <motion.div className="relative z-10 flex items-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
            >
              💝
            </motion.div>
            Получить курс
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              →
            </motion.div>
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
}

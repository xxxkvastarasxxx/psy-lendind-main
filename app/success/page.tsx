"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const courseParam = searchParams.get('course'); // Fallback course type from URL
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState<{
    courseType: string;
    courseName: string;
    telegramLink: string;
    courseDescription: string;
  } | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      // Handle demo sessions (they start with 'demo_')
      if (sessionId.startsWith('demo_')) {
        const courseType = sessionId.includes('basic') ? 'basic' : 
                          sessionId.includes('standard') ? 'standard' : 
                          sessionId.includes('vip') ? 'vip' : 
                          courseParam || 'basic'; // Use URL param as fallback
        
        const demoData = getCourseData(courseType);
        setCourseData(demoData);
        setLoading(false);
        return;
      }

      // For real Stripe sessions, try to fetch from API
      try {
        const response = await fetch(`/api/session-details?session_id=${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          
          // Check if payment failed and redirect to failed page
          if (data.mode === 'failed') {
            window.location.href = `/payment-failed?reason=${data.reason || 'failed'}&course=${data.courseType}&session_id=${sessionId}`;
            return;
          }
          
          const courseData = getCourseData(data.courseType || courseParam || 'basic');
          setCourseData(courseData);
        } else {
          // Fallback to course parameter or basic course if API fails
          setCourseData(getCourseData(courseParam || 'basic'));
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
        // Fallback to course parameter or basic course
        setCourseData(getCourseData(courseParam || 'basic'));
      }

      setLoading(false);
    };

    fetchSessionData();
  }, [sessionId, courseParam]);

  const getCourseData = (courseType: string) => {
    const courseConfigs = {
      basic: {
        courseType: 'basic',
        courseName: 'Курс "Самостоятельная работа"',
        telegramLink: 'https://t.me/SvetlanaTsyganova_bot?start=w42085193',
        courseDescription: '5 теоретических видеоуроков + рабочая тетрадь + доступ на 30 дней'
      },
      standard: {
        courseType: 'standard',
        courseName: 'Курс "Поддержка и сообщество"',
        telegramLink: 'https://t.me/SvetlanaTsyganova_bot?start=w42371699',
        courseDescription: 'Всё из базового + доступ в закрытый чат + ответы от автора + пожизненный доступ'
      },
      vip: {
        courseType: 'vip',
        courseName: 'Курс "Личное сопровождение"',
        telegramLink: 'https://t.me/SvetlanaTsyganova_bot?start=w42371717',
        courseDescription: 'Всё из тарифа "Стандарт" + индивидуальная консультация + личные вопросы автору'
      }
    };

    return courseConfigs[courseType as keyof typeof courseConfigs] || courseConfigs.basic;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-blue-600" />
          </motion.div>
          
          <h1 className="text-2xl font-light text-gray-800 mb-4">
            Оплата прошла успешно!
          </h1>
          
          {courseData && (
            <div className="text-gray-600 mb-8 space-y-3">
              <p>Спасибо за покупку курса!</p>
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-2">{courseData.courseName}</h3>
                <p className="text-sm text-blue-700">{courseData.courseDescription}</p>
              </div>
              <p className="font-medium">Ваша ссылка для доступа к курсу:</p>
              <a 
                href={courseData.telegramLink}
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-block font-medium text-blue-600 hover:text-blue-800 break-all bg-blue-50 p-3 rounded-lg transition-colors duration-200"
              >
                {courseData.telegramLink}
              </a>
            </div>
          )}
          
          {!courseData && (
            <div className="text-gray-600 mb-8 space-y-2">
              <p>Спасибо за покупку курса!</p>
              <p>Ваша ссылка на доступ к курсу:</p>
              <p className="font-medium text-blue-600 break-all">https://t.me/SvetlanaTsyganova_bot?start=w41560900</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Heart className="w-5 h-5 text-primary" />
              <span>Начните свой путь к исцелению</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            {sessionId && (
              <p className="text-sm text-gray-500 mb-4">
                Session ID: {sessionId}
              </p>
            )}
            
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-3 rounded-xl font-medium transition-all duration-300"
              >
                Вернуться на главную
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

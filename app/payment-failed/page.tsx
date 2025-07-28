"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw, CreditCard, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason') || 'canceled';
  const courseParam = searchParams.get('course') || 'basic';
  const sessionId = searchParams.get('session_id');
  
  const [courseData, setCourseData] = useState<{
    courseType: string;
    courseName: string;
    price: string;
  } | null>(null);

  useEffect(() => {
    const getCourseData = (courseType: string) => {
      const courseConfigs = {
        basic: {
          courseType: 'basic',
          courseName: 'Курс "Самостоятельная работа"',
          price: '$29'
        },
        standard: {
          courseType: 'standard',
          courseName: 'Курс "Поддержка и сообщество"',
          price: '$59'
        },
        vip: {
          courseType: 'vip',
          courseName: 'Курс "Личное сопровождение"',
          price: '$129'
        }
      };
      return courseConfigs[courseType as keyof typeof courseConfigs] || courseConfigs.basic;
    };

    setCourseData(getCourseData(courseParam));
  }, [courseParam]);

  const getFailureDetails = (reason: string) => {
    switch (reason) {
      case 'canceled':
        return {
          title: 'Оплата была отменена',
          message: 'Вы отменили процесс оплаты. Ничего страшного - вы можете попробовать еще раз в любое время.',
          icon: XCircle,
          iconColor: 'text-amber-600',
          bgColor: 'bg-amber-100'
        };
      case 'failed':
        return {
          title: 'Оплата не прошла',
          message: 'К сожалению, платеж не был обработан. Это может произойти по разным причинам - проблемы с картой, недостаточно средств или технические неполадки.',
          icon: AlertTriangle,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-100'
        };
      case 'expired':
        return {
          title: 'Сессия оплаты истекла',
          message: 'Время для завершения оплаты истекло. Пожалуйста, начните процесс покупки заново.',
          icon: RefreshCw,
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-100'
        };
      default:
        return {
          title: 'Что-то пошло не так',
          message: 'Произошла техническая ошибка при обработке платежа. Пожалуйста, попробуйте еще раз.',
          icon: XCircle,
          iconColor: 'text-gray-600',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const failureDetails = getFailureDetails(reason);
  const IconComponent = failureDetails.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-20 h-20 ${failureDetails.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
          >
            <IconComponent className={`w-10 h-10 ${failureDetails.iconColor}`} />
          </motion.div>
          
          <h1 className="text-2xl font-light text-gray-800 mb-4">
            {failureDetails.title}
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {failureDetails.message}
          </p>

          {courseData && (
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <h3 className="font-semibold text-blue-800 mb-1">{courseData.courseName}</h3>
              <p className="text-blue-700 font-medium">{courseData.price}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-medium text-gray-800 mb-2">Что делать дальше?</h4>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Проверьте данные банковской карты</li>
                <li>• Убедитесь, что на счету достаточно средств</li>
                <li>• Попробуйте другую карту</li>
                <li>• Обратитесь в службу поддержки банка</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
            {sessionId && (
              <p className="text-sm text-gray-500 mb-4">
                Session ID: {sessionId}
              </p>
            )}
            
            <Link href="/#pricing-section">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-3 rounded-xl font-medium transition-all duration-300 mb-3 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Попробовать еще раз
              </motion.button>
            </Link>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Вернуться на главную
              </motion.button>
            </Link>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Нужна помощь?</p>
              <a 
                href="mailto:twizug55@gmail.com" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
              >
                twizug55@gmail.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}

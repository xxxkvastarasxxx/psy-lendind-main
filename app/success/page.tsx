"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Download, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always set loading to false after component mounts
    setLoading(false);
  }, []);

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
          
          <p className="text-gray-600 mb-8">
            Спасибо за покупку курса! В ближайшее время на вашу почту придет письмо с доступом к материалам.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Mail className="w-5 h-5 text-primary" />
              <span>Проверьте вашу электронную почту</span>
            </div>
            
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Download className="w-5 h-5 text-primary" />
              <span>Материалы будут доступны в течение 24 часов</span>
            </div>
            
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

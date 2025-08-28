'use client';

import { useState } from 'react';
import { Calculator, Upload, MessageSquare, BookOpen, Moon, Sun, Star } from 'lucide-react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('8');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-indigo-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Math Lab Enhanced
                </h1>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  Plataforma Inteligente de Matemática
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Grade Selector */}
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                <option value="7">7º Ano</option>
                <option value="8">8º Ano</option>
                <option value="9">9º Ano</option>
              </select>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? 
                  <Sun className="h-5 w-5 text-yellow-500" /> : 
                  <Moon className="h-5 w-5 text-gray-700" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Aprende Matemática de Forma{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Inteligente
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Plataforma avançada com IA para resolver problemas, carregar ficheiros PDF, 
              e aprender matemática de forma interativa para o {selectedGrade}º ano.
            </p>
            
            <div className="flex items-center justify-center space-x-6 mb-12">
              <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                <Star className="h-5 w-5 mr-2 fill-current" />
                <span className="font-medium">IA Avançada</span>
              </div>
              <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                <Upload className="h-5 w-5 mr-2" />
                <span className="font-medium">Upload de PDFs</span>
              </div>
              <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                <MessageSquare className="h-5 w-5 mr-2" />
                <span className="font-medium">Chat Inteligente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Funcionalidades Principais
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Chat AI Feature */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-200 dark:border-gray-500">
              <div className="p-3 bg-indigo-600 rounded-lg inline-block mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Chat com IA
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Faz perguntas sobre matemática e recebe explicações detalhadas e personalizadas.
              </p>
              <a
                href="/chat"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
              >
                Começar Chat →
              </a>
            </div>

            {/* File Upload Feature */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200 dark:border-gray-500">
              <div className="p-3 bg-purple-600 rounded-lg inline-block mb-4">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Upload de Ficheiros
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Carrega PDFs de exercícios e recebe ajuda instantânea da IA.
              </p>
              <a
                href="/upload"
                className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                Carregar Ficheiro →
              </a>
            </div>

            {/* Study Materials */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200 dark:border-gray-500">
              <div className="p-3 bg-green-600 rounded-lg inline-block mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Materiais de Estudo
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Acede a resumos, exercícios e explicações para o {selectedGrade}º ano.
              </p>
              <a
                href="/materials"
                className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
              >
                Ver Materiais →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h3 className="text-3xl font-bold mb-6">
              Pronto para Começar?
            </h3>
            <p className="text-xl text-indigo-100 mb-8">
              Inicia agora a tua jornada de aprendizagem matemática com tecnologia de IA.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/chat"
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Fazer uma Pergunta
              </a>
              <a
                href="/upload"
                className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-800 transition-colors border-2 border-indigo-500 shadow-lg"
              >
                Carregar PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Math Lab Enhanced</span>
              </div>
              <p className="text-gray-400">
                Plataforma inteligente para aprendizagem de matemática com IA avançada.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Funcionalidades</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Chat com IA</li>
                <li>Upload de PDFs</li>
                <li>Materiais de Estudo</li>
                <li>Exercícios Personalizados</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Anos Letivos</h4>
              <ul className="space-y-2 text-gray-400">
                <li>7º Ano</li>
                <li>8º Ano</li>
                <li>9º Ano</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Math Lab Enhanced. Desenvolvido com IA para a educação.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

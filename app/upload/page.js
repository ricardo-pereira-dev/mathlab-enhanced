'use client';

import { useState } from 'react';
import { Upload, Home, MessageSquare, Moon, Sun, Calculator, FileText } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
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
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Math Lab Enhanced
                  </h1>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">
                    Upload de Ficheiros
                  </p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <Home className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Link>
              
              <Link 
                href="/chat"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </Link>

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

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Upload de Ficheiros PDF
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Carrega os teus exercícios de matemática e recebe análise automática da IA
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center">
              <div className="p-4 bg-indigo-100 dark:bg-indigo-900 rounded-full inline-block mb-6">
                <Upload className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Seleciona um ficheiro PDF
              </h3>
              
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="fileInput"
              />
              
              <label
                htmlFor="fileInput"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer inline-block mb-6"
              >
                Escolher Ficheiro
              </label>
              
              {selectedFile && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <FileText className="h-6 w-6 text-red-500" />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {selectedFile.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
              
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Suporta ficheiros PDF até 10MB. A IA irá analisar o conteúdo e identificar os tópicos matemáticos.
              </p>
              
              {selectedFile && (
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Analisar Ficheiro
                </button>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                ✨ Análise Automática
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                A IA identifica tópicos, nível de dificuldade e gera sugestões personalizadas de estudo.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                💬 Integração com Chat
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Depois do upload, podes fazer perguntas específicas sobre os exercícios no chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

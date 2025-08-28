'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Home, MessageSquare, Moon, Sun, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    );
}
    
    setFiles(prev => [...prev, ...validFiles.map(file => ({
      file,
      id: Date.now() + Math.random(),
      status: 'ready',
      progress: 0
    }))]);
  }, []);

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles.map(file => ({
      file,
      id: Date.now() + Math.random(),
      status: 'ready',
      progress: 0
    }))]);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    setAnalysisResults(prev => prev.filter(r => r.fileId !== id));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    for (let fileObj of files) {
      if (fileObj.status !== 'ready') continue;
      
      // Update file status to uploading
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { ...f, status: 'uploading', progress: 0 } : f
      ));

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setFiles(prev => prev.map(f => 
          f.id === fileObj.id ? { ...f, progress } : f
        ));
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Mark as completed and add analysis
      setFiles(prev => prev.map(f => 
        f.id === fileObj.id ? { ...f, status: 'completed' } : f
      ));

      // Add analysis result
      const analysis = generateAnalysis(fileObj.file.name);
      setAnalysisResults(prev => [...prev, {
        fileId: fileObj.id,
        fileName: fileObj.file.name,
        ...analysis
      }]);
    }
    
    setUploading(false);
  };

  const generateAnalysis = (fileName) => {
    const topics = [
      'Equações do 1º grau',
      'Funções afim',
      'Geometria plana',
      'Probabilidades',
      'Estatística descritiva',
      'Proporcionalidade',
      'Teorema de Pitágoras',
      'Sistemas de equações'
    ];
    
    const difficulties = ['Fácil', 'Médio', 'Difícil'];
    const randomTopics = topics.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    return {
      topics: randomTopics,
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      exercises: Math.floor(Math.random() * 15) + 5,
      summary: `Este ficheiro contém exercícios sobre ${randomTopics.join(', ')}. Identifiquei ${Math.floor(Math.random() * 15) + 5} exercícios com dificuldade ${difficulties[Math.floor(Math.random() * difficulties.length)]}.`,
      suggestions: [
        'Revê os conceitos básicos antes de começar',
        'Pratica exercícios semelhantes',
        'Usa o chat para esclarecer dúvidas específicas'
      ]
    };
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Upload de Ficheiros PDF
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Carrega os teus exercícios de matemática e recebe análise automática da IA
            </p>
          </div>

          {/* Upload Area */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragOver
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-4 rounded-full transition-colors ${
                  dragOver ? 'bg-indigo-200 dark:bg-indigo-800' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <Upload className={`h-12 w-12 transition-colors ${
                    dragOver ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
                  }`} />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {dragOver ? 'Solta os ficheiros aqui!' : 'Arrasta ficheiros PDF ou clica para selecionar'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Suporta apenas ficheiros PDF até 10MB
                  </p>
                </div>

                <input
                  type="file"
                  multiple
                  accept=".pdf,application/pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                  Selecionar Ficheiros
                </label>
              </div>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Ficheiros ({files.length})
                  </h3>
                  {files.some(f => f.status === 'ready') && (
                    <button
                      onClick={uploadFiles}
                      disabled={uploading}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {uploading ? 'A carregar...' : 'Carregar Todos'}
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {files.map((fileObj) => (
                    <div key={fileObj.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex-shrink-0">
                        <FileText className="h-8 w-8 text-red-500" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {fileObj.file.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            {fileObj.status === 'completed' && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {fileObj.status === 'uploading' && (
                              <div className="animate-spin">
                                <AlertCircle className="h-5 w-5 text-indigo-500" />
                              </div>
                            )}
                            <button
                              onClick={() => removeFile(fileObj.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatFileSize(fileObj.file.size)} • 
                          <span className={`ml-1 capitalize ${
                            fileObj.status === 'ready' ? 'text-gray-500' :
                            fileObj.status === 'uploading' ? 'text-indigo-500' :
                            'text-green-500'
                          }`}>
                            {fileObj.status === 'ready' ? 'Pronto' :
                             fileObj.status === 'uploading' ? 'A carregar' :
                             'Concluído'}
                          </span>
                        </p>
                        
                        {fileObj.status === 'uploading' && (
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${fileObj.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysisResults.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Análise dos Ficheiros
              </h3>
              
              {analysisResults.map((result) => (
                <div key={result.fileId} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <FileText className="h-6 w-6 text-indigo-600" />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {result.fileName}
                      </h4>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-3">Resumo da Análise</h5>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {result.summary}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Exercícios encontrados:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{result.exercises}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Dificuldade:</span>
                            <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                              result.difficulty === 'Fácil' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              result.difficulty === 'Médio' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {result.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-3">Tópicos Identificados</h5>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.topics.map((topic, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-sm"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        <h6 className="font-medium text-gray-900 dark:text-white mb-2">Sugestões de Estudo</h6>
                        <ul className="space-y-1">
                          {result.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex space-x-3">
                        <Link
                          href="/chat"
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                          Fazer Pergunta sobre este Ficheiro
                        </Link>
                        <button className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                          Ver Exercícios Similares
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

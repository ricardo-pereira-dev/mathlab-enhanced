'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Home, Moon, Sun, Calculator, Upload } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Sou o teu assistente de matemática. Em que posso ajudar-te hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: getBotResponse(userMessage.content),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('equação') || lowerInput.includes('equacao')) {
      return 'Para resolver equações do 1º grau, segue estes passos:\n\n1. Isola os termos com x de um lado\n2. Isola os números do outro lado\n3. Divide ambos os lados pelo coeficiente de x\n\nExemplo: 2x + 5 = 15\n2x = 15 - 5\n2x = 10\nx = 5\n\nQueres que resolva alguma equação específica?';
    }
    
    if (lowerInput.includes('função') || lowerInput.includes('funcao')) {
      return 'As funções são uma das bases da matemática! Uma função afim tem a forma f(x) = ax + b.\n\n• a é o coeficiente angular (declive)\n• b é o termo independente (ordenada na origem)\n\nPor exemplo: f(x) = 2x + 3\n- Para x = 1: f(1) = 2(1) + 3 = 5\n- Para x = 0: f(0) = 2(0) + 3 = 3\n\nQueres que explique algum tipo específico de função?';
    }
    
    if (lowerInput.includes('geometria')) {
      return 'A geometria é fascinante! Aqui tens algumas fórmulas importantes:\n\n📐 **Triângulos:**\n• Área = (base × altura) ÷ 2\n• Teorema de Pitágoras: a² + b² = c²\n\n⭕ **Círculos:**\n• Área = π × r²\n• Perímetro = 2 × π × r\n\n◼️ **Quadrados/Retângulos:**\n• Área = comprimento × largura\n• Perímetro = 2(comprimento + largura)\n\nSobre que figura geométrica queres saber mais?';
    }
    
    if (lowerInput.includes('probabilidade')) {
      return 'A probabilidade mede a chance de um evento acontecer:\n\nP(evento) = Casos favoráveis ÷ Casos possíveis\n\n🎲 **Exemplo com dado:**\nProbabilidade de sair 6 = 1/6 ≈ 16.67%\n\n🃏 **Exemplo com cartas:**\nProbabilidade de sair um Ás = 4/52 = 1/13 ≈ 7.69%\n\nA probabilidade varia entre 0 (impossível) e 1 (certeza).\n\nQueres praticar com algum exercício específico?';
    }
    
    return `Entendo que queres ajuda com: "${userInput}"\n\nPosso ajudar-te com:\n• Equações e inequações\n• Funções (afim, quadrática)\n• Geometria e trigonometria\n• Probabilidades e estatística\n• Números e operações\n\nPodes ser mais específico sobre o que precisas? Por exemplo:\n- "Como resolver x² - 5x + 6 = 0?"\n- "Explica o teorema de Pitágoras"\n- "Calcula a área de um círculo com raio 5"`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
                    Chat Matemático
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
                href="/upload"
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <Upload className="h-5 w-5 text-gray-700 dark:text-gray-300" />
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

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-[calc(100vh-200px)]">
          
          {/* Messages Area */}
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'bot' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}>
                    {message.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  
                  <div className={`flex-1 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl ${
                    message.type === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`inline-block p-4 rounded-lg ${
                      message.type === 'bot'
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        : 'bg-indigo-600 text-white'
                    }`}>
                      <div className="whitespace-pre-wrap break-words">
                        {message.content}
                      </div>
                    </div>
                    <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp.toLocaleTimeString('pt-PT', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex space-x-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escreve a tua pergunta sobre matemática..."
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="2"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[50px]"
                >
                  <Send size={18} />
                </button>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {['Como resolver equações?', 'Explica funções afim', 'Geometria básica', 'Probabilidades'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

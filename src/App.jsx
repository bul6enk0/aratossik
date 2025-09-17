import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = {
    home: useRef(null),
    features: useRef(null),
    rules: useRef(null),
    connect: useRef(null),
    contact: useRef(null)
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(key);
          }
        }
      });

      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id');
        if (sectionTop < window.innerHeight * 0.75) {
          setIsVisible(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionRefs[sectionId]?.current) {
      window.scrollTo({
        top: sectionRefs[sectionId].current.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const features = [
    { icon: '🔍', title: 'Уникальные правила', description: 'Специально разработанные правила для максимального веселья и баланса' },
    { icon: '🎮', title: 'Регулярные стримы', description: 'aratossik регулярно проводит стримы с участием зрителей на сервере' },
    { icon: '🏆', title: 'Турниры и ивенты', description: 'Еженедельные турниры с призами и специальными игровыми режимами' }
  ];

  const rules = [
    'Запрещено использовать читы и сторонние программы',
    'Уважайте других игроков и администрацию',
    'Не мешайте проведению стримов и ивентов',
    'Следуйте указаниям модераторов и администраторов',
    'Запрещено намеренное тимкиллинг без веской причины'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://static-cdn.jtvnw.net/jtv_user_pictures/d386f555-999d-4e02-ae6a-7b2e7cc41113-profile_image-70x70.png"
                alt="aratossik"
                className="w-12 h-12 rounded-xl border-2 border-purple-400/50 hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer"
                onClick={() => window.open('https://bul6enko.s-ul.eu/WjbUu1Fv', '_blank')}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-pulse">
                aratossik.pro
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {['home', 'features', 'rules', 'connect', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-purple-300 transition-colors relative group ${
                    activeSection === section ? 'text-purple-300' : ''
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'features' && 'Особенности'}
                  {section === 'rules' && 'Правила'}
                  {section === 'connect' && 'Подключиться'}
                  {section === 'contact' && 'Контакты'}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300 ${
                      activeSection === section ? 'w-full' : ''
                    }`}
                  ></span>
                </button>
              ))}
            </div>

            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 animate-fadeIn">
              <div className="flex flex-col space-y-4 px-4">
                {['home', 'features', 'rules', 'connect', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`py-2 hover:text-purple-300 transition-colors border-b border-white/10 capitalize ${
                      activeSection === section ? 'text-purple-300 font-bold' : ''
                    }`}
                  >
                    {section === 'home' && 'Главная'}
                    {section === 'features' && 'Особенности'}
                    {section === 'rules' && 'Правила'}
                    {section === 'connect' && 'Подключиться'}
                    {section === 'contact' && 'Контакты'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={sectionRefs.home} id="home" className="pt-28 pb-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                Добро пожаловать на сервер{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">aratossik.pro</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl">
                Присоединяйтесь к стримеру aratossik и его сообществу для незабываемых игр в SCP: Secret Laboratory с уникальными правилами и атмосферой.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('connect')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
                >
                  Подключиться сейчас
                </button>
                <a
                  href="https://twitch.tv/aratossik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-purple-400/50"
                >
                  Смотреть стрим
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl transform -z-10"></div>
              <img
                src="https://bul6enko.s-ul.eu/Rq98WV5q"
                alt="SCP Server"
                className="w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={sectionRefs.features} id="features" className="py-24 bg-gradient-to-r from-black/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Особенности сервера
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Наш сервер предлагает уникальные возможности для игроков всех уровней, создавая незабываемые впечатления от каждой игры
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-white/20 hover:border-purple-400/50 ${
                  isVisible.features ? 'animate-fadeInUp' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'both',
                  animationDuration: '0.8s',
                  animationTimingFunction: 'ease-out'
                }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section ref={sectionRefs.rules} id="rules" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Правила сервера
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Соблюдение правил обязательно для всех игроков. Это обеспечивает комфортную и честную игру для каждого участника сообщества.
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-purple-400/30 transition-all duration-500 transform hover:scale-105">
            <ul className="space-y-6">
              {rules.map((rule, index) => (
                <li
                  key={index}
                  className={`flex items-start space-x-4 p-5 bg-gradient-to-r from-white/5 to-transparent rounded-xl hover:from-white/10 transition-all duration-300 group ${
                    isVisible.rules ? 'animate-fadeInUp' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both',
                    animationDuration: '0.8s',
                    animationTimingFunction: 'ease-out'
                  }}
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center text-sm font-bold mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    {index + 1}
                  </span>
                  <span className="text-xl group-hover:text-purple-200 transition-colors duration-300 leading-relaxed">
                    {rule}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section ref={sectionRefs.connect} id="connect" className="py-24 bg-gradient-to-r from-black/20 to-blue-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Как подключиться
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Просто следуйте этим шагам, чтобы начать играть на нашем сервере уже сегодня
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-purple-400/30 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  Пошаговая инструкция
                </h3>
                <div className="space-y-8">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`flex items-start space-x-5 group ${isVisible.connect ? 'animate-fadeInUp' : ''}`}
                      style={{
                        animationDelay: `${step * 0.15}s`,
                        animationFillMode: 'both',
                        animationDuration: '0.8s',
                        animationTimingFunction: 'ease-out'
                      }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center text-lg font-bold mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {step}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2 group-hover:text-purple-200 transition-colors duration-300">
                          {step === 1 && 'Запустите SCP:SL'}
                          {step === 2 && 'Выберите "Мультиплеер"'}
                          {step === 3 && 'Введите адрес сервера'}
                          {step === 4 && 'Нажмите "Подключиться"'}
                        </h4>
                        <p className="text-white/80 leading-relaxed">
                          {step === 1 && 'Убедитесь, что у вас установлена последняя версия игры для лучшего игрового опыта.'}
                          {step === 2 && 'Перейдите в раздел многопользовательской игры в главном меню игры.'}
                          {step === 3 && (
                            <>
                              В поле "Адрес сервера" введите:{' '}
                              <span className="font-mono bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-2 py-1 rounded font-bold">
                                aratossik.pro
                              </span>
                            </>
                          )}
                          {step === 4 && 'Готово! Теперь вы можете играть на нашем сервере и получать удовольствие от игры.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-black/30 to-white/5 rounded-2xl p-8 border border-white/20 hover:border-purple-400/30 transition-all duration-500 transform hover:scale-105">
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent text-center">
                  Информация о сервере
                </h3>
                <div className="space-y-6">
                  <div className="flex flex-col p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <span className="text-white/70 text-sm uppercase tracking-wider mb-1">Адрес сервера</span>
                    <span className="font-mono text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                      aratossik.pro
                    </span>
                  </div>
                  <div className="flex flex-col p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <span className="text-white/70 text-sm uppercase tracking-wider mb-1">Порт сервера</span>
                    <span className="font-mono text-lg text-purple-300 font-bold">7777</span>
                  </div>
                  <div className="flex flex-col p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <span className="text-white/70 text-sm uppercase tracking-wider mb-1">Версия игры</span>
                    <span className="font-mono text-lg text-green-400 font-bold">Последняя</span>
                  </div>
                  <div className="flex flex-col p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <span className="text-white/70 text-sm uppercase tracking-wider mb-1">Макс. игроков</span>
                    <span className="font-mono text-lg text-blue-400 font-bold">32</span>
                  </div>
                  <div className="pt-6">
                    <a
                      href="https://twitch.tv/aratossik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M11.64 5.93h1.96v5.61h-1.96V5.93zm4.8 0H18.4v5.61h-1.96V5.93zM6.4 3.57L3.9 4.8v10.56c0 1.32 1.07 2.39 2.39 2.39h6.37l3.57 3.57v-3.57h1.19c1.32 0 2.39-1.07 2.39-2.39V4.8c0-1.32-1.07-2.39-2.39-2.39H6.4zm9.51 8.33H14.73V6.53h1.18v5.37zm-3.56 0H11.18V6.53h1.17v5.37zm-3.56 0H7.62V6.53h1.17v5.37z" />
                        </svg>
                        Посмотреть стримы на Twitch
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={sectionRefs.contact} id="contact" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Связаться с нами
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Есть вопросы или предложения? Свяжитесь с администрацией сервера для получения помощи или сотрудничества
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-purple-400/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${
                isVisible.contact ? 'animate-fadeInUp' : ''
              }`}
              style={{
                animationDelay: '0.2s',
                animationFillMode: 'both',
                animationDuration: '0.8s',
                animationTimingFunction: 'ease-out'
              }}
            >
              <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">📺</div>
              <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Twitch
              </h3>
              <p className="text-white/80 text-center mb-8 leading-relaxed">
                Смотрите прямые трансляции, участвуйте в играх и общайтесь с сообществом в реальном времени
              </p>
              <a
                href="https://twitch.tv/aratossik"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                twitch.tv/aratossik
              </a>
            </div>

            <div
              className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 hover:border-purple-400/30 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${
                isVisible.contact ? 'animate-fadeInUp' : ''
              }`}
              style={{
                animationDelay: '0.4s',
                animationFillMode: 'both',
                animationDuration: '0.8s',
                animationTimingFunction: 'ease-out'
              }}
            >
              <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">💬</div>
              <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Telegram
              </h3>
              <p className="text-white/80 text-center mb-8 leading-relaxed">
                По всем вопросам и предложениям вы можете связаться с администрацией через Telegram
              </p>
              <div className="space-y-3">
                <a
                  href="https://t.me/denolks5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  @denolks5
                </a>
                <a
                  href="https://t.me/bul6enko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl font-bold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  @bul6enko
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/10 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img
                src="https://static-cdn.jtvnw.net/jtv_user_pictures/d386f555-999d-4e02-ae6a-7b2e7cc41113-profile_image-70x70.png"
                alt="aratossik"
                className="w-10 h-10 rounded-xl border-2 border-purple-400/50"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                aratossik.pro
              </span>
            </div>
            <div className="text-center md:text-right">
              <div className="text-white/60 text-sm mb-2">© 2025 SCP:SL Server by aratossik. Все права защищены.</div>
              <div className="text-white/40 text-xs">Сайт разработан bul6enko</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

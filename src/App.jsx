import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, FaGlobeAmericas, FaChartBar, FaCog, FaFire, FaStar, 
  FaFlag, FaCity, FaCheck, FaTimes, FaVolumeUp, 
  FaVolumeMute, FaMoon, FaSun, FaArrowRight, FaTrophy 
} from 'react-icons/fa';

// --- YER SAYYORASIDAGI BARCHA RASMIY DAVLATLAR (195 TA) ---
const COUNTRIES_DB = [
  // --- OSIYO (ASIA) --- 48 ta davlat
  { name: "O'zbekiston", capital: "Toshkent", continent: "Asia", flag: "🇺🇿" },
  { name: "Yaponiya", capital: "Tokio", continent: "Asia", flag: "🇯🇵" },
  { name: "Xitoy", capital: "Pekin", continent: "Asia", flag: "🇨🇳" },
  { name: "Janubiy Koreya", capital: "Seul", continent: "Asia", flag: "🇰🇷" },
  { name: "Hindiston", capital: "Nyu-Deli", continent: "Asia", flag: "🇮🇳" },
  { name: "Turkiya", capital: "Ankara", continent: "Asia", flag: "🇹🇷" },
  { name: "Qozog'iston", capital: "Astana", continent: "Asia", flag: "🇰🇿" },
  { name: "BAA", capital: "Abu-Dabi", continent: "Asia", flag: "🇦🇪" },
  { name: "Saudiya Arabistoni", capital: "Ar-Riyod", continent: "Asia", flag: "🇸🇦" },
  { name: "Pokiston", capital: "Islomobod", continent: "Asia", flag: "🇵🇰" },
  { name: "Eron", capital: "Tehron", continent: "Asia", flag: "🇮🇷" },
  { name: "Indoneziya", capital: "Jakarta", continent: "Asia", flag: "🇮🇩" },
  { name: "Vyetnam", capital: "Xanoy", continent: "Asia", flag: "🇻🇳" },
  { name: "Isroil", capital: "Quddus", continent: "Asia", flag: "🇮🇱" },
  { name: "Tailand", capital: "Bangkok", continent: "Asia", flag: "🇹🇭" },
  { name: "Qirg'iziston", capital: "Bishkek", continent: "Asia", flag: "🇰🇬" },
  { name: "Tojikiston", capital: "Dushanbe", continent: "Asia", flag: "🇹🇯" },
  { name: "Turkmaniston", capital: "Ashxobod", continent: "Asia", flag: "🇹🇲" },
  { name: "Afg'oniston", capital: "Kobul", continent: "Asia", flag: "🇦🇫" },
  { name: "Iroq", capital: "Bag'dod", continent: "Asia", flag: "🇮🇶" },
  { name: "Iordaniya", capital: "Amman", continent: "Asia", flag: "🇯🇴" },
  { name: "Suriya", capital: "Damashq", continent: "Asia", flag: "🇸🇾" },
  { name: "Livan", capital: "Bayrut", continent: "Asia", flag: "🇱🇧" },
  { name: "Quvayt", capital: "Quvayt", continent: "Asia", flag: "🇰🇼" },
  { name: "Qatar", capital: "Doha", continent: "Asia", flag: "🇶🇦" },
  { name: "Ummon", capital: "Masqat", continent: "Asia", flag: "🇴🇲" },
  { name: "Yaman", capital: "Sano", continent: "Asia", flag: "🇾🇪" },
  { name: "Bahrayn", capital: "Manama", continent: "Asia", flag: "🇧🇭" },
  { name: "Malayziya", capital: "Kuala-Lumpur", continent: "Asia", flag: "🇲🇾" },
  { name: "Singapur", capital: "Singapur", continent: "Asia", flag: "🇸🇬" },
  { name: "Filippin", capital: "Manila", continent: "Asia", flag: "🇵🇭" },
  { name: "Myanma", capital: "Neypido", continent: "Asia", flag: "🇲🇲" },
  { name: "Kambodja", capital: "Pnompen", continent: "Asia", flag: "🇰🇭" },
  { name: "Laos", capital: "Ventyan", continent: "Asia", flag: "🇱🇦" },
  { name: "Bruney", capital: "Bandar-Seri-Begavan", continent: "Asia", flag: "🇧🇳" },
  { name: "Sharqiy Timor", capital: "Dili", continent: "Asia", flag: "🇹🇱" },
  { name: "Bangladesh", capital: "Dakka", continent: "Asia", flag: "🇧🇩" },
  { name: "Shri-Lanka", capital: "Kolombo", continent: "Asia", flag: "🇱开" },
  { name: "Nepal", capital: "Katmandu", continent: "Asia", flag: "🇳🇵" },
  { name: "Butan", capital: "Thimphu", continent: "Asia", flag: "🇧🇹" },
  { name: "Maldiv orollari", capital: "Male", continent: "Asia", flag: "🇲🇻" },
  { name: "Mongoliya", capital: "Ulan-Bator", continent: "Asia", flag: "🇲🇳" },
  { name: "Ozarbayjon", capital: "Baku", continent: "Asia", flag: "🇦🇿" },
  { name: "Armaniston", capital: "Yerevan", continent: "Asia", flag: "🇦🇲" },
  { name: "Gruziya", capital: "Tbilisi", continent: "Asia", flag: "🇬🇪" },
  { name: "Kipr", capital: "Nikosiya", continent: "Asia", flag: "🇨🇾" },
  { name: "Shimoliy Koreya", capital: "Pxenyan", continent: "Asia", flag: "🇰🇵" },
  { name: "Falastin", capital: "Ramalloh", continent: "Asia", flag: "🇵🇸" },

  // --- YEVROPA (EUROPE) --- 44 ta davlat
  { name: "Fransiya", capital: "Parij", continent: "Europe", flag: "🇫🇷" },
  { name: "Germaniya", capital: "Berlin", continent: "Europe", flag: "🇩🇪" },
  { name: "Italiya", capital: "Rim", continent: "Europe", flag: "🇮🇹" },
  { name: "Ispaniya", capital: "Madrid", continent: "Europe", flag: "🇪🇸" },
  { name: "Buyuk Britaniya", capital: "London", continent: "Europe", flag: "🇬🇧" },
  { name: "Rossiya", capital: "Moskva", continent: "Europe", flag: "🇷🇺" },
  { name: "Polsha", capital: "Varshava", continent: "Europe", flag: "🇵🇱" },
  { name: "Ukraina", capital: "Kiyev", continent: "Europe", flag: "🇺🇦" },
  { name: "Niderlandiya", capital: "Amsterdam", continent: "Europe", flag: "🇳🇱" },
  { name: "Belgiya", capital: "Bryussel", continent: "Europe", flag: "🇧🇪" },
  { name: "Gretsiya", capital: "Afina", continent: "Europe", flag: "🇬🇷" },
  { name: "Chexiya", capital: "Praga", continent: "Europe", flag: "🇨🇿" },
  { name: "Portugaliya", capital: "Lissabon", continent: "Europe", flag: "🇵🇹" },
  { name: "Shvetsiya", capital: "Stokgolm", continent: "Europe", flag: "🇸🇪" },
  { name: "Vengriya", capital: "Budapesht", continent: "Europe", flag: "🇭🇺" },
  { name: "Avstriya", capital: "Vena", continent: "Europe", flag: "🇦🇹" },
  { name: "Shveytsariya", capital: "Bern", continent: "Europe", flag: "🇨🇭" },
  { name: "Bolgariya", capital: "Sofiya", continent: "Europe", flag: "🇧🇬" },
  { name: "Daniya", capital: "Kopengagen", continent: "Europe", flag: "🇩🇰" },
  { name: "Finlyandiya", capital: "Xelsinki", continent: "Europe", flag: "🇫🇮" },
  { name: "Norvegiya", capital: "Oslo", continent: "Europe", flag: "🇳🇴" },
  { name: "Irlandiya", capital: "Dublin", continent: "Europe", flag: "🇮🇪" },
  { name: "Xorvatiya", capital: "Zagreb", continent: "Europe", flag: "🇭🇷" },
  { name: "Slovakiya", capital: "Bratislava", continent: "Europe", flag: "🇸🇰" },
  { name: "Litva", capital: "Vilnyus", continent: "Europe", flag: "🇱🇹" },
  { name: "Latviya", capital: "Riga", continent: "Europe", flag: "🇱🇻" },
  { name: "Estoniya", capital: "Tallin", continent: "Europe", flag: "🇪🇪" },
  { name: "Sloveniya", capital: "Lyublyana", continent: "Europe", flag: "🇸🇮" },
  { name: "Belarus", capital: "Minsk", continent: "Europe", flag: "🇧🇾" },
  { name: "Moldova", capital: "Kishinyov", continent: "Europe", flag: "🇲🇩" },
  { name: "Albaniya", capital: "Tirana", continent: "Europe", flag: "🇦🇱" },
  { name: "Shimoliy Makedoniya", capital: "Skopye", continent: "Europe", flag: "🇲🇰" },
  { name: "Bosniya va Gertsegovina", capital: "Sarayevo", continent: "Europe", flag: "🇧🇦" },
  { name: "Chernogoriya", capital: "Podgoritsa", continent: "Europe", flag: "🇲🇪" },
  { name: "Serbiya", capital: "Belgrad", continent: "Europe", flag: "🇷🇸" },
  { name: "Malta", capital: "Valletta", continent: "Europe", flag: "🇲🇹" },
  { name: "Islandiya", capital: "Reykyavik", continent: "Europe", flag: "🇮🇸" },
  { name: "Andorra", capital: "Andorra-la-Velya", continent: "Europe", flag: "🇦🇩" },
  { name: "Lixtenshteyn", capital: "Vaduts", continent: "Europe", flag: "🇱🇮" },
  { name: "Monako", capital: "Monako", continent: "Europe", flag: "🇲🇨" },
  { name: "San-Marino", capital: "San-Marino", continent: "Europe", flag: "🇸🇲" },
  { name: "Vatikan", capital: "Vatikan", continent: "Europe", flag: "🇻🇦" },
  { name: "Ruminiya", capital: "Buxarest", continent: "Europe", flag: "🇷🇴" },
  { name: "Lyuksemburg", capital: "Lyuksemburg", continent: "Europe", flag: "🇱🇺" },

  // --- AFRIKA (AFRICA) --- 54 ta davlat
  { name: "Misr", capital: "Qohira", continent: "Africa", flag: "🇪🇬" },
  { name: "Nigeriya", capital: "Abuja", continent: "Africa", flag: "🇳🇬" },
  { name: "Janubiy Afrika", capital: "Pretoriya", continent: "Africa", flag: "🇿🇦" },
  { name: "Marokash", capital: "Rabat", continent: "Africa", flag: "🇲🇦" },
  { name: "Jazoir", capital: "Jazoir", continent: "Africa", flag: "🇩🇿" },
  { name: "Efiopiya", capital: "Addis-Abeba", continent: "Africa", flag: "🇪🇹" },
  { name: "Keniya", capital: "Nayrobi", continent: "Africa", flag: "🇰🇪" },
  { name: "Gana", capital: "Akra", continent: "Africa", flag: "🇬🇭" },
  { name: "Tunis", capital: "Tunis", continent: "Africa", flag: "🇹🇳" },
  { name: "Liviya", capital: "Tripoli", continent: "Africa", flag: "🇱🇾" },
  { name: "Sudan", capital: "Xartum", continent: "Africa", flag: "🇸🇩" },
  { name: "Janubiy Sudan", capital: "Juba", continent: "Africa", flag: "🇸🇸" },
  { name: "Uganda", capital: "Kampala", continent: "Africa", flag: "🇺🇬" },
  { name: "Tanzaniya", capital: "Dodoma", continent: "Africa", flag: "🇹🇿" },
  { name: "Angola", capital: "Luanda", continent: "Africa", flag: "🇦🇴" },
  { name: "Mozambik", capital: "Maputu", continent: "Africa", flag: "🇲🇿" },
  { name: "Madagaskar", capital: "Antananarivu", continent: "Africa", flag: "🇲🇬" },
  { name: "Kot-d'Ivuar", capital: "Yamusukro", continent: "Africa", flag: "🇨🇮" },
  { name: "Kamerun", capital: "Yaunde", continent: "Africa", flag: "🇨🇲" },
  { name: "Niger", capital: "Niamey", continent: "Africa", flag: "🇳🇪" },
  { name: "Mali", capital: "Bamako", continent: "Africa", flag: "🇲🇱" },
  { name: "Senegal", capital: "Dakar", continent: "Africa", flag: "🇸🇳" },
  { name: "Zimbabve", capital: "Xarare", continent: "Africa", flag: "🇿🇼" },
  { name: "Zambiya", capital: "Lusaka", continent: "Africa", flag: "🇿🇲" },
  { name: "Botsvana", capital: "Gaborone", continent: "Africa", flag: "🇧🇼" },
  { name: "Namibiya", capital: "Vindxuk", continent: "Africa", flag: "🇳🇦" },
  { name: "Ruanda", capital: "Kigali", continent: "Africa", flag: "🇷🇼" },
  { name: "Burundi", capital: "Gitega", continent: "Africa", flag: "🇧🇮" },
  { name: "Somali", capital: "Mogadisho", continent: "Africa", flag: "🇸🇴" },
  { name: "Eritreya", capital: "Asmera", continent: "Africa", flag: "🇪🇷" },
  { name: "Jibuti", capital: "Jibuti", continent: "Africa", flag: "🇩🇯" },
  { name: "Gabon", capital: "Librevil", continent: "Africa", flag: "🇬🇦" },
  { name: "Kongo Respublikasi", capital: "Brazzavil", continent: "Africa", flag: "🇨🇬" },
  { name: "Kongo DR", capital: "Kinshasa", continent: "Africa", flag: "🇨🇩" },
  { name: "Markaziy Afrika Respublikasi", capital: "Bangi", continent: "Africa", flag: "🇨🇫" },
  { name: "Chad", capital: "Njamena", continent: "Africa", flag: "🇹🇩" },
  { name: "Benin", capital: "Porto-Novo", continent: "Africa", flag: "🇧🇯" },
  { name: "Togo", capital: "Lome", continent: "Africa", flag: "🇹🇬" },
  { name: "Burkina-Faso", capital: "Uagadugu", continent: "Africa", flag: "🇧🇫" },
  { name: "Gvineya", capital: "Konakri", continent: "Africa", flag: "🇬🇳" },
  { name: "Gvineya-Bisau", capital: "Bisau", continent: "Africa", flag: "🇬🇼" },
  { name: "Ekvatorial Gvineya", capital: "Malabo", continent: "Africa", flag: "🇬🇶" },
  { name: "Liberiya", capital: "Monroviya", continent: "Africa", flag: "🇱🇷" },
  { name: "Syerra-Leone", capital: "Fritaun", continent: "Africa", flag: "🇸🇱" },
  { name: "Gambiya", capital: "Banjul", continent: "Africa", flag: "🇬🇲" },
  { name: "Mavritaniya", capital: "Nuakshot", continent: "Africa", flag: "🇲🇷" },
  { name: "Kabo-Verde", capital: "Praya", continent: "Africa", flag: "🇨🇻" },
  { name: "San-Tome va Prinsipi", capital: "San-Tome", continent: "Africa", flag: "🇸🇹" },
  { name: "Seyshel orollari", capital: "Viktoriya", continent: "Africa", flag: "🇸🇨" },
  { name: "Mavrikiy", capital: "Port-Lui", continent: "Africa", flag: "🇲🇺" },
  { name: "Komor orollari", capital: "Moroni", continent: "Africa", flag: "🇰🇲" },
  { name: "Lesoto", capital: "Maseru", continent: "Africa", flag: "🇱🇸" },
  { name: "Esvatini", capital: "Mbabane", continent: "Africa", flag: "🇸🇿" },
  { name: "Malavi", capital: "Lilongve", continent: "Africa", flag: "🇲🇼" },

  // --- SHIMOLIY AMERIKA (NORTH AMERICA) --- 23 ta davlat
  { name: "AQSH", capital: "Vashington", continent: "North America", flag: "🇺🇸" },
  { name: "Kanada", capital: "Ottava", continent: "North America", flag: "🇨🇦" },
  { name: "Meksika", capital: "Mexiko", continent: "North America", flag: "🇲🇽" },
  { name: "Kuba", capital: "Gavana", continent: "North America", flag: "🇨🇺" },
  { name: "Yamayka", capital: "Kingston", continent: "North America", flag: "🇯🇲" },
  { name: "Gvatemala", capital: "Gvatemala", continent: "North America", flag: "🇬🇹" },
  { name: "Gonduras", capital: "Tegusigalpa", continent: "North America", flag: "🇭🇳" },
  { name: "Gaiti", capital: "Port-o-Prens", continent: "North America", flag: "🇭🇹" },
  { name: "Dominikan Respublikasi", capital: "Santo-Domingo", continent: "North America", flag: "🇩🇴" },
  { name: "Panama", capital: "Panama", continent: "North America", flag: "🇵🇦" },
  { name: "Kosta-Rika", capital: "San-Xose", continent: "North America", flag: "🇨🇷" },
  { name: "Nikaragua", capital: "Managua", continent: "North America", flag: "🇳🇮" },
  { name: "El-Salvador", capital: "San-Salvador", continent: "North America", flag: "🇸🇻" },
  { name: "Beliz", capital: "Belmopan", continent: "North America", flag: "🇧🇿" },
  { name: "Bagama orollari", capital: "Nassau", continent: "North America", flag: "🇧🇸" },
  { name: "Barbados", capital: "Bridjtaun", continent: "North America", flag: "🇧🇧" },
  { name: "Trinidad va Tobago", capital: "Port-of-Speyn", continent: "North America", flag: "🇹🇹" },
  { name: "Sent-Lyusiya", capital: "Kastri", continent: "North America", flag: "🇱🇨" },
  { name: "Sent-Vinsent va Grenadin", capital: "Kingstaun", continent: "North America", flag: "🇻🇨" },
  { name: "Grenada", capital: "Sent-Djordjes", continent: "North America", flag: "🇬🇩" },
  { name: "Antigua va Barbuda", capital: "Sent-Djons", continent: "North America", flag: "🇦🇬" },
  { name: "Sent-Kits va Nevis", capital: "Baster", continent: "North America", flag: "🇰🇳" },
  { name: "Dominika", capital: "Rozo", continent: "North America", flag: "🇩🇲" },

  // --- JANUBIY AMERIKA (SOUTH AMERICA) --- 12 ta davlat
  { name: "Braziliya", capital: "Braziliya", continent: "South America", flag: "🇧🇷" },
  { name: "Argentina", capital: "Buenos-Ayres", continent: "South America", flag: "🇦🇷" },
  { name: "Kolumbiya", capital: "Bogota", continent: "South America", flag: "🇨🇴" },
  { name: "Chili", capital: "Santyago", continent: "South America", flag: "🇨🇱" },
  { name: "Peru", capital: "Lima", continent: "South America", flag: "🇵🇪" },
  { name: "Venesuela", capital: "Karakas", continent: "South America", flag: "🇻🇪" },
  { name: "Ekvador", capital: "Kito", continent: "South America", flag: "🇪🇨" },
  { name: "Boliviya", capital: "Sucre", continent: "South America", flag: "🇧🇴" },
  { name: "Paragvay", capital: "Asunsion", continent: "South America", flag: "🇵🇾" },
  { name: "Urugvay", capital: "Montevideo", continent: "South America", flag: "🇺🇾" },
  { name: "Gayana", capital: "Djordjtaun", continent: "South America", flag: "🇬🇾" },
  { name: "Surinam", capital: "Paramaribo", continent: "South America", flag: "🇸🇷" },

  // --- AVSTRALIA VA OKEANIYA (AUSTRALIA/OCEANIA) --- 14 ta davlat
  { name: "Avstraliya", capital: "Kanberra", continent: "Australia", flag: "🇦🇺" },
  { name: "Yangi Zelandiya", capital: "Vellington", continent: "Australia", flag: "🇳🇿" },
  { name: "Papua-Yangi Gvineya", capital: "Port-Morsbi", continent: "Australia", flag: "🇵🇬" },
  { name: "Fiji", capital: "Suva", continent: "Australia", flag: "🇫🇯" },
  { name: "Solomon orollari", capital: "Honiara", continent: "Australia", flag: "🇸🇧" },
  { name: "Vanuatu", capital: "Port-Vila", continent: "Australia", flag: "🇻🇺" },
  { name: "Samoa", capital: "Apia", continent: "Australia", flag: "🇼🇸" },
  { name: "Tonga", capital: "Nukuafalofa", continent: "Australia", flag: "🇹🇴" },
  { name: "Kiribati", capital: "Janubiy Tarava", continent: "Australia", flag: "🇰🇮" },
  { name: "Tuvalu", capital: "Funafuti", continent: "Australia", flag: "🇹🇻" },
  { name: "Nauru", capital: "Yaren", continent: "Australia", flag: "🇳🇷" },
  { name: "Palau", capital: "Ngerulmud", continent: "Australia", flag: "🇵🇼" },
  { name: "Mikroneziya", capital: "Palikir", continent: "Australia", flag: "🇫🇲" },
  { name: "Marshall orollari", capital: "Madjuro", continent: "Australia", flag: "🇲🇭" }
];

const CONTINENTS_MAP = {
  "Asia": "Osiyo", "Europe": "Yevropa", "Africa": "Afrika",
  "North America": "Shimoliy Amerika", "South America": "Janubiy Amerika", "Australia": "Avstraliya"
};

export default function App() {
  // --- TELEGRAM SDK ---
  const [user, setUser] = useState("Guest");
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      setUser(tg.initDataUnsafe?.user?.first_name || "Guest");
    }
  }, []);

  // --- LOCAL STORAGE STATES ---
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState(() => localStorage.getItem('gm_theme') || 'dark');
  const [sound, setSound] = useState(() => localStorage.getItem('gm_sound') !== 'false');
  const [xp, setXp] = useState(() => Number(localStorage.getItem('gm_xp') || 0));
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('gm_streak') || 0));
  const [correct, setCorrect] = useState(() => Number(localStorage.getItem('gm_correct') || 0));
  const [played, setPlayed] = useState(() => Number(localStorage.getItem('gm_played') || 0));

  // --- GAME ENGINE STATES ---
  const [gameState, setGameState] = useState('menu'); 
  const [gameMode, setGameMode] = useState(null); 
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // --- PERSISTENCE & OVERFLOW FIX ---
  useEffect(() => {
    localStorage.setItem('gm_theme', theme);
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    
    // Global ekran surilishini butunlay bloklaymiz
    root.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.body.style.width = '100vw';
  }, [theme]);

  useEffect(() => { localStorage.setItem('gm_xp', xp); }, [xp]);
  useEffect(() => { localStorage.setItem('gm_streak', streak); }, [streak]);
  useEffect(() => { localStorage.setItem('gm_correct', correct); }, [correct]);
  useEffect(() => { localStorage.setItem('gm_played', played); }, [played]);

  // --- NAVIGATION FIX ---
  const goToHome = () => {
    setGameState('menu');
    setGameMode(null);
    setActiveTab('home');
  };

  // --- QUIZ GENERATORS ---
  const generateOddOneOut = () => {
    const contKeys = Object.keys(CONTINENTS_MAP);
    const targetCont = contKeys[Math.floor(Math.random() * contKeys.length)];
    const correctPool = COUNTRIES_DB.filter(c => c.continent === targetCont);
    const wrongPool = COUNTRIES_DB.filter(c => c.continent !== targetCont);

    const options = [...correctPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    const odd = wrongPool[Math.floor(Math.random() * wrongPool.length)];
    options.push(odd);
    
    setCurrentQuiz({
      title: `${CONTINENTS_MAP[targetCont]} guruhiga kirmaydiganini toping:`,
      options: options.sort(() => 0.5 - Math.random()),
      answer: odd.name,
      type: 'odd'
    });
  };

  const generateFlagQuiz = () => {
    const correct = COUNTRIES_DB[Math.floor(Math.random() * COUNTRIES_DB.length)];
    const wrongs = COUNTRIES_DB.filter(c => c.name !== correct.name).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [correct, ...wrongs].sort(() => 0.5 - Math.random());
    
    setCurrentQuiz({
      title: "Ushbu bayroq qaysi davlatniki?",
      display: correct.flag,
      options: options,
      answer: correct.name,
      type: 'flag'
    });
  };

  const generateCapitalQuiz = () => {
    const correct = COUNTRIES_DB[Math.floor(Math.random() * COUNTRIES_DB.length)];
    const wrongs = COUNTRIES_DB.filter(c => c.capital !== correct.capital).sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [correct, ...wrongs].sort(() => 0.5 - Math.random());

    setCurrentQuiz({
      title: `${correct.name} davlatining poytaxti qayer?`,
      options: options,
      answer: correct.capital,
      type: 'capital'
    });
  };

  const startLevel = (mode) => {
    setGameMode(mode);
    setGameState('playing');
    setIsAnswered(false);
    setSelectedId(null);
    if (mode === 'odd') generateOddOneOut();
    if (mode === 'flag') generateFlagQuiz();
    if (mode === 'capital') generateCapitalQuiz();
  };

  const handleSelect = (id) => {
    if (isAnswered) return;
    setSelectedId(id);
    setIsAnswered(true);
    setPlayed(p => p + 1);

    if (id === currentQuiz.answer) {
      setXp(x => x + 10);
      setCorrect(c => c + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    setIsAnswered(false);
    setSelectedId(null);
    if (gameMode === 'odd') generateOddOneOut();
    if (gameMode === 'flag') generateFlagQuiz();
    if (gameMode === 'capital') generateCapitalQuiz();
  };

  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 overflow-hidden relative ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* BACKGROUND EFFECTS WITH WRAPPER (Tuzatilgan joyi) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-5%] w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      {/* TOP HUD */}
      <div className="fixed top-0 left-0 w-full z-50 p-4 backdrop-blur-md bg-transparent">
        <div className={`flex justify-between items-center max-w-md mx-auto p-3 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'} shadow-xl`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg">
              <FaGlobeAmericas size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-emerald-500">GeoMaster Pro</p>
              <p className="text-sm font-bold truncate max-w-[120px]">Salom, {user}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 bg-orange-500/10 text-orange-500 px-2 py-1 rounded-lg border border-orange-500/20 font-black text-xs">
              <FaFire className="animate-pulse" /> {streak}
            </div>
            <div className="flex items-center gap-1 bg-blue-500/10 text-blue-500 px-2 py-1 rounded-lg border border-blue-500/20 font-black text-xs">
              <FaStar /> {xp}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT (Maksimal xavfsiz kenglik o'rnatildi) */}
      <main className="pt-24 pb-28 px-4 max-w-md mx-auto min-h-screen flex flex-col relative z-10 w-full box-border">
        <AnimatePresence mode="wait">
          
          {/* HOME MENU */}
          {activeTab === 'home' && gameState === 'menu' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 w-full"
            >
              {/* Level Card */}
              <div className={`p-5 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'} shadow-lg`}>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-xs font-bold opacity-50">Sizning unvoningiz</p>
                    <h3 className="text-2xl font-black text-emerald-500">Level {level}</h3>
                  </div>
                  <FaTrophy className="text-amber-400 text-3xl" />
                </div>
                <div className="w-full h-3 bg-slate-800/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  />
                </div>
                <p className="text-[10px] mt-2 font-bold opacity-40 text-right">{progress}/100 XP</p>
              </div>

              {/* Game Modes Grid */}
              <div className="grid grid-cols-1 gap-4 w-full">
                {[
                  { id: 'odd', title: 'Begonasini Top', icon: <FaGlobeAmericas />, color: 'from-orange-500 to-red-600', desc: "Qit'aga xos bo'lmagan davlatni aniqlang" },
                  { id: 'flag', title: 'Bayroqlar Quiz', icon: <FaFlag />, color: 'from-emerald-500 to-teal-600', desc: "Bayroq qaysi davlatga tegishli?" },
                  { id: 'capital', title: 'Poytaxtlar Quiz', icon: <FaCity />, color: 'from-blue-500 to-indigo-600', desc: "Davlatlarning poytaxtlarini biling" }
                ].map(mode => (
                  <motion.button
                    key={mode.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startLevel(mode.id)}
                    className={`group p-4 rounded-3xl border flex items-center gap-4 text-left transition-all w-full ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 text-white' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-900'} shadow-md`}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mode.color} flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform flex-shrink-0`}>
                      {mode.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-lg truncate">{mode.title}</h4>
                      <p className="text-xs opacity-50 font-medium truncate">{mode.desc}</p>
                    </div>
                    <FaArrowRight className="opacity-20 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* GAMEPLAY WINDOW */}
          {activeTab === 'home' && gameState === 'playing' && currentQuiz && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col flex-1 h-full w-full"
            >
              <div className={`p-6 rounded-[40px] border flex flex-col items-center justify-center gap-6 w-full ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} shadow-2xl`}>
                <div className="text-center w-full">
                  <h2 className="text-xl font-black mb-2 opacity-90 px-2">{currentQuiz.title}</h2>
                  {currentQuiz.display && (
                    <motion.div 
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      className="text-[90px] leading-none drop-shadow-xl my-4 select-none"
                    >
                      {currentQuiz.display}
                    </motion.div>
                  )}
                </div>

                <div className="w-full grid grid-cols-1 gap-3">
                  {currentQuiz.options.map((opt, i) => {
                    const isCorrect = (currentQuiz.type === 'capital' ? opt.capital : opt.name) === currentQuiz.answer;
                    const isSelected = (currentQuiz.type === 'capital' ? opt.capital : opt.name) === selectedId;
                    
                    let btnStyle = theme === 'dark' ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-900';
                    if (isAnswered) {
                      if (isCorrect) btnStyle = 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-500/40 shadow-lg';
                      else if (isSelected) btnStyle = 'bg-red-500 border-red-400 text-white shadow-red-500/40 shadow-lg';
                      else btnStyle = 'opacity-30';
                    }

                    return (
                      <motion.button
                        key={i}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSelect(currentQuiz.type === 'capital' ? opt.capital : opt.name)}
                        className={`p-4 rounded-2xl border font-bold text-base transition-all flex items-center justify-between w-full ${btnStyle}`}
                      >
                        <span className="flex items-center gap-3 truncate">
                          {currentQuiz.type !== 'flag' && <span className="flex-shrink-0">{opt.flag}</span>} 
                          <span className="truncate">{currentQuiz.type === 'capital' ? opt.capital : opt.name}</span>
                        </span>
                        <div className="flex-shrink-0 ml-2">
                          {isAnswered && isCorrect && <FaCheck />}
                          {isAnswered && isSelected && !isCorrect && <FaTimes />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {isAnswered && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextQuestion}
                  className="mt-6 w-full py-5 bg-emerald-500 text-white rounded-3xl font-black text-lg shadow-xl active:scale-95 transition-transform"
                >
                  DAVOM ETISH
                </motion.button>
              )}
            </motion.div>
          )}

          {/* STATS TAB */}
          {activeTab === 'stats' && (
            <motion.div 
              key="stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 w-full"
            >
              <h2 className="text-2xl font-black text-center mb-4">Statistika</h2>
              <div className="grid grid-cols-2 gap-4 w-full">
                {[
                  { label: 'To\'g\'ri', val: correct, color: 'text-emerald-500' },
                  { label: 'O\'yinlar', val: played, color: 'text-blue-500' },
                  { label: 'XP', val: xp, color: 'text-amber-500' },
                  { label: 'Streak', val: streak, color: 'text-orange-500' }
                ].map((s, i) => (
                  <div key={i} className={`p-5 rounded-3xl border text-center ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} shadow-lg`}>
                    <p className="text-xs font-bold opacity-40 uppercase mb-1">{s.label}</p>
                    <p className={`text-3xl font-black ${s.color}`}>{s.val}</p>
                  </div>
                ))}
              </div>
              <div className={`p-6 rounded-3xl border w-full ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                <p className="text-center text-sm font-bold opacity-60">To'g'ri topish foizi</p>
                <h3 className="text-4xl text-center font-black mt-2 text-emerald-500">
                  {played > 0 ? Math.round((correct / played) * 100) : 0}%
                </h3>
              </div>
            </motion.div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 w-full"
            >
              <h2 className="text-2xl font-black text-center mb-6">Sozlamalar</h2>
              
              <div className={`p-2 rounded-3xl border overflow-hidden w-full ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'} shadow-lg`}>
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-500/5 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <FaMoon className="text-blue-400" /> : <FaSun className="text-amber-500" />}
                    <span className="font-bold">Mavzu: {theme === 'dark' ? 'Tun' : 'Kun'}</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors flex-shrink-0 ${theme === 'dark' ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </button>

                <button 
                  onClick={() => setSound(!sound)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-500/5 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    {sound ? <FaVolumeUp className="text-emerald-500" /> : <FaVolumeMute className="text-slate-500" />}
                    <span className="font-bold">Ovoz effektlari</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors flex-shrink-0 ${sound ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${sound ? 'translate-x-6' : 'translate-x-0'}`} />
                  </div>
                </button>
              </div>

              <button 
                onClick={() => {
                  if(confirm("Haqiqatan ham hamma natijalarni o'chirmoqchimisiz?")) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="w-full p-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-3xl font-black text-sm active:scale-95 transition-transform"
              >
                PROGRESSNI NOLLASH
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* BOTTOM NAV BAR */}
      <nav className={`fixed bottom-0 left-0 w-full z-50 p-4 border-t backdrop-blur-lg ${theme === 'dark' ? 'bg-slate-950/90 border-slate-900' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-md mx-auto flex justify-around items-center w-full">
          {[
            { id: 'home', icon: <FaHome size={22} />, label: 'Asosiy', action: goToHome },
            { id: 'stats', icon: <FaChartBar size={22} />, label: 'Statlar' },
            { id: 'settings', icon: <FaCog size={22} />, label: 'Sozlama' }
          ].map(item => {
            const isTabActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => item.action ? item.action() : setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-all ${isTabActive ? 'text-emerald-500 scale-110' : 'opacity-40 hover:opacity-100 text-slate-500'}`}
              >
                <div className={`p-2 rounded-xl ${isTabActive ? 'bg-emerald-500/10 text-emerald-500' : ''}`}>
                  {item.icon}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-tighter ${isTabActive ? 'text-emerald-500' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
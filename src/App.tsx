import React, { useState, useMemo } from "react";
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  Mail, 
  Search, 
  ExternalLink, 
  Smartphone, 
  CheckSquare, 
  Info, 
  Lock, 
  Scale, 
  Send, 
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileCode,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { 
  APP_INFO, 
  POLICY_PORTUGUESE, 
  POLICY_ENGLISH, 
  HIGHLIGHTS_PORTUGUESE, 
  HIGHLIGHTS_ENGLISH, 
  PLAY_STORE_CHECKLIST,
  PolicySection
} from "./data";

export default function App() {
  // Configs & toggles
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introducao");
  const [copiedFormat, setCopiedFormat] = useState<"text" | "markdown" | "html" | null>(null);
  
  // Interactive Simulator States
  const [insuranceType, setInsuranceType] = useState<"auto" | "residencial" | "vida">("auto");
  const [simAge, setSimAge] = useState<number>(30);
  const [simRegion, setSimRegion] = useState("Sudeste");
  const [simulated, setSimulated] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<{ premium: string; company: string; score: string } | null>(null);

  // Play Store checklist completion ticks managed locally so user can check things off
  const [checklistState, setChecklistState] = useState<{ [key: string]: boolean }>({});

  // Contact Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("Dúvida de Privacidade");
  const [formMessage, setFormMessage] = useState("");
  const [formInquiries, setFormInquiries] = useState<Array<{
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    time: string;
  }>>([]);
  const [formSuccess, setFormSuccess] = useState(false);

  // Switch policy language text array
  const currentPolicy = lang === "pt" ? POLICY_PORTUGUESE : POLICY_ENGLISH;
  const currentHighlights = lang === "pt" ? HIGHLIGHTS_PORTUGUESE : HIGHLIGHTS_ENGLISH;

  // Filter sections by search query
  const filteredPolicy = useMemo(() => {
    if (!searchQuery.trim()) return currentPolicy;
    const query = searchQuery.toLowerCase();
    return currentPolicy.filter(
      (sec) =>
        sec.title.toLowerCase().includes(query) ||
        sec.content.toLowerCase().includes(query)
    );
  }, [searchQuery, currentPolicy]);

  // Handle simulate action (demonstrates app features transparently)
  const handleSimulate = () => {
    setSimulated(true);
    let premium = "R$ 1.200 / ano";
    let company = "Porto Corretora";
    let score = "9.8/10 Excelente";

    if (insuranceType === "auto") {
      if (simAge < 25) {
        premium = "R$ 2.450 / ano";
        company = "SulAmérica Proteção";
        score = "9.5/10 Seguro Integral";
      } else {
        premium = "R$ 1.580 / ano";
        company = "Allianz Auto";
        score = "9.7/10 Melhor Tarifa";
      }
    } else if (insuranceType === "residencial") {
      premium = simRegion === "Sudeste" ? "R$ 450 / ano" : "R$ 580 / ano";
      company = "Mapfre Lar";
      score = "9.9/10 Cobertura Completa";
    } else {
      // Vida
      premium = simAge > 50 ? "R$ 180 / mês" : "R$ 75 / mês";
      company = "Bradesco Seguros";
      score = "9.6/10 Mais Contratado";
    }

    setSimResult({ premium, company, score });
  };

  // Compile Copyable formats
  const generateRawText = () => {
    let output = `POLÍTICA DE PRIVACIDADE - ${APP_INFO.name}\n`;
    output += `Última atualização: ${lang === "pt" ? APP_INFO.lastUpdated : APP_INFO.lastUpdatedEN}\n\n`;
    currentPolicy.forEach((sec) => {
      output += `${sec.title}\n\n${sec.content}\n\n------------------------------\n\n`;
    });
    return output;
  };

  const generateMarkdown = () => {
    let output = `# Política de Privacidade - ${APP_INFO.name}\n\n`;
    output += `**Última atualização:** ${lang === "pt" ? APP_INFO.lastUpdated : APP_INFO.lastUpdatedEN}\n\n`;
    output += `Página oficial de Privacidade do Aplicativo publicado na Google Play Store.\n\n`;
    currentPolicy.forEach((sec) => {
      output += `## ${sec.title}\n\n${sec.content}\n\n`;
    });
    return output;
  };

  const generateHTML = () => {
    let output = `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>Política de Privacidade - ${APP_INFO.name}</title>\n</head>\n<body>\n`;
    output += `  <h1>Política de Privacidade do Aplicativo ${APP_INFO.name}</h1>\n`;
    output += `  <p><strong>Última atualização:</strong> ${lang === "pt" ? APP_INFO.lastUpdated : APP_INFO.lastUpdatedEN}</p>\n`;
    currentPolicy.forEach((sec) => {
      // Simple regex replaces for lists and bold sections back to HTML tag mockups
      let formattedContent = sec.content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\* (.*?)/g, '\n  <li>$1</li>')
        .split('\n\n').map(p => `  <p>${p.trim()}</p>`).join('\n');
      
      output += `  <section id="${sec.id}">\n    <h2>${sec.title}</h2>\n  ${formattedContent}\n  </section>\n`;
    });
    output += `</body>\n</html>`;
    return output;
  };

  // Handle click to copy
  const handleCopy = (format: "text" | "markdown" | "html") => {
    let textToCopy = "";
    if (format === "text") textToCopy = generateRawText();
    if (format === "markdown") textToCopy = generateMarkdown();
    if (format === "html") textToCopy = generateHTML();

    navigator.clipboard.writeText(textToCopy);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 3000);
  };

  // Handle printing/PDF export
  const handlePrint = () => {
    window.print();
  };

  // Submit Contact Inquiry
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    const newInquiry = {
      id: Math.random().toString(36).substr(2, 9),
      name: formName,
      email: formEmail,
      subject: formSubject,
      message: formMessage,
      time: new Date().toLocaleTimeString(),
    };

    setFormInquiries([newInquiry, ...formInquiries]);
    setFormSuccess(true);
    setFormName("");
    setFormEmail("");
    setFormMessage("");

    setTimeout(() => {
      setFormSuccess(false);
    }, 5000);
  };

  // Checklist toggles
  const handleChecklistToggle = (task: string) => {
    setChecklistState(prev => ({
      ...prev,
      [task]: !prev[task]
    }));
  };

  return (
    <div id="app-root" className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-800">
      
      {/* GLOBAL ALIGNMENT HEADER / HERO LANDING */}
      <header id="main-header" className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-40 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-md shadow-blue-600/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                  {APP_INFO.name}
                </span>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100 uppercase font-mono tracking-wider">
                  App Seguro
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">{lang === "pt" ? "Política de Privacidade Oficial" : "Official Privacy Policy"}</p>
            </div>
          </div>

          {/* Controls & Nav */}
          <div className="flex items-center gap-4">
            
            {/* Top Level Contact Button */}
            <a 
              href={`mailto:${APP_INFO.developerEmail}`} 
              className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              {APP_INFO.developerEmail}
            </a>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button 
                id="btn-lang-pt"
                onClick={() => setLang("pt")}
                className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  lang === "pt" 
                    ? "bg-white text-blue-700 shadow-xs" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                PT-BR
              </button>
              <button 
                id="btn-lang-en"
                onClick={() => setLang("en")}
                className={`text-xs px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                  lang === "en" 
                    ? "bg-white text-blue-700 shadow-xs" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ENGLISH
              </button>
            </div>

            {/* Print trigger Button */}
            <button 
              id="btn-print-top"
              onClick={handlePrint}
              aria-label="Imprimir canal de privacidade"
              className="text-slate-600 hover:text-blue-600 p-2 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200 shadow-xs bg-white cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* GRAND BENTO METRIC DASHBOARD */}
      <section id="bento-dashboard" className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 no-print space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 pb-4 border-b border-slate-200">
          <div className="flex flex-col text-left">
            <span className="text-blue-600 font-extrabold tracking-widest text-xs uppercase mb-1">{lang === "pt" ? "Transparência Legal" : "Legal Transparency"}</span>
            <span className="text-[10px] bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider w-fit inline-block mb-2">
              Google Play Console & AdMob SDK v1.4.0
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-none">
              {APP_INFO.name} <span className="text-slate-400 font-normal">{lang === "pt" ? "Diretrizes de Privacidade" : "Privacy Policy"}</span>
            </h1>
          </div>
          <div className="text-right">
            <div className="inline-block bg-white border border-slate-200 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider shadow-xs">
              {lang === "pt" ? "Última Atualização" : "Last Updated"}: {lang === "pt" ? APP_INFO.lastUpdated : APP_INFO.lastUpdatedEN}
            </div>
          </div>
        </div>

        {/* Bento Grid Layout - Row 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-left">
          
          {/* Bento Card 1: Main Summary and Commitment (col-span-6) */}
          <div className="col-span-12 lg:col-span-6 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-sm transition-shadow">
            <div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                {lang === "pt" ? "Nosso Compromisso com a Privacidade" : "Our Privacy Commitment"}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {lang === "pt" 
                  ? "Na Insurance Compare, priorizamos a proteção absoluta dos dados fornecidos por nossos usuários. Criamos este documento para deixar claro exatamente como nosso ecossistema de dados opera em conformidade com as exigências técnicas da Google Play Store."
                  : "At Insurance Compare, we prioritize the secure protection of all inputs you provide. This policy document clearly highlights how our system collects, transfers, and validates device information."
                }
              </p>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-xs font-semibold text-slate-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {lang === "pt" ? "Sem venda ou compartilhamento com corretores terceiros" : "No sold personal info to third-party insurance brokers"}
                </li>
                <li className="flex items-center text-xs font-semibold text-slate-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {lang === "pt" ? "Cálculos em tempo real de modo temporário e anônimo" : "Real-time query simulations are temporary & anonymous"}
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150">
              <p className="text-[11px] text-slate-500 font-medium italic">
                {lang === "pt" ? "Compatível com a Política de Desenvolvedores do Google Play Console." : "Compliant with Google Play Store Developer Program Policies."}
              </p>
            </div>
          </div>

          {/* Bento Card 2: AdMob Disclosure Card (col-span-3) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-slate-900 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block mb-2">
                {lang === "pt" ? "Parceiros Terceiros" : "Third-Party Partners"}
              </span>
              <h2 className="text-lg font-bold mb-3">{lang === "pt" ? "Publicidade & Google AdMob" : "Advertising & AdMob"}</h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                {lang === "pt"
                  ? "Utilizamos o Google AdMob para veiculação de anúncios. O SDK coleta o ID de Publicidade do Google (AAID) de forma criptografada para oferecer banners relevantes baseados nas suas escolhas."
                  : "We use Google AdMob to serve relevant ads. AdMob processes device identifiers (such as Google Advertising ID) to safe-keep personalized ad experiences."
                }
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800 mt-4">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-[9px] font-mono text-slate-400 tracking-wider">ADMOB_INTEGRATION_VERIFIED</span>
            </div>
          </div>

          {/* Bento Card 3: Data We Collect (col-span-3) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-blue-600 text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <h2 className="text-lg font-bold mb-4">{lang === "pt" ? "Dados que Coletamos" : "Information We Collect"}</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-white/20 pl-3">
                  <div className="text-[9px] font-bold uppercase opacity-85">{lang === "pt" ? "Info de Dispositivo" : "Device Info"}</div>
                  <p className="text-xs">{lang === "pt" ? "Modelo físico, versão do OS e dados de rede." : "Model, OS version, and network state headers."}</p>
                </div>
                <div className="border-l-2 border-white/20 pl-3">
                  <div className="text-[9px] font-bold uppercase opacity-85">{lang === "pt" ? "Logs de Simulação" : "Simulation Logs"}</div>
                  <p className="text-xs">{lang === "pt" ? "Idade e localização para estimativas locais." : "Demographic characteristics to map rates."}</p>
                </div>
                <div className="border-l-2 border-white/20 pl-3">
                  <div className="text-[9px] font-bold uppercase opacity-85">{lang === "pt" ? "Analytics de Cobertura" : "Performance Analytics"}</div>
                  <p className="text-xs">{lang === "pt" ? "Taxa de erro e estatísticas de uso em tela." : "Crash telemetry to secure calculation accuracy."}</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-[9px] bg-white/10 px-2 py-1 rounded inline-block font-mono">
                TLS 1.3 Encryption Active
              </div>
            </div>
          </div>

          {/* Bento Card 4: Micro Compliance Banner (col-span-3) */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-emerald-50 rounded-3xl p-5 border border-emerald-100 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">{lang === "pt" ? "Conformidade" : "Compliance"}</div>
              <div className="text-xs font-semibold text-emerald-600">{lang === "pt" ? "Políticas LGPD e GDPR" : "LGPD & GDPR Compliant"}</div>
            </div>
          </div>

          {/* Bento Card 5: Rights (col-span-4) */}
          <div className="col-span-12 md:col-span-4 lg:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 hover:shadow-sm transition-shadow">
            <h2 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
              <Scale className="w-4 h-4 text-slate-500" />
              <span>{lang === "pt" ? "Seus Direitos Legais" : "Your Legal Rights"}</span>
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {lang === "pt"
                ? "Como titular de dados pela LGPD, você possui direito integral a consultar, atualizar, corrigir ou apagar os seus históricos voluntários em nossa nuvem. Use nossas configurações locais no app para redefinir o ID de publicidade a qualquer instante."
                : "Under GDPR or national protections, you have the right to request immediate access, modification, or complete deletion of data parameters. You are eligible to reset user trackings on device configurations."
              }
            </p>
          </div>

          {/* Bento Card 6: Support (col-span-5) */}
          <div className="col-span-12 md:col-span-4 lg:col-span-5 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 hover:shadow-sm transition-shadow flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>{lang === "pt" ? "Canal de Suporte e Encarregado" : "Support & DPO Contacts"}</span>
              </h2>
              <p className="text-xs text-slate-500">
                {lang === "pt" ? "Dúvidas gerais de segurança ou solicitação de expurgo?" : "Any questions regarding files or removal?"}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-150 mt-3">
              <div className="flex-1">
                <div className="text-xs font-black text-blue-600 font-mono select-all">{APP_INFO.developerEmail}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">DPO Encarregado: Bruno</div>
              </div>
              <div className="w-16 h-16 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-center p-1 shrink-0">
                <span className="text-[8px] text-slate-400 font-bold leading-tight uppercase font-mono">DPO SAFE</span>
              </div>
            </div>
          </div>

        </div>

        {/* INTERACTIVE APPS: SIMULATOR & DEV PLAY KIT BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Interactive Bento Block: Live App Simulator (col-span-5) */}
          <div className="col-span-12 lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-left">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-600 text-white p-1.5 rounded-lg font-bold text-[10px] uppercase">APP</div>
                  <div>
                    <h4 className="text-sm font-extrabold tracking-tight">Simulator: Insurance Compare</h4>
                    <p className="text-[9px] text-slate-400">{lang === "pt" ? "Veja na prática como protegemos o fluxo" : "Examine data flow and privacy markers"}</p>
                  </div>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {lang === "pt" ? "Dispositivo Local" : "Client Side"}
                </div>
              </div>

              {/* Simulation Screen */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-850 space-y-4 text-left font-sans">
                {/* Simulated Insurance type */}
                <div className="flex justify-between items-center gap-2">
                  <span className="text-xs text-slate-300 font-bold">{lang === "pt" ? "Tipo de Seguro:" : "Coverage Type:"}</span>
                  <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 shrink-0">
                    <button 
                      id="opt-sim-auto"
                      onClick={() => { setInsuranceType("auto"); setSimulated(false); }} 
                      className={`text-[9px] uppercase font-bold px-2 py-1 rounded-md transition-all cursor-pointer ${
                        insuranceType === "auto" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {lang === "pt" ? "Auto" : "Auto"}
                    </button>
                    <button 
                      id="opt-sim-res"
                      onClick={() => { setInsuranceType("residencial"); setSimulated(false); }} 
                      className={`text-[9px] uppercase font-bold px-2 py-1 rounded-md transition-all cursor-pointer ${
                        insuranceType === "residencial" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {lang === "pt" ? "Resid." : "Home"}
                    </button>
                    <button 
                      id="opt-sim-vida"
                      onClick={() => { setInsuranceType("vida"); setSimulated(false); }} 
                      className={`text-[9px] uppercase font-bold px-2 py-1 rounded-md transition-all cursor-pointer ${
                        insuranceType === "vida" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {lang === "pt" ? "Vida" : "Life"}
                    </button>
                  </div>
                </div>

                {/* Age */}
                <div className="flex justify-between items-center">
                  <label htmlFor="sim-age-range-bento" className="text-xs text-slate-300 font-medium">{lang === "pt" ? "Idade do Titular:" : "Holder's Age:"}</label>
                  <div className="flex items-center gap-2">
                    <input 
                      id="sim-age-range-bento"
                      type="range" 
                      min="18" 
                      max="85" 
                      value={simAge} 
                      onChange={(e) => { setSimAge(Number(e.target.value)); setSimulated(false); }}
                      className="w-24 accent-blue-500 bg-slate-800 h-1 rounded-lg outline-none cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold text-blue-400 min-w-[20px]">{simAge}</span>
                  </div>
                </div>

                {/* Region */}
                <div className="flex justify-between items-center">
                  <label htmlFor="sim-region-bento" className="text-xs text-slate-300 font-medium">{lang === "pt" ? "Região da Apólice:" : "Policy Region:"}</label>
                  <select 
                    id="sim-region-bento"
                    value={simRegion} 
                    onChange={(e) => { setSimRegion(e.target.value); setSimulated(false); }}
                    className="bg-slate-900 border border-slate-850 text-xs text-slate-300 font-bold rounded-lg p-1 outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Sudeste">{lang === "pt" ? "Sudeste (SP/RJ)" : "Southeast (SP/RJ)"}</option>
                    <option value="Sul">{lang === "pt" ? "Sul" : "South"}</option>
                    <option value="Nordeste">{lang === "pt" ? "Nordeste" : "Northeast"}</option>
                    <option value="Outros">{lang === "pt" ? "Outros" : "Others"}</option>
                  </select>
                </div>

                <button 
                  id="btn-simulate-now-bento"
                  onClick={handleSimulate}
                  aria-label="Simular apólice de seguro"
                  className="w-full bg-blue-600 hover:bg-blue-500 active:scale-97 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/10 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-350" />
                  <span>{lang === "pt" ? "Calcular Cotação de Amostra" : "Calculate Sample Rates"}</span>
                </button>

                {simulated && simResult && (
                  <div id="sim-res-box" className="bg-blue-950/40 border border-blue-500/30 rounded-xl p-3 text-blue-200 text-xs space-y-1 animate-fade-in text-left">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">{lang === "pt" ? "Custo Projetado:" : "Estimated Premium:"}</span>
                      <span className="text-emerald-400 font-mono font-bold">{simResult.premium}</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>{lang === "pt" ? "Corretora Segura:" : "Secure Broker:"}</span>
                      <span>{simResult.company}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>{lang === "pt" ? "Selo Play Console:" : "Ad ID Safety Badge:"}</span>
                      <span className="text-blue-400 font-bold font-mono text-[9px]">{lang === "pt" ? "CRIPTOGRAFADO EM TRÂNSITO" : "ENCRYPTED IN TRANSIT"}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* AdMob Frame Simulator */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-center">
              <div className="bg-slate-950 border border-dashed border-slate-800 rounded-2xl p-3 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[9px] font-mono font-black text-slate-400 block tracking-wider uppercase">BANNER_ADS_CONTAINER_ADMOB</span>
                  <span className="text-[10px] text-slate-500">{lang === "pt" ? "Baseado unicamente em perfil anônimo" : "Personalized according to Google Advertising policies"}</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 text-blue-400 text-[10px] font-mono px-2 py-1 rounded font-bold uppercase shrink-0">
                  AdMob Active
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Exporter and Play Store Checklist (col-span-7) */}
          <div className="col-span-12 lg:col-span-7 bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between hover:shadow-sm transition-shadow text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{lang === "pt" ? "Guia Técnico para a Google Play Console" : "Google Play Console Compliance Checklists"}</h3>
                  <p className="text-[11px] text-slate-500">{lang === "pt" ? "Certifique-se de preencher esses passos para subir o Insurance Compare na Play Store sadiamente" : "Ensure you complete these mandatory fields inside the developer dashboard to launch"}</p>
                </div>
              </div>

              {/* Micro interactive Checklist */}
              <div className="space-y-2.5">
                {PLAY_STORE_CHECKLIST.map((chk, index) => {
                  const isChecked = !!checklistState[chk.task];
                  return (
                    <div 
                      key={index} 
                      onClick={() => handleChecklistToggle(chk.task)}
                      className={`flex gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked 
                          ? "bg-slate-50 border-slate-200 text-slate-500" 
                          : "bg-blue-50/10 border-blue-100 hover:bg-blue-50/20"
                      }`}
                    >
                      <button 
                        id={`chk-task-bento-${index}`}
                        aria-label={`Marcar tarefa ${chk.task} como concluída`}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 mt-0.5 ${
                          isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <h4 className={`text-xs font-bold font-sans ${isChecked ? "line-through text-slate-400" : "text-slate-950"}`}>
                          {chk.task}
                        </h4>
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{chk.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submitter Box */}
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 mt-4 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <FileCode className="w-4 h-4 text-blue-500" />
                  <span>{lang === "pt" ? "Exportar Documento para Submissão" : "Export Document Contents"}</span>
                </h4>
                <p className="text-[10px] text-slate-550 text-slate-500">
                  {lang === "pt" ? "Copie o texto pronto para preencher os formulários do Google Console:" : "Pick and copy the layout that best serves your developer repository:"}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  id="btn-copy-raw-text"
                  onClick={() => handleCopy("text")}
                  aria-label="Copiar como Texto"
                  className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 px-2.5 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {copiedFormat === "text" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedFormat === "text" ? "Copiado!" : "Texto"}</span>
                </button>

                <button
                  id="btn-copy-md"
                  onClick={() => handleCopy("markdown")}
                  aria-label="Copiar como Markdown"
                  className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2 px-2.5 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {copiedFormat === "markdown" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileText className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedFormat === "markdown" ? "Copiado!" : "Markdown"}</span>
                </button>

                <button
                  id="btn-copy-html-code"
                  onClick={() => handleCopy("html")}
                  aria-label="Copiar como HTML"
                  className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-2.5 rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  {copiedFormat === "html" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileCode className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copiedFormat === "html" ? "Copiado!" : "HTML"}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* SEARCH AND MAIN POLICY LAYOUT READER */}
      <main id="policy-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Dynamic Navigation index & Policy Book screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* STICKY LEFT COLUMN NAVIGATION */}
          <aside className="lg:col-span-4 no-print h-fit sticky top-24 space-y-6">
            
            {/* SEARCH COMPONENT INSIDE SIDEBAR */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <label htmlFor="policy-search" className="text-xs font-extrabold text-slate-900 tracking-tight block uppercase">
                Pesquisa nas Cláusulas
              </label>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  id="policy-search"
                  type="text" 
                  placeholder={lang === "pt" ? "Procurar termo... ex: AdMob" : "Search term... ex: cookies"} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-sans"
                />
              </div>

              {searchQuery && (
                <div className="flex items-center justify-between text-[11px] bg-primary-50/50 text-primary-700 p-2 rounded-lg">
                  <span>Encontramos <strong>{filteredPolicy.length}</strong> seção(ões)</span>
                  <button 
                    onClick={() => setSearchQuery("")} 
                    className="font-bold hover:underline cursor-pointer"
                  >
                    Limpar
                  </button>
                </div>
              )}
            </div>

            {/* INDEX TREE - CLICK TO NAVIGATE */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold text-slate-900 tracking-tight block uppercase pb-2 border-b border-slate-100">
                {lang === "pt" ? "Índice de Cláusulas" : "Policy Table of Contents"}
              </h3>

              <nav className="flex flex-col space-y-1.5" aria-label="Índice da política de privacidade">
                {filteredPolicy.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <a 
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveSection(section.id);
                        const targetEl = document.getElementById(section.id);
                        if (targetEl) {
                          const headerOffset = 110;
                          const elementPosition = targetEl.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                          });
                        }
                      }}
                      className={`text-xs px-3 py-2.5 rounded-xl font-bold transition-all text-left flex items-start gap-2 ${
                        isActive 
                          ? "bg-primary-500 text-white shadow-md shadow-primary-500/15" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <span className="opacity-70 mt-0.5">•</span>
                      <span>{section.title}</span>
                    </a>
                  );
                })}

                {filteredPolicy.length === 0 && (
                  <p className="text-xs text-slate-400 py-4 text-center">Nenhum termo satisfaz a busca.</p>
                )}
              </nav>
            </div>

            {/* GESTOR DE PRIVACIDADE CARD SUPPORT info */}
            <div className="bg-gradient-to-tr from-slate-900 to-primary-950 text-white rounded-2xl border border-slate-800 p-5 shadow-xs space-y-3">
              <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-lg w-fit">
                <Lock className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-extrabold tracking-tight uppercase">Encarregado LGPD</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Em caso de vazamento, dúvidas sobre tratamento de dados ou exclusão cadastral, nosso oficial especializado está à disposição permanente.
              </p>
              <div className="text-[11px] font-mono text-emerald-400 underline pt-1 block">
                {APP_INFO.developerEmail}
              </div>
            </div>
          </aside>

          {/* MAIN DOCUMENT WRAPPER (RIGHT FOR LARGER SCREENS) */}
          <article id="policy-sections-container" className="lg:col-span-8 space-y-8 print-content">
            
            {/* Header only rendered in PRINT representation */}
            <div className="hidden print-only py-8 border-b border-slate-350 space-y-2">
              <h1 className="text-3xl font-extrabold">Política de Privacidade</h1>
              <h2 className="text-xl font-bold text-slate-700">Aplicativo Mobile: {APP_INFO.name}</h2>
              <p className="text-xs text-slate-600">Última atualização oficial: {APP_INFO.lastUpdated}</p>
              <p className="text-xs text-slate-600">Canal de Contato Legal: {APP_INFO.developerEmail}</p>
            </div>

            {/* Informative advice on top of policy */}
            <div id="compliance-ribbon" className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4 no-print">
              <div className="bg-emerald-500 text-white p-2.5 rounded-xl shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-emerald-950">
                  {lang === "pt" ? "Declaração de AdMob Ativa e Verificada" : "Active & Verified AdMob Declaration"}
                </h4>
                <p className="text-[11px] text-emerald-850 leading-relaxed">
                  {lang === "pt" 
                    ? "Esta política preenche integralmente as solicitações de termos e políticas de terceiros da Google Play Console. Ela descreve cookies de parceiros e a coleta do ID de publicidade para fornecer anúncios transparentes." 
                    : "This policy fully fulfills Google Play Console requests for third-party terms. It details SDK advertising cookie metrics so you have absolute safety."}
                </p>
              </div>
            </div>

            {/* List and render clauses sequentially */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-12">
              
              {filteredPolicy.map((sec) => {
                const isSelected = activeSection === sec.id;
                return (
                  <section 
                    key={sec.id} 
                    id={sec.id}
                    className={`scroll-mt-28 pb-10 border-b border-slate-100 last:border-b-0 last:pb-0 transition-all duration-300 ${
                      isSelected ? "ring-2 ring-primary-500/5 bg-primary-50/10 p-4 -m-4 rounded-2xl" : ""
                    }`}
                  >
                    {/* Header Anchor Clause */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-2.5 h-6 rounded-full shrink-0 ${isSelected ? "bg-primary-600" : "bg-slate-300"}`} />
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-sans">
                        {sec.title}
                      </h2>
                    </div>

                    {/* Pre-formatted content layout parser with custom bullet highlight support */}
                    <div className="text-sm text-slate-600 leading-relaxed font-sans space-y-4">
                      {sec.content.split('\n\n').map((paragraph, index) => {
                        // Safe check for bullet items matching * markdown
                        if (paragraph.startsWith('* ')) {
                          const listItems = paragraph.split('\n* ');
                          return (
                            <ul key={index} className="list-disc pl-5 space-y-2 mt-2">
                              {listItems.map((item, i) => {
                                const cleanItem = item.replace(/^\*\s*/, '').trim();
                                if (!cleanItem) return null;
                                return <li key={i} className="text-xs sm:text-sm">{replaceMarkdownBold(cleanItem)}</li>;
                              })}
                            </ul>
                          );
                        }

                        // Check for subheading markdown
                        if (paragraph.startsWith('###')) {
                          return (
                            <h3 key={index} className="text-sm font-extrabold text-slate-950 mt-6 mb-2 tracking-tight block uppercase">
                              {paragraph.replace('###', '').trim()}
                            </h3>
                          );
                        }

                        // Normal paragraph conversion
                        return (
                          <p key={index} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {replaceMarkdownBold(paragraph)}
                          </p>
                        );
                      })}
                    </div>
                  </section>
                );
              })}

              {filteredPolicy.length === 0 && (
                <div className="text-center py-16 space-y-3">
                  <AlertCircle className="w-12 h-12 text-slate-350 mx-auto" />
                  <h3 className="font-bold text-slate-700">Nenhum parágrafo encontrado</h3>
                  <p className="text-xs text-slate-400">Tente buscar por termos mais genéricos, ou limpe o campo de busca.</p>
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs px-4 py-2 rounded-lg transition-transform"
                  >
                    Limpar Busca
                  </button>
                </div>
              )}
            </div>

            {/* ACCORDION FAQ - COMMON SECURITY CONCERNS */}
            <div id="faq-accordions" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 no-print">
              <div>
                <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary-500" />
                  <span>Dúvidas Frequentes sobre nossa Governança</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Complemente suas declarações no formulário de segurança da Play Store</p>
              </div>

              <div id="faq-blocks" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-150 p-4 rounded-2xl bg-slate-50 space-y-1.5 hover:border-slate-300 transition-colors">
                  <h4 className="text-xs font-extrabold text-slate-900">
                    {lang === "pt" ? "O app compartilha meus dados com corretoras?" : "Are my details shared with brokers?"}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {lang === "pt" 
                      ? "Não. O Insurance Compare realiza cálculos locais e simulações baseadas em tabelas atualizadas. Seus dados só são enviados para análise quando você escolhe solicitar o fechamento de uma proposta de seguro." 
                      : "Absolutely not. Simulations are done through standard table indexes. Only when choosing to lock in a premium will your coordinates transition securely."}
                  </p>
                </div>

                <div className="border border-slate-150 p-4 rounded-2xl bg-slate-50 space-y-1.5 hover:border-slate-300 transition-colors">
                  <h4 className="text-xs font-extrabold text-slate-900">
                    {lang === "pt" ? "Como o AdMob escolhe anúncios?" : "How does AdMob select relevant advertisements?"}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {lang === "pt" 
                      ? "Usando o ID do dispositivo de modo criptografado e cookies de publicidade. Se você não deseja rastreamento de ofertas, você pode redefinir o ID de publicidade ou apagar cookies no Android." 
                      : "Google AdMob uses hardware markers securely. You can clear cache cookies at any point or opt out via generic phone options."}
                  </p>
                </div>
              </div>
            </div>

            {/* PRIVACY CONTACT FORM (CANAL DE CONTATO LEGAL) */}
            <div id="contact-form-container" className="bg-gradient-to-br from-primary-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 no-print relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* Form header details */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-xl w-fit border border-emerald-500/25">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-white">Canal de Atendimento de Privacidade</h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Utilize o formulário oficial para solicitar exclusão imediata de correspondência, obter relatórios detalhados dos seus inputs salvos ou expor críticas de conformidade.
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-2xl space-y-2 border border-slate-800 text-[11px]">
                    <span className="font-bold text-slate-300 block font-mono">DADOS DE ASSENTAMENTO</span>
                    <p className="text-slate-400">DPO Encarregado: Bruno</p>
                    <p className="text-slate-400">Canal Ativo: {APP_INFO.developerEmail}</p>
                    <p className="text-slate-400">Retorno Máximo: 48 horas úteis</p>
                  </div>
                </div>

                {/* Form Inputs and logic */}
                <form id="frm-privacy-contact" onSubmit={handleContactSubmit} className="md:col-span-7 space-y-4 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="f-name" className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block mb-1">Seu Nome *</label>
                      <input 
                        id="f-name"
                        type="text" 
                        required
                        value={formName} 
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Ex: João da Silva" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 font-sans"
                      />
                    </div>
                    <div>
                      <label htmlFor="f-email" className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block mb-1">E-mail para Contato *</label>
                      <input 
                        id="f-email"
                        type="email" 
                        required
                        value={formEmail} 
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="Ex: joao@email.com" 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="f-subject" className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block mb-1">Assunto da Consulta</label>
                    <select 
                      id="f-subject"
                      value={formSubject} 
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                    >
                      <option value="Dúvida de Privacidade">Dúvida Geral de Privacidade</option>
                      <option value="Exclusão de Dados">Excluir Meus Históricos (LGPD)</option>
                      <option value="Suporte Tecnico">Suporte Técnico do Simulator</option>
                      <option value="Outros">Outras Solicitações</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="f-message" className="text-[10px] uppercase font-bold tracking-wider text-slate-300 block mb-1">Sua Mensagem *</label>
                    <textarea 
                      id="f-message"
                      rows={3}
                      required
                      value={formMessage} 
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Descreva detalhadamente a sua solicitação..." 
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 font-sans resize-none"
                    />
                  </div>

                  <button 
                    id="btn-form-submit"
                    type="submit" 
                    aria-label="Enviar mensagem de privacidade"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs py-3 rounded-xl transition-transform active:scale-97 flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Solicitação Segura</span>
                  </button>

                  {/* Feedback feedback state */}
                  {formSuccess && (
                    <div id="frm-success-feedback" className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-center text-xs animate-fade-in flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Sua mensagem foi enviada de modo simulado! Ela ficará segura em nosso canal do desenvolvedor.</span>
                    </div>
                  )}
                </form>
              </div>

              {/* Submitted message logs display - excellent interactive feature to display server action simulation */}
              {formInquiries.length > 0 && (
                <div id="simulated-inquiries-logger" className="pt-6 border-t border-slate-900 space-y-3">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block font-mono">
                    Registros Locais de Requisição de Privacidade ({formInquiries.length})
                  </h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {formInquiries.map((inq) => (
                      <div key={inq.id} className="bg-slate-900/80 border border-slate-850 p-3 rounded-xl text-[11px] grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-8 space-y-1">
                          <p className="font-bold text-white">{inq.name} <span className="font-normal text-slate-400">({inq.email})</span></p>
                          <p className="text-emerald-400 italic font-medium">{inq.subject}</p>
                          <p className="text-slate-300 font-sans">{inq.message}</p>
                        </div>
                        <div className="sm:col-span-4 text-right flex flex-col justify-between items-end font-mono">
                          <span className="text-slate-500 text-[10px]">Hora: {inq.time}</span>
                          <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[8px] uppercase font-bold">
                            Pendente DPO
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </article>
        </div>
      </main>

      {/* FOOTER SECTION: COGNIZABLE BRANDING AND METADATA */}
      <footer id="main-footer" className="bg-slate-900 text-slate-400 border-t border-slate-850 py-12 px-4 sm:px-6 lg:px-8 mt-12 no-print">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary-600 text-white p-2 rounded-lg">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-bold text-white tracking-tight text-base">{APP_INFO.name}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Página de governança formulada em aderência estrita às decisões legislativas da LGPD brasileira e mandatos técnicos do ecossistema Google Play Developer Console.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fontes de Direitos e Termos</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Política de Privacidade Google</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://play.google.com/about/privacy-security-deception/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Políticas do Desenvolvedor Google Play</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://optout.networkadvertising.org/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-white transition-colors inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Opt-Out de Cookies AdMob</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Developer/Compliance Column */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Suporte Legal</h4>
              <p className="text-xs text-slate-400">
                Qualquer ação relacionada à remoção de dados deve ser devidamente enviada ao nosso correio oficial do DPO:
              </p>
              <a 
                href={`mailto:${APP_INFO.developerEmail}`} 
                className="text-xs text-emerald-400 hover:text-emerald-300 font-mono font-bold transition-colors inline-block hover:underline"
              >
                {APP_INFO.developerEmail}
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>
              © 2026 {APP_INFO.name}. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <span className="text-slate-500 font-mono text-[10px]">CONSTRUÍDO SEGUNDO DIRETRIZES DA GOOGLE PLAY CONSOLE E ADMOB SDK</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Regex Helper function to format bold sentences marked by ** inside data strings safely in JSX
function replaceMarkdownBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-extrabold text-slate-900 font-sans">
              {part.substring(2, part.length - 2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

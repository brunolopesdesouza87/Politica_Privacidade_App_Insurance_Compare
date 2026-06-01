export interface PolicySection {
  id: string;
  title: string;
  content: string;
}

export interface AppFeature {
  title: string;
  description: string;
  icon: string;
}

export const APP_INFO = {
  name: "Insurance Compare",
  developerEmail: "brunuslife@gmail.com",
  lastUpdated: "01 de Junho de 2026",
  lastUpdatedEN: "June 1, 2026",
  category: "Finanças / Comparação de Seguros",
  purpose: "Comparação de apólices e simulação de custos para seguros de automóvel, residencial, vida e saúde.",
};

export const HIGHLIGHTS_PORTUGUESE = [
  {
    title: "Finalidade Segura",
    description: "Os dados de simulação (como idade, CEP ou tipo de veículo) servem exclusivamente para calcular cotações em tempo real e não são usados para outros fins.",
    tag: "Uso de Dados"
  },
  {
    title: "Conformidade AdMob",
    description: "Utilizamos o SDK do Google AdMob para exibir publicidade institucional. Você pode desativar anúncios personalizados através das configurações do seu Android.",
    tag: "Anúncios"
  },
  {
    title: "Direito de Acesso (LGPD)",
    description: "Você possui controle total sobre suas informações. Garantimos o acesso, correção e eliminação dos seus dados em nosso canal de contato.",
    tag: "Legislação"
  }
];

export const HIGHLIGHTS_ENGLISH = [
  {
    title: "Secure Purpose",
    description: "Simulation inputs (such as age, zip code, or vehicle type) are strictly used to calculate real-time quotes and are not shared for external purposes.",
    tag: "Data Usage"
  },
  {
    title: "AdMob Compliance",
    description: "We employ the Google AdMob SDK to show ads. You can easily manage or opt out of personalized tracking via your Android device settings.",
    tag: "Ads"
  },
  {
    title: "User Rights (GDPR/LGPD)",
    description: "You have complete control over your info. We fully support access, correction, and prompt deletion of any customer inquiries or records.",
    tag: "Legislation"
  }
];

export const PLAY_STORE_CHECKLIST = [
  {
    task: "Inserir esta URL na Google Play Console",
    description: "Cole o link desta página no campo 'Política de Privacidade' abaixo da seção de conteúdo do app.",
    status: "suggested"
  },
  {
    task: "Declarar o ID de Publicidade (Advertising ID)",
    description: "Na Play Console (Declaração de IDs), informe que o aplicativo utiliza o ID de publicidade para fins de veiculação de anúncios (Google AdMob).",
    status: "required"
  },
  {
    task: "Formulário de Segurança de Dados (Data Safety)",
    description: "Declare que você coleta IDs de Dispositivo/Outros IDs de maneira criptografada em trânsito para fins de publicidade e análise (AdMob).",
    status: "required"
  }
];

export const POLICY_PORTUGUESE: PolicySection[] = [
  {
    id: "introducao",
    title: "1. Introdução e Viscovered",
    content: `Esta Política de Privacidade descreve como o aplicativo mobile **Insurance Compare** ("nós", "nosso" ou "o Aplicativo") coleta, usa, compartilha e protege as informações dos usuários. 

O **Insurance Compare** é um aplicativo projetado exclusivamente para auxiliar os usuários na pesquisa, análise e comparação em tempo real de simulações e apólices de seguros diversos (incluindo seguro automobilístico, residencial, seguro de vida, saúde, etc.).

Ao baixar, instalar, acessar ou utilizar o Aplicativo de qualquer forma, você declara que compreende e concorda com as diretrizes e práticas descritas nesta Política de Privacidade. Caso não concorde com os termos aqui contidos, recomendamos que cesse imediatamente o uso do aplicativo.`
  },
  {
    id: "dados-coletados",
    title: "2. Coleta de Informações",
    content: `Para fornecer simulações precisas e um serviço relevante para o mercado brasileiro de seguros, podemos registrar e processar as seguintes categorias de informações coletadas de forma consentida:

### a) Dados Fornecidos pelo Usuário (Simulação Local)
Durante a análise e catação, o usuário fornece parâmetros fundamentais para a estimativa de custos, tais como:
*   **Perfil do Segurado:** Faixa etária, estado civil, sexo.
*   **Localidade:** Região geral de circulação ou CEP (exclusivo para determinar zonas de cobertura e tarifação).
*   **Dados do Bem:** Tipo de residência, modelo/ano do veículo, cilindrada.
*   **Contatos de Interesse:** Nome e email/telefone (apenas se você optar voluntariamente por entrar em contato para fechar um seguro ou sanar dúvidas).

*Nota importante:* Salvo indicação expressa, a maior parte destas informações permanece armazenada unicamente no seu dispositivo, sendo processada temporariamente no cálculo de cotações.

### b) Dados Coletados Automaticamente (Rede e Dispositivo)
Para monitoramento e otimização do produto, o aplicativo registra:
*   Informações básicas de conexão (como navegador, idioma, fuso horário e endereço IP).
*   Modelo do dispositivo, fabricante e versão do sistema operacional móvel.`
  },
  {
    id: "google-admob",
    title: "3. Integração com Google AdMob",
    content: `O **Insurance Compare** utiliza o SDK do **Google AdMob (Google LLC)** para fornecer recursos publicitários, subsidiando a gratuidade de nossos algoritmos de comparação. Para esse fim, o Google AdMob coleta e processa informações específicas que podem incluir, mas não se limitam a:

*   **ID de Publicidade do Google (Google Advertising ID / AAID):** Um identificador exclusivo e redefinível associado ao seu dispositivo usado para personalizar anúncios.
*   **Dados Técnicos do Dispositivo:** Marca, modelo, idioma, operadora de telecomunicações e resolução de tela.
*   **Interações com Anúncios:** cliques, impressões e duração de visualização de banners e anúncios intersticiais.

Esses parceiros terceiros usam essas ferramentas tecnológicas (como cookies, SDKs ou Web Beacons) para medir a eficácia das campanhas e direcionar conteúdos adequados aos seus interesses. Nós não temos controle direto sobre os dados coletados por terceiros através destes SDKs. 

Para ler as regras detalhadas da Google, consulte a [Política de Privacidade e Termos da Google](https://policies.google.com/privacy).`
  },
  {
    id: "controle-anuncios",
    title: "4. Controle do Usuário e Cookies",
    content: `Você tem total autonomia em relação à forma como o Google AdMob rastreia seu comportamento para fins publicitários. É possível desativar anúncios personalizados seguindo estas instruções:

1.  **No Android:** Acesse *Configurações > Google > Anúncios* e altere a chave para **"Desativar personalização de anúncios"** ou **"Redefinir ID de publicidade"**.
2.  **No iOS (caso aplicável):** Acesse *Ajustes > Privacidade > Rastreamento* e retire a permissão para que o app solicite rastreamento.

Para desabilitar de forma mais ampla o uso de cookies de terceiros para publicidade baseada em interesses, você também pode visitar o portal da [Network Advertising Initiative](https://optout.networkadvertising.org/).`
  },
  {
    id: "permissões",
    title: "5. Permissões de Dispositivo Necessárias",
    content: `Para o pleno funcionamento do **Insurance Compare**, o sistema poderá requisitar as seguintes permissões aos arquivos e serviços do sistema operacional (Google Play Console):

*   **Acesso à Internet (INTERNET):** Necessário para realizar requisições de preços à nossa nuvem de cotações atualizadas e para carregar os recursos visuais de publicidade do AdMob.
*   **Estado da Rede (ACCESS_NETWORK_STATE):** Essencial para verificar a presença de conexão ativa e avisar amigavelmente o usuário caso o dispositivo esteja offline.`
  },
  {
    id: "direitos-lgpd",
    title: "6. Direitos do Titular (LGPD)",
    content: `Em conformidade estrita com a **Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)**, garantimos a você o exercício dos seguintes direitos fundamentais:

*   **Confirmação e Acesso:** Saber de forma objetiva se realizamos o tratamento de dados pessoais de sua propriedade.
*   **Correção:** Solicitar retificação de dados desatualizados, incompletos ou inexatos.
*   **Eliminação ou Anonimização:** Requerer a exclusão de dados considerados excessivos ou cujo armazenamento não seja fundado em obrigação legal, mediante simples requisição por email.
*   **Portabilidade:** Exportar os dados fornecidos pelo usuário em formato estruturado.`
  },
  {
    id: "seguranca-dados",
    title: "7. Segurança das Informações",
    content: `Tratamos os dados coletados com respeito absoluto. Empregamos modernas tecnologias de criptografia de ponta a ponta (SSL/HTTPS) em todo o trânsito de dados para evitar vazamentos de informações ou acessos não autorizados de terceiros.

Embora nenhum sistema conectado à internet seja 100% impenetrável, executamos as melhores práticas técnicas para assegurar que seus dados de simulação de seguros continuem confidenciais.`
  },
  {
    id: "contato",
    title: "8. Canal de Contato e Dúvidas",
    content: `Se você tiver dúvidas, sugestões ou desejar exercer alguns dos seus direitos previstos na LGPD, entre em contato diretamente com o nosso Encarregado pelo Tratamento de Dados de Privacidade por meio do canal eletrônico oficial:

*   **Email:** [brunuslife@gmail.com](mailto:brunuslife@gmail.com)
*   **Assunto Recomendado:** *Privacidade - Insurance Compare*

Nos comprometemos a responder a qualquer requisição legal dentro do menor período de tempo útil permitido.`
  }
];

export const POLICY_ENGLISH: PolicySection[] = [
  {
    id: "introducao",
    title: "1. Introduction and Overview",
    content: `This Privacy Policy describes how the **Insurance Compare** mobile application ("we", "our", or "the App") collects, uses, protects, and discloses technical and user information.

**Insurance Compare** is a mobile application developed solely to help users search, analyze, and perform real-time simulations and comparisons of various insurance alternatives (such as car insurance, home coverage, health plans, life policies, etc.).

By downloading, installing, accessing, or using the Application in any manner, you acknowledge and agree to the practices outlined in this Privacy Policy. If you do not accept these terms, you must immediately uninstall and cease the use of this app.`
  },
  {
    id: "dados-coletados",
    title: "2. Information Collection and Consent",
    content: `To provide accurate pricing models and helpful tools for insurance searchers, we may process specific categories of data:

### a) User-Provided Data (Local Input)
When building a custom simulation, you may input non-sensitive profile parameters:
*   **Profile Demographics:** Age group, relationship status, gender.
*   **Location:** General residential zip code or state (used solely to scope local ratings and availability zones).
*   **Asset Specs:** Property type, vehicle manufacturer, model year, engine size.
*   **Voluntary Contacts:** Name, email, or telephone number (ONLY if you explicitly submit a contact form to get in touch with an agent).

*Important note:* Most query parameters stay on your local device. If transmitted to check rates, data is encrypted and discarded following the active session.

### b) Automated Data (Technical & Performance)
To secure, benchmark, and maintain our product quality, the App records:
*   Standard communication headers, including network status, device IP, and language.
*   Hardware specs such as device name, brand, OS version, or carrier details.`
  },
  {
    id: "google-admob",
    title: "3. Google AdMob Integration",
    content: `**Insurance Compare** integrates the **Google AdMob SDK (Google LLC)**. This integration is essential to show contextually relevant ads, keeping our premium comparison algorithms free of charge. AdMob may compile and transmit data:

*   **Google Advertising ID (AAID / IDFA):** A unique, privacy-safe, reset-capable mobile device identifier used to deliver relevant, personalized commercial banners or interstitial ad contents.
*   **Device Specs:** Brand, model, locale, mobile provider, device screen dimensions.
*   **Interaction Data:** Recorded taps, view duration, impressions, and click-through rates.

Google AdMob utilizes tags, cookies, or software kits to target products likely matching your device profile. We do not have access to, nor store, the telemetry collected by Google's SDK.

To read further on Google's privacy guidelines, visit the official [Google Privacy & Terms Policy](https://policies.google.com/privacy).`
  },
  {
    id: "controle-anuncios",
    title: "4. Managing Ads and User Choices",
    content: `You hold absolute authority regarding target tracking. You can disable interest-based advertising under your operating system's settings:

1.  **On Google Android:** Navigate to *Settings > Google > Ads* and enable **"Opt out of Ads Personalization"** or click **"Reset Advertising ID"**.
2.  **On Apple iOS (if testing):** Go to *Settings > Privacy > Tracking* and switch off tracking permission.

To block broader network cookies used by advertisement partners, consider visiting the official [Network Advertising Initiative Opt-Out Platform](https://optout.networkadvertising.org/).`
  },
  {
    id: "permissões",
    title: "5. Mobile Device Permissions",
    content: `For the application to query insurance sources and fetch advertisements securely, the following system permissions must be granted:

*   **Internet Access (INTERNET):** Enables queries to online insurance databases and displays advertisements loaded dynamically from Google AdMob.
*   **Network State (ACCESS_NETWORK_STATE):** Allows the app to detect an active internet connection space, warning the user if offline.`
  },
  {
    id: "direitos-lgpd",
    title: "6. User Rights (GDPR & LGPD Compliance)",
    content: `In compliance with privacy frameworks such as the **General Data Protection Regulation (GDPR)** and Brazilian **Lei Geral de Proteção de Dados (LGPD)**, we pledge the following:

*   **Confirmation & Access:** You can ask if any of your submitted data is currently held by us.
*   **Rectification:** Correct incomplete or out-of-date records you have sent.
*   **Erasure (The Right to be Forgotten):** Request that your inquiries be removed from our databases.
*   **Portability:** Export your profile simulation dataset into a standard structure.`
  },
  {
    id: "seguranca-dados",
    title: "7. Security Measures",
    content: `We prioritize keeping your parameters secure. Every data transmission to and from our cloud simulation providers is fully encrypted with HTTPS (SSL). 

While no online environment is 100% impenetrable, we actively monitor and execute top-tier cybersecurity practices to preserve user privacy.`
  },
  {
    id: "contato",
    title: "8. Privacy Contact Information",
    content: `If you have suggestions, questions, or would like to exercise any privacy rights, do not hesitate to contact our primary compliance desk:

*   **Enquiries Contact Email:** [brunuslife@gmail.com](mailto:brunuslife@gmail.com)
*   **Recommended Subject line:** *Privacy - Insurance Compare*

We aim to address any privacy inquiries swiftly and efficiently.`
  }
];

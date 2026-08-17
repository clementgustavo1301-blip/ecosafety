import {
  Activity, ShieldCheck, RefreshCcw, TrendingDown, LineChart, Clock, CheckCircle, UserCheck,
  FileCheck2, ShieldAlert, BadgeCheck, HardHat, Flame, Building2
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export type ThemeType = "saude" | "incendio" | "ambiental";

export interface TabContent {
  howItWorks: {
    label: string;
    title: string;
    description: string;
    steps: { number: string; title: string; text: string }[];
  };
  problemSolution: {
    problemTitle: string;
    problemDesc: string;
    painPoints: string[];
    solutionTitle: string;
    solutionDesc: string;
    solutions: { title: string; text: string }[];
  };
  features: {
    label: string;
    title: string;
    description: string;
    baseTitle: string;
    baseItems: string[];
    intelligenceTitle: string;
    intelligenceItems: string[];
  };
  benefits: {
    label: string;
    title: string;
    description: string;
    items: { icon: LucideIcon; text: string }[];
  };
  target: {
    label: string;
    title: string;
    description: string;
    items: string[];
  };
  cta: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
  };
}

export const tabContents: Record<Exclude<ThemeType, "ambiental">, TabContent> = {
  saude: {
    howItWorks: {
      label: "Como funciona",
      title: "Da admissão ao acompanhamento contínuo.",
      description: "Uma rotina de saúde ocupacional, com controle de vencimentos e dados sempre prontos.",
      steps: [
        { number: "01", title: "Mapeamento ocupacional", text: "Mapeamos riscos, funções e exigências do PCMSO para estruturar uma linha de cuidado coerente com as exposições reais." },
        { number: "02", title: "Avaliação clínica", text: "Admissional, periódico, retorno ao trabalho, mudança de risco e demissional, com protocolos específicos." },
        { number: "03", title: "Vigilância da saúde", text: "Acompanhamos a evolução dos parâmetros de saúde ao longo do tempo. Alterações geram alertas precoces." },
        { number: "04", title: "Inteligência e decisão", text: "Absenteísmo, aptidão e exposição integrados em um painel. A gestão conduzida por evidências." }
      ]
    },
    problemSolution: {
      problemTitle: "O problema",
      problemDesc: "Quando a medicina ocupacional é apenas obrigação documental, a empresa perde controle sobre informações decisivas.",
      painPoints: ["ASOs vencidos", "Afastamentos sem controle", "Nexo causal mal definido", "Falta de integração com o PGR"],
      solutionTitle: "A solução",
      solutionDesc: "A Ecoclinic assume a jornada de saúde ocupacional com processos estruturados e inteligência de dados.",
      solutions: [
        { title: "Controle de vencimentos e convocações", text: "Gestão ativa para evitar que ASOs passem do prazo." },
        { title: "Protocolos médicos alinhados ao PGR", text: "Conexão direta entre o risco mapeado na segurança e o exame clínico." },
        { title: "Vigilância de absenteísmo", text: "Identificação de tendências antes que se tornem problemas crônicos." }
      ]
    },
    features: {
      label: "O que está incluso",
      title: "Medicina ocupacional completa, do exame ao acompanhamento.",
      description: "A base operacional você já conhece. O que muda é o que fazemos com ela.",
      baseTitle: "Base operacional",
      baseItems: [
        "Exames admissionais, periódicos, de retorno e demissionais",
        "Emissão e guarda de ASO",
        "Exames complementares (audiometria, espirometria, laboratoriais)",
        "Elaboração e gestão do PCMSO",
        "Controle de vencimentos e agenda",
        "Atendimento a grandes volumes e frentes de obra"
      ],
      intelligenceTitle: "Camada de inteligência",
      intelligenceItems: [
        "Protocolo de exames derivado do PGR",
        "Relatório analítico anual do PCMSO",
        "Painel de indicadores: aptidão, absenteísmo, exposição",
        "Vigilância de alterações clínicas com alerta preventivo",
        "Suporte técnico em nexo causal e discussão de FAP",
        "Consistência dos eventos no eSocial"
      ]
    },
    benefits: {
      label: "Benefícios",
      title: "O que muda na sua operação e no seu custo.",
      description: "Saúde sob controle, dados organizados e uma operação mais eficiente.",
      items: [
        { icon: Activity, text: "Menos afastamento por detecção precoce" },
        { icon: ShieldCheck, text: "Defesa técnica consistente em ação trabalhista e perícia" },
        { icon: RefreshCcw, text: "Redução de retrabalho entre saúde, segurança e RH" },
        { icon: TrendingDown, text: "Base sólida para discutir FAP e custo previdenciário" },
        { icon: LineChart, text: "Decisão de investimento em prevenção baseada em dados" },
        { icon: Clock, text: "Auditoria e cliente contratante atendidos sem correria" },
        { icon: CheckCircle, text: "Aptidão real, não aptidão presumida" },
        { icon: UserCheck, text: "Um único responsável técnico por saúde e segurança" }
      ]
    },
    target: {
      label: "Para quem é indicado",
      title: "Para empresas que querem saúde ocupacional de verdade.",
      description: "Empresas de todos os portes com colaboradores contratados que precisam cumprir a medicina ocupacional e querem sair do atendimento pontual para uma gestão preventiva.",
      items: ["Indústria", "Construção civil", "Comércio", "Serviços", "Logística", "Agronegócio", "Petróleo & Gás", "Salinas", "GLP", "Saúde"]
    },
    cta: {
      title: "Sua empresa não precisa tratar saúde só como obrigação.",
      description: "Solicite uma proposta da Ecoclinic e transforme a medicina do trabalho em gestão eficiente, segura e humana.",
      primaryButton: "Solicitar proposta",
      secondaryButton: "Falar com especialista"
    }
  },
  incendio: {
    howItWorks: {
      label: "Como funciona",
      title: "Do projeto técnico à aprovação final.",
      description: "Uma jornada clara e estruturada para garantir a conformidade e a segurança do seu imóvel.",
      steps: [
        { number: "01", title: "Diagnóstico e Vistoria", text: "Avaliamos a edificação e identificamos todas as necessidades de adequação física e documental frente às exigências do Corpo de Bombeiros." },
        { number: "02", title: "Projeto Técnico", text: "Nossa engenharia elabora o Projeto de Prevenção e Combate a Incêndio (PPCI) dimensionando todos os sistemas necessários." },
        { number: "03", title: "Execução e Adequação", text: "Suporte e acompanhamento na instalação de rotas de fuga, extintores, hidrantes, alarmes e sinalização tátil/visual." },
        { number: "04", title: "Aprovação e AVCB", text: "Cuidamos de toda a tramitação e acompanhamos a vistoria oficial até a emissão ou renovação do seu AVCB/CLCB." }
      ]
    },
    problemSolution: {
      problemTitle: "O problema",
      problemDesc: "Muitas empresas operam com o risco invisível de um projeto de incêndio desatualizado ou não aprovado.",
      painPoints: ["AVCB/CLCB vencido ou inexistente", "Risco de multas severas e interdição", "Recusa de indenização por seguradoras", "Projetos reprovados múltiplas vezes"],
      solutionTitle: "A solução",
      solutionDesc: "A Ecosafety conduz o processo de ponta a ponta com engenharia especializada e gestão de conformidade.",
      solutions: [
        { title: "Gestão completa do processo", text: "Evite idas e vindas no Corpo de Bombeiros com um projeto aprovado logo de início." },
        { title: "Acompanhamento de execução", text: "Garantimos que o que foi projetado seja instalado corretamente." },
        { title: "Controle de vencimentos (Múltiplas Filiais)", text: "Para redes e franquias, fazemos a gestão do calendário de renovação de todas as unidades." }
      ]
    },
    features: {
      label: "O que está incluso",
      title: "Segurança total contra incêndio para sua edificação.",
      description: "Tudo o que sua empresa precisa para operar legalmente e proteger patrimônio e vidas.",
      baseTitle: "Serviços Essenciais",
      baseItems: [
        "Projetos de Combate a Incêndio (PPCI)",
        "Renovação de AVCB e CLCB",
        "Laudos técnicos e ARTs",
        "Projeto de Sinalização de Emergência",
        "Treinamento de Brigada de Incêndio",
        "Projetos de Iluminação de Emergência"
      ],
      intelligenceTitle: "Engenharia Avançada",
      intelligenceItems: [
        "Sistemas complexos (Hidrantes e Sprinklers)",
        "Sistemas de Alarme e Detecção de fumaça",
        "Gestão de AVCBs para redes varejistas e franquias",
        "Análise e viabilidade técnica para novos galpões",
        "Auditoria de conformidade em imóveis locados",
        "Consultoria técnica para seguradoras"
      ]
    },
    benefits: {
      label: "Benefícios",
      title: "A tranquilidade de operar dentro da lei.",
      description: "Sem dor de cabeça com fiscalizações e com a certeza de que seu imóvel está protegido.",
      items: [
        { icon: ShieldCheck, text: "Segurança real para colaboradores e patrimônio" },
        { icon: BadgeCheck, text: "Prevenção de multas e interdições pelos bombeiros" },
        { icon: TrendingDown, text: "Redução no prêmio do seguro patrimonial" },
        { icon: Clock, text: "Aprovação mais rápida através de projetos bem estruturados" },
        { icon: HardHat, text: "Evite retrabalho de obra contratando a engenharia certa" },
        { icon: Building2, text: "Auditorias de locação aprovadas sem atritos" },
        { icon: Flame, text: "Equipe preparada em caso de sinistro real" },
        { icon: FileCheck2, text: "Centralização da documentação de múltiplas filiais" }
      ]
    },
    target: {
      label: "Para quem é indicado",
      title: "Toda edificação precisa de proteção, mas algumas exigem engenharia dedicada.",
      description: "Atendemos empreendimentos de médio a grande risco que precisam de agilidade na aprovação e zero erros de execução.",
      items: ["Indústrias", "Galpões Logísticos", "Centros de Distribuição", "Shopping Centers", "Hospitais", "Condomínios Residenciais", "Prédios Comerciais", "Redes de Varejo", "Postos de Combustível"]
    },
    cta: {
      title: "Sua edificação não pode correr riscos.",
      description: "Regularize seu imóvel, proteja suas operações e durma tranquilo com a engenharia da Ecosafety.",
      primaryButton: "Solicitar vistoria",
      secondaryButton: "Falar com engenheiro"
    }
  }
};

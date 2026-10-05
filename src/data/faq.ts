export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: 'what-is-green',
    question: '¿Qué es Home Assistant Green?',
    answer:
      'Es el hub oficial listo para usar: viene con Home Assistant preinstalado. Solo tienes que conectarlo a la corriente y a tu red para empezar a automatizar tu hogar.',
  },
  {
    id: 'zigbee-vs-zwave',
    question: '¿Necesito ZBT-2 y ZWA-2 a la vez?',
    answer:
      'No necesariamente. Elige ZBT-2 si tu ecosistema es Zigbee, o ZWA-2 si usas Z-Wave. Muchas instalaciones usan uno de los dos; solo combínalos si tienes dispositivos de ambos protocolos.',
  },
  {
    id: 'compatibility',
    question: '¿Funcionan con mi instalación actual de Home Assistant?',
    answer:
      'Sí. Green es una forma completa de ejecutar Home Assistant. Connect ZBT-2 y ZWA-2 se conectan por USB a Green, a un Mini PC, o a cualquier host donde ya corras Home Assistant.',
  },
  {
    id: 'shipping',
    question: '¿Cuándo recibiré mi pedido?',
    answer:
      'Los pedidos se preparan en 24–48 h laborables. El envío estándar a Península suele tardar 2–4 días; recibirás el tracking por email en cuanto salga el paquete. Cambios y devoluciones en 14 días.',
  },
  {
    id: 'privacy',
    question: '¿Mis datos se quedan en casa?',
    answer:
      'Home Assistant prioriza el control local: tus automatizaciones pueden vivir en tu red sin depender de la nube. Domotika solo te ayuda a conseguir el hardware oficial.',
  },
];

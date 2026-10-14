/**
 * Catálogo mock de Domotika.
 * En una app real esto vendría de una API; aquí es un array tipado
 * para practicar `map()` en Lit sin backend.
 */
export type Product = {
  id: string;
  name: string;
  tag: string;
  /** Resumen corto para la card del catálogo */
  description: string;
  /** Texto largo de la página de inspección */
  longDescription: string;
  /** Puntos clave que se listan en el detalle */
  features: string[];
  /** Specs rápidas (etiqueta → valor) */
  specs: { label: string; value: string }[];
  price: number;
  available: boolean;
  purchaseUrl?: string;
  /** Color de acento para el bloque visual del producto */
  accent: string;
};

export const products: Product[] = [
  {
    id: 'ha-green',
    name: 'Home Assistant Green',
    tag: 'Hub',
    description:
      'El appliance plug-and-play para empezar con Home Assistant. Enciende, conecta y controla tu casa sin complicaciones.',
    longDescription:
      'Home Assistant Green es el camino más sencillo para tener un hogar inteligente bajo tu control. Viene con Home Assistant preinstalado: lo conectas a la corriente y a tu red, y en minutos puedes empezar a automatizar luces, sensores y escenas sin depender de la nube de un fabricante.',
    features: [
      'Home Assistant listo para usar, sin instalar sistema operativo',
      'Pensado para uso 24/7 en casa con bajo consumo',
      'Ampliable con Connect ZBT-2 (Zigbee) y Connect ZWA-2 (Z-Wave)',
      'Datos y automatizaciones en tu red local',
    ],
    specs: [
      { label: 'Tipo', value: 'Appliance / hub' },
      { label: 'Software', value: 'Home Assistant OS' },
      { label: 'Red', value: 'Ethernet' },
      { label: 'Ideal para', value: 'Empezar desde cero' },
    ],
    price: 179,
    available: true,
    purchaseUrl: 'https://www.amazon.es/Nabu-Casa-Home-Assistant-Verde/dp/B0CXVKSG19',
    accent: '#6B7C3E',
  },
  {
    id: 'ha-zbt-2',
    name: 'Home Assistant Connect ZBT-2',
    tag: 'Zigbee',
    description:
      'Coordinador Zigbee oficial. Ideal para sensores, luces y dispositivos de bajo consumo en tu red local.',
    longDescription:
      'Connect ZBT-2 es el dongle Zigbee oficial de Home Assistant. Conectado por USB a tu Green (u otro host), actúa como coordinador de la red Zigbee: sensores de puerta, temperatura, bombillas y más dispositivos de bajo consumo se unen a tu instalación de forma local y fiable.',
    features: [
      'Coordinador Zigbee oficial para Home Assistant',
      'Conexión USB plug-and-play',
      'Perfecto para sensores y dispositivos de bajo consumo',
      'Compatible con Green y otras instalaciones HA',
    ],
    specs: [
      { label: 'Protocolo', value: 'Zigbee' },
      { label: 'Conexión', value: 'USB' },
      { label: 'Rol', value: 'Coordinador' },
      { label: 'Ideal para', value: 'Sensores y luces' },
    ],
    price: 39,
    available: false,
    accent: '#A3B18A',
  },
  {
    id: 'ha-zwa-2',
    name: 'Home Assistant Connect ZWA-2',
    tag: 'Z-Wave',
    description:
      'Adaptador Z-Wave oficial para integrar cerraduras, enchufes y dispositivos de la red Z-Wave con fiabilidad.',
    longDescription:
      'Connect ZWA-2 añade Z-Wave a tu Home Assistant. Es la opción oficial cuando quieres cerraduras, enchufes o dispositivos de la malla Z-Wave con buena cobertura y estabilidad. Se conecta por USB y se configura desde la interfaz de Home Assistant.',
    features: [
      'Adaptador Z-Wave oficial para Home Assistant',
      'Buena cobertura para dispositivos de malla Z-Wave',
      'Integración nativa desde la UI de Home Assistant',
      'Complementa a Green y/o a tu host actual',
    ],
    specs: [
      { label: 'Protocolo', value: 'Z-Wave' },
      { label: 'Conexión', value: 'USB' },
      { label: 'Rol', value: 'Controladora' },
      { label: 'Ideal para', value: 'Cerraduras y enchufes' },
    ],
    price: 49,
    available: false,
    accent: '#C4A35A',
  },
];

/** Busca un producto por id (útil en la vista de detalle). */
export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

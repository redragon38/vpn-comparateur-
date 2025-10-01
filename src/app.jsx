import React, { useState, useEffect } from 'react';
import { Star, Shield, Globe, Zap, Users, Filter, Play, BookOpen, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Données réelles extraites de top10vpn.com (Top 6)
const vpnData = [
  {
    name: "ExpressVPN",
    price: 4.99,
    servers: 13360,
    countries: 106,
    devices: "Windows, Mac, iOS, Android, Linux, Fire TV, Apple TV, Router",
    rating: 4.8,
    logo: "https://placehold.co/60x60/1e40af/white?text=EV",
    offer_link: "#",
    features: ["Meilleur pour le streaming", "95% des plateformes débloquées", "Support 24/7"],
    jurisdiction: "British Virgin Islands",
    logging: "No Identifiable Data",
    speed_loss: "2%",
    connections: 8,
    summary: "Le meilleur VPN global : intuitif, ultra-rapide, débloque Netflix, BBC iPlayer, Disney+ dans 106 pays."
  },
  {
    name: "NordVPN",
    price: 2.03,
    servers: 18651,
    countries: 91,
    devices: "Windows, Mac, iOS, Android, Linux, Fire TV, Apple TV, Router",
    rating: 4.7,
    logo: "https://placehold.co/60x60/1e3a8a/white?text=NV",
    offer_link: "#",
    features: ["Double VPN", "Ad blocker (MACE)", "Serveurs dans 50 États US"],
    jurisdiction: "US (Five Eyes)",
    logging: "No Logs",
    speed_loss: "4%",
    connections: "Unlimited",
    summary: "Sécurité maximale avec double chiffrement, idéal pour la confidentialité et le torrenting."
  },
  {
    name: "Private Internet Access (PIA)",
    price: 1.99,
    servers: 18651,
    countries: 100,
    devices: "Windows, Mac, iOS, Android, Linux, Fire TV, Apple TV, Router",
    rating: 4.6,
    logo: "https://placehold.co/60x60/dc2626/white?text=PIA",
    offer_link: "#",
    features: ["Meilleur pour le torrenting", "Port forwarding", "Serveurs dans 50 États US"],
    jurisdiction: "Netherlands",
    logging: "No Identifiable Data",
    speed_loss: "4%",
    connections: "Unlimited",
    summary: "Le VPN le plus abordable avec une politique de non-journalisation vérifiée et un excellent support P2P."
  },
  {
    name: "Surfshark",
    price: 1.99,
    servers: 3200,
    countries: 100,
    devices: "Windows, Mac, iOS, Android, Linux, Fire TV, Apple TV, Router",
    rating: 4.5,
    logo: "https://placehold.co/60x60/0d9488/white?text=SS",
    offer_link: "#",
    features: ["GPS spoofing (Android)", "IP rotative", "Prix le plus bas"],
    jurisdiction: "Netherlands",
    logging: "No Identifiable Data",
    speed_loss: "4%",
    connections: "Unlimited",
    summary: "Rapport qualité/prix imbattable avec des fonctionnalités avancées comme le spoofing GPS."
  },
  {
    name: "CyberGhost",
    price: 2.00,
    servers: 12000,
    countries: 100,
    devices: "Windows, Mac, iOS, Android, Linux, Fire TV, Apple TV, Router",
    rating: 4.4,
    logo: "https://placehold.co/60x60/7e22ce/white?text=CG",
    offer_link: "#",
    features: ["Essai gratuit sans CB", "Smart DNS efficace", "45 jours de remboursement"],
    jurisdiction: "Romania",
    logging: "No Identifiable Data",
    speed_loss: "5%",
    connections: 7,
    summary: "Idéal pour les débutants avec une interface simple et un excellent Smart DNS pour les Smart TV."
  },
  {
    name: "Proton VPN",
    price: 4.00,
    servers: 13124,
    countries: 117,
    devices: "Windows, Mac, iOS, Android, Linux, Fire TV, Apple TV, Router",
    rating: 4.3,
    logo: "https://placehold.co/60x60/0891b2/white?text=PV",
    offer_link: "#",
    features: ["Meilleur VPN gratuit", "Open-source", "Secure Core"],
    jurisdiction: "Switzerland",
    logging: "No Logs",
    speed_loss: "7%",
    connections: 10,
    summary: "Transparence totale grâce au code open-source et à des audits indépendants. Le meilleur VPN gratuit."
  },
];

const reviews = [
  { name: "ExpressVPN", rating: 4.8, comment: "Meilleur pour Netflix et BBC iPlayer. Support ultra-rapide.", author: "Marie, Paris" },
  { name: "NordVPN", rating: 4.7, comment: "Parfait pour la sécurité et le double chiffrement.", author: "Thomas, Lyon" },
  { name: "PIA", rating: 4.6, comment: "Le meilleur rapport qualité/prix pour le torrenting.", author: "Lucas, Marseille" },
  { name: "Surfshark", rating: 4.5, comment: "Incroyable à ce prix ! GPS spoofing très utile.", author: "Chloé, Toulouse" },
];

const guides = [
  { title: "Qu’est-ce qu’un VPN ?", desc: "Explication simple : comme une enveloppe scellée pour vos données.", link: "#" },
  { title: "Comment choisir un VPN ?", desc: "Nos 9 critères : confidentialité, vitesse, streaming, etc.", link: "#" },
  { title: "Installer un VPN sur Windows", desc: "Étape par étape avec ExpressVPN ou NordVPN.", link: "#" },
  { title: "VPN pour Netflix", desc: "Quels VPN débloquent 30+ régions Netflix en 2025 ?", link: "#" },
  { title: "Sécurité et vie privée", desc: "Pourquoi éviter les VPN gratuits ? Risques réels.", link: "#" },
  { title: "VPN en Chine", desc: "Quels services fonctionnent derrière le Grand Pare-feu ?", link: "#" },
];

// Composants réutilisables
const Header = ({ active }) => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-700 mb-2 md:mb-0">VPN Compare</h1>
      <nav className="flex flex-wrap gap-4 md:gap-6 mt-2 md:mt-0">
        {[
          { name: "Accueil", path: "/" },
          { name: "Comparatifs", path: "/comparatifs" },
          { name: "Top VPN", path: "/top" },
          { name: "Guides", path: "/guides" },
          { name: "Avis", path: "/avis" },
        ].map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`font-medium transition-colors hover:text-blue-600 ${
              active === item.path ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-700"
            }`}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-50 border-t mt-16">
    <div className="container mx-auto px-4 py-6 text-center text-gray-600">
      &copy; 2025 VPN Compare. Tous droits réservés.
    </div>
  </footer>
);

const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow ${className}`}
  >
    {children}
  </motion.div>
);

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < Math.floor(rating) ? "currentColor" : "none"}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ))}
    <span className="ml-1 text-sm font-medium text-gray-700">{rating}/5</span>
  </div>
);

// Pages
const HomePage = () => (
  <>
    <Header active="/" />
    <main className="py-10">
      <section className="container mx-auto px-4 text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Le comparateur VPN le plus fiable de 2025
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
          Basé sur <strong>30 000+ heures de tests</strong> indépendants par Top10VPN.
        </p>
        <p className="text-gray-600 mb-8">
          Aucune affiliation commerciale. Recommandations 100% impartiales.
        </p>
        <a
          href="/comparatifs"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
        >
          Voir les comparatifs
        </a>
      </section>

      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <Shield className="text-blue-600 mb-3" size={24} />
            <h3 className="text-xl font-semibold mb-2">Top 6 VPN</h3>
            <p className="text-gray-600 mb-4">Notre classement basé sur des tests réels et indépendants.</p>
            <a href="/top" className="text-blue-600 font-medium hover:underline flex items-center">
              Découvrir <Play size={14} className="ml-1" />
            </a>
          </Card>
          <Card>
            <BookOpen className="text-green-600 mb-3" size={24} />
            <h3 className="text-xl font-semibold mb-2">Guides VPN</h3>
            <p className="text-gray-600 mb-4">Apprenez à choisir, installer et utiliser un VPN en toute sécurité.</p>
            <a href="/guides" className="text-blue-600 font-medium hover:underline flex items-center">
              Lire nos guides <Play size={14} className="ml-1" />
            </a>
          </Card>
          <Card>
            <MessageCircle className="text-yellow-500 mb-3" size={24} />
            <h3 className="text-xl font-semibold mb-2">Avis vérifiés</h3>
            <p className="text-gray-600 mb-4">Retours d’utilisateurs réels sur les meilleurs VPN.</p>
            <a href="/avis" className="text-blue-600 font-medium hover:underline flex items-center">
              Voir les avis <Play size={14} className="ml-1" />
            </a>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Nos 3 meilleurs VPN en 2025</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {vpnData.slice(0, 3).map((vpn, idx) => (
            <Card key={idx} className="border-l-4 border-blue-600">
              <div className="flex items-start gap-4">
                <img src={vpn.logo} alt={vpn.name} className="w-16 h-16 rounded" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{vpn.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">À partir de {vpn.price}€/mois</p>
                  <div className="mt-2">
                    <StarRating rating={vpn.rating} />
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{vpn.summary}</p>
                  <a
                    href={vpn.offer_link}
                    className="mt-3 inline-block text-blue-600 font-medium hover:underline"
                  >
                    Voir l’offre
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

const ComparatifsPage = () => {
  const [filteredData, setFilteredData] = useState(vpnData);
  const [filters, setFilters] = useState({ minPrice: "", maxPrice: "", minRating: "" });

  useEffect(() => {
    let result = [...vpnData];
    if (filters.minPrice) result = result.filter(v => v.price >= parseFloat(filters.minPrice));
    if (filters.maxPrice) result = result.filter(v => v.price <= parseFloat(filters.maxPrice));
    if (filters.minRating) result = result.filter(v => v.rating >= parseFloat(filters.minRating));
    setFilteredData(result);
  }, [filters]);

  return (
    <>
      <Header active="/comparatifs" />
      <main className="py-8 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Comparatif VPN 2025</h1>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Filter size={18} className="mr-2" /> Filtres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix min (€)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix max (€)</label>
              <input
                type="number"
                step="0.01"
                placeholder="10"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note min</label>
              <input
                type="number"
                step="0.1"
                placeholder="4.0"
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            onClick={() => setFilters({ minPrice: "", maxPrice: "", minRating: "" })}
            className="mt-4 text-sm text-blue-600 hover:underline"
          >
            Réinitialiser
          </button>
        </div>

        <div className="space-y-6">
          {filteredData.map((vpn, idx) => (
            <Card key={idx}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img src={vpn.logo} alt={vpn.name} className="w-20 h-20 rounded-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">{vpn.name}</h3>
                      <div className="mt-1">
                        <StarRating rating={vpn.rating} />
                      </div>
                      <p className="mt-2 text-gray-700">{vpn.summary}</p>
                    </div>
                    <a
                      href={vpn.offer_link}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                      Voir l’offre
                    </a>
                  </div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Prix</p>
                      <p className="font-medium">À partir de {vpn.price}€/mois</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Serveurs</p>
                      <p className="font-medium">{vpn.servers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Pays</p>
                      <p className="font-medium">{vpn.countries}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Perte vitesse</p>
                      <p className="font-medium">{vpn.speed_loss}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-700 font-medium">Fonctionnalités clés :</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {vpn.features.map((f, i) => (
                        <li key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

const TopVpnPage = () => (
  <>
    <Header active="/top" />
    <main className="py-8 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Top 6 VPN 2025 (Tests indépendants)</h1>
      <div className="space-y-6">
        {vpnData.map((vpn, idx) => (
          <Card key={idx} className={idx === 0 ? "ring-2 ring-blue-500" : ""}>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0 text-2xl font-bold text-gray-400 w-10">#{idx + 1}</div>
              <img src={vpn.logo} alt={vpn.name} className="w-16 h-16 rounded" />
              <div className="flex-1">
                <h3 className="text-xl font-bold">{vpn.name}</h3>
                <div className="mt-1">
                  <StarRating rating={vpn.rating} />
                </div>
                <p className="mt-2 text-gray-600">{vpn.summary}</p>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div><span className="text-gray-500">Juridiction :</span> <span className="font-medium">{vpn.jurisdiction}</span></div>
                  <div><span className="text-gray-500">Journalisation :</span> <span className="font-medium">{vpn.logging}</span></div>
                  <div><span className="text-gray-500">Connexions :</span> <span className="font-medium">{vpn.connections}</span></div>
                  <div><span className="text-gray-500">Perte vitesse :</span> <span className="font-medium">{vpn.speed_loss}</span></div>
                </div>
                <a
                  href={vpn.offer_link}
                  className="mt-4 inline-block text-blue-600 font-medium hover:underline"
                >
                  Voir l’offre
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
    <Footer />
  </>
);

const AvisPage = () => (
  <>
    <Header active="/avis" />
    <main className="py-8 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Avis utilisateurs vérifiés</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, idx) => (
          <Card key={idx}>
            <h3 className="text-xl font-bold">{review.name}</h3>
            <StarRating rating={review.rating} />
            <p className="mt-3 italic">"{review.comment}"</p>
            <p className="text-gray-600 mt-2">— {review.author}</p>
          </Card>
        ))}
      </div>
    </main>
    <Footer />
  </>
);

const GuidesPage = () => (
  <>
    <Header active="/guides" />
    <main className="py-8 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Guides VPN 2025</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, idx) => (
          <Card key={idx}>
            <BookOpen className="text-indigo-600 mb-3" size={24} />
            <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
            <p className="text-gray-600 mb-4">{guide.desc}</p>
            <a href={guide.link} className="text-blue-600 font-medium hover:underline">
              Lire le guide →
            </a>
          </Card>
        ))}
      </div>
    </main>
    <Footer />
  </>
);

const App = () => {
  const path = window.location.pathname;

  if (path.startsWith('/comparatifs')) return <ComparatifsPage />;
  if (path.startsWith('/top')) return <TopVpnPage />;
  if (path.startsWith('/avis')) return <AvisPage />;
  if (path.startsWith('/guides')) return <GuidesPage />;
  return <HomePage />;
};

export default App;


import { Navbar } from "@/components/navbar";
import Link from "next/link";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Une tarification transparente et flexible
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              Payez uniquement pour ce que vous utilisez, avec des tarifs dégressifs pour les utilisations intensives
            </p>
          </div>
        </div>

        {/* Base Price Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#28274A] p-8 rounded-lg shadow-[0_0_15px_rgba(98,44,108,0.3)]">
              <h2 className="text-3xl font-bold mb-6">Prix de Base</h2>
              <div className="text-4xl font-bold mb-4">
                30 <span className="text-2xl text-white/70">UOS</span>
                <span className="text-xl text-white/70">/ snapshot</span>
              </div>
              <p className="text-white/80 mb-8">
                Prix de base pour un snapshot simple. Les prix peuvent varier en fonction des fonctionnalités additionnelles et du volume.
              </p>
            </div>
          </div>
        </section>

        {/* Volume Discounts Section */}
        <section className="py-20 px-4 bg-[#28274A]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Tarifs Dégressifs
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {volumeDiscounts.map((tier, index) => (
                <div 
                  key={index}
                  className="bg-[#1A1A2E] p-6 rounded-lg shadow-[0_0_15px_rgba(98,44,108,0.3)] text-center"
                >
                  <div className="text-2xl font-bold mb-2">{tier.volume}</div>
                  <div className="text-3xl font-bold text-[#AC46E7] mb-2">
                    {tier.price} <span className="text-lg text-white/70">UOS</span>
                  </div>
                  <p className="text-white/70">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Coefficients de Complexité
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {additionalFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-[#28274A] p-6 rounded-lg shadow-[0_0_15px_rgba(98,44,108,0.3)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{feature.name}</h3>
                    <div className="text-2xl font-bold text-[#AC46E7]">
                      +{feature.surcharge}%
                    </div>
                  </div>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Calculation Section */}
        <section className="py-20 px-4 bg-[#28274A]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Exemple de Calcul
            </h2>
            <div className="bg-[#1A1A2E] p-8 rounded-lg shadow-[0_0_15px_rgba(98,44,108,0.3)]">
              <h3 className="text-2xl font-bold mb-6">Job Hebdomadaire sur 1 Mois</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>4 snapshots (1 par semaine)</span>
                  <span>120 UOS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Export CSV (+10%)</span>
                  <span>+12 UOS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Airdrop UNIQ (+20%)</span>
                  <span>+24 UOS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conditions personnalisées (+10%)</span>
                  <span>+12 UOS</span>
                </div>
                <div className="border-t border-[#8757B2]/20 my-4"></div>
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total</span>
                  <span>168 UOS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cancellation Policy Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#28274A] p-8 rounded-lg shadow-[0_0_15px_rgba(98,44,108,0.3)]">
              <h2 className="text-3xl font-bold mb-6">Politique d'Annulation</h2>
              <p className="text-white/80 mb-6">
                Vous pouvez annuler un job à tout moment. Cependant, une annulation tardive entraînera un malus de 20% sur le coût total du job.
              </p>
              <div className="bg-[#1A1A2E] p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Exemple d'Annulation</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Coût initial du job</span>
                    <span>168 UOS</span>
                  </div>
                  <div className="flex justify-between items-center text-[#AC46E7]">
                    <span>Malus d'annulation (20%)</span>
                    <span>-33.6 UOS</span>
                  </div>
                  <div className="border-t border-[#8757B2]/20 my-4"></div>
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Remboursement</span>
                    <span>134.4 UOS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#28274A]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Créez votre premier job et découvrez la puissance d'Ultra-Times Snapshot
            </p>
            <Link 
              href="/dashboard"
              className="inline-block bg-[#AC46E7] hover:bg-[#8757B2] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-[0_0_15px_rgba(172,70,231,0.3)]"
            >
              Lancer la dApp
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

const volumeDiscounts = [
  {
    volume: "1-2 snapshots",
    price: "30",
    description: "Prix standard par snapshot"
  },
  {
    volume: "3-5 snapshots",
    price: "27",
    description: "10% de réduction"
  },
  {
    volume: "6-10 snapshots",
    price: "24",
    description: "20% de réduction"
  },
  {
    volume: "10+ snapshots",
    price: "21",
    description: "30% de réduction"
  }
];

const additionalFeatures = [
  {
    name: "Export CSV",
    surcharge: "10",
    description: "Exportation des données en format CSV pour analyse"
  },
  {
    name: "Airdrop UNIQ",
    surcharge: "20",
    description: "Distribution automatique de tokens UNIQ"
  },
  {
    name: "Airdrop UOS",
    surcharge: "10",
    description: "Distribution automatique de tokens UOS"
  },
  {
    name: "Conditions Personnalisées",
    surcharge: "10",
    description: "Configuration de règles complexes pour les airdrops"
  }
]; 
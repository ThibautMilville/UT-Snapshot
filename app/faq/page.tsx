'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Navbar } from '@/components/navbar';
import Footer from "@/components/footer";

export default function FAQ() {
  return (
    <div className="relative min-h-screen bg-foreground/10 text-white">
      <Navbar />

      

      <div className="pt-20">
        <div className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto">
              Everything you need to know about Ultra-Times Snapshot
            </p>
          </div>
        </div>

        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/80 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-primary border-white/10 rounded-lg px-4 hover:bg-primary/80 transition-colors"
                >
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <Footer />
      </div>

      <div className="absolute overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/80 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "What is UOS and how can I get it?",
    answer: "UOS (Ultra Operating System) is the native currency of the Ultra blockchain. You can obtain UOS by purchasing it on exchanges or by participating in the Ultra ecosystem. For more information, visit the official Ultra website."
  },
  {
    question: "Is the platform secure?",
    answer: "Yes, Ultra-Times Snapshot uses the latest security technologies to protect your data and transactions. We never have access to your private keys, and all transactions are signed directly from your wallet."
  },
  {
    question: "Can I stop a job once it's started?",
    answer: "Yes, you can stop a job at any time from your dashboard. However, a late cancellation will result in a 20% penalty on the total job cost. Check our Pricing page for more details."
  },
  {
    question: "Who can use this service?",
    answer: "Ultra-Times Snapshot is designed for Ultra Factory Managers who want to manage their NFT collections. You must have the Factory Manager role to use the service."
  },
  {
    question: "How are costs calculated?",
    answer: "The base cost is 30 UOS per snapshot. Volume discounts are applied, and additional fees may be added for features like CSV export or airdrops. Check our Pricing page for more details."
  },
  {
    question: "Can I export my data?",
    answer: "Yes, you can export your data in CSV format at any time. This feature adds a 10% surcharge to the base snapshot price."
  },
  {
    question: "How do airdrops work?",
    answer: "Airdrops can be configured to automatically distribute UNIQ tokens or UOS to your NFT holders. You can set custom conditions to target specific holders."
  },
  {
    question: "Are there any limits on collection size?",
    answer: "No, there are no limits on collection size. However, processing time may vary depending on the collection size and the complexity of airdrop conditions."
  },
  {
    question: "How can I track my jobs' status?",
    answer: "You can track the status of all your jobs in real-time from your dashboard. Notifications are also sent to keep you informed of important updates."
  },
  {
    question: "What happens if a snapshot fails?",
    answer: "In case of a snapshot failure, we will notify you immediately. You can then restart the snapshot or contact our support for assistance. Failed snapshots are not charged."
  }
]; 
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

import { EcoclinicHero } from "@/components/ui/ecoclinic/EcoclinicHero";
import { EcoclinicHowItWorks } from "@/components/ui/ecoclinic/EcoclinicHowItWorks";
import { EcoclinicProblemSolution } from "@/components/ui/ecoclinic/EcoclinicProblemSolution";
import { EcoclinicFeatures } from "@/components/ui/ecoclinic/EcoclinicFeatures";
import { EcoclinicBenefits } from "@/components/ui/ecoclinic/EcoclinicBenefits";
import { EcoclinicFAQ } from "@/components/ui/ecoclinic/EcoclinicFAQ";
import { EcoclinicTarget } from "@/components/ui/ecoclinic/EcoclinicTarget";
import { EcoclinicCTA } from "@/components/ui/ecoclinic/EcoclinicCTA";

export default function EcoclinicPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      
      <div className="flex flex-col">
        <EcoclinicHero />
        <EcoclinicHowItWorks />
        <EcoclinicProblemSolution />
        <EcoclinicFeatures />
        <EcoclinicBenefits />
        <EcoclinicFAQ />
        <EcoclinicTarget />
        <EcoclinicCTA />
      </div>

      <Footer />
    </main>
  );
}

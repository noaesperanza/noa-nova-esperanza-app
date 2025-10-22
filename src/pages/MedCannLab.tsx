import { useEffect } from "react";
import { Helmet } from "../components/Helmet";
import { useToast } from "../hooks/use-toast";
import { useIsClient } from "../hooks/useIsClient";
import Header from "../components/Header";
import { SidebarPesquisa, MetodologiaCards, CallToAction } from "../components/MedCannLabSections";
import ArteEntrevistaClinica from "../routes/ArteEntrevistaClinica";
import ArvoreDoEnsino from "../routes/ArvoreDoEnsino";
import IAResidente from "../routes/IAResidente";
import CidadeAmigaDosRins from "../routes/CidadeAmigaDosRins";
import PosGraduacaoCannabis from "../routes/PosGraduacaoCannabis";
import { Route, Routes } from "react-router-dom";

const MedCannLab = () => {
  const { toast } = useToast();
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get("message");
    if (message === "auth_success") {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo à plataforma Nôa Esperanza."
      });
    }
  }, [toast, isClient]);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>MedCann Lab - Cannabis Medicinal & Nefrologia | Nôa Esperanza</title>
        <meta
          name="description"
          content="Integração pioneira da cannabis medicinal com nefrologia e neurologia, aplicada pela metodologia AEC para transformar o cuidado em saúde."
        />
        <meta
          name="keywords"
          content="cannabis medicinal, nefrologia, neurologia, metodologia AEC, pesquisa médica, inovação saúde"
        />
        <link rel="canonical" href={`${window.location.origin}/medcann-lab`} />
      </Helmet>

      <div className="min-h-screen premium-background">
        <Header currentSpecialty="cannabis" setCurrentSpecialty={() => {}} />
        <main>
          <Routes>
            <Route
              index
              element={
                <div className="flex flex-col md:flex-row gap-4 py-2 px-4">
                  <aside className="w-full md:w-72 flex-shrink-0">
                    <SidebarPesquisa />
                  </aside>
                  <section className="flex-1">
                    <div className="text-center mb-4">
                      <h1 className="text-base font-bold text-premium">Cannabis Medicinal & Nefrologia</h1>
                      <p className="text-sm text-gray-300">
                        Integração entre prescrição canabinoide, escuta clínica e proteção da função renal.
                      </p>
                    </div>
                    <MetodologiaCards />
                    <CallToAction />
                  </section>
                </div>
              }
            />
            <Route path="pos-graduacao" element={<PosGraduacaoCannabis />} />
            <Route path="arte-entrevista-clinica" element={<ArteEntrevistaClinica />} />
            <Route path="arvore-do-ensino" element={<ArvoreDoEnsino />} />
            <Route path="ia-residente" element={<IAResidente />} />
            <Route path="cidade-amiga-dos-rins" element={<CidadeAmigaDosRins />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default MedCannLab;


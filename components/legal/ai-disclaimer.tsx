"use client";

import React, { useState } from "react";

import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CpuIcon,
  GitBranch,
} from "lucide-react";

import { Modal } from "@/components/ui/modal";

const AiDisclaimerContent = () => {
  return (
    <div className="text-foreground text-sm">
      <p>
        Les réponses sur chatvote sont générées par une{" "}
        <span className="font-semibold">intelligence artificielle</span>. Elles
        sont basées sur des informations extraites de{" "}
        <span className="font-semibold">programmes de partis</span> et de{" "}
        <span className="font-semibold">programmes électoraux</span> accessibles
        au public. Bien que chatvote s&lsquo;efforce de fournir des informations
        précises sur les positions et valeurs des partis, il convient de noter :
      </p>

      <ul className="flex list-inside flex-col gap-4 py-4 *:flex *:items-center *:gap-2">
        <li>
          <CpuIcon className="mr-2 size-6 shrink-0" />
          <span className="inline-block">
            Le{" "}
            <span className="font-semibold">traitement et la génération</span>{" "}
            de tout le contenu sont{" "}
            <span className="font-semibold">automatisés.</span>
          </span>
        </li>
        <li>
          <AlertCircleIcon className="mr-2 size-6 shrink-0" />
          <span className="inline-block">
            Les réponses ne doivent{" "}
            <span className="font-semibold">
              pas être considérées comme des déclarations officielles des partis
            </span>
            .
          </span>
        </li>
        <li>
          <GitBranch className="mr-2 size-6 shrink-0" />
          <span className="inline-block">
            Les{" "}
            <span className="font-semibold">
              positions politiques complexes
            </span>{" "}
            peuvent ne pas être saisies dans toutes leurs nuances.
          </span>
        </li>
        <li>
          <AlertTriangleIcon className="mr-2 size-6 shrink-0" />
          <span className="inline-block">
            Des <span className="font-semibold">inexactitudes</span> ou des{" "}
            <span className="font-semibold">mauvaises interprétations</span>{" "}
            peuvent parfois survenir.
          </span>
        </li>
      </ul>

      <p>
        Ce chat IA sert d&lsquo;
        <span className="font-semibold">outil éducatif</span> pour découvrir
        différentes positions politiques. Pour des{" "}
        <span className="font-semibold">informations contraignantes</span>,
        veuillez utiliser les{" "}
        <span className="font-semibold">sources officielles des partis</span>.
      </p>
    </div>
  );
};

const AiDisclaimer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <React.Fragment>
      <p className="text-muted-foreground my-2 text-center text-xs">
        chatvote peut faire des erreurs.{" "}
        <button
          className="font-semibold underline"
          onClick={() => setIsOpen(true)}
        >
          En savoir plus ici.
        </button>
      </p>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-lg p-6"
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Avis IA</h2>
        </div>
        <AiDisclaimerContent />
      </Modal>
    </React.Fragment>
  );
};

export default AiDisclaimer;

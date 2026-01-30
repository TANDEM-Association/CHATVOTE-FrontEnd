import Link from "next/link";

import {
  MessageCircleQuestionIcon,
  MessageCircleReplyIcon,
  PlusIcon,
  TextSearchIcon,
  VoteIcon,
  WaypointsIcon,
} from "lucide-react";

import ChatActionButtonHighlight from "./chat/chat-action-button-highlight";
import { MAX_SELECTABLE_PARTIES } from "./chat/chat-group-party-select-content";
import ProConIcon from "./chat/pro-con-icon";
import { AccordionGroup, AccordionItem } from "./ui/accordion";
import { Button } from "./ui/button";

const partySpecificQuestions = [
  "Quelle est la position de LFI sur le climat ?",
  "Comment le RN se positionne-t-il sur la dette publique ?",
  "Comment Renaissance veut-elle réduire la bureaucratie ?",
  "Comment les Écologistes veulent-ils faire avancer la transition numérique ?",
  "Comment le PS et le PCF veulent-ils mettre en œuvre la réforme du temps de travail ?",
  "Comment EELV et Renaissance veulent-ils améliorer la coopération européenne ?",
];

const compareQuestions = [
  "Comment les partis se différencient-ils dans la lutte contre le changement climatique ?",
  "Quelles sont les différences de position entre Renaissance et le RN sur la dette ?",
  "Comparez les positions de LFI et du RN sur la migration.",
];

const generalQuestions = [
  "Comment puis-je voter par procuration ?",
  "Qui est derrière chatvote ?",
  "Comment fonctionne le vote par procuration ?",
];

function buildQuestionLink(question: string) {
  return `/session?q=${question}`;
}

function HowTo() {
  return (
    <article>
      <section>
        <p>
          <span className="font-bold underline">chatvote</span> est un outil IA
          interactif qui vous aide à vous informer sur les positions et les
          projets des partis. Vous pouvez poser des questions à
          l&lsquo;assistant IA sur différents sujets politiques, et il vous
          fournira des réponses neutres basées sur les{" "}
          <span className="font-bold">
            programmes et autres publications des partis.
          </span>
          .
        </p>

        <p className="mt-4 text-sm font-semibold">Le processus est simple :</p>

        <ul className="[&_li]:mt-4 [&_li]:text-sm">
          <li className="relative pl-10">
            <MessageCircleQuestionIcon className="absolute top-0 left-0" />
            Vous posez une question
          </li>
          <li className="relative pl-10">
            <TextSearchIcon className="absolute top-0 left-0" />
            <span className="font-bold underline">chatvote</span> recherche dans
            les documents pertinents comme les programmes pour trouver les
            informations appropriées.
          </li>
          <li className="relative pl-10">
            <MessageCircleReplyIcon className="absolute top-0 left-0" />
            Les informations pertinentes sont ensuite utilisées pour générer une
            réponse compréhensible et neutre.
          </li>
          <li className="relative pl-10">
            <WaypointsIcon className="absolute top-0 left-0" />
            Vous pouvez ensuite faire évaluer la position du parti en cliquant
            sur le bouton sous la réponse. Ou faire analyser la réponse sur la
            base du comportement de vote du parti.
          </li>
        </ul>
      </section>

      <section className="mt-6">
        <AccordionGroup>
          <AccordionItem title="Questions">
            <div className="font-bold">Quelles questions puis-je poser ?</div>
            <div>
              En principe, vous pouvez poser toutes les questions que vous avez
              sur les programmes des partis ou leurs positions. De plus, vous
              pouvez également poser des questions sur des sujets généraux comme
              le déroulement d&lsquo;une élection.
              <br />
              <br />
              <span className="font-bold">
                Exemples de questions spécifiques aux partis :
              </span>
              <ul className="list-outside list-disc py-2 pl-4 [&_li]:pt-1">
                {partySpecificQuestions.map((question) => (
                  <li key={question}>
                    <Link
                      className="underline"
                      href={buildQuestionLink(question)}
                    >
                      {question}
                    </Link>
                  </li>
                ))}
              </ul>
              <br />
              <span className="font-bold">
                Exemples de questions comparatives :
              </span>
              <ul className="list-outside list-disc py-2 pl-4 [&_li]:pt-1">
                {compareQuestions.map((question) => (
                  <li key={question}>
                    <Link
                      className="underline"
                      href={buildQuestionLink(question)}
                    >
                      {question}
                    </Link>
                  </li>
                ))}
              </ul>
              <br />
              <span className="font-bold">
                Exemples de questions générales :
              </span>
              <ul className="list-outside list-disc py-2 pl-4 [&_li]:pt-1">
                {generalQuestions.map((question) => (
                  <li key={question}>
                    <Link
                      className="underline"
                      href={buildQuestionLink(question)}
                    >
                      {question}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionItem>

          <AccordionItem title="number-parties">
            <div className="font-bold">
              Avec combien de partis puis-je discuter ?
            </div>
            <div>
              Vous pouvez démarrer le chat avec jusqu&lsquo;à{" "}
              <span className="font-bold">{MAX_SELECTABLE_PARTIES} partis</span>{" "}
              simultanément, mais vous avez la possibilité d&lsquo;ajouter
              d&lsquo;autres partis pendant la conversation.
              <br />
              <br />
              De plus, vous pouvez facilement ajouter ou supprimer des partis du
              chat via le bouton{" "}
              <span className="inline-block">
                <PlusIcon className="bg-primary text-primary-foreground size-4 rounded-full p-1" />
              </span>{" "}
              au-dessus du champ de texte.
            </div>
          </AccordionItem>

          <AccordionItem title="Évaluer la position">
            <p>
              Lorsque vous cliquez sur ce bouton sous l&lsquo;un des messages,
              la position du message est évaluée. Les critères suivants sont
              pris en compte : Faisabilité, Effets à court terme et à long
              terme.
              <br />
              Nous utilisons des informations et sources actuelles
              d&lsquo;Internet fournies par Perplexity.ai.
            </p>
            <div className="my-2 flex items-center justify-center">
              <div className="relative rounded-md">
                <Button
                  variant="outline"
                  className="h-8 px-2 group-data-has-message-background:bg-zinc-100 group-data-has-message-background:hover:bg-zinc-200 group-data-has-message-background:dark:bg-zinc-900 group-data-has-message-background:dark:hover:bg-zinc-800"
                  tooltip="Évaluer la position en Pour ou Contre"
                  type="button"
                >
                  <ProConIcon />
                  <span className="text-xs">Évaluer la position</span>
                </Button>
                <ChatActionButtonHighlight showHighlight />
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="Analyser le comportement de vote">
            <p>
              Lorsque vous cliquez sur ce bouton sous l&lsquo;un des messages,
              le comportement de vote passé du parti est analysé. De plus, en
              cliquant sur{" "}
              <span className="italic">&quot;Afficher les votes&quot;</span>{" "}
              vous pouvez voir des informations détaillées sur les votes du
              parti.
            </p>
            <div className="my-2 flex items-center justify-center">
              <div className="relative rounded-md">
                <Button
                  variant="outline"
                  className="h-8 px-2 group-data-has-message-background:bg-zinc-100 group-data-has-message-background:hover:bg-zinc-200 group-data-has-message-background:dark:bg-zinc-900 group-data-has-message-background:dark:hover:bg-zinc-800"
                  tooltip="Analyser le comportement de vote du parti"
                >
                  <VoteIcon />
                  <span className="text-xs">Comportement de vote</span>
                </Button>

                <ChatActionButtonHighlight showHighlight />
              </div>
            </div>
          </AccordionItem>

          <AccordionItem title="data">
            <div className="font-bold">Quelles données sont utilisées ?</div>
            <div>
              Pour fournir des réponses fondées et neutres,{" "}
              <span className="font-bold underline">chatvote</span> utilise une
              variété de sources de données :
              <ol className="list-outside list-decimal py-4 pl-4 [&_li]:pt-1">
                <li>
                  <div className="pl-2">
                    <span className="font-bold">
                      Programmes et autres documents pertinents :
                    </span>{" "}
                    En plus des programmes électoraux, les programmes de base et
                    d&lsquo;autres documents provenant des partis sont utilisés
                    pour obtenir une image complète des positions des partis.
                  </div>
                </li>
                <li>
                  <div className="pl-2">
                    <span className="font-bold">Documents de position :</span>{" "}
                    En plus des programmes de base, les programmes électoraux,
                    les documents de position et d&lsquo;autres documents des
                    partis sont utilisés pour obtenir une image complète des
                    positions.
                  </div>
                </li>
                <li>
                  <div className="pl-2">
                    <span className="font-bold">
                      Sources Internet pour l&lsquo;évaluation des positions :
                    </span>{" "}
                    Pour l&lsquo;évaluation différenciée des positions,{" "}
                    <span className="font-bold underline">chatvote</span>{" "}
                    utilise le service Perplexity.ai, qui s&lsquo;appuie sur des
                    sources Internet de qualité comme les sites
                    d&lsquo;actualités.
                  </div>
                </li>
              </ol>
              <br />
              Nous avons listé toutes les sources que{" "}
              <span className="font-bold underline">chatvote</span> utilise{" "}
              <Link href="/sources" className="underline">
                ici
              </Link>
              .
            </div>
          </AccordionItem>
          <AccordionItem title="guidelines">
            <div className="font-bold">
              Quelles directives chatvote suit-il dans ses réponses ?
            </div>
            <div>
              Les directives suivantes s&lsquo;appliquent aux réponses dans les
              chats :
              <ol className="list-outside list-decimal py-4 pl-4 [&_li]:pt-1">
                <li>
                  <div className="pl-2">
                    <span className="font-bold">Basé sur les sources :</span>{" "}
                    Les réponses doivent être basées sur les déclarations
                    pertinentes des extraits de programme fournis.
                  </div>
                </li>
                <li>
                  <div className="pl-2">
                    <span className="font-bold">Neutralité :</span> Les
                    positions des partis doivent être présentées de manière
                    neutre et sans jugement.
                  </div>
                </li>
                <li>
                  <div className="pl-2">
                    <span className="font-bold">Transparence :</span> Pour
                    chaque déclaration, les sources pertinentes doivent être
                    directement liées pour permettre un examen détaillé et une
                    vérification du contenu.
                  </div>
                </li>
              </ol>
            </div>
          </AccordionItem>
          <AccordionItem title="party-selection">
            <div className="font-bold">
              Selon quels critères les partis sont-ils sélectionnés ?
            </div>
            <div>
              La sélection initiale des partis a été effectuée et s&lsquo;est
              basée sur la publication de leurs programmes électoraux. Nous
              voulons maintenant ajouter progressivement les partis manquants et
              sommes très heureux de votre aide.
              <br />
              <br />
              Si vous manquez un parti, n&lsquo;hésitez pas à nous envoyer un
              e-mail avec son programme en PDF en pièce jointe à{" "}
              <a href="mailto:info@chatvote.org" className="underline">
                info@chatvote.org
              </a>
              , et nous l&lsquo;ajouterons dès que possible.
            </div>
          </AccordionItem>
        </AccordionGroup>
      </section>
    </article>
  );
}

export default HowTo;

import { getAuth, getUsersChatSessions } from "@/lib/firebase/firebase-server";

import SidebarHistory from "./sidebar-history";

async function getChatHistory() {
  const auth = await getAuth();

  if (!auth.session) {
    return;
  }

  return getUsersChatSessions(auth.session.uid);
}

async function SidebarHistorySr() {
  const history = await getChatHistory();

  return <SidebarHistory history={history} />;
}

export default SidebarHistorySr;

import ReceptionistHeader from "./components/receptionist/ReceptionistHeader";
import ReceptionistGrid from "./components/receptionist/ReceptionistGrid";

export default function Receptionist() {
  return (
    <main className="flex flex-1 flex-col px-6 pb-16">
 <ReceptionistHeader />
          <ReceptionistGrid />
    </main>
  );
}
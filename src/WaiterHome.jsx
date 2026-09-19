import WaiterActions from "./components/waiter/WaiterActions";

export default function WaiterHome() {
  return (
    <main className="flex flex-1 flex-col">
      <h1
        id="waiter-actions-title"
        className="mt-16 text-center text-[48px] font-semibold text-[#4b0d0d]"
      >
        Waiter
      </h1>

      <WaiterActions />
    </main>
  );
}
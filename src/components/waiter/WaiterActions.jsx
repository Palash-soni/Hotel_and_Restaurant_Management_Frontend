import { Link } from "react-router-dom";
import ActionButton from "./ActionButton";

export default function WaiterActions() {
  return (
    <section
      aria-labelledby="waiter-actions-title"
      className="mt-28 flex w-full justify-center"
    >
      <div className="flex flex-col items-center gap-14 md:flex-row md:gap-24">
       <Link to="/Waiter/TakeOrder"> <ActionButton>Take Order</ActionButton></Link>
       <Link to="/Waiter/CurrentOrder"> <ActionButton>Current Orders</ActionButton></Link>
   
      </div>
    </section>
  );
}
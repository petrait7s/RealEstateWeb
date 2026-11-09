import { notFound } from "next/navigation";

// Catch-all so unknown URLs render the branded localized 404 inside the layout.
export default function CatchAll() {
  notFound();
}

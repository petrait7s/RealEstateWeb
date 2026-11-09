import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ number }: { number: string }) {
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="shadow-lift fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-110 sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}

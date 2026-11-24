import { motion } from "framer-motion";

export function CornerOrnament({ className = "" }: { className?: string }) {
  return <svg className={`corner-ornament ${className}`} viewBox="0 0 180 180" aria-hidden="true">
    <path d="M8 172 C8 78 78 8 172 8 M8 132 C8 64 64 8 132 8 M8 92 C8 54 54 8 92 8" />
    <path d="M18 162 C46 150 54 126 44 106 C70 116 91 103 96 78 C111 98 133 99 155 82 C144 111 151 133 172 142" />
    <path d="M25 153 C47 135 48 119 35 101 C58 108 76 95 78 74 C94 92 112 91 133 73" />
    <circle cx="44" cy="106" r="4"/><circle cx="96" cy="78" r="4"/><circle cx="155" cy="82" r="4"/>
  </svg>;
}

export function Petals() {
  return <div className="petal-field" aria-hidden="true">
    {Array.from({ length: 18 }, (_, i) => (
      <motion.span key={i} className="petal"
        initial={{ y: "-12vh", x: 0, rotate: 0, opacity: 0 }}
        animate={{ y: "112vh", x: [0, (i % 2 ? 36 : -30), 12], rotate: 360 + i * 30, opacity: [0, .7, .55, 0] }}
        transition={{ duration: 13 + (i % 7) * 2, delay: (i % 9) * 1.2, repeat: Infinity, ease: "linear" }}
        style={{ left: `${(i * 37) % 100}%`, width: `${7 + (i % 4) * 2}px`, height: `${12 + (i % 4) * 3}px` }}
      />
    ))}
  </div>;
}

export function Mandala({ className = "" }: { className?: string }) {
  return <svg className={`mandala ${className}`} viewBox="0 0 300 300" aria-hidden="true">
    {Array.from({ length: 24 }, (_, i) => <g key={i} transform={`rotate(${i * 15} 150 150)`}>
      <path d="M150 28 C128 58 128 82 150 103 C172 82 172 58 150 28Z" />
      <path d="M150 9 L150 28 M150 103 L150 128" />
    </g>)}
    <circle cx="150" cy="150" r="43"/><circle cx="150" cy="150" r="24"/>
    <circle cx="150" cy="150" r="8" className="mandala-center"/>
  </svg>;
}
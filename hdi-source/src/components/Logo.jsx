export default function Logo({ className = "h-10 w-10" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M6 40c8-16 14-24 22-14 7 9 11 4 18-12 5 10 11 18 16 22"
        stroke="#1F4D3A"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 46c10-5 18-5 24 0 8 6 16 6 24 0"
        stroke="#1F4D3A"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M10 52c9-4 16-4 22 0 8 5 15 5 22 0"
        stroke="#4F8C73"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

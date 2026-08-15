import { useState, useRef } from 'react';

interface Ripple {
  id: number;
  colorStart: string;
  colorEnd: string;
}

export default function Contact() {
  const [subscribers, setSubscribers] = useState(128);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const actions = [
    {
      id: 'email',
      label: 'Email',
      href: 'mailto:tiborlovasz@icloud.com',
      description: 'Send me a direct message',
      gradientStops: { start: '#e11d48', end: '#9f1239' },
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/thelocoman',
      description: 'Check out my repositories',
      gradientStops: { start: '#f97316', end: '#c2410c' },
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/tibor-lovasz-435732260',
      description: "Let's connect professionally",
      gradientStops: { start: '#eab308', end: '#ca8a04' },
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.49 1.49 0 0 0-1.5 1.49 1.5 1.5 0 0 0 1.5 1.5 1.49 1.49 0 0 0 1.5-1.5 1.49 1.49 0 0 0-1.5-1.49z" />
        </svg>
      ),
    },
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://youtube.com',
      description: 'Watch my video content',
      gradientStops: { start: '#10b981', end: '#047857' },
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      id: 'instagram',
      label: 'Insta',
      href: 'https://instagram.com',
      description: 'Follow my updates',
      gradientStops: { start: '#2563eb', end: '#1d4ed8' },
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      href: 'https://tiktok.com',
      description: 'Check out short clips',
      gradientStops: { start: '#9333ea', end: '#6b21a8' },
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.54-1.28 2.53.01.92.49 1.81 1.25 2.33.89.62 2.08.73 3.08.33.95-.36 1.66-1.19 1.83-2.19.12-.66.08-1.34.08-2.02V.02z" />
        </svg>
      ),
    },
  ];

  const [chosenItem, setChosenItem] = useState(actions[0]);

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    setSubscribers((prev) => (isSubscribed ? prev - 1 : prev + 1));
  };

  const handleSliceHover = (item: (typeof actions)[0]) => {
    setChosenItem(item);

    const newRipple: Ripple = {
      id: Date.now(),
      colorStart: item.gradientStops.start,
      colorEnd: item.gradientStops.end,
    };

    setRipples((prev) => [...prev.slice(-3), newRipple]);
  };

  const total = actions.length;
  const wheelSize = 510;
  const centerRadius = 150;
  const outerRadius = 260;

  const getSlicePath = (index: number) => {
    const gapAngle = 0.04;
    const anglePerSlice = (2 * Math.PI) / total;

    const startAngle = index * anglePerSlice - Math.PI / 2 + gapAngle / 2;
    const endAngle = (index + 1) * anglePerSlice - Math.PI / 2 - gapAngle / 2;

    const center = wheelSize / 2;

    const x1 = center + outerRadius * Math.cos(startAngle);
    const y1 = center + outerRadius * Math.sin(startAngle);
    const x2 = center + outerRadius * Math.cos(endAngle);
    const y2 = center + outerRadius * Math.sin(endAngle);

    const x3 = center + centerRadius * Math.cos(endAngle);
    const y3 = center + centerRadius * Math.sin(endAngle);
    const x4 = center + centerRadius * Math.cos(startAngle);
    const y4 = center + centerRadius * Math.sin(startAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return `
      M ${x1} ${y1}
      A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${centerRadius} ${centerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
      Z
    `;
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#1e40af] to-[#45daea] flex flex-col justify-center items-center py-20 px-6 min-h-screen"
    >
      {/* Wave / Ripple Animations Container (Centered in <section>) */}
    <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
  {ripples.map((ripple) => (
    <div
      key={ripple.id}
      style={{
        background: `radial-gradient(circle, ${ripple.colorStart} 0%, ${ripple.colorEnd} 100%)`,
      }}
      className="absolute top-1/2 left-1/2 rounded-full animate-wave-expand"
      onAnimationEnd={() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }}
    />
  ))}
</div>

{/* Embedded CSS Keyframes for Wave Expansion */}
<style>{`
  @keyframes waveExpand {
    0% {
      width: 0px;
      height: 0px;
      transform: translate(-50%, -50%);
      opacity: 0.85;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      width: 2500px;
      height: 2500px;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }
  .animate-wave-expand {
    animation: waveExpand 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
`}</style>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-6 text-black">
          Social Media and Contact
        </h2>
        <p className="text-gray-900 font-medium max-w-xl text-center text-lg mb-10">
          I'm open to meeting new people and to new opportunities. Here are the
          channels through which you can connect with me or watch my content.
          Feel free to connect, and enjoy the new posts!
        </p>

        {/* Main Wheel Container */}
        <div className="relative w-[510px] h-[510px] flex items-center justify-center filter drop-shadow-2xl">
          {/* SVG Trapezoid Slices */}
          <svg
            width={wheelSize}
            height={wheelSize}
            className="absolute inset-0 z-10 overflow-visible"
          >
            <defs>
              {actions.map((item) => (
                <linearGradient
                  key={`grad-${item.id}`}
                  id={`slice-grad-${item.id}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={item.gradientStops.start} />
                  <stop offset="100%" stopColor={item.gradientStops.end} />
                </linearGradient>
              ))}
            </defs>

            {actions.map((item, index) => {
              const isChosen = chosenItem.id === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onMouseEnter={() => handleSliceHover(item)}
                  aria-label={item.label}
                >
                  <path
                    d={getSlicePath(index)}
                    fill={`url(#slice-grad-${item.id})`}
                    className={`transition-all duration-200 cursor-pointer ${
                      isChosen
                        ? 'stroke-white stroke-[2.5px] opacity-100 z-20'
                        : 'stroke-black/40 stroke-[1px] opacity-90 hover:opacity-100 hover:stroke-white hover:stroke-[2px]'
                    }`}
                  />
                </a>
              );
            })}
          </svg>

          {/* Overlay Icons & Labels */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {actions.map((item, index) => {
              const midAngle =
                (index + 0.5) * ((2 * Math.PI) / total) - Math.PI / 2;
              const iconRadius = (centerRadius + outerRadius) / 2;

              const x = Math.round(
                wheelSize / 2 + iconRadius * Math.cos(midAngle)
              );
              const y = Math.round(
                wheelSize / 2 + iconRadius * Math.sin(midAngle)
              );

              const isChosen = chosenItem.id === item.id;

              return (
                <div
                  key={item.id}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-all duration-200 ${
                    isChosen
                      ? 'text-white font-bold drop-shadow-lg scale-110'
                      : 'text-white/90'
                  }`}
                >
                  {item.icon}
                  <span className="text-[10px] font-black uppercase tracking-wider mt-0.5 drop-shadow-md">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Central Hub (Unchanged Original Attributes) */}
          <div
            style={{
              background: `linear-gradient(135deg, ${chosenItem.gradientStops.start}, ${chosenItem.gradientStops.end})`,
            }}
            className="z-30 border-[1px] border-black/40 rounded-full w-[220px] h-[220px] flex flex-col items-center justify-center shadow-2xl p-6 text-center transition-all duration-500 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

            <div className="relative z-10 flex flex-col items-center justify-center text-white">
              <div className="mb-2 scale-125 drop-shadow-md">
                {chosenItem.icon}
              </div>
              <span className="text-sm font-black uppercase tracking-wider drop-shadow-sm">
                {chosenItem.label}
              </span>
              <span className="text-xs text-white/90 font-medium leading-tight px-2 my-2 drop-shadow-sm">
                {chosenItem.description}
              </span>
            </div>

            <div className="relative z-10 flex items-center gap-2 mt-2 pt-2 border-t border-white/30 w-full justify-center">
              <span className="text-xs font-bold text-white/90">
                {subscribers} Subs
              </span>
              <button
                onClick={handleSubscribe}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 border border-black/20 shadow-sm ${
                  isSubscribed
                    ? 'bg-white/30 text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {isSubscribed ? '✓ Subscribed' : '+ Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
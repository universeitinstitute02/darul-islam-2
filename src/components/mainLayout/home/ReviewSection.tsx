"use client"

import React from "react"

type CardType = {
  image: string
  name: string
  handle: string
  date: string
}

const ReviewSection = () => {

  const cardsData: CardType[] = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Briar Martin',
      handle: '@neilstellar',
      date: 'April 20, 2025'
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Avery Johnson',
      handle: '@averywrites',
      date: 'May 10, 2025'
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Jordan Lee',
      handle: '@jordantalks',
      date: 'June 5, 2025'
    },
  ]

  const CreateCard = ({ card }: { card: CardType }) => (
    <div className="group p-5 mx-3 rounded-2xl 
    bg-white/80 backdrop-blur 
    border border-green-100 
    shadow-md hover:shadow-2xl 
    transition duration-300 w-72 shrink-0">

      {/* header */}
      <div className="flex gap-3 items-center">
        <img 
          className="w-11 h-11 rounded-full object-cover" 
          src={card.image} 
          alt={card.name} 
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm text-green-800">{card.name}</p>
            <span className="text-green-500 text-xs">✔</span>
          </div>
          <span className="text-xs text-neutral-500">{card.handle}</span>
        </div>
      </div>

      {/* review */}
      <p className="text-sm text-neutral-700 py-4 leading-relaxed">
        “এই প্ল্যাটফর্মটি সত্যিই অসাধারণ। খুব সহজে শেখা যায় এবং কনটেন্টগুলো অনেক মানসম্মত।”
      </p>

      {/* footer */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>{card.date}</span>
        <span className="text-green-600 font-medium">Verified</span>
      </div>
    </div>
  )

  return (
    <section className="py-14 bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">

      {/* heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-4xl font-extrabold text-green-800">
          শিক্ষার্থীদের মতামত
        </h2>
        <div className="w-16 h-1 bg-green-500 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* marquee styles */}
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee {
          animation: marqueeScroll 30s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>

      {/* row 1 */}
      <div className="relative max-w-6xl mx-auto overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />

        <div className="marquee flex min-w-[200%] py-4">
          {[...cardsData, ...cardsData].map((card, i) => (
            <CreateCard key={i} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      {/* row 2 */}
      <div className="relative max-w-6xl mx-auto overflow-hidden mt-2">
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />

        <div className="marquee marquee-reverse flex min-w-[200%] py-4">
          {[...cardsData, ...cardsData].map((card, i) => (
            <CreateCard key={i} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

    </section>
  )
}

export default ReviewSection
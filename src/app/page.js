"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const marquee = useRef(null);
  const xPercent = useRef(0);
  const direction = useRef(-1);

  useGSAP(() => {
    const animate = () => {
      if (xPercent.current < -100) {
        xPercent.current = 0;
      } else if (xPercent.current > 0) {
        xPercent.current = -100;
      }

      gsap.set(firstText.current, { xPercent: xPercent.current });
      gsap.set(secondText.current, { xPercent: xPercent.current });

      requestAnimationFrame(animate);
      xPercent.current += 0.1 * direction.current;
    };

    gsap.to(marquee.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction.current = e.direction * -1),
      },
      x: "-500px",
    });

    requestAnimationFrame(animate);
  });

  return (
    <main>
      <div className="relative flex h-screen overflow-hidden">
        <Image
          src="/images/background.jpg"
          fill
          alt="background"
          className="object-cover object-bottom"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />

        <div className="absolute bottom-10">
          <div ref={marquee} className="relative whitespace-nowrap">
            <p
              ref={firstText}
              className="relative m-0 pr-14 text-[10rem] leading-none text-white"
            >
              Frontend Developer —
            </p>
            <p
              ref={secondText}
              className="absolute left-full top-0 m-0 pr-14 text-[10rem] leading-none text-white"
            >
              Frontend Developer —
            </p>
          </div>
        </div>
      </div>

      <div className="h-screen" />
    </main>
  );
}

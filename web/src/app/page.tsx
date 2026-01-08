'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SplitScreen from '../components/SplitScreen';
import ProductMarquee from '../components/ProductMarquee';
import FabricSlider from '../components/FabricSlider';
import ProductSlider from '../components/ProductSlider';
import VideoReels from '../components/VideoReels';
import InfoSection from '../components/InfoSection';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';

export default function Home() {
  const [heroFont, setHeroFont] = useState('var(--font-roboto-mono)');
  const [displayFont, setDisplayFont] = useState('var(--font-roboto-mono)');
  const [isScrolled, setIsScrolled] = useState(false);
  const [navColor, setNavColor] = useState('white');
  const [showBrand, setShowBrand] = useState(true);

  // Section configuration map
  const sectionConfig: Record<string, { color: string; brand: boolean }> = {
    hero: { color: 'white', brand: true },
    split: { color: 'white', brand: true },
    marquee: { color: 'black', brand: true },
    fabric: { color: 'white', brand: true },
    bestsellers: { color: 'black', brand: false },
    shopmen: { color: 'black', brand: false },
    shopwomen: { color: 'black', brand: false },
    reels: { color: 'white', brand: false },
    info: { color: 'black', brand: false },
    footer: { color: 'white', brand: false },
  };

  useEffect(() => {
    // Font logic: scroll past hero
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll);

    // Navbar Color/Brand Logic via IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -80% 0px', // Active zone: top 80px to 20% down
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const config = sectionConfig[id];
          if (config) {
            setNavColor(config.color);
            setShowBrand(config.brand);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    Object.keys(sectionConfig).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isScrolled) {
      setDisplayFont('var(--font-anton)');
    } else {
      setDisplayFont(heroFont);
    }
  }, [isScrolled, heroFont]);

  return (
    <main>
      <Preloader />
      <Navbar titleFont={displayFont} textColor={navColor} showBrand={showBrand} />
      <section id="hero"><Hero onSlideChange={setHeroFont} /></section>
      <section id="split"><SplitScreen /></section>
      <section id="marquee"><ProductMarquee /></section>
      <section id="fabric"><FabricSlider /></section>
      <section id="bestsellers"><ProductSlider title="Best Sellers" /></section>
      <section id="shopmen"><ProductSlider title="Shop Men" /></section>
      <section id="shopwomen"><ProductSlider title="Shop Women" /></section>
      <section id="reels"><VideoReels /></section>
      <section id="info"><InfoSection /></section>
      <section id="footer"><Footer /></section>
    </main>
  );
}

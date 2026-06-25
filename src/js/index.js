const images = [
    '/picture1.avif',
    '/picture2.webp',
    '/picture3.jpg',
    
  ];
  
  let current = 0;
  const hero = document.getElementById('hero');
  
  function autoChangeBackground() {
    current = (current + 1) % images.length;
    hero.style.backgroundImage = `url('${images[current]}')`;
  }
  
  setInterval(autoChangeBackground, 2000);
  
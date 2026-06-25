const images = [
    './src/media/picture3.jpg',
    './src/media/picture2.webp',
    './src/media/picture1.avif',
    
  ];
  
  let current = 0;
  const hero = document.getElementById('hero');
  
  function autoChangeBackground() {
    current = (current + 1) % images.length;
    hero.style.backgroundImage = `url('${images[current]}')`;
  }
  
  setInterval(autoChangeBackground, 2000);
const images = [
    './src/media/pexels-pixabay-259588.jpg',
    './src/media/pexels-pixabay-259588.jpg',
    './src/media/pexels-pixabay-259588.jpg',
    
  ];
  
  let current = 0;
  const hero = document.getElementById('hero');
  
  function autoChangeBackground() {
    current = (current + 1) % images.length;
    hero.style.backgroundImage = `url('${images[current]}')`;
  }
  
  setInterval(autoChangeBackground, 2000);
const images = [
    './src/media/modern-house-with-beautiful-japanese-garden-featuring-stepping-stones-and-pond-photo.jpg',
    './src/media/ffffffffffff.jpg',
    './src/media/modern-house-with-beautiful-garden-featuring-pond-and-wooden-pergola-photo (1).jpg',
    
  ];
  
  let current = 0;
  const hero = document.getElementById('hero');
  
  function autoChangeBackground() {
    current = (current + 1) % images.length;
    hero.style.backgroundImage = `url('${images[current]}')`;
  }
  
  setInterval(autoChangeBackground, 2000);
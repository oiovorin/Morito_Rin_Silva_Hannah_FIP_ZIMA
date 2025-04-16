//Bottles in home page 

function flipTo(index) {
    const slides = document.querySelectorAll(".flavor-slide img");
    const dots = document.querySelectorAll(".dot");
    const details = document.querySelectorAll(".bottle-detail");
    
  
    slides.forEach((img, i) => {
      img.classList.remove("flipped");
  
      void img.offsetWidth;
  
      if (i === index) {
        img.classList.add("flipped");
      }
      
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    details.forEach((detail, i) => {
      if (i === index) {
        detail.style.display = 'block';
      } else {
        detail.style.display = 'none';
      }
    });
  }

// Dados para exibir no lightbox (pode ser alterado conforme necessidade)
const lightboxData = [
  {
    title: "Original Design Coaster",
    description: "Get a ZIMA original design coaster at the sports event we sponsored!",
    img: "images/coaster.jpeg"
  },
  {
    title: "Bottle Opener",
    description: "We have portable key chain bottle opener.",
    img: "images/openner.jpeg"
  },
  {
    title: "Flavored Water",
    description: "Collaborate with smartwater, we have ZIMA original flavored water. Enjoy refresh, cool, and new version of ZIMA.",
    img: "images/water.jpeg"
  }
];

// Criação do lightbox no DOM
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
lightbox.innerHTML = `
  <div class="lightbox-content">
    <button class="lightbox-close" aria-label="Close lightbox">×</button>
    <img src="" alt="" class="lightbox-img">
    <h2 class="lightbox-title"></h2>
    <p class="lightbox-desc"></p>
  </div>
`;
document.body.appendChild(lightbox);

// Estilo básico do lightbox (você pode mover isso para seu CSS se preferir)
const style = document.createElement("style");
style.textContent = `
  .lightbox {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .lightbox-content {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    max-width: 500px;
    text-align: center;
    position: relative;
    animation: fadeIn 0.3s ease;
  }
  .lightbox-img {
    max-width: 100%;
    border-radius: 1rem;
  }
  .lightbox-close {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);

// Lógica de abertura do lightbox
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const index = btn.getAttribute('data-index');
    const data = lightboxData[index];

    // Atualizar os dados do lightbox
    document.querySelector('.lightbox-img').src = data.img;
    document.querySelector('.lightbox-title').textContent = data.title;
    document.querySelector('.lightbox-desc').textContent = data.description;

    // Exibir o lightbox
    lightbox.style.display = 'flex';
  });
});

// Lógica de fechamento do lightbox
document.querySelector('.lightbox-close').addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Fechar o lightbox ao clicar fora do conteúdo
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});



// instagram carousel
const carousel = document.querySelector('#instagram-pic');
const leftarrow = document.querySelector('#left-arrow');
const rightarrow = document.querySelector('#right-arrow');



// next item
function slideLeft() {
  // Animate to the left by translating the container -150px
  // This activates the transition on the item
  carousel.style.transform = 'translateX(-190px)';
  
  // put a listener on carousel to fire the next step after the transition ends
  carousel.addEventListener('transitionend', onTransitionEndLeft);
}

function onTransitionEndLeft() {
  // Remove listener so it doesn't fire for other transitions
  carousel.removeEventListener('transitionend', onTransitionEndLeft);
  // Move the first child to the end of the carousel
  carousel.appendChild(carousel.firstElementChild);
  // Reset the transform to 0 without animation
  carousel.style.transition = 'none';
  carousel.style.transform = 'translateX(0)';
  // Force a reflow to apply changes immediately
  carousel.offsetHeight; 
  // Re-attach the original transition
  carousel.style.transition = 'transform 0.5s ease';
}

// previous item
function slideRight() {
  // Move the last element to the beginning immediately
  carousel.insertBefore(carousel.lastElementChild, carousel.firstElementChild);
  // Set transform so the carousel appears shifted left by one item width
  carousel.style.transition = 'none';
  carousel.style.transform = 'translateX(-180px)';
  // Apply the transform instantly
  carousel.offsetHeight;
  // Animate back to the original position
  carousel.style.transition = 'transform 0.5s ease';
  carousel.style.transform = 'translateX(0)';
}


leftarrow.addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default link behavior
  slideRight();
});

rightarrow.addEventListener('click', function(e) {
  e.preventDefault();
  slideLeft();
});
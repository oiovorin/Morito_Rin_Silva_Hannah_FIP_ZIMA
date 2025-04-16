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

// Selecione todos os botões com a classe "btn"
const promoButtons = document.querySelectorAll('.btn');

// Selecione todos os lightboxes
const lightboxes = document.querySelectorAll('.lightbox1, .lightbox3');

// Adicione um event listener para cada botão
promoButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    // Evitar o comportamento padrão do link
    event.preventDefault();
    
    // Acesse o index do botão clicado usando o atributo data-index
    const index = button.getAttribute('data-index');
    
    // Ocultar todos os lightboxes
    lightboxes.forEach(lightbox => {
      lightbox.style.display = 'none';
    });
    
    // Exibir o lightbox correspondente com base no index
    switch(index) {
      case '0':
        document.querySelector('.lightbox1').style.display = 'block';
        break;
      case '1':
        document.querySelector('.lightbox3:nth-of-type(1)').style.display = 'block';
        break;
      case '2':
        document.querySelector('.lightbox3:nth-of-type(2)').style.display = 'block';
        break;
      default:
        alert('Item desconhecido');
    }
  });
});

// Fechar o lightbox ao clicar no botão de fechar
document.querySelectorAll('.lightbox-close').forEach(closeButton => {
  closeButton.addEventListener('click', () => {
    // Fechar o lightbox
    closeButton.closest('.lightbox1, .lightbox3').style.display = 'none';
  });
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
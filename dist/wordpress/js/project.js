const modalTrigger = document.querySelectorAll('.button'),
      closeTrigger = document.querySelectorAll('.modal__close'),
      overlay = document.querySelector('.overlay'),
      modal = document.querySelector('.modal');

function openModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';   
}


function modalClose() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}

modalTrigger.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if(e.target.getAttribute('data-modal')) {
        openModal();  
    } 
  }) 
});


closeTrigger.forEach(trigger => {
  trigger.addEventListener('click', modalClose)
})

document.addEventListener('keydown', (e) => {
  if(e.code === 'Escape' && e.target.getAttribute('data-close')) {
      modalClose('.modal');
  }
});



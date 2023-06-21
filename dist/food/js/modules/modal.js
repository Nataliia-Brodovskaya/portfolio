function openModal(modalSelector, timerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';  

    if(timerId) {
        clearInterval(timerId);         
    }
  
}

function modalClose(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';

}

function modal(treggerSelector, modalSelector, timerId) {
    const modalTrigger = document.querySelectorAll(treggerSelector),
          modal = document.querySelector(modalSelector);



    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, timerId));    
    })


    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            modalClose(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose(modalSelector);
        }
    });



    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal(modalSelector, timerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal};
export {modalClose};
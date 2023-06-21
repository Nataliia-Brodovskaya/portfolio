// slider

const slider = tns ({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false
  });

document.querySelector('.prev').addEventListener('click', () => {
  slider.goTo('prev')
});

document.querySelector('.next').addEventListener('click', () => {
  slider.goTo('next')
});

// tabs

  const tabs = document.querySelectorAll('.catalog__tab'),
        tabContent = document.querySelectorAll('.catalog__content'),
        tabsParent = document.querySelector('.catalog__tabs'),
        links = document.querySelectorAll('.catalog-item__link'),
        backs = document.querySelectorAll('.catalog-item__back');


  function hideTabContent () {
      tabContent.forEach(item => {
          item.classList.remove('catalog__content_active');
      });

      tabs.forEach(tab => {
          tab.classList.remove('catalog__tab_active');
      })
  };

  function showTabContent (i = 0) {
      tabContent[i].classList.add('catalog__content_active');
      tabs[i].classList.add('catalog__tab_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    e.preventDefault()
      const target = e.target;

          tabs.forEach((item, i) => {
              if(target == item || target.parentElement == item){
                  hideTabContent();
                  showTabContent(i); 
              }
          });

  });

// toggle

  function toggle(elems) {
    elems.forEach((elem, i) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.catalog-item__content')[i].classList.toggle('catalog-item__content_active');
        document.querySelectorAll('.catalog-item__list')[i].classList.toggle('catalog-item__list_active');
       });
    });
  }
   
  toggle(links);
  toggle(backs);

  // modal

  const 
        miniModal = document.querySelector('.modal_mini'),
        modalTrigger = document.querySelectorAll('.button'),
        closeTrigger = document.querySelectorAll('.modal__close'),
        overlay = document.querySelector('.overlay');

  function openModal(modalSelector) {
    modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';   
}

  function modalClose(modalSelector) {
    modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  modalTrigger.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if(e.target.getAttribute('data-modal')) {
          openModal('.modal');  
        } 
        if (e.target.getAttribute('data-catalog')) {
            openModal('#order');
        }
        if (e.target.getAttribute('data-close')) {
            modalClose('.modal');
            modalClose('#order');
        }
      }) 
  });

  closeTrigger.forEach(item => {
    item.  addEventListener('click', (e) => {
      modalClose('.modal');
      modalClose('#order');
    });
  });

    document.addEventListener('keydown', (e) => {
      if(e.code === 'Escape' && e.target.getAttribute('data-close')) {
          modalClose('.modal');
      }
  });

  // form
  
    const form = document.querySelectorAll('.feed-form'),
            inputs = document.querySelectorAll('input');
    
    
    const message = {
        loading: 'Loading...',
        success: 'Thank you! You will be contacted soon!',
        failture: 'Something went wrong'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;

        const res = await fetch(url, {
            method: 'POST',
            body: data
        });
        
        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

    
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('js/server.php', formData)
                .then(res => {
                    console.log(res);
                    showThanksModal();
                })
                .catch(() => statusMessage.textContent = message.failture)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 50000);
                })
        })
    })
    
    function showThanksModal() {
        modalClose('.modal');
        modalClose('#order');
        openModal('.modal_mini');
        setTimeout(() => {
            miniModal.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 3000);
    }



function tabs(tabsSelector, tabsContentSelestor, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
          tabContent = document.querySelectorAll(tabsContentSelestor),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent () {
        tabContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');

        });

        tabs.forEach(tab => {
            tab.classList.remove(activeClass);

        })
    };

    function showTabContent (i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains(tabsSelector.slice(1))){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });
}

export default tabs;
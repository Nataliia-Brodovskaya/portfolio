require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import calculator from './modules/calculator';
import card from './modules/card';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const timerId = setTimeout(() => openModal('.modal', timerId), 40000);
          
    calculator();
    card();
    forms('form', timerId);
    modal('[data-modal]', '.modal', timerId);
    slider({
        slide: '.offer__slide',
        container: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2023-06-05');   
});
'use strict';

function slowScroll(y, step, final) {
    let start = window.scrollY;
    let scroll = setInterval(() => {
        if ((start > final ? window.scrollY >= final : window.scrollY <= final) && Math.abs(start - window.scrollY) < 100) {
            y *= 1.025;
            window.scrollBy(0, y);
        } else {
            clearInterval(scroll);
            let fasterScroll = setInterval( () => {
                if (start > final ? window.scrollY > final : window.scrollY < final) {
                    y += step;
                    window.scrollBy(0, y);
                } else {
                    clearInterval(fasterScroll);
                }
            }, 1);
        }
    }, 1);
}

document.addEventListener('DOMContentLoaded', () => {
    let logo = document.querySelectorAll('.logo');

    logo.forEach((value) => {
        value.addEventListener('click', () => {
            slowScroll(-1, -0.2, 0);
        });
    });

    let btnLogIn = document.querySelector('.btn__log-in'),
        modal = document.querySelector('.modal'),
        overlay = document.querySelector('.overlay');
    
    btnLogIn.addEventListener('click', () => {
        overlay.classList.remove('hidden');
    });

    overlay.addEventListener('click', (e) => {
        if (e.target == overlay) {
            overlay.classList.add('hidden');
        }
    });

    let form = modal.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        form.querySelectorAll('input').forEach((val) => {
            val.value = '';
        });

        let div = document.createElement('div');
        div.classList.add('link');
        div.textContent = 'Thank you for submition the form';
        modal.replaceChild(div, modal.querySelector('.link'));

        let btn = document.createElement('button');
        btn.classList.add('btn__log-in');
        btn.style.border = 'none';
        btn.style.cursor = 'auto';
        document.querySelector('header').replaceChild(btn, btnLogIn);
    });

    let btnMainPage = document.querySelector('.btn__main-page');

    btnMainPage.addEventListener('click', () => {
        let y = document.querySelector('section.search').getBoundingClientRect();
        slowScroll(1, 0.2, y.y + pageYOffset - 50);
    });

    let programs = document.querySelectorAll('section.programs div.programs__wrapper');
    
    programs.forEach((val) => {
        let next = val.querySelectorAll('.btn__programs')[1],
            prev = val.querySelectorAll('.btn__programs')[0],
            items = val.querySelectorAll('.programs__item'),
            currentIndixes = [];

        let k = 0;
        items.forEach((value, i) => {
            currentIndixes.push(i);
            if (window.getComputedStyle(value).display == 'block') {
                k++;
            }
        });

        currentIndixes = currentIndixes.slice(0, k);


        function changeSlide(indexes) {
            items.forEach(value => {
                value.style.display = 'none';
                value.style.order = 0;
            });
            for (let i in indexes) {
                items[indexes[i]].classList.remove('hidden');
                items[indexes[i]].style.order = i;
                items[indexes[i]].style.display = 'block';
            }
        }

        changeSlide(currentIndixes);

        next.addEventListener('click', () => {
            let del = currentIndixes.shift();
            currentIndixes.push((del + k)%items.length);
            changeSlide(currentIndixes);
        });

        prev.addEventListener('click', () => {
            currentIndixes.pop();
            let del = currentIndixes[0] != 0 ? currentIndixes[0] - 1 : items.length - 1;
            currentIndixes.unshift(del);
            changeSlide(currentIndixes);
        });
    });

    let burgerBtn = document.querySelector('.burger'),
        burgerMenu = document.querySelector('.menu__burger');

    burgerBtn.addEventListener('click', () => {
        burgerMenu.classList.toggle('hidden');
        document.querySelector('.overlay__bg').classList.toggle('overlay__show');
    });

    let menu = document.querySelector('.menu ul'),
        menuItems = menu.querySelectorAll('li.menu__item'),
        bgMenuItems = burgerMenu.querySelectorAll('li.menu__item'),
        dropItems = burgerMenu.querySelectorAll('li.drop-menu__burger'),
        searchInputBtn = document.querySelectorAll('.btn__search-input');
    
    
    window.addEventListener('click', (e) => {
        menuItems.forEach((val) => {
            if (e.target == val) {
                val.querySelector('.drop-menu').classList.toggle('hidden');
            } else {
                val.querySelector('.drop-menu').classList.add('hidden');
            }
        });

        dropItems.forEach((val) => {
            val.classList.add('hidden');
            if (e.target == val) {
                burgerMenu.classList.add('hidden');
                document.querySelector('.overlay__bg').classList.remove('overlay__show');
            }
        });

        let k = false;

        bgMenuItems.forEach((val) => {
            if (!val.classList.contains('drop-menu__burger')) {
                if (val == e.target) {
                    k = true;
                } else {
                    k = false;
                }
            } else {
                if (k) {
                    val.classList.remove('hidden');
                }
            }
        });

        if (e.target == document.querySelector('.overlay__bg')) {
            burgerMenu.classList.add('hidden');
            document.querySelector('.overlay__bg').classList.remove('overlay__show');
        }
    });

    searchInputBtn.forEach((val) => {
        val.addEventListener('click', function() {
            let dropDown = this.parentNode.querySelector('.drop-down');
            if (dropDown.classList.contains('hidden')) {
                this.parentNode.parentNode.querySelectorAll('.drop-down').forEach((value) => value.classList.add('hidden'));
                dropDown.classList.remove('hidden');
            } else {
                this.parentNode.parentNode.querySelectorAll('.drop-down').forEach((value) => value.classList.add('hidden'));
            }
        });
    });

    let chooseWrapper = document.querySelectorAll('.choose__wrapper'),
        openLayer = false,
        priceFrom = [document.querySelectorAll('.drop-down__price input')[0], document.querySelectorAll('.drop-down__price input')[2],],
        priceTo = [document.querySelectorAll('.drop-down__price input')[1], document.querySelectorAll('.drop-down__price input')[3],],
        checkboxes = document.querySelectorAll('.drop-down__duration input'),
        inpPlace = document.querySelector('.search__input-wrapper input'),
        pricef = null,
        pricet = null,
        input = null;

    function searchOpen() {
        if (openLayer) {
            document.querySelectorAll('.programs').forEach((val) => val.classList.add('hidden'));
            document.querySelector('.programs__search').classList.remove('hidden');

        } else {
            document.querySelectorAll('.programs').forEach((val) => val.classList.remove('hidden'));
        }
    }

    function checkPrice() {
        let op = false;
        if (pricef != null && pricet != null) {
            op = true;
        }
        return op;
    }

    function checkCheckboxes() {
        let op = false;
        checkboxes.forEach(val => {
            if (val.checked) {
                op = true;
            }
        });
        return op;
    }

    function searchClicked() {
        let op = false;
        chooseWrapper.forEach((val) => {
            if (val.classList.contains('choose__wrapper_clicked')) {
                op = true;
            }
        });
        return op;
    }

    function checkInput() {
        if (input) {
            return true;
        } else {
            return false;
        }
    }

    function detectOpenLayer() {
        if (checkPrice() || checkCheckboxes() || searchClicked() || checkInput()){
            openLayer = true;
        } else {
            openLayer = false;
        }
        searchOpen();
    }

    chooseWrapper.forEach((val) => {
        val.addEventListener('click', function() {
            this.classList.toggle('choose__wrapper_clicked');
            detectOpenLayer();
        });
    });

    priceFrom.forEach(val => val.addEventListener('input', function(e) {
        e.preventDefault();
        pricef = +this.value;
        detectOpenLayer();
    }));

    priceTo.forEach(val => val.addEventListener('input', function(e) {
        e.preventDefault();
        pricet = +this.value;
        if (pricef > pricet) {
            this.classList.add('error');
            pricet = null;
        } else {
            this.classList.remove('error');
        }
        detectOpenLayer();
    }));

    checkboxes.forEach((val) => {
        val.addEventListener('change', function() {
            detectOpenLayer();
        });
    });

    inpPlace.addEventListener('input', function() {
        input = this.value;
        detectOpenLayer();
    });

    let btnSettings = document.querySelectorAll('.btn__search')[1];

    btnSettings.addEventListener('click', () => {
        document.querySelector('.mobile-search-settings').classList.toggle('hidden');
    });

});
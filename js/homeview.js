'use strict';
const welcome = document.querySelector('.welcome');
const header = document.querySelector('header');
const servicescroll = document.querySelector('.servicescroll');
const secondsection = document.querySelector('.secondsection');
const tabopener = document.querySelectorAll('.tabopener');
const markup = document.getElementById('markup');
const body = document.querySelector('#body')
const bodyAll = document.querySelector('body')
const largedivelement2 = document.querySelector('.largedivelement2')
const largedivelement3 = document.querySelector('.largedivelement3')
const largediv3 = document.querySelector('.largediv3')
const rect =secondsection.getBoundingClientRect()
const top = rect.top + window.pageYOffset;

import { tab1,tab2,tab3 } from "./homecontroller.js";

class homeview {
    constructor(){
        this.setChange = true;
        this._Welcome()
        setInterval(this._headerBackgrounChange,3000);
        this._scrollingintosection()
        this._servicescroll();
        this._tabaction()
    }
    /////////////////////////////
    //header image change
    _headerBackgrounChange(){
        const add = () =>{
            header.classList.toggle('head2')
        }
        this.setChange = !this.setChange;
        this.setChange ? add(): add();
    }


    ///////////////////////
    //welcoming a user through name display
    _Welcome(){
        const userData = JSON.parse(localStorage.getItem('userData'))
        welcome.textContent = `welcome ${userData.Fullname}🎊`
    }
    ////////////////////////////////
    //scrolling smoothly to a div
    _servicescroll(){
        servicescroll.addEventListener('click',function(){
            secondsection.scrollIntoView({behavior: "smooth"})
        })
    }
    /////////////////////////////////////////////
    //moving a div on intersection
    _scrollingintosection(){
        const obscallback = function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting === true) {
                    largedivelement2.style.transform = 'rotateX(0deg)'
                }else{
                    largedivelement2.style.transform = 'rotateX(180deg)'
                }
            });
        }

        const obsoption = {
            root: null,
            treshold: 0.1
        }

        const observer = new IntersectionObserver(obscallback,obsoption);
        observer.observe(largedivelement2);
        ////////////////////////////////////////////
        const obscallback2 = function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting === true) {
                    largediv3.style.marginTop = '50px'
                }else{
                    largediv3.style.marginTop = '300px'
                }
            });
        }

        const obsoption2 = {
            root: null,
            treshold: 0.1
        }

        const observer2 = new IntersectionObserver(obscallback2,obsoption2);
        observer2.observe(largediv3);


        /////////////////////////////////////////
        const obscallback1 = function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting === true) {
                    secondsection.style.transform = 'scale(1)'
                }else{
                    secondsection.style.transform = 'scale(0.5)'
                }
            });
        }

        const obsoption1 = {
            root: null,
            treshold: 0.1
        }

        const observer1 = new IntersectionObserver(obscallback1,obsoption1);
        observer1.observe(secondsection);

    }
///////////////////////////////////////////////////////////////
//changing tab content
    _tabaction(){
        tabopener.forEach((elem) =>{
            elem.style.color = 'black';
        });
        const tab = (i) =>{
            tabopener[i].addEventListener('click', function(e){
                e.stopPropagation();

                let tab;
                if (i === 0) {
                    tab = tab1;
                    
                } else if(i === 1) {
                    tab = tab2;
                }else{
                    tab = tab3
                };

                body.style.filter = 'blur(2px)'
                markup.innerHTML = tab;
                markup.style.visibility = 'visible'
                markup.style.top = `${top}px`;
                bodyAll.style.overflow = 'hidden';
                markup.scrollIntoView()
            });
        }
        tab(0);
        tab(1);
        tab(2);


        body.addEventListener('click', function(){
            body.style.filter = 'blur(0px)';
            markup.style.visibility = 'hidden'
            bodyAll.style.overflow = 'scroll'
        }); 

    }

}
const homeView = new homeview();

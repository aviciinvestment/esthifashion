'use strict';
import { more } from './blogController.js'


const nav__link = document.querySelectorAll('.nav__link');
const largedivelement = document.querySelector('.largedivelement');
const largedivelement2 = document.querySelector('.largedivelement2');
const smalldiv = document.querySelector('.smalldiv');
const footer = document.querySelector('footer');
const smalldivelement4 = document.querySelector('.smalldivelement4')
const header = document.querySelector('header')

 class blogView{
    constructor(){
        this.setChange = true;
        this._hovernav()
        this._observerApi();
        this._moreAction()
    }
    

    _hovernav(){
            //function that changes the color of the hover link on mouseout and mouseover
    const hovernav = (mouseaction, colors) =>{
        nav__link.forEach(child => {
            child.addEventListener(mouseaction, function(e){
                nav__link.forEach(a_nav =>{a_nav.style.color = colors;
                    e.target.style.color = 'black';
                });
            })
        });
   }
   
   hovernav('mouseover','#aaaaaa');
   hovernav('mouseout', 'black')
    }

    _slider(){
        const add = (element) =>{
            element.classList.toggle('head2')
        }
        this.setChange = !this.setChange;
        this.setChange ? add(largedivelement): add(largedivelement)
        this.setChange ? add(largedivelement2): add(largedivelement2)
    }


    _observerApi(){
        const obscallback = function(entries) {
            entries.forEach(entry => {
                //console.log(entry);
               if(entry.isIntersecting === true){smalldiv.style.opacity = '100%';
                smalldiv.style.marginTop = '0px'; 
                header.classList.add('sticky');
        
               }else{
                  smalldiv.style.opacity = '0%';
                  smalldiv.style.marginTop = '70px'
                  header.classList.remove('sticky');
               }
             }
          );
        };
        
        const obsoptions = {
            root: null,
            threshold: 0.1,
        }
        
        const observer = new IntersectionObserver(obscallback,obsoptions);
        observer.observe(smalldiv)
    }

    _moreAction(){
        footer.addEventListener('click',function(){
            smalldivelement4.insertAdjacentHTML('afterend',more)
            footer.style.display = 'none'
        })
    }
 }  


const blogview = new blogView();

setInterval(blogview._slider
,3000)
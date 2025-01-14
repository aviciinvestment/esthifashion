'use strict';
//importing some variables from a seperate module
import { formState, submitState } from "./config.js";

const sign = document.querySelector('.sign');
const input = document.querySelector('input')



let change = false;
class View {
    constructor(){
        this.signState;
        this.submit = document.querySelector('.submit');
        this.form = document.querySelector('.form');
        //for the swiftness of the form
        this._swiftChange();
        this.button = document.querySelector('.button');
        this.formemail = document.querySelector('.formemail');
        this.formpassword = document.querySelector('.formpassword');
        this.forgot = document.querySelector('.forgot')
        this._onclickevent();
        //this._handlingform();
        this.userdata = {}
        this._gettingUserData();


    }
    _swiftChange(){
        change = !change;
        const form = `
            <form >
            <h1>${change ? 'Sign in to e-Fashion' : 'Create Account'}</h1>

            <p>insert ${change ? '' : 'name,'} email and password </p>
            ${change ? '' : '<input class="submitname" required minlength="3" type="text" name="name" id="name" placeholder="insert name"><br>'}
            <input class=${change?'formemail': 'submitemail'} required type="email" name="email" id="email" placeholder="insert Email"><br>
            <input class=${change?'formpassword': 'submitpassword'} required minlength="6" maxlength="16" type="password" name="password" id="password" placeholder="insert password"><br>

            ${change ? '<h3><a class = "forgot" href="#">forgot password?</a></h3>' : ''}

            <button type = "submit">${change ? 'SIGN IN' : 'SIGN UP'}</button>
            </form>
        `
        const submit = `
            <h1>${change ? 'Welcome Back' : 'Hello, Friend' }</h1>
            <p>${change ? 'Enter your personal details and start journey with us' : 'To keep connected with us please login with your personnal info'}</p>
            <button class="button">${change ? 'SIGN IN' : 'SIGN UP'}</button>
        `;

         
        this.form.style.backgroundColor = change ? 'rgb(247, 240, 240)' : 'rgb(243, 119, 3)';
        this.form.style.width = change ? '50%' : '30%';
        this.form.innerHTML = change ? form : submit;
        
        this.submit.style.backgroundColor = change ? 'rgb(243, 119, 3)' : 'rgb(247, 240, 240)';
        this.submit.style.width = change ? '30%' : '50%';
        this.submit.innerHTML = change ? submit : form;

        //declaring the state of the form
    }

    _onclickevent(){
        function display(){
            clearInterval(Swift);
            change ? this.submit.style.display = 'none' : this.form.style.display = 'none';
            change ? this.form.style.width  = '100%': this.submit.style.width  = '100%';
            
        }
        this.button.addEventListener('click', display.bind(this));
        this.forgot.addEventListener('click', function(){
            alert('create new account 🚩')
        })
    }
    //using form validtion API
    //_handlingform(){
      //  window.addEventListener('input', function(){
        //    input.validity.tooShort ? '' : '' ;
        //})
    //}

    _gettingUserData(){
        
        const inputAction = () => {
        change ? this.signState = formState : this.signState = submitState;
            if(this.signState === submitState){
                const submitemail = document.querySelector('.submitemail');
                const submitpassword = document.querySelector('.submitpassword');
                const submitname = document.querySelector('.submitname');
                console.log(submitname);
                this.userdata.Fullname = submitname.value;
                this.userdata.Password = submitpassword.value;
                this.userdata.email = submitemail.value;
                localStorage.setItem('userData',JSON.stringify(this.userdata));
                window.location.assign('./home.html')
            }else{
                this.userdata = JSON.parse(localStorage.getItem('userData'));
                ((this.formemail.value === this.userdata.email) && (this.formpassword.value === this.userdata.Password)) ?
                window.location.assign('./home.html') :
                        prompt('incorrect password or email⚠️⚠️⚠️')
            }
            change ? this.formemail.value = this.formpassword.value = '':this.submitemail.value = this.submitname.value = this.submitpassword.value=''

        }
        
       window.addEventListener('submit',function(e){ 
        e.preventDefault();
        inputAction();  
    })
    }


}

let Swift = setInterval(() => {
    const view = new View()
},3000);




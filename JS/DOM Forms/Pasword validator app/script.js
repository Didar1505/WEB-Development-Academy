// let str = 'To get in touch with me you contact to the number +7(934)-025-76-51'
// console.log(str)
// console.log(str.match(/\+\d\(\d{3}\)-\d{3}-\d{2}-\d{2}/))

// let number = new RegExp('^(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9])$')
// let number = new RegExp('25[0-5]|(2[0-4]|1\d|[1-9]|)\d')

// let ipaddress_validator = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/

// let ipaddress_validator = /^((?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9])(\.(?!$)|$)){4}$/


// console.log('255.255.255'.search(ipaddress_validator))

// let vowels = /\b\w*[aeiouAEIOU]\w*\b/g
// let text = `
// An elephant is big.
// Oranges and apples dfs
// `

// console.log(text.match(vowels))

// let email = 'didar@gmail.com'

// let pattern = /^[\w-.]{5,20}@[\w-]{2,12}\.(com|ru|edu|org|net|xyz)$/

// console.log(pattern.test(email))

// document.getElementById('email').addEventListener('input', (e) => {
//     console.log(e.target.checkValidity())
// })

let pass_req = []

let myform = document.forms['login-form']
let myinput = document.createElement("input")
document.getElementById("cb-show-pass").addEventListener("change", (e) => {
    if(e.target.checked) {
        myform.password.setAttribute('type','text')
    }else {
        myform.password.setAttribute('type','password')
    }
})


myform.password.addEventListener('input', (e) => {
    pass_req =  []

    let value = myform.password.value
    let length = /.{8,}/
    let upperCase = /(?=.*[A-Z]).+/ 
    let containsNumber = /(?=.*[0-9]).+/
    let containsChar = /(?=.*[\._!?#@])/

    if(!length.test(value)){
        pass_req.push('The password should at least contain 8 characters')
    }
    if(!upperCase.test(value)) {
        pass_req.push("The password should at least contian one Upper case letter")
    }
    if(!containsNumber.test(value)) {
        pass_req.push("The password should at least contian one Number")
    }
    if(!containsChar.test(value)) {
        pass_req.push("The password should at least contian the following chars (. _ ! ? @)")
    }

    myform.lastElementChild.innerHTML = ""

    pass_req.forEach(element => {
        let li = document.createElement("li")
        li.textContent = element
        myform.lastElementChild.append(li)
    });
    

    console.log(pass_req)
})

let password = 'dS32dfsdf'
let pattern = /^(?=.*\d)(?=.*[A-Z]).{8,}$/

console.log(pattern.test(password))
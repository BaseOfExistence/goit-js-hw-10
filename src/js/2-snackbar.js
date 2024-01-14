import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector(".form")
const fulfilled = document.querySelector('input[value="fulfilled"]')
const rejected = document.querySelector('input[value="rejected"]')
const delay = document.querySelector('input[name="delay"]')
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const currentDelay = delay.value.trim();
    if (currentDelay) {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (fulfilled.checked) {
                    resolve(`✅ Fulfilled promise in ${currentDelay}ms`)
                }
                if(rejected.checked){
                    reject(`❌ Rejected promise in ${currentDelay}ms`)
                }
            }, currentDelay)
        })
        promise.then(resolve => {
            iziToast.success({
                title: 'OK',
                message: `${resolve}`,
                position: 'topRight',
            });
        }).catch(reject => {
            iziToast.error({
                title: 'Error',
                message: `${reject}`,
                position: 'topRight',
            });
        });
    }
});
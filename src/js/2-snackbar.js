import iziToast from "izitoast";
import "izitoast/dist/css/izitoast.min.css";
const form = document.querySelector(".form")
const fulfilled = document.querySelector('input[value="fulfilled"]')
const delay = document.querySelector('input[name="delay"]')
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const currentFulfilled = fulfilled.checked;
    const currentDelay = delay.value.trim();
    if (currentDelay && currentDelay !== "") {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (currentFulfilled) {
                    resolve(`✅ Fulfilled promise in ${currentDelay}ms`)
                } else {
                    reject(`❌ Rejected promise in ${currentDelay}ms`)
                }
            }, parseInt(currentDelay))
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
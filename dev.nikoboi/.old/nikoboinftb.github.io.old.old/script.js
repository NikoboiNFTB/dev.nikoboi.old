const countdownEl = document.getElementById('countdown');

let countdown = parseInt(countdownEl.textContent, 10);

const interval = setInterval(() => {
    countdown -= 1;
    countdownEl.textContent = countdown;
    if (countdown <= 0) {
        clearInterval(interval);
        window.location.href = "/links/";
    }
}, 1000);

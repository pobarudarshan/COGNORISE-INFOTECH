let timerInterval;

function countdown(targetDate) {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (difference < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "The countdown is over!";
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeBackgroundColor() {
    document.body.style.backgroundColor = getRandomColor();
}

document.getElementById("targetForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const targetDateInput = document.getElementById("targetDate").value;
    if (targetDateInput) {
        const targetDate = new Date(targetDateInput).getTime();
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        timerInterval = setInterval(() => {
            countdown(targetDate);
            changeBackgroundColor();
        }, 1000);
        countdown(targetDate);
        changeBackgroundColor();
    }
});
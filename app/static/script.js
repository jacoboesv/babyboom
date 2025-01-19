document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer
    function updateCountdown() {
        const revealDate = new Date('2025-02-03T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = revealDate - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            if (window.location.pathname !== '/result') {
                window.location.href = '/result';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Prediction Buttons Animation
    const buttons = document.querySelectorAll('.predict-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const name = prompt("Introduce tu nombre:");
            const option = button.getAttribute('data-prediction');
            
            if (name) {
                fetch('/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, option })
                })
                .then(response => response.json())
                .then(data => alert(data.message))
                .catch(error => console.error('Error:', error));
            }
        });
    });
});
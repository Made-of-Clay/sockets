(function () {
    window.socket = io();
    let bgColor, colorCode;

    document.addEventListener('DOMContentLoaded', () => {
        bgColor = document.getElementById('bgcolor');
        colorCode = document.getElementById('color-code');
    }, false);

    socket.on('update display', (color) => {
        bgColor.innerHTML = `
            #color-display {
                background-color: ${color};
            }
        `;
        colorCode.innerHTML = color;
    });
})();
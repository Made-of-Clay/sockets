(function (document) {
    document.addEventListener("DOMContentLoaded", ready, false);

    let color;

    function ready () {
        window.socket = io();

        color = window.document.getElementById('color-controller')

        color.addEventListener('change', (event) => {
            updateColor(event.target.value);
        }, false);

        updateColor(color.value);
    }

    function updateColor (color) {
        socket.emit('update display', color);
    }
})(window.document);
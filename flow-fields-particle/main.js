window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    context.lineWidth = 0.15;

    var a = Math.random() * 4 - 2;
    var b = Math.random() * 4 - 2;
    var c = Math.random() * 4 - 2;
    var d = Math.random() * 4 - 2;

    var points = [];
    for (var y = 0; y < height; y += 5) {
        points.push({
            x: 0,
            y: y,
            vx: 0,
            vy: 0,
        });
    }

    function getValue (x, y) {
        // clifford attractor
        // http://paulbourke.net/fractals/clifford/

        // scale down x and y
        var scale = 0.005;
        x = (x - width / 2) * scale;
        y = (y - height / 2) * scale;

        // attactor gives new x, y for old one.
        var x1 = Math.sin(a * y) + c * Math.cos(a * x);
        var y1 = Math.sin(b * x) + d * Math.cos(b * y);

        // find angle from old to new. that's the value.
        return Math.atan2(y1 - y, x1 - x);
    }

    function render () {
        for (var i = 0; i < points.length; i++) {

            var value = getValue(points[i].x, points[i].y);
            points[i].vx += Math.cos(value) * 0.3;
            points[i].vy += Math.sin(value) * 0.3;

            context.beginPath();
            context.moveTo(points[i].x, points[i].y);

            points[i].x += points[i].vx;
            points[i].y += points[i].vy;
            context.lineTo(points[i].x, points[i].y);
            context.stroke();

            points[i].vx *= 0.99;
            points[i].vy *= 0.99;

            if (points[i].x > width) points[i].x = 0;
            if (points[i].y > height) points[i].y = 0;
            if (points[i].x < 0) points[i].x = width;
            if (points[i].y < 0) points[i].y = height;
        }
        requestAnimationFrame(render);

    }

    render();
};
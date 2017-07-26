function createLine(x1, y1, speed, angle, i) {
    i = typeof i === 'undefined' ? 0 : i;
    return {
        x: x1,
        y: y1,
        start: vector.create(x1, y1),
        end: vector.create(x1, y1),
        speed: speed,
        angle: angle,
        i: i,
        points: [vector.create(x1, y1)]
    }
}

function updateLine(line) {
    line.i++;
    if (line.i < 0) {
        return line
    }

    if (Math.random() > 0.92) {
        line.angle = Math.random() > 0.5 ? line.angle + 90 : line.angle - 90;
    }


    var nextPoint = vector.create(line.start.getX(), line.start.getY());
    nextPoint.setLength(line.speed);
    nextPoint.setAngle(line.angle * Math.PI / 180);

    if (line.i < 300) {
        line.end.addTo(nextPoint);
        line.points[line.i] = vector.create(line.end.getX(), line.end.getY());
    } else if (line.i < 600) {
        line.start.addTo(nextPoint);
        line.points.shift()
    } else {
        line = createLine(line.x, line.y, line.speed, line.angle);
        return line
    }
    return line
}

function drawLine(context, line) {
    if (line.points.length > 0) {
        for (var i = 0; i < line.points.length-1; i++) {
            context.moveTo(line.points[i].getX(), line.points[i].getY());
            context.lineTo(line.points[i+1].getX(), line.points[i+1].getY());
        }
    }
}

window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        arrowX = width / 2,
        arrowY = height / 2,
        angle = -42,
        lines = [];

    for (var i = 0; i < 100; i++) {
        lines[i] = createLine((30 * i) - (width / 2) - 900, (height / 2), 20, angle, 0);
    }

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(arrowX, arrowY);
        context.beginPath();
        context.lineWidth = 10;
        for (var i = 0; i < lines.length; i++) {
            lines[i] = updateLine(lines[i]);
            drawLine(context, lines[i]);
        }
        context.lineCap = 'square';
        context.stroke();

        context.restore();
        requestAnimationFrame(render)
    }
};
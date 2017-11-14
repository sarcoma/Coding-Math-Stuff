window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        space = 60,
        mesh = [],
        arms = [],
        angle = 3,
        length = 40;

    for (var i = 0; i < 50; i++) {
        var arm = Arm.create(0, space * i, length, angle);
        arms.push(arm);
        for (var j = 1; j < 200; j++) {
            arms.push(Arm.create(arms[j - 1].getEndX(), arms[j - 1].getEndY(), length, 3));
            arms[j].parent = arms[j - 1];
        }
        mesh.push(arms);
    }

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        angle += 1;

        for (var i = 0; i < 50; i++) {
            for (var j = 0; j < 40; j++) {
                mesh[i][j].angle = Math.sin(angle * (Math.random() / 6) - 2.5) * (Math.random() / 8);
                if (j > 0) {
                    mesh[i][j].x = mesh[i][j - 1].getEndX();
                    mesh[i][j].y = mesh[i][j - 1].getEndY();
                }
                mesh[i][j].render(context);
            }
        }


        requestAnimationFrame(render)
    }
};
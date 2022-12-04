const tableBody = document.getElementById('sumTableBody');

const vl = (x) => {
    return 0 * Math.pow(x, 8) + 0 * Math.pow(x, 7) + 0.0009 * Math.pow(x, 6) - 0.0259 * Math.pow(x, 5) + 0.4227 * Math.pow(x, 4) - 3.9655 * Math.pow(x, 3) + 20.3082 * Math.pow(x, 2) - 48.729 * x + 36.3774 - 2.6;
}

const ac = (x) => {
    return 0 * Math.pow(x, 7) - 0.0001 * Math.pow(x, 6) + 0.0054 * Math.pow(x, 5) - 0.1295 * Math.pow(x, 4) + 1.6908 * Math.pow(x, 3) - 11.8964 * Math.pow(x, 2) + 40.6164 * x - 48.729;
}

const loadChart = (min, max, n, f, animated = false) => {
    let brd = JXG.JSXGraph.initBoard('box', { axis: true, originX: 350, originY: 300, grid: true, unitX: 25, unitY: 25 });
    let s = brd.create('slider', [[-12, 3], [-4, 3], [0, 0, n]], { name: 'n', snapWidth: 1, withLabel: true });
    let a = brd.create('slider', [[-12, 2], [-4, 2], [-10, 0, min]], { name: 'start', snapWidth: 0.25 });
    let b = brd.create('slider', [[-12, 1], [-4, 1], [min, 34, max]], { name: 'end' });
    let start = brd.create('button', [-12, 4, 'iniciar', function() { s.startAnimation(1, 100, 20) }]);
    let stop = brd.create('button', [-10, 4, 'parar', function() { s.stopAnimation() }]);
    let plot = brd.create('functiongraph', [f, () => a.Value(), () => b.Value()]);
    brd.unsuspendUpdate();

    if (animated) {
        s.startAnimation(1, 100, 30);
    }

    let os = brd.create('riemannsum', [
        f,
        () => s.Value(),
        () => 'middle',
        () => a.Value(),
        () => b.Value()
    ], { fillColor: '#ffff00', fillOpacity: 0.3 });

    brd.create('text', [
        1,
        -3,
        () => 'Sum=' + (JXG.Math.Numerics.riemannsum(
            f,
            s.Value(),
            'middle',
            a.Value(),
            b.Value()
        )).toFixed(4)
    ], { fontSize: 40 });
}

const loadTable = (min, max, n, f) => {
    let sum = 0;
    let dx = (max - min) / n;
    let currentX = min + dx / 2;
    for (let i = 0; i < n; i++) {
        let currentY = f(currentX, min, max);

        sum += (dx * currentY) / (max - min);
        currentX += dx;

        tableBody.innerHTML += `<tr><td>${currentX.toFixed(4)}</td><td>${sum.toFixed(4)}</td></tr>`
    }
}

const loadAll = () => {
    const min = 0;
    const max = 34;
    const n = 100;

    const type = document.getElementById('type').value;
    let f = type == 'vl' ? vl : ac;

    tableBody.innerHTML = '';
    loadTable(min, max, n, f);
    loadChart(min, max, n, f, true);
};

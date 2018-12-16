let looping = true;
let keysActive = true;
let socket, cnvs, cnvs2, ctx, canvasDOM;
let fileName = "./frames/sketch";
let maxFrames = 20;
let gl, shaderProgram;
let vertices = [];
let colors = [];
let indices = [];
let amountOfLines = 0;
let e, e2;
let zoom;
let minX, maxX;

function setup() {
    socket = io.connect('http://localhost:8080');
    pixelDensity(1);
    cnvs2 = createCanvas(windowWidth, windowHeight);
    minX = -width / 2;
    maxX = width / 2;
    minX = 0;
    maxX = 0;
    background(255, 0, 0);
    clear();
    ellipse(0, 0, 20);
    noCanvas();
    textSize(25);
    cnvs = document.getElementById('my_Canvas');
    gl = cnvs.getContext('webgl', { preserveDrawingBuffer: true });
    // canvasDOM = document.getElementById('my_Canvas');
    // canvasDOM = document.getElementById('defaultCanvas0');
    // gl = canvasDOM.getContext('webgl');
    // gl = cnvs.drawingContext;

    // gl = canvasDOM.getContext('webgl', { premultipliedAlpha: false });



    // gl.colorMask(false, false, false, true);
    // gl.colorMask(false, false, false, true);

    // Clear the canvas
    gl.clearColor(0.6, 0.6, 0.6, 1.0);
    // gl.clearColor(1, 1, 1, 1.0);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(true, true, true, true);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);

    // Set the view port
    gl.viewport(0, 0, cnvs.width, cnvs.height);


    frameRate(30);
    // background(0);
    fill(255);
    // stroke
    // noStroke();
    if (!looping) {
        noLoop();
    }
    e = new E({
        x: 0,
        y: 0,
        angle: 0,
        length: 50,
        numBranches: 3,
        angleBetween: TWO_PI /  6,
        middle: true,
        parent: null
    });

    e2 = new E({
        x: 0,
        y: 0,
        angle: PI,
        length: 50,
        numBranches: 3,
        angleBetween: TWO_PI /  6,
        middle: true,
        parent: null
    });
    es.push(e);
    es.push(e2);
}
let ww;

// let zoomDecr
let increaser = 0.01;
// let scale;

function draw() {
    // zoom *= 0.9979;
    increaser *= 1.005;
    if (es[0].hasGrown) {
        zoom = width / (maxX - minX);
    } else {
        zoom = 12.8;
    }
    // console.log(zoom);
    // clear();
    translate(width / 2, height / 2);
    scale(zoom, zoom);
    ellipse(minX, 0, 50);
    ellipse(maxX, 0, 50);

    // fill(255);
    // ellipse(0, 0, 15);
    // ellipse(-100, 0, 15);


    ww = map(sin(frameCount * 0.05), -1, 1, 0.05, 1);
    rectangles = 0;

    let t = frameCount * 5;
    let osc = 0.1;
    vertices = [];
    colors = [];
    indices = [];

    // let rectangle;

    // rectangle = makeQuad({
    //     c: [0.0, 0.2, 0.7, 0.75],
    //     v: [
    //         [-2 + (Math.sin(t * 0.05) * osc), -2 + (Math.cos(t * 0.05) * osc)],
    //         [2 + (Math.sin(t * 0.015) * osc), -2 + (Math.cos(t * 0.015) * osc)],
    //         [2 + (Math.sin(t * 0.015) * osc), 2 + (Math.cos(t * 0.015) * osc)],
    //         [-2 + (Math.sin(t * 0.05) * osc), 2 + (Math.cos(t * 0.05) * osc)]
    //     ]
    // });
    // addRectangleToBuffers(rectangle);
    // let r = map(sin(frameCount * 0.15), -1, 1, 0, 1);
    // rectangle = makeQuad({
    //     c: [0.9, r, 1 - r, 1.0],
    //     v: [
    //         [-0.35 + (Math.sin(t * 0.05) * osc), 0.25 + (Math.cos(t * 0.05) * osc)],
    //         [0.35 + (Math.sin(t * 0.015) * osc), 0.25 + (Math.cos(t * 0.015) * osc)],
    //         [0.35 + (Math.sin(t * 0.015) * osc), 0.27 + (Math.cos(t * 0.015) * osc)],
    //         [-0.35 + (Math.sin(t * 0.05) * osc), 0.27 + (Math.cos(t * 0.05) * osc)]
    //     ],
    //     blurFactor: 1
    // });
    // addRectangleToBuffers(rectangle);
    // // osc = 0.02;
    // r = map(sin(frameCount * 0.05), -1, 1, 0, 1);
    // rectangle = makeQuad({
    //     c: [r * 0.5, 1 - r, 1, 1.0],
    //     v: [
    //         [0.245 + (Math.sin(t * 0.05) * osc), 0.35 + (Math.cos(t * 0.05) * osc)],
    //         [0.25 + (Math.sin(t * 0.05) * osc), 0.35 + (Math.cos(t * 0.05) * osc)],
    //         [0.25 + (Math.sin(t * 0.045) * osc), -0.35 + (Math.cos(t * 0.015) * osc)],
    //         [0.245 + (Math.sin(t * 0.045) * osc), -0.35 + (Math.cos(t * 0.015) * osc)]
    //     ]
    // });
    // addRectangleToBuffers(rectangle);

    // osc = 0.04;
    // rectangle = makeQuad({
    //     c: [0.0, 0.0, 0.0, 1.0],
    //     v: [
    //         [0.245 + (Math.sin(t * 0.05) * osc), 0.35 + (Math.cos(t * 0.05) * osc)],
    //         [0.25 + (Math.sin(t * 0.05) * osc), 0.35 + (Math.cos(t * 0.05) * osc)],
    //         [0.25 + (Math.sin(t * 0.045) * osc), -0.35 + (Math.cos(t * 0.015) * osc)],
    //         [0.245 + (Math.sin(t * 0.045) * osc), -0.35 + (Math.cos(t * 0.015) * osc)]
    //     ]
    // });
    // addRectangleToBuffers(rectangle);

    // for (let i = -1.25; i < 1.25; i += 0.04) {
    //     let blur = map(i, -1.25, 1.25, 0.01, 0.05);
    //     let weight = map(i, -1.25, 1.25, 0.001, 0.001);
    //     lineOptions.weight = weight;
    //     lineOptions.blurFactor = blur;
    //     let r = map(i, -1.25, 1.25, 0.0, 1.0);
    //     let g = map(i, -1.25, 1.25, 0.5, 1.0);
    //     let b = map(i, -1.25, 1.25, 1.0, 0.0);
    //     lineOptions.r = r;
    //     lineOptions.g = g;
    //     lineOptions.b = b;
    //     let x = sin(frameCount * 0.01 + i) * 0.75;
    //     let x1 = sin(frameCount * 0.02 + i) * 0.75;
    //     makeLine(i + x, -0.5 + x1, i + x1, 0.5 + x);
    // }

    // lineOptions.weight = 0.001;
    // lineOptions.blurFactor = 0.01;
    // amountOfLines = 0;
    // let s = 0.01;
    // for (let i = 0; i < Math.PI * 100; i += 0.03) {
    //     let blur = map(i, 0, Math.PI * 50, 0.01, 0.04);
    //     let weight = map(i, 0, Math.PI * 50, 0.001, 0.02);
    //     lineOptions.weight = weight;
    //     lineOptions.blurFactor = blur;
    //     let maxG = map(sin(frameCount * 0.01), -1, 1, 0, 1);
    //     let r = map(i, 0, Math.PI * 50, 1.0, 0.5);
    //     // r = map(sin(i * 0.1), -1, 1, 0.0, 1.0);
    //     let g = map(i, 0, Math.PI * 50, 0.5, maxG);
    //     let b = map(i, 0, Math.PI * 50, 0.0, 0.7);
    //     lineOptions.r = r;
    //     lineOptions.g = g;
    //     lineOptions.b = b;
    //     let x0 = cos(i * frameCount * 0.001) * cos(frameCount * 0.025 + i) * i * s;
    //     let y0 = cos(i * frameCount * 0.001) * sin(frameCount * 0.025 + i) * i * s;
    //     // let x1 = cos((i + 1) * frameCount * 0.0001) * cos(frameCount * 0.025 + i + 1) * (i + 1) * s * 0.25;
    //     // let y1 = cos((i + 1) * frameCount * 0.0001) * sin(frameCount * 0.025 + i + 1) * (i + 1) * s * 0.25;
    //     let x1 = x0 * 1.0015;
    //     let y1 = y0 * 1.0015;
    //     makeLine(x0 * 1, y0 * 1, x1 * 1, y1 * 1);
    //     amountOfLines++;
    // }


    // makeLine(0, 0, 1280 - 10, 800 - 10);

    let ready = 0;
    for (let i = 0; i < es.length; i++) {
        es[i].lengthen();
        for (let j = 0; j < es[i].branches.length; j++) {

            // console.log(es[i].branches[j].x);

            // for (let i = 0; i < this.branches.length; i++) {
            let b = es[i].branches[j];
            let a = b.angle;
            // console.log(a);
            let x = es[i].pos.x + cos(a) * es[i].currentLength * es[i].length;
            // let y = es[i].pos.y + sin(a) * es[i].currentLength * es[i].length;
            minX = min(x, minX);
            maxX = max(x, maxX);
            // console.log(this.cu);
            // makeLine(
            //     this.pos.x * zoom,
            //     this.pos.y * zoom,
            //     x * zoom,
            //     y * zoom
            // );
            // }


        }
        es[i].show();
        if (es[i].hasGrown || es[i].readyToGrow) {
            ready++;
        }
    }
    if (ready == es.length) {
        // console.log("GROWTH!");
        grow();
    } else {
        // console.log("not ready to grow");
    }
    // for (let i = 0; i < es.length; i++) {
    //     if (!es[i].hasGrown && es[i].readyToGrow) {
    //         es[i].grow();
    //     }
    // }


    // es[0].showTree();
    // es[1].showTree();

    // var vertices = [-0.75, 0.0, 0.0, -0.5, -0.5, 0.0,
    //     0.75, 0.0, 0.0, 0.5, 0.5, 0.0
    // ];
    // var colors = [0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0];
    // var indices = [3, 2, 1, 3, 1, 0];

    // vertices = rectangle.vertices;
    // colors = rectangle.colors;
    // indices = rectangle.indices;
    // console.log(indices);

    // Create an empty buffer object and store vertex data
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Create an empty buffer object and store Index data
    var Index_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // Create an empty buffer object and store color data
    var color_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    setShaders();
    /* ======== Associating shaders to buffer objects =======*/

    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Bind index buffer object
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");

    // point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    // bind the color buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);

    // get the attribute location
    var color = gl.getAttribLocation(shaderProgram, "color");

    // point attribute to the volor buffer object
    gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0);

    // enable the color attribute
    gl.enableVertexAttribArray(color);

    /*============Drawing the Quad====================*/
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(false, false, false, true);
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(true, true, true, true);
    // gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    //Draw the triangle
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    if (exporting && frameCount < maxFrames) {
        frameExport();
    }
}

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
        if (key == 'p' || key == 'P') {
            frameExport();
        }
        if (key == 'g' || key == 'G') {
            grow();
        }
        if (key == 'r' || key == 'R') {
            window.location.reload();
        }
        if (key == 'm' || key == 'M') {
            redraw();
        }
    }
}

function grow() {
    for (let i = 0; i < 1; i++) {
        let numToGrow = es.length;
        for (let i = 0; i < numToGrow; i++) {
            es[i].grow();
        }
        es = es.concat(esNext);
        esNext = [];
    }
}
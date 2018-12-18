let es = [];
let esNext = [];

let E = function(obj) {
    this.pos = createVector(obj.x, obj.y);
    this.angle = obj.angle;
    this.length = obj.length;
    this.currentLength = 0;
    this.numBranches = obj.numBranches;
    this.angleBetween = obj.angleBetween;
    this.middle = obj.middle;
    this.branches = [];
    this.whenIGrew = es.length * 0.1;
    this.hasGrown = false;
    this.parent = obj.parent;
    this.readyToGrow = false;
    this.initialize();
    this.generation = generation;
};

E.prototype.initialize = function() {
    if (this.middle) {
        let x = this.pos.x + cos(this.angle) * this.length;
        let y = this.pos.y + sin(this.angle) * this.length;
        this.branches.push({
            x: x,
            y: y,
            angle: this.angle
        });
    }
    // If the shape has a middle segment, we need to substract it.
    let numberOfTimes = (this.middle) ? this.numBranches - 1 : this.numBranches;
    for (let i = 0; i < numberOfTimes; i++) {
        if (i % 2 == 0) {
            let a = this.angle + this.angleBetween;
            let x = this.pos.x + cos(a) * this.length;
            let y = this.pos.y + sin(a) * this.length;
            this.branches.push({
                x: x,
                y: y,
                angle: a
            });
        } else {
            let a = this.angle - this.angleBetween;
            let x = this.pos.x + cos(a) * this.length;
            let y = this.pos.y + sin(a) * this.length;
            this.branches.push({
                x: x,
                y: y,
                angle: a
            });
        }
    }
    for (let i = 0; i < this.branches.length; i++) {
        this.branches[i].currentLength = this.currentLength;
    }
};

E.prototype.show = function() {
    let r = map(sin(2 + this.whenIGrew * 0.5), -1, 1, 1, 0.25) * 255;
    let g = map(sin(2 + this.whenIGrew * 2), -1, 1, 1, 0) * 255;
    let b = map(sin(2 + this.whenIGrew * 4), -1, 1, 0, 1) * 255;
    stroke(r, g, b);
    let colArray = [
        [0, 95, 205],
        [15, 195, 155],
        [25, 220, 0],
        [0, 150, 5],
        [0, 0, 255],
        [0, 0, 255],
        [0, 0, 255],
        [0, 0, 255],
        [0, 0, 255],
        [0, 0, 255],
        [0, 0, 255],
    ];
    stroke(colArray[this.generation % 4]);
    // weight: 8,
    lineOptions.weight = 8 * this.currentLength * zoom / 2;
    for (let i = 0; i <  this.branches.length; i++) {
        let b = this.branches[i];
        let a = b.angle;
        // console.log(a);
        let x = this.pos.x + cos(a) * this.currentLength * this.length;
        let y = this.pos.y + sin(a) * this.currentLength * this.length;
        // console.log(this.cu);
        // makeLine(
        //     this.pos.x * zoom,
        //     this.pos.y * zoom,
        //     x * zoom,
        //     y * zoom
        // );
        strokeWeight(map(zoom, 8, 0, 46, 2));
        line(this.pos.x * zoom * 0.9,
            this.pos.y * zoom * 0.9,
            x * zoom * 0.9,
            y * zoom * 0.9);
    }
};


// E.prototype.getSizes = function() {

// };

E.prototype.showTree = function() {
    lineOptions.r = map(sin(this.whenIGrew * 0.5), -1, 1, 0, 0.5);
    lineOptions.g = map(sin(this.whenIGrew * 2), -1, 1, 1, 0);
    lineOptions.b = map(sin(this.whenIGrew), -1, 1, 0, 1);
    // lineOptions.r = this.whenIGrew;
    for (let i = 0; i < this.branches.length; i++) {
        if (this.parent) {
            // console.log("oh yes!");
            makeLine(this.pos.x - this.parent.x * this.parent.currentLength,
                this.pos.y - this.parent.y * this.parent.currentLength,
                this.branches[i].x * this.currentLength - this.parent.x * this.parent.currentLength,
                this.branches[i].y * this.currentLength - this.parent.y * this.parent.currentLength
            );
        } else {
            makeLine(this.pos.x, this.pos.y, this.branches[i].x * this.currentLength, this.branches[i].y * this.currentLength);
        }
        if (this.branches[i].child) {
            this.branches[i].child.showTree();
        }
    }
};


E.prototype.lengthen = function() {
    if (!this.readyToGrow) {
        if (this.currentLength < 1) {
            this.currentLength += increaser;
            for (let i = 0; i < this.branches.length; i++) {
                this.branches[i].currentLength = this.currentLength;
            }
        }
        if (this.currentLength >= 1) {
            this.readyToGrow = true;
            // this.grow();
            // console.log("GRow");
        }
    }
};

E.prototype.grow = function() {
    if (!this.hasGrown) {
        // console.log("I'm growing!");
        for (let i = 0; i < this.branches.length; i++) {
            let b = this.branches[i];
            let testBranch = new E({
                x: b.x,
                y: b.y,
                angle: b.angle,
                length: this.length,
                numBranches: this.numBranches,
                angleBetween: this.angleBetween,
                middle: this.middle,
                parent: this.branches[i]
            });
            let branchApproved = true;
            for (let j = 0; j < testBranch.branches.length; j++) {
                // line(testBranch.pos.x, testBranch.pos.y, testBranch.branches[j].x, testBranch.branches[j].y);
                // fill(0, 50);
                // text(testBranch.angle, testBranch.pos.x, testBranch.pos.y);
                for (let k = 0; k < es.length; k++) {
                    for (let l = 0; l < es[k].branches.length; l++) {
                        let otherB = es[k].branches[l];
                        let thisB = testBranch.branches[j];
                        let d = dist(thisB.x, thisB.y, otherB.x, otherB.y);
                        if (d <= 0.1) {
                            // console.log(j, k, l);
                            // fill(255, 0, 0);
                            // ellipse(otherB.x, otherB.y, 15);
                            // fill(255, 255, 0, 150);
                            // ellipse(thisB.x, thisB.y, 35);
                            // fill(0, 255, 255, 150);
                            // ellipse(testBranch.pos.x, testBranch.pos.y, 55);

                            // console.log(otherB, thisB);
                            branchApproved = false;
                        }
                    }
                }
            }
            if (branchApproved) {
                esNext.push(testBranch);
                this.branches[i].child = testBranch;
                // console.log("Branch approved.");
            } else {
                // console.log("Branch denied.");
                // return;
            }
        }
        this.hasGrown = true;
    }
};
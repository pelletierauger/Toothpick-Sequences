let es = [];
let esNext = [];

let E = function(obj) {
    this.pos = createVector(obj.x, obj.y);
    this.angle = obj.angle;
    this.length = obj.length;
    this.numBranches = obj.numBranches;
    this.angleBetween = obj.angleBetween;
    this.middle = obj.middle;
    this.branches = [];
    this.whenIGrew = es.length;
    this.hasGrown = false;
    this.initialize();
};

E.prototype.initialize = function() {
    if (this.middle) {
        let x = this.pos.x + cos(this.angle) * this.length;
        let y = this.pos.y + sin(this.angle) * this.length;
        this.branches.push(createVector(x, y, this.angle));
    }
    // If the shape has a middle segment, we need to substract it.
    let numberOfTimes = (this.middle) ? this.numBranches - 1 : this.numBranches;
    for (let i = 0; i < numberOfTimes; i++) {
        if (i % 2 == 0) {
            let a = this.angle + this.angleBetween;
            let x = this.pos.x + cos(a) * this.length;
            let y = this.pos.y + sin(a) * this.length;
            this.branches.push(createVector(x, y, a));
        } else {
            let a = this.angle - this.angleBetween;
            let x = this.pos.x + cos(a) * this.length;
            let y = this.pos.y + sin(a) * this.length;
            this.branches.push(createVector(x, y, a));
        }
    }
};

E.prototype.show = function() {
    lineOptions.r = map(sin(this.whenIGrew * 0.5), -1, 1, 0, 0.5);
    lineOptions.g = map(sin(this.whenIGrew * 2), -1, 1, 1, 0);
    lineOptions.b = map(sin(this.whenIGrew), -1, 1, 0, 1);
    // lineOptions.r = this.whenIGrew;
    for (let i = 0; i <  this.branches.length; i++) {
        makeLine(this.pos.x, this.pos.y, this.branches[i].x, this.branches[i].y);
    }
};

E.prototype.grow = function() {
    if (!this.hasGrown) {
        // console.log("I'm growing!");
        for (let i = 0; i <  this.branches.length; i++) {
            let b = this.branches[i];
            let testBranch = new E({
                x: b.x,
                y: b.y,
                angle: b.z,
                length: this.length,
                numBranches: this.numBranches,
                angleBetween: this.angleBetween,
                middle: this.middle
            });
            let branchApproved = true;
            for (let j = 0; j < testBranch.branches.length; j++) {
                line(testBranch.pos.x, testBranch.pos.y, testBranch.branches[j].x, testBranch.branches[j].y);
                // fill(0, 50);
                // text(testBranch.angle, testBranch.pos.x, testBranch.pos.y);
                for (let k = 0; k < es.length; k++) {
                    for (let l = 0; l < es[k].branches.length; l++) {
                        let otherB = es[k].branches[l];
                        let thisB = testBranch.branches[j];
                        let d = dist(thisB.x, thisB.y, otherB.x, otherB.y);
                        if (d <= 0.1) {
                            // console.log(j, k, l);
                            fill(255, 0, 0);
                            ellipse(otherB.x, otherB.y, 15);
                            fill(255, 255, 0, 150);
                            ellipse(thisB.x, thisB.y, 35);
                            fill(0, 255, 255, 150);
                            ellipse(testBranch.pos.x, testBranch.pos.y, 55);

                            // console.log(otherB, thisB);
                            branchApproved = false;
                        }
                    }
                }
            }
            if (branchApproved) {
                esNext.push(testBranch);
                // console.log("Branch approved.");
            } else {
                // console.log("Branch denied.");
                // return;
            }
        }
        this.hasGrown = true;
    }

};
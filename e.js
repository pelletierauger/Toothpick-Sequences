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
    this.hasGrown = false;
    this.initialize();
};

E.prototype.initialize = function() {
    if (this.middle) {
        let x = this.pos.x + cos(this.angle) * this.length;
        let y = this.pos.y + sin(this.angle) * this.length;
        this.branches.push(createVector(x, y));
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
    for (let i = 0; i <  this.branches.length; i++) {
        makeLine(this.pos.x, this.pos.y, this.branches[i].x, this.branches[i].y);
    }
};

E.prototype.grow = function() {
    if (!this.hasGrown) {
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
                for (let k = 0; k < es.length; k++) {
                    for (let l = 0; l < es[k].branches.length; l++) {
                        let otherB = es[k].branches[l];
                        let thisB = testBranch.branches[j];
                        let d = dist(thisB.x, thisB.y, otherB.x, otherB.y);
                        if (d <= 1) {
                            console.log("DENIED!");
                            branchApproved = false;
                        }
                    }
                }
            }
            if (branchApproved) {
                esNext.push(testBranch);
            }
        }
        this.hasGrown = true;
    }

};
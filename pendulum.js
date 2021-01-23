class Pendulum {
	constructor(x, y, r, m, t) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.t = t;
		this.m = m;
		this.v = 0;
		this.a = 0;
	}

	show() {
		let x1 = this.x;
		let y1 = this.y;
		let x2 = this.giveEnd().x;
		let y2 = this.giveEnd().y;

		strokeWeight(2)
		stroke(0);
		line(x1, y1, x2, y2);

		fill(0)
		ellipse(x2, y2, this.m * 5, this.m * 5);
	}

	update() {
		this.v += this.a;
		this.t += this.v;
	}

	giveEnd() {
		let endX = this.x + this.r * sin(this.t);
		let endY = this.y + this.r * cos(this.t);
		return createVector(endX, endY);
	}

	setLoc(x, y) {
		this.x = x;
		this.y = y;
	}
}
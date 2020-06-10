let p1;
let p2;
let g = 1;

let pts = [];

let sliderBg;
let sliderTail;

let col;
let r = 0;
let gr = 1000;
let b = 100000;

function setup() {
	createCanvas(800, 600);
	translate(width / 2, 50);

	p1 = new Pendulum(0, 0, 200, 10, PI / 1.5);
	p2 = new Pendulum(p1.giveEnd().x, p1.giveEnd().y, 200, 10, PI / 1.5);

	sliderBg = createSlider(0, 255, 0, 1);
	sliderTail = createSlider(2, 200, 50, 1);
}

function draw() {
	background(sliderBg.value());
	translate(width / 2, 100);

	col = color(noise(r) * 255, noise(gr) * 255, noise(b) * 255);

	let num1 = -g * (2 * p1.m + p2.m) * sin(p1.t);
	let num2 = -p2.m * g * sin(p1.t - 2 * p2.t);
	let num3 = -2 * sin(p1.t - p2.t) * p2.m;
	let num4 = p2.v * p2.v * p2.r + p1.v * p1.v * p1.r * cos(p1.t - p2.t);
	let den = p1.r * (2 * p1.m + p2.m - p2.m * cos(2 * p1.t - 2 * p2.t));
	p1.a = (num1 + num2 + num3 * num4) / den;

	num1 = 2 * sin(p1.t - p2.t);
	num2 = p1.v * p1.v * p1.r * (p1.m + p1.m);
	num3 = g * (p1.m + p2.m) * cos(p1.t);
	num4 = p2.v * p2.v * p2.r * p2.m * cos(p1.t - p2.t);
	den = p2.r * (2 * p1.m + p2.m - p2.m * cos(2 * p1.t - 2 * p2.t));
	p2.a = (num1 * (num2 + num3 + num4)) / den;

	p1.update();
	p2.update();

	p2.setLoc(p1.giveEnd().x, p1.giveEnd().y);

	p1.show();
	p2.show();

	pts.push(createVector(p2.giveEnd().x, p2.giveEnd().y));

	if (pts.length > sliderTail.value()) {
		pts.shift();
		pts.shift();
	}

	noFill();
	beginShape();
	stroke(col);
	for (let pt of pts) {
		vertex(pt.x, pt.y);
	}
	endShape();

	r += 0.01;
	gr += 0.01;
	b += 0.01;
}

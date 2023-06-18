class Wednesdayle {
	constructor() {
		this.active = true;
		this.nextBox = 0;
		this.boxes = new Array();
		for (let i = 0; i < 9; ++i) {
			this.boxes.push(document.getElementById('box' + i));
		}

		this.buttons = new Array();
		for (let i = 0; i < 7; ++i) {
			let btn = document.getElementById('key' + i);
			btn.addEventListener('click', this.buttonPush.bind(this));
			this.buttons.push(btn);
		}

		window.addEventListener('keydown', this.keydown.bind(this));

		this.delete = document.getElementById('delete');
		this.delete.addEventListener('click', this.letterUndid.bind(this));

		this.enter = document.getElementById('enter');
		this.enter.addEventListener('click', this.submit.bind(this));

		this.resetBtn = document.getElementById('reset');
		this.resetBtn.addEventListener('click', this.reset.bind(this));

		this.dropdown = document.getElementById('dropdown');
		document.getElementById('close-dropdown').addEventListener('click', this.closeDropdown.bind(this));

		this.theword = document.getElementById('theword');
		this.notword = document.getElementById('notword');
	}

	// Terrible function name genny
	letterDid(letter) {
		if (!this.active) {
			return;
		}

		if (this.nextBox < this.boxes.length) {
			let up = letter.toUpperCase();

			this.boxes[this.nextBox].innerText = up;
			if (this.nextBox < this.boxes.length) {
				this.nextBox++;
			}
		}
	}

	// undid? really? genny,,,
	letterUndid() {
		if (!this.active) {
			return;
		}

		if (this.nextBox > 0) {
			this.nextBox--;
			this.boxes[this.nextBox].innerText = '';
		}
	}

	submit() {
		if (!this.active) {
			return;
		}

		let word = "wednesday";
		for (let i = 0; i < this.boxes.length; ++i) {
			if (word[i].toUpperCase() != this.boxes[i].innerText.toUpperCase()) {
				this.notword.style.display = "block";
				this.resetBtn.style.display = "block";
				this.active = false;
				return;
			}
		}

		this.theword.style.display = "block";
		this.resetBtn.style.display = "block";
		this.active = false;
	}

	reset() {
		console.log("sfa");
		this.active = true;
		for (let i = 0; i < this.boxes.length; ++i) {
			this.boxes[i].innerText = '';
		}
		this.nextBox = 0;

		this.theword.style.display = "none";
		this.notword.style.display = "none";
		this.resetBtn.style.display = "none";
	}

	buttonPush(event) {
		if (!this.active) {
			return;
		}

		let btn = event.target;
		let letter = btn.innerText;

		this.letterDid(letter);
	}

	keydown(event) {
		if (!this.active) {
			return;
		}

		let allowed = "weyadsn";
		let key = event.key;

		if (allowed.includes(key)) {
			this.letterDid(key);
		} else if (key == "Enter") {
			this.submit();
		} else if (key == "Backspace") {
			this.letterUndid();
		}
	}

	closeDropdown() {
		console.log('thf');
		this.dropdown.style.display = "none";
	}
}

let wednesdayle;

function setup() {
	console.log("started");
	wednesdayle = new Wednesdayle();
}

window.addEventListener('DOMContentLoaded', setup)
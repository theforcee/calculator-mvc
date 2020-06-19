
class Model {
    constructor() {
        console.log("constructor Model ");
        this.buttons = [];
        this.generateButtons();
    }

    createButton(text, val, type) {
        var button = document.createElement("button");
        button.className = "btn";
        button.textContent = text;
        button.setAttribute("value", val);

        //differentiate operator vs number
        if (type === "operator") button.className += " operator";

        if (type === "others") {
            const idResult = document.getElementById("result");
            // idResult = this.view.getInput.id;
            switch (text) {
                case "CE":
                    break;
                case "C":
                    button.onclick = function () {
                        idResult.value = "0";
                    }
                    break;
                case "DEL":
                    button.onclick = function () {
                        idResult = document.getElementById("result");
                        valResult = idResult.value;
                        if (valResult != 0) {
                            //last character = number: delete 1 character
                            let character = valResult.substr(valResult.length - 1, 1);
                            if (Number(character) || parseInt(character) == 0 || character == ".")
                                idResult.value = valResult.substr(0, valResult.length - 1);
                            //last character = operator: delete 3 character
                            else if (!Number(character))
                                idResult.value = valResult.substr(0, valResult.length - 3);
                        }
                    }
                    // view.deleteButton();
                    break;
                case "+/-":
                    button.onclick = function () {
                        idResult.value = - idResult.value;
                    }
                    break;
                case ".":
                    button.onclick = function () {
                        _value = idResult.value;
                        _length = _value.length;
                        let space = _value.lastIndexOf(" ");
                        //fistNumber isFloat?
                        if (space == -1) {
                            if (_value.indexOf(".") == -1)
                                idResult.value += ".";
                        }
                        else {
                            //lastNumber isFloat?
                            let lastNumber = _value.slice(space, _length);
                            if (lastNumber.indexOf(".") == -1)
                                idResult.value += ".";
                        }
                    }
                    break;
                default: break;
            }
        } else {
            button.onclick = function () {
                const idResult = document.getElementById("result");
                var _value = idResult.value;
                if (button.className == "btn") { //button is Number
                    console.log("number: " + _value + ", value = " + val);

                    if (_value == 0 && val != 0) {
                        idResult.value = val;
                        if (_value === "0.")
                            idResult.value = "0." + number;
                    }
                    else if (_value != 0) {
                        idResult.value += val;
                    }
                } else { //button is operator
                    if (_value != 0) {
                        var character = _value.substr(_value.length - 1, 1);
                        //last character = number: add operator
                        if (Number(character) || parseInt(character) == 0)
                            idResult.value += val;
                        //last character = operator: delete last 3 character, add new operator
                        else if (!Number(character))
                            idResult.value = _value.substr(0, _value.length - 3) + val;
                    }
                }
            }
        }
        return button;
    }

    generateButtons() {
        var button = this.createButton("CE", "", "others");
        this.buttons.push(button);

        button = this.createButton("C", "", "others");
        this.buttons.push(button);
        button = this.createButton("DEL", "", "others");
        this.buttons.push(button);

        //create numbers
        for (var i = 1; i < 10; i++) {
            this.buttons.push(this.createButton(i, i));
        }

        button = this.createButton("+/-", "", "others");
        this.buttons.push(button);
        button = this.createButton("0", "0");
        this.buttons.push(button);
        button = this.createButton(".", ".", "others");
        this.buttons.push(button);

        //create operators
        button = this.createButton("/", " / ", "operator");
        this.buttons.push(button);
        button = this.createButton("*", " * ", "operator");
        this.buttons.push(button);
        button = this.createButton("-", " - ", "operator");
        this.buttons.push(button);
        button = this.createButton("+", " + ", "operator");
        this.buttons.push(button);

        button = this.createButton("=", "=", "operator");
        button.id = "equal";
        button.onclick = function () {
            this.equal(document.getElementById("result").value);
        }
        this.buttons.push(button);
    }
}

class View {
    constructor() {
        console.log("constructor View ");
        this.calc = document.getElementById("root");
        this.input = document.createElement("input");
        this.input.id = "result";
        this.input.readOnly = true;
        this.input.type = "text";
        this.input.value = "0";
        this.buttons = document.createElement("div");
        this.buttons.id = "button-grid";
        this.operators = document.createElement("div");
        this.operators.id = "operators";
        this.calc.append(this.input, this.buttons, this.operators);
        this.buttonsList = [];
    }
    setData(list) {
        this.buttonsList = list;
    }

    render() {
        console.log("View render() + " + this.buttonsList);

        for (var i = 0; i < this.buttonsList.length; i++) {
            if (this.buttonsList[i].className == "btn operator") {
                document.getElementById("operators").append(this.buttonsList[i]);
            }
            else {
                document.getElementById("button-grid").append(this.buttonsList[i]);
            }
        }
    }

    renderAnswer(string) {
        document.getElementById("result").value = string;
    }
}

class Controller {
    constructor(model, view) {
        console.log("constructor Controller");

        this.model = model;
        this.view = view;

        this.view.setData(this.model.buttons);
        this.view.render(); //ok

        this.idResult = this.view.input.id;
        // this.idResult = view.setInput(10);
        this.valResult = this.idResult.value;
    }

    getButtons() {
        return this.model.buttons;
    }

    equal(string) {
        let arrayCharacter = string.split(" ");
        let _length = arrayCharacter.length;

        for (let i = 1; i < _length; i += 2) {
            switch (arrayCharacter[i]) {
                case "+":
                    arrayCharacter[i + 1] = parseFloat(arrayCharacter[i - 1]) + parseFloat(arrayCharacter[i + 1]);
                    break;
                case "-":
                    arrayCharacter[i + 1] = parseFloat(arrayCharacter[i - 1]) - parseFloat(arrayCharacter[i + 1]);
                    break;
                case "*":
                    arrayCharacter[i + 1] = parseFloat(arrayCharacter[i - 1]) * parseFloat(arrayCharacter[i + 1]);
                    break;
                case "/":
                    arrayCharacter[i + 1] = parseFloat(arrayCharacter[i - 1]) / parseFloat(arrayCharacter[i + 1]);
                    break;
                default: break;
            }
        }
        result = arrayCharacter[_length - 1];
        this.view.renderAnswer(result);
    }
}

const calc1 = new Controller(new Model(), new View());

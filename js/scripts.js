
model = {
    buttons: [],
}

view = {
    render: function () {
        document.getElementById("result").value = 0;

        buttonsList = controller.getButtons();
        for (var i = 0; i < buttonsList.length; i++) {
            if (buttonsList[i].className == "btn operator") {
                document.getElementById("operators").append(buttonsList[i]);
            }
            else {
                document.getElementById("button-grid").append(buttonsList[i]);
            }
        }
    },
    renderAnswer: function (string) {
        document.getElementById("result").value = string;
    },
}

controller = {
    init: function () {
        this.generateButtons();
        view.render();
    },
    createButton: function (text, val, type) {
        var button = document.createElement("button");
        button.className = "btn";
        button.textContent = text;
        button.setAttribute("value", val);

        //differentiate operator vs number
        if (type === "operator") button.className += " operator";

        if (type === "others") {
            idResult = document.getElementById("result");
            valResult = idResult.value;
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

                idResult = document.getElementById("result");
                _value = idResult.value;
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
                        character = _value.substr(_value.length - 1, 1);
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
    },

    generateButtons: function () {
        button = this.createButton("CE", "", "others");
        model.buttons.push(button);
        button = this.createButton("C", "", "others");
        model.buttons.push(button);
        button = this.createButton("DEL", "", "others");
        model.buttons.push(button);

        //create numbers
        for (var i = 1; i < 10; i++) {
            model.buttons.push(this.createButton(i, i));
        }

        button = this.createButton("+/-", "", "others");
        model.buttons.push(button);
        button = this.createButton("0", "0");
        model.buttons.push(button);
        button = this.createButton(".", ".", "others");
        model.buttons.push(button);

        //create operators
        button = this.createButton("/", " / ", "operator");
        model.buttons.push(button);
        button = this.createButton("*", " * ", "operator");
        model.buttons.push(button);
        button = this.createButton("-", " - ", "operator");
        model.buttons.push(button);
        button = this.createButton("+", " + ", "operator");
        model.buttons.push(button);

        button = this.createButton("=", "=", "operator");
        button.id = "equal";
        button.onclick = function () {
            controller.equal(document.getElementById("result").value);
        }
        model.buttons.push(button);
    },

    getButtons: function () {
        return model.buttons;
    },

    equal: function (string) {
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
        view.renderAnswer(result);
    }
}

controller.init();

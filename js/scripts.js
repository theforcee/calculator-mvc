
model = {
    buttons: [],
}

view = {
    render: function () {
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
        result = document.getElementById("result");
        result.value = string;
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
            rs = document.getElementById("result");
            switch (text) {
                case "CE":
                    break;
                case "C":
                    button.onclick = function () {
                        rs.value = "";
                    }
                    break;
                case "DEL":
                    button.onclick = function () {
                        rs.value = rs.value.substr(0, rs.value.length - 1);
                    }
                    // view.deleteButton();
                    break;
                case "+/-":
                    button.onclick = function () {
                        rs.value = - rs.value;
                    }
                    break;
                case ".":
                    break;
                default: break;
            }
        } else {
            button.onclick = function () {
                document.getElementById("result").value += val;
            }
        }


        return button;
    },
    generateButtons: function () {
        // send("generateButtons")

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
        button = this.createButton("/", "/", "operator");
        model.buttons.push(button);
        button = this.createButton("*", "*", "operator");
        model.buttons.push(button);
        button = this.createButton("-", "-", "operator");
        model.buttons.push(button);
        button = this.createButton("+", "+", "operator");
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
        view.renderAnswer(eval(string));
    }
}

controller.init();

requirejs(["term.js", "docker-tutorial.js", "commands/whale.js"], function(terminal, tutorial, whale) {

	var fake = {
	//TODO: should be array so the user can up&down arrow through the history
		currentCommand: '',
		state: '',
		commands: []
	};
	fake.commands["whale"] = whale;

fake.run = function(options) {

	fake.options = options || {};

	currentStep = 1;
	fake.setStep(currentStep)

	fake.term = new terminal({
		cols: 85,
		rows: 28,
		useStyle: true,
		screenKeys: false
	});

	fake.term.on('data', function(data) {
		test = data.charCodeAt(0)
		switch (data.charCodeAt(0)) {
			case 13: //return
				response = fake.command(fake.currentCommand);
				break;
			case 127: //backspage
				if (fake.currentCommand.length > 0) {
					fake.term.write('\b')
					fake.term.write(' ')
					fake.term.write('\b')
					fake.currentCommand = fake.currentCommand.slice(0, -1)
				}
				break;
			default:
				fake.term.write(data)
				fake.currentCommand += data;
		}
	});

	fake.term.open(fake.options.parent || document.body);
	fake.command("whale");
	fake.term.write('Welcome to the Docker tutorial!\r\n$ ');

//	term.destroy();
};


fake.command = function (str) {
	if (str == "") {
		return ""
	}

	ARGC = str.split(" ")

	if (fake.commands[ARGC[0]] == undefined) {
		require(["commands/"+ARGC[0]], function(replies) {
			fake.commands[ARGC[0]] = replies;
			fake.command(str);
		}, function(err) {
			fake.commands[ARGC[0]] = 404;
			fake.command(str);
		})
	} else {
		// default error message
		//TODO: need to parse it..
		output = "\r\n-sh: "+ARGC[0]+": command not found"
	if (fake.commands[ARGC[0]] != undefined && fake.commands[ARGC[0]] != 404) {
		//TODO: probably should re-combine with join(" ") - but need to extract any quoted strings before the split.
		args = str.substring(ARGC[0].length+1);
		key = args
		if (key == "") { key = "_default"; }
		if (fake.commands[ARGC[0]][key] != undefined) {
			output = fake.commands[ARGC[0]][key].output;
			if (typeof(output) == "object") {
				// TODO: allow for different response based on state
				if (output[fake.state] != undefined) {
					output = output[fake.state]
				} else {
					output = output["_default"]
				}
			}
			output = "\r\n"+output.replace(/\n/g, "\r\n");
			// is there a state  change?
			addstate = fake.commands[ARGC[0]][key].addstate;
			delstate = fake.commands[ARGC[0]][key].delstate;
				if (addstate != undefined) {
					fake.state = addstate
				}
				if (delstate != undefined && fake.state == delstate) {
					fake.state = ""
				}
		} else {
			output = fake.commands[ARGC[0]]["_error"].output;
			if (typeof(output) == "object") {
				output = output["_default"]
			}
			if (output != undefined) {
				output = "\r\n"+output.replace(/\n/g, "\r\n");
				output = "\r\n"+output.replace(/_error/, key);
			} else {
				output = "\r\n"+ARGC[0]+" error: "+args;
			}
		}
	}
	fake.term.write(output);
	if (fake.currentCommand == tutorial[currentStep].command_expected.join(" ")) {
			fake.nextStep()
		}
		fake.term.write('\r\n$ ');
		fake.currentCommand = ""
	}
}
fake.prevStep = function() {
	if (currentStep > 1) {
		fake.setStep(--currentStep)
	}
}
fake.nextStep = function() {
	if (currentStep < tutorial.length) {
		fake.setStep(++currentStep)
	}
}
fake.setStep = function(step) {
       	fake.options.intro.innerHTML = tutorial[step].intro;
   	    // fake.options.task.innerHTML = tutorial[step].task;
        fake.options.tip.innerHTML = tutorial[step].tip;
        fake.options.result.innerHTML = tutorial[step].result;
        fake.options.command_tip_box.innerHTML = tutorial[step].command_tip_box;
		fake.options.progress.innerHTML = fake.listOfWhales(step, tutorial.length)
}
// fake.showResult = funtion () {
// 	fake.options.tip.innerHTML = 
// }
fake.listOfWhales = function(step, total) {
	output = "Step: " + step + " of " + total + " ";
	// Remove step imgs
	// for (i=0; i<total; i++) {
	// 	if (i < step) {
	// 		output = output + ' <img src="https://docs.docker.com/images/favicon.png" alt="docker logo">'
	// 	} else {
	// 		output = output + ' <img src="https://hub.docker.com/public/images/logos/mini-logo.svg" alt="docker logo">'
	// 	}
	// }

	return output
}

	
	var e = document.getElementById("terminal");
	fake.run({
		progress: document.getElementById("progress"),
		intro: document.getElementById("intro"),
		// task: document.getElementById("task"),
		tip: document.getElementById("tip"),
		command_tip_box: document.getElementById("code-string"),
		result: document.getElementById("result"),
		parent: e
	})
	document.getElementById("stepForward").onclick = fake.nextStep;
	document.getElementById("stepBack").onclick = fake.prevStep;
});

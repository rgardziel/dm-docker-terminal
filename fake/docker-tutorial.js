define(function() {
return [
  {
    intro: "lorem",
    // todo/fix - quick fix for step #
  },
  {
    intro: "<h3>Getting started</h3>\n<p>There are actually two programs: The Docker daemon, which is a server process and which manages all the\ncontainers, and the Docker client, which acts as a remote control on the daemon. On most systems, like in this\nemulator, both execute on the same host.</p>",
    task: "<h3>Assignment</h3>\n<p>Check which Docker versions are running</p>\n<p>This will help you verify the daemon is running and you can connect to it. If you see which version is running\nyou know you are all set.</p>",
    tip: "<p>Tip: Try typing <code>docker</code> to see the full list of accepted arguments</p>      <p>This emulator provides only a limited set of shell and Docker commands, so some commands may not work as expected</p>",
    command_expected: ['docker', 'version'],
    result: "<p>Well done! Let's move to the next assignment.</p>",
    command_tip_box: "docker version"
  },
  {
    intro: "<h3>Searching for images</h3>\n<p>The easiest way to get started is to use a container image from someone else. Container images are\navailable on the Docker index, a central place to store images. You can find them online at\n<a href=\"#1\" onClick=\"window.open('http://index.docker.io','Docker Index','width=1000,height=900,left=50,top=50,menubar=0')\";>index.docker.io</a>\nand by using the commandline</p>",
    task: "<h3>Assignment</h3>\n<p>Use the commandline to search for an image called tutorial</p>",
    command_expected: ['docker', 'search', 'tutorial'],
    result: "<p>You found it!</p>",
    tip: "<p>Tip: the format is <code>docker search &lt;string&gt;</code></p>",
        command_tip_box: "docker search tutorial"
  },
  {
    intro: "<h3>Downloading container images</h3>\n<p>Container images can be downloaded just as easily, using <code>docker pull</code>.</p>\n<p>For images from the central index, the name you specify is constructed as &lt;username&gt;/&lt;repository&gt;</p>\n<p>A group of special, trusted images such as the ubuntu base image can be retrieved by just their name &lt;repository&gt;.</p>",
    task: "<h3>Assignment</h3>\n<p>Please download the tutorial image you have just found</p>",
    command_expected: ['docker', 'pull', 'learn'],
    result: "<p>Cool. Look at the results. You'll see that Docker has downloaded a number of layers. In Docker all images (except the base image) are made up of several cumulative layers.</p>",
    tip: "<p>Tip: Don't forget to pull the full name of the repository e.g. 'learn'</p>\n<p>Look under 'show expected command if you're stuck.</p>",
    command_tip_box: "docker pull learn"
  },
  {
    intro: "<h3>Hello world from a container</h3>\n<p>You can think about containers as a process in a box. The box contains everything the process might need, so\nit has the filesystem, system libraries, shell and such, but by default none of it is started or run.<p>\n<p>You 'start' a container <em>by</em> running a process in it. This process is the only process run, so when\nit completes the container is fully stopped.",
    task: "<h3>Assignment</h3>\n<p>Make our freshly loaded container image output \"hello world\"</p>\n<p>To do so you should run 'echo' in the container and have that say \"hello world\"\n",
    command_expected: ['echo "hello world"'],
    command_show: ["docker", "run", "learn/tutorial", 'echo "hello world"'],
    command_tip_box: "echo \"hello world\"",
    result: "<p>Great! Hellooooo World!</p><p>You have just started a container and executed a program inside of it, when\nthe program stopped, so did the container.",
    intermediateresults: [
      function() {
        return "<p>You seem to be almost there. Did you give the command `echo \"hello world\"` ";
      }, function() {
        return "<p>You've got the arguments right. Did you get the command? Try <em>/bin/bash </em>?</p>";
      }
    ],
    tip: "<p>Tip: The command <code>docker run</code> takes a minimum of two arguments. An image name, and the command you want to execute\nwithin that image.</p>\n<p>Check the expected command below if it does not work as expected</p>"
  },
  {
    intro: "<h3>Installing things in the container</h3>\n<p>Next we are going to install a simple program (ping) in the container. The image is based upon ubuntu, so you\ncan run the command <code>apt-get install -y ping</code> in the container. </p>\n<p>Note that even though the container stops right after a command completes, the changes are not forgotten.</p>",
    task: "<h3>Assignment</h3>\n<p>Install 'ping' on top of the learn/tutorial image.</p>",
    command_expected: ["apt-get install -y ping"],
    command_tip_box: "apt-get install -y ping",
    result: "<p>That worked! You have installed a program on top of a base image. Your changes to the filesystem have been\nkept, but are not yet saved.</p>",
    intermediateresults: [
      function() {
        return "<p>Not specifying -y on the apt-get install command will work for ping, because it has no other dependencies, but\nit will fail when apt-get wants to install dependencies. To get into the habit, please add -y after apt-get.</p>";
      }
    ],
    tip: "<p>Tip: Don't forget to use -y for noninteractive mode installation</p>\n<p>Not specifying -y on the apt-get install command will fail for most commands because it expects you to accept\n(y/n) but you cannot respond.\n</p>"
  },
  {
    intro: "<h3>Save your changes</h3>\n<p>After you make changes (by running a command inside a container), you probably want to save those changes.\nThis will enable you to later start from this point onwards.</p>\n<p>With Docker, the process of saving the state is called <em>committing</em>. Commit basically saves the difference\nbetween the old image and the new state. The result is a new layer.</p>",
    task: "<h3>Assignment</h3>\n<p>First use <code>docker ps -l</code> to find the ID of the container you created by installing ping.</p>\n<p>Then save (commit) this container with the repository name 'learn/ping' </p>",
    command_expected: ["docker", "commit"],
    command_show: ["docker", "commit", "698", 'learn/ping'],
    command_tip_box: "docker commit",
    result: "<p>That worked! Please take note that Docker has returned a new ID. This id is the <em>image id</em>.</p>",
    intermediateresults: [
      function() {
        return "You have not specified the correct repository name to commit to (learn/ping). This works, but giving your images a name\nmakes them much easier to work with.";
      }
    ],
    tip: "<ul>\n<li>Giving just <code>docker commit</code> will show you the possible arguments.</li>\n<li>You will need to specify the container to commit by the ID you found</li>\n<li>You don't need to copy (type) the entire ID. Three or four characters are usually enough.</li>\n</ul>"
  },
  {
    intro: "<h3>Run your new image</h3>\n<p>Now you have basically setup a complete, self contained environment with the 'ping' program installed. </p>\n<p>Your image can now be run on any host that runs Docker.</p>\n<p>Lets run this image on this machine.</p>",
    task: "<h3>Assignment</h3>\n<p>Run the ping program to ping www.google.com</p>\n",
    command_expected: ["docker", "run", 'ping'],
    result: "<p>That worked! Note that normally you can use Ctrl-C to disconnect. The container will keep running. This\ncontainer will disconnect automatically.</p>",
    command_tip_box: "docker run ping",
    intermediateresults: [
      function() {
        return "You have not specified a repository name. This is not wrong, but giving your images a name\nmake them much easier to work with.";
      }
    ],
    tip: "<ul>\n<li>Make sure to use the repository name learn/ping to run ping with</li>\n</ul>"
  },
  {
    intro: "<h3>Check your running image</h3>\n<p>You now have a running container. Let's see what is going on.</p>\n<p>Using <code>docker ps</code> we can see a list of all running containers, and using <code>docker inspect</code>\nwe can see all sorts of useful information about this container.</p>",
    task: "<h3>Assignment</h3>\n<p><em>Find the container id</em> of the running container, and then inspect the container using <em>docker inspect</em>.</p>\n",
    command_expected: ["docker", "inspect"],
    command_tip_box: "docker inspect",
    result: "<p>Success! Have a look at the output. You can see the ip-address, status and other information.</p>",
    intermediateresults: [
      function() {
        return "You have not specified a repository name. This is not wrong, but giving your images a name\nmake them much easier to work with.";
      }
    ],
    tip: "<ul>\n<li>Remember you can use a partial match of the image id</li>\n</ul>",
    currentDockerPs: "ID                  IMAGE               COMMAND               CREATED             STATUS              PORTS\nefefdc74a1d5        learn/ping:latest   ping www.google.com   37 seconds ago      Up 36 seconds"
  },
  {
    intro: "<h3>Push your image to the index</h3>\n<p>Now you have verified that your application container works, you can share it.</p>\n<p>Remember you pulled (downloaded) the learn/tutorial image from the index? You can also share your built images\nto the index by pushing (uploading) them to there. That way you can easily retrieve them for re-use and share them\nwith others. </p>",
    task: "<h3>Assignment</h3>\n<p>Push your container image learn/ping to the index</p>\n",
    command_expected: ["docker", "push", "ping"],
    command_show: ["docker", "push", "learn/ping"],
    command_tip_box: "docker push ping",
    result: "",
    intermediateresults: [
      function() {
        var data;

        //$('#instructions .assignment').hide(,        $('#tips, #command').hide(,        $('#instructions .text').html("<div class=\"complete\">\n  <h3>Congratulations!</h3>\n  <p>You have mastered the basic docker commands!</p>\n  <p><strong>Did you enjoy this tutorial? Share it!</strong></p>\n  <p>\n    <a href=\"mailto:?Subject=Check%20out%20the%20Docker%20interactive%20tutorial!&Body=%20https://www.docker.io/gettingstarted/\"><img src=\"/static/img/email.png\"></a>\n    <a href=\"http://www.facebook.com/sharer.php?u=https://www.docker.io/gettingstarted/\"><img src=\"/static/img/facebook.png\"></a>\n    <a href=\"http://twitter.com/share?url=https://www.docker.io/gettingstarted/&text=%20Check+out+the+docker+tutorial!\"><img src=\"/static/img/twitter.png\"></a>\n  </p>\n  <h3>Your next steps</h3>\n  <ol>\n    <li><a href=\"/news_signup/\" target=\"_blank\" >Register</a> for news and updates on Docker (opens in new window)</li>\n    <li><a href=\"http://twitter.com/docker\" target=\"_blank\" >Follow</a> us on twitter (opens in new window)</li>\n    <li><a href=\"#\" onClick=\"leaveFullSizeMode()\">Close</a> this tutorial, and continue with the rest of the getting started.</li>\n  </ol>\n  <p> - Or - </p>\n  <p>Continue to learn about the way to automatically build your containers from a file. </p><p><a href=\"/learn/dockerfile/\" class='btn btn-primary secondary-action-button'>Start Dockerfile tutorial</a></p>\n\n</div>",        data = {
        //  type: EVENT_TYPES.complete
        //};
        //logEvent(data,        
	return "<p>All done!. You are now pushing a container image to the index. You can see that push, just like pull, happens layer by layer.</p>";
      }
    ],
    tip: "<ul>\n<li><code>docker images</code> will show you which images are currently on your host</li>\n<li><code>docker push</code>is the command to push images</li>\n<li>You can only push images to your own namespace, this emulator is logged in as user 'learn'</li>\n\n</ul>",
    finishedCallback: function() {
      //webterm.clear(,      return webterm.echo(myTerminal(),    
    }
  }
	];
});

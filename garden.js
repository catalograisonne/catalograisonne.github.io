        var i = 0;
        var txt = 'all  i  ask  is  for <br> no more artists';


        /* The text */
        var speed = 50; /* The speed/duration of the effect in milliseconds */

        function typeWriter() {
            if (i < txt.length) {
                document.getElementById("p1").innerHTML += txt.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }

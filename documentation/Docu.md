<div id="project-mechanic-tab" class="project-mechanics-tab">
<h1 style="color: #363636; cursor:pointer; padding-bottom:1.5vh;" onclick="button();">How I made this.</h1>
<div id="project-mechanic-info-tab">
    <img src="https://raw.githubusercontent.com/26583/PlaneVoice/master/documentation/GameGIF.gif"/>
    <h2>Een simpele game bouwen</h2>
    <p>Het spel dat je bovenin ziet is gemaakt met de p5.js library. Ik had eerst een vliegtuigje gemaakt die je als een soort flappy bird moet besturen met simpele zwaartekracht.<br>Toen heb ik een terrein gegenereerd met de p5.js Noise() functie, Voor een simpele collisie keek ik of het vliegtuig boven de noise waarde op zijn x positie was.</p>
    <h2>De Multiplayer</h2>
    <p>Voor de multiplayer hebben wij node.js gebruikt.<br>
        Eerst maakte ik verbinding met de server.<br>
        <h3><a target="_blank" href="https://github.com/26583/PlaneVoice/blob/master/server.js">Server.js</a>:</h3>
    </p>
        <img src="https://raw.githubusercontent.com/26583/PlaneVoice/master/documentation/ServerStart.PNG">
    <p>Je hoeft niet echt te weten wat dit doet, het maakt gewoon een socket aan en verbind daarmee.<br>
        Nu moeten wij informatie kunnen doorsturen:
    </p>
    <img src="https://raw.githubusercontent.com/26583/PlaneVoice/master/documentation/SocketOn.PNG">
    <p>In de code hierboven emitten we eerst de world seed naar de clients op de server zodat zij dezelfde wereld hebben. 
        Daarna gebruiken wij socket.on() met deze functie kan je luisteren naar de clients die bijv hun positie doorgeven, die informatie sturen wij door naar de functies daarvoor.<br>
        Laten we kijken naar de functie voor positie:</p>
    <img src="https://raw.githubusercontent.com/26583/PlaneVoice/master/documentation/PosFuntie.PNG">
    <p>Een simpele functie die de positie van de ene player naar de andere doorstuurd.<br>
        Zo worden eigenlijk alle andere multiplayer functies gedaan zoals dood gaan, winnen, snelheid etc.</p>
    <p>Om informatie doortesturen en ontvangen aan de cient side moet je dit doen.<br>
        <h3><a target="_blank" href="https://github.com/26583/PlaneVoice/blob/master/public/sketch.js">Sketch.js</a>:</h3>
        
    </div>
   </div>

<?php
    $title = "Uranus | SolarSim";
    $desc = "Uranus is the sixth planet in the solar system. SolarSim is a free, 3D solar system simulator for younger learners to explore and learn from.";
    include ("header.php");
?>
	<div class="info-container">
		<h1>Uranus</h1>
		<p>Uranus is the seventh planet in the solar system and named after the Roman god of the skies. Like Jupiter and Saturn, Uranus is a gas
		giant, meaning its mass is largely made up of gaseous elements.</p>
		<button id="zoom">Zoom</button>
	</div>
        <script src="js/threex.planets.min.js"></script>
        <script src="js/uranus.js"></script>
<?php require ("footer.php"); ?>
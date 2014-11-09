<?php
    $title = "Saturn | SolarSim";
    $desc = "Saturn is the sixth planet in the solar system. SolarSim is a free, 3D solar system simulator for younger learners to explore and learn from.";
    include ("header.php");
?>
	<div class="info-container">
		<h1>Saturn</h1>
		<p>Saturn is the sixth planet in the solar system and named after the Roman god of time. It is surrounded by prominent rings of rock
		and stone which some scientists believe are the remains of an old moon.</p>
		<button id="zoom">Zoom</button>
	</div>
        <script src="js/threex.planets.min.js"></script>
        <script src="js/saturn.js"></script>
<?php require ("footer.php"); ?>
<?php
    $title = "Neptune | SolarSim";
    $desc = "Neptune is the seventh planet in the solar system. SolarSim is a free, 3D solar system simulator for younger learners to explore and learn from.";
    include ("header.php");
?>
	<div class="info-container">
		<h1>Neptune</h1>
		<p>Neptune is the eighth and last planet in our solar system, named after the Roman god of the sea and waters. </p>
		<button id="zoom">Zoom</button>
	</div>
        <script src="js/threex.planets.min.js"></script>
        <script src="js/neptune.js"></script>
<?php require ("footer.php"); ?>
<?php
    $title = "Earth | SolarSim";
    $desc = "Earth is our planet! SolarSim is a free, 3D solar system simulator for younger learners to explore and learn from.";
    include ("header.php");
?>
	<div class="info-container">
		<h1>Earth</h1>
		<p>The Earth is the third planet in our solar system and the only known planet to support life! Its surface is 70% water, with
		the rest made up of rocky or soil-based materials.</p>
		<button id="zoom">Zoom</button>
	</div>
		<script id="vertexShader" type="x-shader/x-vertex">
			uniform vec3 viewVector;
			uniform float c;
			uniform float p;
			varying float intensity;
			
			void main(){
    			vec3 vNormal = normalize( normalMatrix * normal );
				vec3 vNormel = normalize( normalMatrix * viewVector );
				intensity = pow( c - dot(vNormal, vNormel), p );
	
    			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}
		</script>

		<script id="fragmentShader" type="x-shader/x-fragment"> 
			uniform vec3 glowColor;
			varying float intensity;

		void main(){
			vec3 glow = glowColor * intensity;
    		gl_FragColor = vec4( glow, 1.0 );
		}
		</script>
        <script src="js/earth.js"></script>

<?php require ("footer.php"); ?>
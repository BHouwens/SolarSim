<?php
    $title = "Sun | SolarSim";
    $desc = "The Sun is the star of the solar system. SolarSim is a free, 3D solar system simulator for younger learners to explore and learn from.";
    include ("header.php");
?>
		<div class="info-container">
			<h1>Sun</h1>
			<p>The Sun sits at the centre of our solar system and is a star. All the planets orbit around it and it provides us with heat, warmth and 
			energy. Even though it's so large, our Sun is considered to be only a medium sized star when compared with others in the galaxy.</p>
			<button id="zoom">Zoom</button>
		</div>
        <div id="container"></div>
        <script src="js/postprocessing/postProcess.min.js"></script>
        <script id="fragmentShader" type="x-shader/x-fragment">

			uniform float time;
			uniform vec2 resolution;

			uniform float fogDensity;
			uniform vec3 fogColor;

			uniform sampler2D texture1;
			uniform sampler2D texture2;

			varying vec2 vUv;

			void main( void ) {

				vec2 position = -1.0 + 2.0 * vUv;

				vec4 noise = texture2D( texture1, vUv );
				vec2 T1 = vUv + vec2( 1.5, -1.5 ) * time  *0.02;
				vec2 T2 = vUv + vec2( -0.5, 2.0 ) * time * 0.01;

				T1.x += noise.x * 2.0;
				T1.y += noise.y * 2.0;
				T2.x -= noise.y * 0.2;
				T2.y += noise.z * 0.2;

				float p = texture2D( texture1, T1 * 2.0 ).a;

				vec4 color = texture2D( texture2, T2 * 2.0 );
				vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );

				if( temp.r > 1.0 ){ temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
				if( temp.g > 1.0 ){ temp.rb += temp.g - 1.0; }
				if( temp.b > 1.0 ){ temp.rg += temp.b - 1.0; }

				gl_FragColor = temp;

				float depth = gl_FragCoord.z / gl_FragCoord.w;
				const float LOG2 = 1.442695;
				float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
				fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

				gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

			}

		</script>

		<script id="vertexShader" type="x-shader/x-vertex">

			uniform vec2 uvScale;
			varying vec2 vUv;

			void main()
			{

				vUv = uvScale * uv;
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_Position = projectionMatrix * mvPosition;

			}

		</script>

        <script src="js/sun.js"></script>
<?php require ("footer.php"); ?>
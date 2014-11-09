var container, controls, camera, renderer, scene, light,
            rotationSpeed = 0.06,
            clock = new THREE.Clock(),
            WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
            
//cam vars
var angle = 45,
      aspect = WIDTH / HEIGHT,
      near = 0.1,
      far = 10000;

//mesh vars
var uranusMesh, ringsMesh, zoomed = false;

    //custom UV mapping for ring geometry -- thanks to jerome etienne for this block
        var customRingGeometry = function ( innerRadius, outerRadius, thetaSegments ) {

	       THREE.Geometry.call( this );

	       innerRadius	= innerRadius || 0;
	       outerRadius	= outerRadius || 50;
	       thetaSegments	= thetaSegments	|| 8;

	       var normal	= new THREE.Vector3( 0, 0, 1 );

	       for(var i = 0; i < thetaSegments; i++ ){
		          var angleLo	= (i / thetaSegments) *Math.PI*2;
		          var angleHi	= ((i+1) / thetaSegments) *Math.PI*2;

		          var vertex1	= new THREE.Vector3(innerRadius * Math.cos(angleLo), innerRadius * Math.sin(angleLo), 0);
		          var vertex2	= new THREE.Vector3(outerRadius * Math.cos(angleLo), outerRadius * Math.sin(angleLo), 0);
		          var vertex3	= new THREE.Vector3(innerRadius * Math.cos(angleHi), innerRadius * Math.sin(angleHi), 0);
		          var vertex4	= new THREE.Vector3(outerRadius * Math.cos(angleHi), outerRadius * Math.sin(angleHi), 0);

		          this.vertices.push( vertex1 );
		          this.vertices.push( vertex2 );
		          this.vertices.push( vertex3 );
		          this.vertices.push( vertex4 );


		          var vertexIdx	= i * 4;

		          // Create the first triangle
		          var face = new THREE.Face3(vertexIdx + 0, vertexIdx + 1, vertexIdx + 2, normal);
		          var uvs = [];

		          var uv = new THREE.Vector2(0, 0);
		          uvs.push(uv);
		          var uv = new THREE.Vector2(1, 0);
		          uvs.push(uv);
		          var uv = new THREE.Vector2(0, 1);
		          uvs.push(uv);

		          this.faces.push(face);
		          this.faceVertexUvs[0].push(uvs);

		          // Create the second triangle
		          var face = new THREE.Face3(vertexIdx + 2, vertexIdx + 1, vertexIdx + 3, normal);
		          var uvs = [];

		          var uv = new THREE.Vector2(0, 1);
		          uvs.push(uv);
		          var uv = new THREE.Vector2(1, 0);
		          uvs.push(uv);
		          var uv = new THREE.Vector2(1, 1);
		          uvs.push(uv);

		          this.faces.push(face);
		          this.faceVertexUvs[0].push(uvs);
	           }

	           this.computeCentroids();
	           this.computeFaceNormals();

	           this.boundingSphere = new THREE.Sphere( new THREE.Vector3(), outerRadius );

        };//customRing Geometry end

            customRingGeometry.prototype = Object.create( THREE.Geometry.prototype );

            
            init();
            animate();
            
            function init(){
                
                container = document.createElement('div');
                document.body.appendChild(container);
                
                //cam
                camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
                camera.position.set(1380, -17, 394);
                
                //scene
                scene = new THREE.Scene();
                camera.lookAt(scene.position);
            
                //light          
                light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
                light.position.set(4000, 4000, 1500);
                light.target.position.set (1000, 3800, 1000);
                light.castShadow = true;
                light.shadowDarkness= 0.5;
                light.shadowCameraNear = 1;
                light.shadowCameraFar = 10000;
                light.shadowCameraFov = 50;

                light.shadowMapWidth = 2048;
                light.shadowMapHeight = 1024;
                
                light.shadowCameraVisible = true;

                scene.add(light);
                
                solarSetUp();
                
                //renderer
                renderer = new THREE.WebGLRenderer({antialiasing : true});
                renderer.setSize(WIDTH, HEIGHT);
                renderer.domElement.style.position = 'relative';
                
                container.appendChild(renderer.domElement);
                renderer.autoClear = false;
                renderer.shadowMapEnabled = true;
                renderer.shadowMapType = THREE.PCFShadowMap;
                
                window.addEventListener('resize', onWindowResize, false);
                $("#zoom").on('click', function(){
                  if (zoomed == false){
                    zoomed = true;
                    $('.info-container').animate({'opacity': 0}, 400);
                  }
                });

                //controls
                controls = new THREE.OrbitControls( camera, renderer.domElement);
                controls.addEventListener( 'change', render );
            }
            
            function solarSetUp(){
                //uranusURN
                var uranusGeo = new THREE.SphereGeometry(200, 400, 400),
                uranusMat = new THREE.MeshPhongMaterial();
                uranusMesh = new THREE.Mesh(uranusGeo, uranusMat);
                
                uranusMesh.position.set(0, 0, 0);
                uranusMesh.receiveShadow = true;
                uranusMesh.castShadow = true;
                scene.add(uranusMesh);
                
               uranusMat.map = THREE.ImageUtils.loadTexture('images/uranusmap.jpg');
                
               //uranusURN RINGS
               var ringsGeo = new customRingGeometry(300, 400, 100),
                     ringsMat = new THREE.MeshPhongMaterial({
                         map: THREE.ImageUtils.loadTexture('images/uranusringcolour.png'),
                         side: THREE.DoubleSide,
                         transparent: true,
                         opacity:0.6
                     });
                ringsMesh = new THREE.Mesh(ringsGeo, ringsMat);
                ringsMesh.rotation.x = 17;//11
                ringsMesh.rotation.y = 180;
                ringsMesh.rotation.z = 180;
                ringsMesh.receiveShadow= true;
                ringsMesh.castShadow= true;
                
               
                uranusMesh.add(ringsMesh);
                
                //STARS
                var starGeo = new THREE.SphereGeometry (3000, 10, 100),
                      starMat = new THREE.MeshBasicMaterial();
                starMat.map = THREE.ImageUtils.loadTexture('images/Star-field-5.JPG');
                starMat.side = THREE.BackSide;
                
                var starMesh = new THREE.Mesh(starGeo, starMat);
                scene.add(starMesh);
                
            }
            
            function animate(){
                
                requestAnimationFrame(animate);
                controls.update();
                render();
                
            }

            function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
            
             function render(){
                var delta = clock.getDelta();
                if (camera.position.x > 800){
                    if (zoomed){
                        camera.position.x -= 3;
                    }
                }

				uranusMesh.rotation.y += rotationSpeed * delta;
                renderer.clear();
                renderer.render(scene, camera);
                 
            }








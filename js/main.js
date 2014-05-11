var container, controls, camera, renderer, scene, light,
            rotationSpeed = 0.02,
            clock = new THREE.Clock(),
            WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
            
//cam vars
var angle = 45,
      aspect = WIDTH / HEIGHT,
      near = 0.1,
      far = 10000;

//mesh vars
var earthMesh, cloudMesh, moonMesh;

//orbit vars
var parent, pivot;

var mercButton = document.getElementById('mercury'),
      earthButton = document.getElementById('earth');

            
            init();
            animate();
            
            function init(){
                
                container = document.createElement('div');
                document.body.appendChild(container);
                
                //cam
                camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
                camera.position.set(1380, -17, 394);
                
                //controls
                controls = new THREE.OrbitControls( camera );
                controls.addEventListener( 'change', render );
                
                //scene
                scene = new THREE.Scene();
                 
                //pivots
                parent = new THREE.Object3D();
                scene.add(parent);
                
                pivot = new THREE.Object3D();
                pivot.rotation.z = 2 * Math.PI / 3;
                parent.add(pivot);
                
                
            
                //light          
                light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
                light.position.set(4000, 4000, 1500);
                light.target.position.set (1000, 3800, 1000);
                light.castShadow = true;
                light.shadowCameraNear = 1;
                light.shadowCameraFar = 10000;
                light.shadowCameraFov = 50;

                light.shadowMapWidth = 2048;
                light.shadowMapHeight = 1024;

                scene.add(light);
                
                solarSetUp();
                
                pivot.add(moonMesh); 
                camera.lookAt( earthMesh.position );
                
                //renderer
                renderer = new THREE.WebGLRenderer({antialiasing : true});
                renderer.setSize(WIDTH, HEIGHT);
                renderer.domElement.style.position = 'relative';
                
                container.appendChild(renderer.domElement);
                renderer.autoClear = false;
                renderer.shadowMapEnabled = true;
                renderer.shadowMapType = THREE.PCFShadowMap;
                
                window.addEventListener('resize', onWindowResize, false); 
            }
            
            function solarSetUp(){
                
                //EARTH
                var earthGeo = new THREE.SphereGeometry (200, 400, 400),
                      earthMat = new THREE.MeshPhongMaterial();
                earthMesh = new THREE.Mesh(earthGeo, earthMat);
                
                earthMesh.position.set(0, 0, 0);
                earthMesh.rotation.y=5;
                scene.add(earthMesh);
                
               //diffuse
               earthMat.map = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
               //bump
               earthMat.bumpMap = THREE.ImageUtils.loadTexture('images/elev_bump_16ka.jpg');
               earthMat.bumpScale = 8;
               //specular
               earthMat.specularMap = THREE.ImageUtils.loadTexture('images/earthspec1k.jpg');
               earthMat.specular = new THREE.Color('#2e2e2e');
               
               earthMesh.castShadow = false;
               earthMesh.receiveShadow = true;
                
               //cloudMap attempt
               var cloudGeo = new THREE.SphereGeometry (202, 200, 200),
                     cloudMat = new THREE.MeshPhongMaterial({
                        map: new THREE.ImageUtils.loadTexture('images/original.png'),
                        side: THREE.DoubleSide,
                        opacity: 0.5,
                        transparent:true,
                        depthWrite:false,
                     });
               cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
                
               earthMesh.add(cloudMesh);
               cloudMesh.castShadow = true;
               cloudMesh.receiveShadow = true;
                
                
                //MOON
                var moonGeo = new THREE.SphereGeometry(50, 50, 50),
                      moonMat = new THREE.MeshPhongMaterial();
                moonMesh = new THREE.Mesh(moonGeo, moonMat);
                
                moonMesh.position.set(220, 200, 240);
                scene.add(moonMesh);
                
                moonMat.map = THREE.ImageUtils.loadTexture('images/moonmap1k.jpg');
                moonMat.bumpMap = THREE.ImageUtils.loadTexture('images/moonbump1k.jpg');
                moonMat.bumpScale = 0.5;
                moonMesh.castShadow = true;
                moonMesh.receiveShadow = true;
                
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
                parent.rotation.y += 0.001;
                controls.update();
                render();
                
            }

            function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
                composer.reset();
			}
            
             function render(){
                var delta = clock.getDelta();

				earthMesh.rotation.y += rotationSpeed * delta;
				cloudMesh.rotation.y += 1.25 * rotationSpeed * delta;
				moonMesh.rotation.y += rotationSpeed * delta;
                renderer.clear();
                renderer.render(scene, camera); 
            }



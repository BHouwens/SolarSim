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
var marsMesh, zoomed = false;
            
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
                light.shadowCameraNear = 1200;
                light.shadowCameraFar = 2500;
                light.shadowCameraFov = 50;

                light.shadowMapWidth = 2048;
                light.shadowMapHeight = 1024;

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
                //MARS
                var marsGeo = new THREE.SphereGeometry(200, 400, 400),
                marsMat = new THREE.MeshPhongMaterial();
                marsMesh = new THREE.Mesh(marsGeo, marsMat);
                
                marsMesh.position.set(0, 0, 0);
                scene.add(marsMesh);
                
               marsMat.map = THREE.ImageUtils.loadTexture('images/mars_1k_color.jpg');
               marsMat.bumpMap = THREE.ImageUtils.loadTexture('images/Mars_Bumpa.jpg');
               marsMat.bumpScale = 8;
                
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
                if (camera.position.x > 800){
                    if (zoomed){
                        camera.position.x -= 3;
                    }
                }
                
                var delta = clock.getDelta();

				marsMesh.rotation.y += rotationSpeed * delta;
                renderer.clear();
                renderer.render(scene, camera);
                 
            }



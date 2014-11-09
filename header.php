<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta charset="utf-8">
        <title><?php echo ($title)?></title>
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.5, maximum-scale=1.5">
        <meta name="description" content=<?php echo ($desc) ?>>
        <script src="js/vendor/jquery.min.js"></script>
        <script>
            $(window).load(function(){
                $('#preloader').hide(1000);
            });
        </script>
        <script src="js/vendor/three.min.js"></script>
        <script src="js/vendor/orbitcontrols.min.js"></script>
        <link rel="stylesheet" href="stylesheets/main.css">
        <link rel="shortcut icon" type="image/x-icon" href="images/favicon.ico" />
    </head>
    <body>
    
        <div id="preloader">
            <p>Loading...</p>    
        </div>


        <div class="container">
            <nav>
                <ul id="main">
                    <li>
                    <a href="sun.php" id="sun">
                        <img src="images/trans.gif" alt="sun" title="sun"/>
                        <p>sun</p>
                    </a></li>
                    <li>
                    <a href="mercury.php" id="mercury">
                        <img src="images/trans.gif" alt="mercury" title="mercury" />
                        <p>mercury</p>
                    </a></li>
                    <li><a href="venus.php" id="venus">
                        <img src="images/trans.gif" alt="venus" title="venus" />
                        <p>venus</p>
                    </a></li>
                    <li><a href="earth.php" id="earth">
                        <img src="images/trans.gif" alt="earth" title="earth" />
                        <p>earth</p>
                    </a></li>
                    <li><a href="mars.php" id="mars">
                        <img src="images/trans.gif" alt="mars" title="mars" />
                        <p>mars</p>
                    </a></li>
                    <li><a href="jupiter.php" id="jupiter">
                        <img src="images/trans.gif" alt="jupiter" title="jupiter" />
                        <p>jupiter</p>
                    </a></li>
                    <li><a href="saturn.php" id="saturn">
                        <img src="images/trans.gif" alt="saturn" title="saturn" />
                        <p>saturn</p>
                    </a></li>
                    <li><a href="uranus.php" id="uranus">
                        <img src="images/trans.gif" alt="uranus" title="uranus" />
                        <p>uranus</p>
                    </a></li>
                    <li><a href="neptune.php" id="neptune">
                        <img src="images/trans.gif" alt="neptune" title="neptune" />
                        <p>neptune</p>
                    </a></li>
                </ul>
            </nav>
        </div>
<!DOCTYPE html>
<html lang="ru" >
<head>
	<title>BuhOne</title>

	<meta charset="UTF-8">
	<meta name="keywords" content="" />
  <meta name="description" content="" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="theme-color" content="#005FA3" />
	
	<link rel="stylesheet" href="/dist/css/vendor.min.css?nocache=<?=rand()?>" />
  <link rel="stylesheet" href="/dist/css/app.min.css?nocache=<?=rand()?>" />

  <meta property="og:url" content="<?php /* http://domain.com/path/to/page/ */ ?>" />
  <meta property="og:site_name" content="<?php /* Site name */ ?>" />
  <meta property="og:title" content="<?php /* title */ ?>" />
  <meta property="og:description" content="<?php /* description */ ?>" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="<?php /* http://domain.com/path/to/image.png */ ?>" />

  <link rel="apple-touch-icon" href="/img/icons/icon57.png" />
  <link rel="apple-touch-icon" sizes="57x57" href="/img/icons/icon57.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="/img/icons/icon72.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="/img/icons/icon114.png" />
  <link rel="apple-touch-icon" sizes="120x120" href="/img/icons/icon120.png">
  <link rel="apple-touch-icon" sizes="152x152" href="/img/icons/icon152.png">
  <link rel="shortcut icon" type="image/png" href="/img/icons/icon16.png"/>
</head>
<body>
	<div style="display:none;">
  	<?php require(DOCUMENT_ROOT . '/dist/include/svgs.php'); ?>
  </div>
	<div class="global-layout">
		<div class="global-layout__content">
			<div class="wrapper">
				<header class="is-header">
					<div class="is-header__container">
						<div class="is-header__left">
							<a href="/" class="main-logo is-link">
								<svg width="40" height="40" class="main-logo__icon">
	                <use xlink:href="#main-logo"></use>
	              </svg>
								<span class="main-logo__text">BuhOne</span>
							</a>
						</div>
						<div class="is-header__main" id="mobile-menu">
							<div class="is-header__main-inner">
								<div class="header-top-line">
									<div class="header-top-line__item">
										<a href="tel:81112223344" class="i-item is-link">
											<svg width="10" height="17" class="i-item__icon">
				                <use xlink:href="#phone" class="a-icon"></use>
				              </svg>
											<span class="i-item__text">8 (111) 222-33-44</span>
										</a>
									</div>
									<div class="header-top-line__item">
										<div class="i-item">
											<svg width="17" height="17" class="i-item__icon">
				                <use xlink:href="#clock" class="a-icon"></use>
				              </svg>
				              <span class="i-item__text">Пн-Пт 10:00-18:00</span>
										</div>
									</div>
									<div class="header-top-line__item">
										<a href="mailto:order@buhone.ru" class="i-item is-link">
											<svg width="23" height="17" class="i-item__icon">
				                <use xlink:href="#mail" class="a-icon"></use>
				              </svg>
											<span class="i-item__text">order@buhone.ru</span>
										</a>
									</div>
									<div class="header-top-line__item">
										<div class="i-item">
											<svg width="17" height="17" class="i-item__icon">
				                <use xlink:href="#pointer" class="a-icon"></use>
				              </svg>
											<span class="i-item__text">Невский пр. 130</span>
										</div>
									</div>
								</div>
								<nav class="header-nav">
									<ul class="header-nav__list reset">
										<li class="header-nav__item"><a href="#" class="is-link header-nav__link">Главная</a></li>
										<li class="header-nav__item"><a href="#" class="is-link header-nav__link">Услуги</a></li>
										<li class="header-nav__item"><a href="#" class="is-link header-nav__link">Кейсы</a></li>
										<li class="header-nav__item"><a href="#" class="is-link header-nav__link">О компании</a></li>
										<li class="header-nav__item"><a href="#" class="is-link header-nav__link">Контакты</a></li>
									</ul>
								</nav>
							</div>
						</div>
						<div class="is-header__right hidden-1000-up">
							<button class="is-button is-button--hamburger" type="button" data-gclick="toggle-mobile-menu">
								<span class="hamburger">
									<span class="line line-1"></span>
									<span class="line line-2"></span>
									<span class="line line-3"></span>
								</span>
							</button>
						</div>
					</div>
				</header>
			</div>

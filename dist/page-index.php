<?php
	define ('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT']);
?>
<?php
	require(DOCUMENT_ROOT . '/dist/include/header.php');
?>
<main class="page-index">
	<section class="page-index__hero">
		<div class="hero-slider" data-is="hero-slider">
			<div class="swiper">
				<div class="swiper-wrapper">
					<div class="swiper-slide hero-slider__slide" data-img="/img/tpl_01.jpg">
						<div class="wrapper">
							<div class="b-content">
								<h2 class="b-content__heading">Бухгалтерские услуги в Санкт-Петербурге</h2>
								<div class="b-content__btn-wrapper">
									<a href="#" class="is-button is-button--primary">
										<span class="is-button__text">Наша презентация</span>
									</a>
								</div>
							</div>
						</div>
					</div>
					<div class="swiper-slide hero-slider__slide" data-img="/img/tpl_02.jpg"></div>
					<div class="swiper-slide hero-slider__slide" data-img="/img/tpl_03.jpg"></div>
					<div class="swiper-slide hero-slider__slide" data-img="/img/tpl_04.jpg"></div>
				</div>
				<div class="hero-slider__controls wrapper">
					<div class="swiper-pagination hero-slider__bullets"></div>
					<div class="hero-slider__arrows">
						<button type="button" class="is-button is-arrow is-arrow--prev">
							<svg width="9" height="15">
                <use xlink:href="#arrow"></use>
              </svg>
						</button>
						<button type="button" class="is-button is-arrow is-arrow--next">
							<svg width="9" height="15">
                <use xlink:href="#arrow"></use>
              </svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="page-index__contact-us section-contact" data-img="/img/tpl_05.jpg">
		<div class="wrapper">
			<div class="is-columns is-columns--md">
				<div class="is-columns__col">
					<h2 class="section-heading section-contact__heading">Связь с нами</h2>
					<p class="paragraph section-contact__desc">У вас остались вопросы? Напишите нам - мы ответим в ближайшее время!</p>
					<div class="section-contact__items">
						<a href="tel:81112223344" class="i-item is-link section-contact__item">
							<svg width="20" height="30" class="i-item__icon">
                <use xlink:href="#phone" class="b-icon"></use>
              </svg>
							<span class="i-item__text i-item__text--md">8 (111) 222-33-44</span>
						</a>
						<a href="mailto:order@buhone.ru" class="i-item is-link section-contact__item">
							<svg width="40" height="30" class="i-item__icon">
                <use xlink:href="#mail" class="b-icon"></use>
              </svg>
							<span class="i-item__text i-item__text--md">order@buhone.ru</span>
						</a>
					</div>
				</div>
				<div class="is-columns__col">
					<div data-is="form-validation">
						<form action="/dist/actions/contact-form.php" class="is-form section-contact__form">
							<div class="is-form__row">
								<div class="is-columns is-columns--sm">
									<div class="is-columns__col">
										<div class="is-form__field is-form-field">
				              <label class="is-form__field-box">
				              	<span class="is-form__label">Имя</span>
				                <input name="NAME" 
				                			 type="text" 
				                			 placeholder="Иван" 
				                			 class="is-input is-input--theme" 
				                			 data-validation='<?=json_encode(array(
																	                  "mask"=>"text",
																	                  "require"=>true,
																	                  "visible"=>true,
																	                  "error"=>"Обязательное поле"
																	                ))?>'>
				              </label>
				            </div>
									</div>
									<div class="is-columns__col">
										<div class="is-form__field is-form-field">
				              <label class="is-form__field-box">
				              	<span class="is-form__label">Фамилия</span>
				                <input name="FAMILY" 
				                			 type="text" 
				                			 placeholder="Иванов" 
				                			 class="is-input is-input--theme" 
				                			 data-validation='<?=json_encode(array(
																	                  "mask"=>"text",
																	                  "require"=>true,
																	                  "visible"=>true,
																	                  "error"=>"Обязательное поле"
																	                ))?>'>
				              </label>
				            </div>
									</div>
								</div>
							</div>
							<div class="is-form__row">
								<div class="is-form__field is-form-field">
		              <label class="is-form__field-box">
		              	<span class="is-form__label">Сообщение</span>
		                <textarea name="MESSAGE" 
		                				  placeholder="Ваше сообщение" 
		                				  class="is-textarea is-textarea--theme" 
		                				  data-validation='<?=json_encode(array(
																	                  "mask"=>"text",
																	                  "require"=>true,
																	                  "visible"=>true,
																	                  "error"=>"Обязательное поле"
																	                ))?>'></textarea>
		              </label>
		            </div>
							</div>
							<div class="is-form__btn-row">
								<button type="submit" class="is-button is-button--primary js-form-submit">
									<span class="is-button__text">Отправить сообщение</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
<?php
	require(DOCUMENT_ROOT . '/dist/include/footer.php');
?>
		
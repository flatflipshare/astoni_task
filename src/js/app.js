const conf = {
  'xhrStatus': false,
  'nodeBody': $('body'),
  'nodeDoc': $(document)
};

const globalApp = {
  'init': function() {
    this.globalEventsInit();
    this.executeModules();
    this.lazyImages();
  },
  'executeModules': function($parent) {
    $parent = $parent || conf.nodeBody;
    var $mods = $parent.find('[data-is]');
    $mods.each(function(i, thisModule) {
      var $thisModule = $(thisModule);
      var thisModuleName = $thisModule.attr('data-is');
      if ($thisModule.closest('.hidden-content').length) {
        console.log(`%cSkip: '${thisModuleName}' - module hidden.`, 'color:#444;');
        return true;
      }
      if (moduleApp[thisModuleName]) {
        console.log(`%cRun: '${thisModuleName}' - module executed.`, 'color:#009900;');
        moduleApp[thisModuleName]($thisModule);
      } else {
        console.log(`%cError: '${thisModuleName}' - module not defined.`, 'color:#ff6347;');
      }
    });
  },
  'globalEventsInit': function() {
    conf.nodeDoc.on('click', '[data-gclick]', function(e) {
      e.preventDefault();
      var $this = $(this);
      var thisAction = $this.attr('data-gclick');
      var thisValue = $this.val() || $this.data().value;
      if (globalApp.globalEventsActions[thisAction]) {
        globalApp.globalEventsActions[thisAction]($this, thisValue);
      } else {
        console.log(`Event: 'data-gclick', Action: '${thisAction}' - not defined.`);
      }
    });
  },
  'globalEventsActions': {
    'toggle-mobile-menu': function($this) {
      const $burger = $this.find('.hamburger');
      const $menu = conf.nodeDoc.find('#mobile-menu');

      $burger.toggleClass('active');
      $menu.toggleClass('active');
      conf.nodeBody.toggleClass('lock-body');
    },
    'close-modal': function($this) {
      $.emit('on:modalClose');
    }
  },
  lazyImages(img) {
    if (!img) {
      img = document.querySelectorAll('[data-img]');
    }

    const lazyLoadBackground = (element) => {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          entry.target.classList.add('fade-image');
          if (entry.isIntersecting) {
            const item = entry.target;
            const backgroundImage = item.getAttribute('data-img');
            item.style.backgroundImage = `url(${backgroundImage})`;
            item.classList.add('loaded');
            observer.unobserve(item);
          }
        });
      });

      observer.observe(element);

    }
    img.forEach((el) => {
      lazyLoadBackground(el);
    });
  }
};

const moduleApp = {
  'hero-slider': function($thisModule) {
    const $swiperContainer = $thisModule.find('.swiper');
    const $bulletsContainer = $swiperContainer.find('.swiper-pagination');
    const $nextArrow = $swiperContainer.find('.is-arrow.is-arrow--next');
    const $prevArrow = $swiperContainer.find('.is-arrow.is-arrow--prev');

    let swiperParams = {
      speed: 1000,
      effect: 'fade',
      loop: true,
      allowTouchMove: true,
      fadeEffect: {
        crossFade: true
      },
      pagination: {
        el: $bulletsContainer,
        clickable: true
      },
      navigation: {
        nextEl: $nextArrow,
        prevEl: $prevArrow
      }
    };

    const thisSwiper = new Swiper($swiperContainer, swiperParams);
  },
  'is-modal': function($thisModule) {
    const params = {
      'classes': {
        'bodyClass': 'is-modal__body',
        'activeClass': 'is-modal--active'
      }
    };
    const $modalBody = $thisModule.find('.' + params.classes.bodyClass);
    $.onEmit && $.onEmit('on:modalOpen', data => {
      if(data && data.title && data.msg) {
        const tpl = `<h3>${data.title}</h3><p class="paragraph">${data.msg}</p>`;
        $modalBody.html($(tpl));
        $thisModule.addClass(params.classes.activeClass);
      }
    });
    $.onEmit && $.onEmit('on:modalClose', () => {
      $thisModule.removeClass(params.classes.activeClass);
      $modalBody.empty();
    });
  },
  'form-validation': function($thisModule, thisCallback) {

    thisCallback = thisCallback || false;

    var params = {
      'fields': {
        'attr': 'validation',
        'parentClass': 'is-form-field',
        'parentErrorState': 'state-error',
        'errorNode': 'ff-error-parent',
        'formFocusClass': 'state-focus',
        'formHasValueClass': 'state-has-value',
        'fromInitedClass': 'state-inited',
        'fieldInitidClass': '_field-inited',
        'initialNodes': $(null)
      },
      'form': {
        'moduleParent': $thisModule,
        'parent': $thisModule.find('form'),
        'submitLinkClass': 'js-form-submit',
        'validFormClass': 'form-state-valid',
        'invalidFormClass': 'form-state-invalid',
        'progressFormClass': 'form-state-progress',
        'progressButtonClass': 'button-state-progress'
      },
      'inner': {
        'submitCallback': thisCallback,
        'realTimeCheck': false,
        'defaultFieldData': {
          'mask': 'none',
          'require': true,
          'visible': true,
          'error': ''
        }
      }
    };

    var methods = {
      'init': function() {
        methods.initFields();
        methods.initEvents();
        methods.initFieldsMarkup();
        methods.initFormStatus();
      },
      'initFields': function() {
        params.fields.initialNodes = params.form.parent.find('[data-' + params.fields.attr + ']');
      },
      'initEvents': function() {
        params.form.parent.on('submit', methods.eventFormSubmit);
        params.form.parent.find('.' + params.form.submitLinkClass).on('click', methods.eventSubmitLinkClick);
        $thisModule.on('keypress input change', '[data-' + params.fields.attr + ']', methods.eventChangeFields);
        $thisModule.on('keydown', '[data-' + params.fields.attr + ']', methods.eventFormSubmitEnter);
        $thisModule.on('focus', '[data-' + params.fields.attr + ']', methods.eventFocusEnter);
        $thisModule.on('blur', '[data-' + params.fields.attr + ']', methods.eventFocusLeave);
      },
      'initFieldsMarkup': function() {
        params.form.parent.find('[data-' + params.fields.attr + ']:not(.' + params.fields.fieldInitidClass + ')').each(function(i, thisField) {
          var $thisField = $(thisField);
          var thisFieldDataRaw = $thisField.data()[params.fields.attr];
          var thisFieldData = $.extend({}, params.inner.defaultFieldData, thisFieldDataRaw);

          // error message
          if (thisFieldData.error) {
            $thisField.closest('.' + params.fields.parentClass).append('<div class="' + params.fields.errorNode + '">' + thisFieldData.error + '</div>');
          }

          $thisField.addClass(params.fields.fieldInitidClass);
          $thisField.closest('.' + params.fields.parentClass).addClass(params.fields.fromInitedClass);
        });
      },
      'initFormStatus': function() {
        if (methods.checkingFieldsAll(params.fields.initialNodes, true)) {
          params.form.moduleParent.addClass(params.form.validFormClass);
          params.form.moduleParent.removeClass(params.form.invalidFormClass);
        } else {
          params.form.moduleParent.removeClass(params.form.validFormClass);
          params.form.moduleParent.addClass(params.form.invalidFormClass);
        }
      },
      'eventFormSubmitEnter': function(e) {
        if (e.keyCode == 13) {
          methods.eventFormSubmit();
          return false;
        }
        return true;
      },
      'eventFormSubmit': function() {
        methods.initFields();
        methods.initFieldsMarkup();
        methods.initFormStatus();

        // if form in progress
        if (params.form.moduleParent.hasClass(params.form.progressFormClass)) {
          return false;
        }

        // enable real time checking
        params.inner.realTimeCheck = true;

        // return state - is a error state
        // if `FALSE` - fields has error and submit is prevent
        // if `TRUE` - no error and form going submit
        var returnState = methods.checkingFieldsAll(params.fields.initialNodes);

        // if fields valid then add progress state to form

        if (returnState == true) {
          params.form.moduleParent.addClass(params.form.progressFormClass);
          $('.' + params.form.submitLinkClass).addClass(params.form.progressButtonClass);
        }

        // if submit callback
        if (returnState && params.inner.submitCallback) {
          params.inner.submitCallback();
          return false;
        }

        return returnState;
      },
      'eventSubmitLinkClick': function(e) {
        e.preventDefault();

        params.inner.submitCallback = function() {
          var formData = new FormData(params.form.parent[0]);

          $.ajax({
            url: params.form.parent.attr('action'),
            method: 'post',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(result) {
              console.log(result.data)

              params.form.parent[0].reset();
              params.form.moduleParent.removeClass(params.form.progressFormClass);
              $('.' + params.form.submitLinkClass).removeClass(params.form.progressButtonClass);

              $.emit('on:modalOpen', result.data);

            },
            error: function(err) {
              console.log(err)
            }
          });
        };

        methods.eventFormSubmit();
      },
      'eventChangeFields': function() {
        var $thisField = $(this);
        var thisFieldDataRaw = $.extend({}, $thisField.data()[params.fields.attr], {
          thisField: $thisField,
          thisValue: $.trim($thisField.val())
        });

        // checking this field
        if (params.inner.realTimeCheck) {
          methods.checkingField($thisField);
        }

        // hidden checking all field for submit status
        methods.initFormStatus();
      },
      'checkingField': function($thisField, hiddenChecking) {
        // hiddenChecking is check fields but don't change style

        var fieldStatus = true;

        var thisFieldDataRaw = $.extend({}, $thisField.data()[params.fields.attr], {
          thisField: $thisField,
          thisValue: $.trim($thisField.val())
        });

        var thisFieldData = $.extend({}, params.inner.defaultFieldData, thisFieldDataRaw);

        // checking empty value

        if ($thisField.val().length === 0) {
          $thisField.closest('.' + params.fields.parentClass).removeClass(params.fields.formHasValueClass);
        } else {
          $thisField.closest('.' + params.fields.parentClass).addClass(params.fields.formHasValueClass);
        }

        // checking for mask
        if (methods.checkingMasks[thisFieldData.mask]) {
          if (methods.checkingMasks[thisFieldData.mask](thisFieldData) || methods.checkingMasks['visibleAndRequire'](thisFieldData)) {
            // remove error class
            if (!hiddenChecking) {
              $thisField.closest('.' + params.fields.parentClass).removeClass(params.fields.parentErrorState);
            }
          } else {
            // added error class
            if (!hiddenChecking) {
              $thisField.closest('.' + params.fields.parentClass).addClass(params.fields.parentErrorState);
            }

            // added error status
            fieldStatus = false;
          }
        }

        return fieldStatus;
      },
      'checkingFieldsAll': function($fields, hiddenChecking) {
        var checkingParams = {
          'status': true,
          'focusFlag': true,
          'scrollNode': $('body,html'),
          'scrollSpeed': 300,
          'scrollDelay': 100,
          'scrollOffsetShift': 300
        };
        $fields.each(function(i, thisField) {
          var $thisField = $(thisField);
          var thisFieldStatus = methods.checkingField($thisField, hiddenChecking);
          if (!thisFieldStatus) {
            checkingParams.status = false;

            // scroll to error field and focus
            if (checkingParams.focusFlag && !hiddenChecking && !$thisField.is(':checkbox')) {
              checkingParams.focusFlag = false;
              $thisField.focus();
            }
          }
        });
        return checkingParams.status;
      },
      'checkingMasks': {
        'text': function(data) {
          return (data.thisValue.length > 0);
        },

        'visibleAndRequire': function(data) {
          // invisible field
          if (data.visible && !data.thisField.closest('.' + params.fields.parentClass).is(':visible')) {
            return true;
          }

          // not require field
          if (!data.require && data.thisValue.length === 0) {
            return true;
          }

          // return default
          return false;
        }
      },
      'eventFocusEnter': function() {
        $(this).closest('.' + params.fields.parentClass).addClass(params.fields.formFocusClass);
      },
      'eventFocusLeave': function() {
        $(this).closest('.' + params.fields.parentClass).removeClass(params.fields.formFocusClass)
      }
    };

    methods.init();

  }
};

document.addEventListener('DOMContentLoaded', () => {
  globalApp.init();
});
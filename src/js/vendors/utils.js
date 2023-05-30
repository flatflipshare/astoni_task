(function (jQuery) {
  $.extend({
    emit: function (name, payload) {
      $(document).trigger(name, payload);
    },
    onEmit: function (name, callback) {
      $(document).on(name, function (e, payload) {
        callback && callback(payload);
      });
    }
  });
})(jQuery);
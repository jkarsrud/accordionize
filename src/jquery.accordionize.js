(function($) {
  $.fn.accordionize = function(options) {
    var defaults = {
      header: '.accordion-header',
      content: '.accordion-content',
      speed: 500
    };

    options = $.extend({}, options, defaults);
    return this.each(function() {
      var $this = $(this);
      if (!$this.data('accordionize')) {
        $this.data('accordionize', new $.fn.accordionize.instance(this, options)._init(arguments));
      }
    });
  };

  $.extend($.fn.accordionize, {
    instance: function(element, options) {
      this.list = $(element);
      this.options = options;
      this.header = $(options.header, this.list);
      this.content = $(options.content, this.header);
      this.active = $('li.active', this.list);
    }
  });

  $.extend($.fn.accordionize.instance.prototype, {
    _init: function() {
      var self = this;
      this.header.bind({
        "toggle.accordionize": $.proxy(this._toggle, this),
        "show.accordionize": $.proxy(this._show, this),
        "hide.accordionize": $.proxy(this._hide, this)
      }).find("h3").click(function(){
        $(this).parent(self.options.header).trigger("toggle");
      });
      this.speedHeader = this.options.speed/4;
      this.speedAnswer = this.speedHeader*3;
    },
    _show: function(e) {
      var self = this,
          q = $(e.currentTarget);
      q.stop(false,true).slideUp(self.speedHeader, function() {
        q.addClass("active").slideDown(self.speedAnswer);
      });
    },
    _hide: function(e) {
      var self = this,
          q = $(e.currentTarget);
      q.stop(false,true).slideUp(self.speedAnswer, function () {
        q.removeClass("active").slideDown(self.speedHeader);
      });
    },
    _toggle: function(e) {
      var q = $(e.currentTarget);
      if (!q.hasClass("active")) {
        if (this.active.length) { this.active.trigger("hide"); this.active = []; }
        this.active = $(e.currentTarget).trigger("show");
      } else {
        q.trigger("hide");
        this.active = [];
      }
    }
  });
}(jQuery));
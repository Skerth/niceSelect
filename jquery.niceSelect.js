/**
 * niceSelect v0.1 - Красивый вывод элементов <select>
 */

"use strict";

(function( $ ) {

  const methods = {

    init: function(options) {
      let settings = $.extend({
      }, options);

      return this.each(function() {
        const $select = $(this);

        if ($select.hasClass('niceselect--select')) {
          return;
        }

        $select.addClass('niceselect--select');

        const $label = $('label[for="' + this.id + '"]'),
              $options = $select.children('option');

        const $niceselect = $('<div>', {
          class: 'niceselect',
        });

        // Кнопка переключения отображения элементов списка
        const $toggle = $('<button>', {
          type: 'button',
          class: 'niceselect--toggle',
          text: $label.text(),
          click: function (e) {
            if (!$niceselect.hasClass('show')) {
              $('.niceselect').removeClass('show');
              $niceselect.addClass('show');
            }
            else {
              $('.niceselect').removeClass('show');
            }
          }
        });

        const $toggle_num = $('<span>', {
          class: 'niceselect--toggle-num'
        });

        $toggle.append($toggle_num);

        // Блок с элементами списка
        const $items = $('<div>', {
          class: 'niceselect--items',
          html: function () {
            let $item_arr = [];

            $.each($options, function (i, val) {
              const $val = $(val);
              const $item = $('<div>', {
                class: function () {
                  let item_class = 'niceselect--item';

                  if ($val.prop('selected')) {
                    item_class += ' selected';
                  }

                  return item_class;
                },
                html: '<div class="niceselect--item-val">' + $val.text() + '</div>',
                title: $val.text(),
                click: function () {
                  if ($val.prop('selected')) {
                    $val.prop('selected', false);
                    $(this).removeClass('selected');
                  }
                  else {
                    $val.prop('selected', true);
                    $(this).addClass('selected');
                  }

                  $select.trigger('change');
                }
              });

              $item_arr.push($item);
            });

            return $item_arr;
          }
        });

        $niceselect.append($toggle).append($items);
        $items.wrap('<div class="niceselect--items-wrap"></div>');

        $select.before($niceselect).hide();

        $select.on('change', function () {
          let number_select = $(this).children('option:selected').length;

          if (number_select) {
            $toggle_num.text(number_select);
          }
          else {
            $toggle_num.text('');
          }

        }).trigger('change');
      });
    }
  };

  jQuery.fn.niceSelect = function(options) {
    $(document).on('click', function (e) {
      const $niceselect = $('.niceselect');
      if (!$niceselect.is(e.target)
        && $niceselect.has(e.target).length === 0) {
        $niceselect.removeClass('show');
      }
    });

    return methods.init.apply(this, arguments);
  };
})(jQuery);
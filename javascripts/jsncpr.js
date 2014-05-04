(function($) {
  $(document).ready(function() {
    var $nucleus = $('#nucleus');
    var $energyLevelOne = $('#energy-level-one');
    var $outerEnergyLevel = $('#outer-energy-level');

    var ENERGY_LEVEL_ONE_WIDTH = $energyLevelOne.width();
    var OUTER_ENERGY_LEVEL_WIDTH = $outerEnergyLevel.width();

    function positionParticles() {
      $.each([$nucleus, $energyLevelOne, $outerEnergyLevel], function(i, $element) {
        $element.css({
          'top':  $(window).height() / 2 - $element.height() / 2,
          'left': $(window).width() / 2 - $element.width() / 2
        });
      });

      // Calling css inside of each instead of on the jQuery collection directly allows for varying electron sizes.
      $('.energy-level-one-electron').each(function() {
        $(this).css({
          top: ($energyLevelOne.offset().top + $energyLevelOne.height() / 2 - $(this).height() / 2) + 'px',
          left: ($energyLevelOne.offset().left + $energyLevelOne.width() / 2 - $(this).width() / 2) + 'px'
        });
      });
    }

    // http://davidwalsh.name/add-rules-stylesheets
    function addCSSRule(sheet, selector, rules, index) {
      if (sheet.insertRule) {
        sheet.insertRule(selector + ' { ' + rules + ' }', index || sheet.cssRules.length);
      } else {
        sheet.addRule(selector, rules, index || sheet.cssRules.length);
      }
    }

    // http://davidwalsh.name/add-rules-stylesheets
    var sheet = (function() {
      var style = document.createElement('style');
      style.setAttribute('media', 'screen')

      // WebKit hack
      style.appendChild(document.createTextNode(''));

      document.head.appendChild(style);
      return style.sheet;
    })();

    var energyLevelOneClasses = [];
    for (var i = 0; i < 360; i += 45) {
      energyLevelOneClasses.push('energy-level-one-cw-' + i);
      energyLevelOneClasses.push('energy-level-one-ccw-' + i);
      if (CSSRule.WEBKIT_KEYFRAMES_RULE) {
        // http://lea.verou.me/2012/02/moving-an-element-along-a-circle/
        addCSSRule(sheet, '@-webkit-keyframes energy-level-one-cw-' + i, ['from { -webkit-transform: rotate(', i, 'deg) translate(-', ENERGY_LEVEL_ONE_WIDTH / 2, 'px) rotate(-', i, 'deg); } to { -webkit-transform: rotate(', i + 360, 'deg) translate(-', ENERGY_LEVEL_ONE_WIDTH / 2, 'px) rotate(-', i + 360, 'deg); }'].join(''));
        addCSSRule(sheet, '@-webkit-keyframes energy-level-one-ccw-' + i, ['from { -webkit-transform: rotate(-', i, 'deg) translate(-', ENERGY_LEVEL_ONE_WIDTH / 2, 'px) rotate(', i, 'deg); } to { -webkit-transform: rotate(-', i + 360, 'deg) translate(-', ENERGY_LEVEL_ONE_WIDTH / 2, 'px) rotate(', i + 360, 'deg); }'].join(''));
        addCSSRule(sheet, '.energy-level-one-cw-' + i, '-webkit-animation: energy-level-one-cw-' + i + ' 10s infinite linear;');
        addCSSRule(sheet, '.energy-level-one-ccw-' + i, '-webkit-animation: energy-level-one-ccw-' + i + ' 10s infinite linear;');
      } else if (CSSRule.KEYFRAMES_RULE) {
        // http://lea.verou.me/2012/02/moving-an-element-along-a-circle/
        addCSSRule(sheet, '@keyframes energy-level-one-cw-' + i, ['from { transform: rotate(', i, 'deg) translate(-', ENERGY_LEVEL_ONE_WIDTH / 2, 'px) rotate(-', i, 'deg); } to { transform: rotate(', i + 360, 'deg) translate(-', ENERGY_LEVEL_ONE_WIDTH / 2, 'px) rotate(-', i + 360, 'deg); }'].join(''));
        addCSSRule(sheet, '@keyframes energy-level-one-ccw-' + i, ['from { transform: rotate(-', i, 'deg) translate(-', ENERGY_LEVEL_ONE_WIDTH / 2, 'px) rotate(', i, 'deg); } to { transform: rotate(-', i + 360, 'deg) translate(-', ENERGY_LEVEL_ONE_WIDTH / 2, 'px) rotate(', i + 360, 'deg); }'].join(''));
        addCSSRule(sheet, '.energy-level-one-cw-' + i, 'animation: energy-level-one-cw-' + i + ' 10s infinite linear;');
        addCSSRule(sheet, '.energy-level-one-ccw-' + i, 'animation: energy-level-one-ccw-' + i + ' 10s infinite linear;');
      }
    }

    $('.energy-level-one-electron').each(function() {
      // Chose a random number between 8 and 12 and round it down to the nearest integer.
      var animationDuration = Math.floor(Math.random() * 5 + 8);

      $(this).addClass(energyLevelOneClasses[Math.floor(Math.random() * energyLevelOneClasses.length)]);
      $(this).css({
        '-webkit-animation-duration': animationDuration + 's',
        'animation-duration': animationDuration + 's'
      }).show();
    });

    $(window).resize(function() {
      positionParticles();
    });
    positionParticles();
  });
})(jQuery);


(function($){
  $(".title-tab li:eq(0)").addClass('active');

  $(".content-tab-vali .content-tab").not(':eq(0)').addClass('hide');

  $(".title-tab li a").click(function(){

      var $this = $(this),
          $href = this.hash,
          $tab = $($href),

          $currentTab = $(".content-tab-vali .content-tab:visible");

      $(".title-tab li").removeClass('active');

      $this.parent().addClass('active');

      $currentTab.addClass('hide');

      $tab.removeClass('hide');

      return false;

  });
  $(".title-proppsal .title-tab li:eq(0)").addClass('active');

  $(".content-tab-proposal .content-tab").not(':eq(0)').addClass('hide');

  $(".title-proppsal .title-tab li a").click(function(){

      var $this = $(this),
          $href = this.hash,
          $tab = $($href),

          $currentTab = $(".content-tab-proposal .content-tab:visible");

      $(".title-proppsal .title-tab li").removeClass('active');

      $this.parent().addClass('active');

      $currentTab.addClass('hide');

      $tab.removeClass('hide');

      return false;

  });
})(jQuery);

/* --------------------------------------------------------------------- */
/* Check input all required things
/* --------------------------------------------------------------------- */
(function($) {
  if (!$(".required").length) return;
  var popupInputAllRequiredThings = $("#popupInputAllRequiredThings");
  $("form").on("submit", function() {
    var form = $(this);
    var inputbox = form.find("input[type='text'].required:visible, input[type='password'].required:visible");
    var textNumber = form.find("input[type='number'].required:visible");
    var textField = form.find("textarea.required:visible");
    var select = form.find("select.required:visible");
    var checkboxList = form.find(".checkbox_list.required:visible");
    var radioList = form.find(".radio-list.required:visible");
    var fileUpload = form.find(".file-upload.required:visible");

    inputbox.each(function() {
      $(this).val() === "" ? $(this).addClass("required-validate-false").css("border", "1px solid #ff0000") : $(this).removeClass("required-validate-false").css("border", "")
    });
    
    textNumber.each(function() {
        $(this).val() === "" ? $(this).addClass("required-validate-false").css("border", "1px solid #ff0000") : $(this).removeClass("required-validate-false").css("border", "")
      });

    textField.each(function() {
      $(this).val() === "" ? $(this).addClass("required-validate-false").css("border", "1px solid #ff0000") : $(this).removeClass("required-validate-false").css("border", "")
    });

    select.each(function() {
      if ($(this).val() === null) {
        $(this).addClass("required-validate-false");
        $(this).parent().css("border", "1px solid #ff0000");
      }
    });

    checkboxList.each(function() {
      var checkboxChecked = $(this).find("[type='checkbox']:checked");

      if (!checkboxChecked.length) {
        $(this).addClass("required-validate-false").css("border", "1px solid #ff0000");
      }
    });

    radioList.each(function() {
      var radioChecked = $(this).find("[type='radio']:checked");
      if (!radioChecked.length) {
        $(this).addClass("required-validate-false").css("border", "1px solid #ff0000");
      }
    });

    fileUpload.each(function() {
      var inputFile = $(this).find(".input-file");
      var borderBox = $(this).find(".border-box");

      if (inputFile.val() === "") {
        $(this).addClass("required-validate-false");
        borderBox.css("border", "1px solid #ff0000");
      }
    });

    if (form.find(".required-validate-false").length) {
      popupInputAllRequiredThings.modal("show");
      $('#popupConfirmUpdate').modal('hide');
      return false;
    }
  });

  $("form").on("keyup", "input[type='text'].required:visible, input[type='password'].required:visible", function() {
    if ($(this).val() != null) {
      $(this).removeClass("required-validate-false").css("border", "");
    }
  });
  
  $("form").on("keyup", "input[type='number'].required:visible", function() {
	    if ($(this).val() != null) {
	      $(this).removeClass("required-validate-false").css("border", "");
	    }
	  });

  $("form").on("keyup", "textarea.required:visible", function() {
    if ($(this).val() != "") {
      $(this).removeClass("required-validate-false").css("border", "");
    }
  });

  $("form").on("change", "select.required", function() {
    if ($(this).val().length >= 1) {
      $(this).removeClass("required-validate-false");
      $(this).parent().css("border", "");
    }
  });

  $("form").find(".checkbox_list.required").each(function() {
	  
    var thisCheckboxList = $(this);
    thisCheckboxList.on("change", "[type='checkbox']", function() {
      if ($(this).is(":checked")) {
        thisCheckboxList.removeClass("required-validate-false").css("border", "");
      }
    });
  });

  $("form").find(".radio-list.required").each(function() {
    var thisRadioList = $(this);

    thisRadioList.on("change", "[type='radio']", function() {
      if ($(this).is(":checked")) {
        thisRadioList.removeClass("required-validate-false").css("border", "");
      }
    });
  });

  $("form").find(".file-upload.required").each(function() {
    var thisFileUpload = $(this);
    var inputFile = thisFileUpload.find(".input-file");
    var borderBox = thisFileUpload.find(".border-box");

    thisFileUpload.on("change", inputFile, function() {
      if (inputFile.val() !== "") {
        thisFileUpload.removeClass("required-validate-false");
        borderBox.css("border", "");
      }
    });
  });

  var scrollView = function(scrollToThis) {
    if (!scrollToThis.length) return;

    $('html, body').animate({
      scrollTop: scrollToThis.offset().top
    }, 500);
  };

  popupInputAllRequiredThings.on('hidden.bs.modal', function(e) {
    scrollView($("[class*='validate-false']"));
  });
})(jQuery);


(function($) {
	  if (!$(".required").length) return;
	  var popupInputAllRequiredThings = $("#popupRequiredInput");
	  var popupSumbit = $("#popupConfirmSubmit");
	  $("#button_required").on("click", function() {
	    var form = $("#form_required");
	    var inputbox = form.find("input[type='text'].required:visible, input[type='password'].required:visible, textarea.required:visible");
	    var textNumber = form.find("input[type='number'].required:visible");
	    var textField = form.find(".text-field.required:visible");
	    var select = form.find("select.required:visible");
	    var checkboxList = form.find(".checkbox_list.required:visible");
	    var radioList = form.find(".radio-list.required:visible");
	    var fileUpload = form.find(".file-upload.required:visible");

	    inputbox.each(function() {
	      $(this).val() === "" ? $(this).addClass("required-validate-false").css("border", "1px solid #ff0000") : $(this).removeClass("required-validate-false").css("border", "")
	    });
	    
	    textNumber.each(function() {
	        $(this).val() === "" ? $(this).addClass("required-validate-false").css("border", "1px solid #ff0000") : $(this).removeClass("required-validate-false").css("border", "")
	      });

	    textField.each(function() {
	      $(this).text() === "" ? $(this).addClass("required-validate-false").css("border", "1px solid #ff0000") : $(this).removeClass("required-validate-false").css("border", "")
	    });

	    select.each(function() {
	      if ($(this).val() === null) {
	        $(this).addClass("required-validate-false");
	        $(this).parent().css("border", "1px solid #ff0000");
	      }
	    });

	    checkboxList.each(function() {
	      var checkboxChecked = $(this).find("[type='checkbox']:checked");

	      if (!checkboxChecked.length) {
	        $(this).addClass("required-validate-false").css("border", "1px solid #ff0000");
	      }
	    });

	    radioList.each(function() {
	      var radioChecked = $(this).find("[type='radio']:checked");

	      if (!radioChecked.length) {
	        $(this).addClass("required-validate-false").css("border", "1px solid #ff0000");
	      }
	    });

	    fileUpload.each(function() {
	      var inputFile = $(this).find(".input-file");
	      var borderBox = $(this).find(".border-box");

	      if (inputFile.val() === "") {
	        $(this).addClass("required-validate-false");
	        borderBox.css("border", "1px solid #ff0000");
	      }
	    });

	    if (form.find(".required-validate-false").length) {
	      console.log(">>>>>>>>>> required things");
	      popupInputAllRequiredThings.modal("show");
	      return false;
	    }else{
	    	console.log(">>>>>>>>>> popupSumbit");
	      popupSumbit.modal("show");
	      return false;
	    }
	  });

	  $("#form_required").on("keyup", "input[type='text'].required:visible, input[type='password'].required:visible", function() {
	    if ($(this).val() != null) {
	      $(this).removeClass("required-validate-false").css("border", "");
	    }
	  });
	  
	  $("#form_required").on("keyup", "input[type='number'].required:visible", function() {
		    if ($(this).val() != null) {
		      $(this).removeClass("required-validate-false").css("border", "");
		    }
		  });

	  $("#form_required").on("keyup", ".text-field.required", function() {
	    if ($(this).text() != "") {
	      $(this).removeClass("required-validate-false").css("border", "");
	    }
	  });

	  $("#form_required").on("change", "select.required", function() {
	    if ($(this).val().length >= 1) {
	      $(this).removeClass("required-validate-false");
	      $(this).parent().css("border", "");
	    }
	  });

	  $("#form_required").find(".checkbox_list.required").each(function() {
	    var thisCheckboxList = $(this);

	    thisCheckboxList.on("change", "[type='checkbox']", function() {
	      if ($(this).is(":checked")) {
	        thisCheckboxList.removeClass("required-validate-false").css("border", "");
	      }
	    });
	  });

	  $("#form_required").find(".radio-list.required").each(function() {
	    var thisRadioList = $(this);

	    thisRadioList.on("change", "[type='radio']", function() {
	      if ($(this).is(":checked")) {
	        thisRadioList.removeClass("required-validate-false").css("border", "");
	      }
	    });
	  });

	  $("#form_required").find(".file-upload.required").each(function() {
	    var thisFileUpload = $(this);
	    var inputFile = thisFileUpload.find(".input-file");
	    var borderBox = thisFileUpload.find(".border-box");

	    thisFileUpload.on("change", inputFile, function() {
	      if (inputFile.val() !== "") {
	        thisFileUpload.removeClass("required-validate-false");
	        borderBox.css("border", "");
	      }
	    });
	  });

	  var scrollView = function(scrollToThis) {
	    if (!scrollToThis.length) return;

	    $('html, body').animate({
	      scrollTop: scrollToThis.offset().top
	    }, 500);
	  };

	  popupInputAllRequiredThings.on('hidden.bs.modal', function(e) {
	    scrollView($("[class*='validate-false']"));
	  });
	})(jQuery);


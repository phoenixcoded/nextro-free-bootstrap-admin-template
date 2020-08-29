"use strict";
var flg = "0";
$(document).ready(function() {
    // feather icon start
    feather.replace();
    // feather icon end
    // remove pre-loader start
    setTimeout(function() {
        $('.loader-bg').fadeOut('slow', function() {
            $(this).remove();
        });
    }, 400);
    // remove pre-loader end
    if (!$('body').hasClass('pc-horizontal')) {
        addscroller();
    }
    if ($('.pc-horizontal').hasClass('navbar-overlay')) {
        addscroller();
    }

    $('.hamburger:not(.is-active)').on('click', function() {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
        } else {
            $(this).addClass('is-active');
        }
    });
    // Menu overlay layout start
    $("#overlay-menu").on('click', function() {
        menuclick();
        if ($(".pc-sidebar").hasClass('pc-over-menu-active')) {
            rmovermenu();
        } else {
            $(".pc-sidebar").addClass('pc-over-menu-active');
            $(".pc-sidebar").append('<div class="pc-menu-overlay"></div>');
            $(".pc-menu-overlay").on('click', function() {
                rmovermenu();
                $('.hamburger').removeClass('is-active');
            });
        }
    });
    // Menu overlay layout end
    // Menu collapse click start
    $("#mobile-collapse").on('click', function() {
        if (!$('body').hasClass('pc-horizontal')) {
            menuclick();
        }
        if ($(".pc-sidebar").hasClass('mob-sidebar-active')) {
            rmmenu();
        } else {
            $(".pc-sidebar").addClass('mob-sidebar-active');
            $(".pc-sidebar").append('<div class="pc-menu-overlay"></div>');
            $(".pc-menu-overlay").on('click', function() {
                rmmenu();
                $('.hamburger').removeClass('is-active');
            });
        }
    });
    // Menu collapse click end

    // Menu collapse click start
    $(".pc-horizontal #mobile-collapse").on('click', function() {
        if ($(".topbar").hasClass('mob-sidebar-active')) {
            rmmenu();
        } else {
            $(".topbar").addClass('mob-sidebar-active');
            $(".topbar").append('<div class="pc-menu-overlay"></div>');
            $(".pc-menu-overlay").on('click', function() {
                rmmenu();
                $('.hamburger').removeClass('is-active');
            });
        }
    });
    // Menu collapse click end
    $("#header-collapse").on('click', function() {
        if ($(".pc-header:not(.pc-mob-header)").hasClass('mob-header-active')) {
            rmthead();
        } else {
            $(".pc-header:not(.pc-mob-header)").addClass('mob-header-active');
            $(".pc-header:not(.pc-mob-header)").append('<div class="pc-md-overlay"></div>');
            $(".pc-md-overlay").on('click', function() {
                rmthead();
            });
        }
    });
    $("#headerdrp-collapse").on('click', function() {
        if ($(".pc-header:not(.pc-mob-header) .pc-mob-drp").hasClass('mob-drp-active')) {
            rmdrp();
        } else {
            $(".pc-header:not(.pc-mob-header) .pc-mob-drp").addClass('mob-drp-active');
            $(".pc-header:not(.pc-mob-header)").append('<div class="pc-md-overlay"></div>');
            $(".pc-md-overlay").on('click', function() {
                rmdrp();
            });
        }
    });
    // mobile header click end

    // Horizontal menu click js start
    $('.pc-horizontal .topbar .pc-navbar>li>a').on('click', function(e) {
        setTimeout(function() {
            $(this).parents('.dropdown').children('.dropdown-menu').removeAttr("style");
        }, 1000);
    });
    $('.pc-horizontal .topbar .dropdown-menu a.dropdown-toggle').on('click', function(e) {
        $(this).parents('.dropdown-menu').first().find('.show').removeAttr("style");
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $pc_submenu = $(this).next(".dropdown-menu");
        $pc_submenu.toggleClass('show');
        return false;
    });
    // Horizontal menu click js end
    // Material form start
    $(".form-v2 .form-control").each(function() {
        formmat($(this));
    });
    $('.form-v2 .form-control').on('blur', function() {
        formmat($(this));
    });
    $('.form-v2 .form-control').on('focus', function() {
        $(this).parent('.form-group').addClass("fill");
    });

    function formmat(e) {
        var $temp = 0;
        try {
            $temp = e.attr('placeholder').length;
        } catch (err) {
            $temp = 0;
        }
        if (e.val().length > 0) {
            e.parent('.form-group').addClass("fill");
        } else {
            e.parent('.form-group').removeClass("fill");
        }
    }
    // Material form end
});
// Menu click start
function addscroller() {
    rmmini();
    menuclick();
    // Menu scrollbar start
    if ($('.navbar-content')[0]) {
        var px = new PerfectScrollbar('.navbar-content', {
            wheelSpeed: .5,
            swipeEasing: 0,
            suppressScrollX: !0,
            wheelPropagation: 1,
            minScrollbarLength: 40,
        });
    }
    // Menu scrollbar end
}
// Menu click start
function menuclick() {
    var vw = $(window)[0].innerWidth;
    $(".pc-navbar li").off("click");
    if (!$('body').hasClass('minimenu')) {
        $(".pc-navbar > li:not(.pc-caption)").on('click', function() {
            $(this).children('.pc-submenu').removeAttr("style");
            if ($(this).hasClass('pc-trigger')) {
                $(this).removeClass('pc-trigger');
                $(this).children('.pc-submenu').slideUp("fast");
            } else {
                $('li.pc-trigger').children('.pc-submenu').slideUp("fast");
                $('li.pc-trigger').removeClass('pc-trigger');
                $(this).addClass('pc-trigger');
                $(this).children('.pc-submenu').slideDown("fast");
            }
        });
        $(".pc-navbar > li:not(.pc-caption) li").on('click', function(e) {
            e.stopPropagation();
            if ($(this).hasClass('pc-trigger')) {
                $(this).removeClass('pc-trigger');
                $(this).children('.pc-submenu').slideUp("fast");
            } else {
                $(this).parent('.pc-submenu').find('li.pc-trigger').children('.pc-submenu').slideUp("fast");
                $(this).parent('.pc-submenu').find('li.pc-trigger').removeClass('pc-trigger');
                $(this).addClass('pc-trigger');
                $(this).children('.pc-submenu').slideDown("fast");
            }
        });
    }
}

function rmdrp() {
    $(".pc-header:not(.pc-mob-header) .pc-mob-drp").removeClass('mob-drp-active');
    $(".pc-header:not(.pc-mob-header) .pc-md-overlay").remove();
}

function rmthead() {
    $(".pc-header:not(.pc-mob-header)").removeClass('mob-header-active');
    $(".pc-header:not(.pc-mob-header) .pc-md-overlay").remove();
}

function rmmenu() {
    $(".pc-sidebar").removeClass('mob-sidebar-active');
    $(".topbar").removeClass('mob-sidebar-active');
    $(".pc-sidebar .pc-menu-overlay").remove();
    $(".topbar .pc-menu-overlay").remove();
}

function rmovermenu() {
    $(".pc-sidebar").removeClass('pc-over-menu-active');
    $(".topbar").removeClass('mob-sidebar-active');
    $(".pc-sidebar .pc-menu-overlay").remove();
    $(".topbar .pc-menu-overlay").remove();
}

function rmactive() {
    $(".pc-sidebar .pc-navbar li").removeClass("active");
    $(".pc-sidebar .pc-navbar li").removeClass("pc-trigger");
    $(".topbar .dropdown").removeClass("show");
    $(".topbar .dropdown-menu").removeClass("show");
    $(".pc-sidebar .pc-menu-overlay").remove();
    $(".topbar .pc-menu-overlay").remove();
}

function rmmini() {
    var vw = $(window)[0].innerWidth;
    if (vw <= 1024) {
        if ($('body').hasClass('minimenu')) {
            $('body').removeClass('minimenu');
            flg = "1";
            2
        }
    } else {
        if (vw > 1024) {
            if (flg == "1") {
                $('body').addClass('minimenu');
                flg = "0";
            }
        }
    }
}
// Menu click end
$(window).resize(function() {
    if (!$('body').hasClass('pc-horizontal')) {
        rmmini();
        menuclick();
    }
    if ($('body').hasClass('pc-horizontal')) {
        rmactive();
    }
});
$(window).scroll(function() {});
$(window).on('load', function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});
// active menu item list start
if (!$('body').hasClass('minimenu')) {
    $(".pc-sidebar .pc-navbar a").each(function() {
        var pageUrl = window.location.href.split(/[?#]/)[0];
        if (this.href == pageUrl && $(this).attr('href') != "") {
            $(this).parent('li').addClass("active");
            $(this).parent('li').parent().parent('.pc-hasmenu').addClass("active").addClass("pc-trigger");
            $(this).parent('li').parent().parent('.sidelink').addClass("active");
            $(this).parent('li').parent().parent('.pc-hasmenu').parent().parent('.pc-hasmenu').addClass("active").addClass("pc-trigger");
            $(this).parents('.pc-tabcontent').addClass('active');
        }
    });
}

// Menu click start
$('.tab-sidemenu>li').on('click', function() {
    var tempcont = $(this).children('a').attr('data-cont');
    $('.navbar-content .pc-tabcontent').removeClass('active');
    $('.tab-sidemenu > li').removeClass('active');
    $(this).addClass('active');
    $('.navbar-content .pc-tabcontent[data-value="' + tempcont + '"]').addClass('active');
});
// Menu click end

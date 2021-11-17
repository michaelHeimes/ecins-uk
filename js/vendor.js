"use strict";

/*!
	Modaal - accessible modals - v0.4.4
	by Humaan, for all humans.
	http://humaan.com
 */
!function (a) {
  function t(a) {
    var t = {},
        o = !1;
    a.attr("data-modaal-type") && (o = !0, t.type = a.attr("data-modaal-type")), a.attr("data-modaal-content-source") && (o = !0, t.content_source = a.attr("data-modaal-content-source")), a.attr("data-modaal-animation") && (o = !0, t.animation = a.attr("data-modaal-animation")), a.attr("data-modaal-animation-speed") && (o = !0, t.animation_speed = a.attr("data-modaal-animation-speed")), a.attr("data-modaal-after-callback-delay") && (o = !0, t.after_callback_delay = a.attr("data-modaal-after-callback-delay")), a.attr("data-modaal-is-locked") && (o = !0, t.is_locked = "true" === a.attr("data-modaal-is-locked")), a.attr("data-modaal-hide-close") && (o = !0, t.hide_close = "true" === a.attr("data-modaal-hide-close")), a.attr("data-modaal-background") && (o = !0, t.background = a.attr("data-modaal-background")), a.attr("data-modaal-overlay-opacity") && (o = !0, t.overlay_opacity = a.attr("data-modaal-overlay-opacity")), a.attr("data-modaal-overlay-close") && (o = !0, t.overlay_close = "false" !== a.attr("data-modaal-overlay-close")), a.attr("data-modaal-accessible-title") && (o = !0, t.accessible_title = a.attr("data-modaal-accessible-title")), a.attr("data-modaal-start-open") && (o = !0, t.start_open = "true" === a.attr("data-modaal-start-open")), a.attr("data-modaal-fullscreen") && (o = !0, t.fullscreen = "true" === a.attr("data-modaal-fullscreen")), a.attr("data-modaal-custom-class") && (o = !0, t.custom_class = a.attr("data-modaal-custom-class")), a.attr("data-modaal-close-text") && (o = !0, t.close_text = a.attr("data-modaal-close-text")), a.attr("data-modaal-close-aria-label") && (o = !0, t.close_aria_label = a.attr("data-modaal-close-aria-label")), a.attr("data-modaal-background-scroll") && (o = !0, t.background_scroll = "true" === a.attr("data-modaal-background-scroll")), a.attr("data-modaal-width") && (o = !0, t.width = parseInt(a.attr("data-modaal-width"))), a.attr("data-modaal-height") && (o = !0, t.height = parseInt(a.attr("data-modaal-height"))), a.attr("data-modaal-confirm-button-text") && (o = !0, t.confirm_button_text = a.attr("data-modaal-confirm-button-text")), a.attr("data-modaal-confirm-cancel-button-text") && (o = !0, t.confirm_cancel_button_text = a.attr("data-modaal-confirm-cancel-button-text")), a.attr("data-modaal-confirm-title") && (o = !0, t.confirm_title = a.attr("data-modaal-confirm-title")), a.attr("data-modaal-confirm-content") && (o = !0, t.confirm_content = a.attr("data-modaal-confirm-content")), a.attr("data-modaal-gallery-active-class") && (o = !0, t.gallery_active_class = a.attr("data-modaal-gallery-active-class")), a.attr("data-modaal-loading-content") && (o = !0, t.loading_content = a.attr("data-modaal-loading-content")), a.attr("data-modaal-loading-class") && (o = !0, t.loading_class = a.attr("data-modaal-loading-class")), a.attr("data-modaal-ajax-error-class") && (o = !0, t.ajax_error_class = a.attr("data-modaal-ajax-error-class")), a.attr("data-modaal-instagram-id") && (o = !0, t.instagram_id = a.attr("data-modaal-instagram-id")), o && a.modaal(t);
  }

  var o = {
    init: function init(t, o) {
      var e = this;
      if (e.dom = a("body"), e.$elem = a(o), e.options = a.extend({}, a.fn.modaal.options, e.$elem.data(), t), e.xhr = null, e.scope = {
        is_open: !1,
        id: "modaal_" + new Date().getTime() + Math.random().toString(16).substring(2),
        source: e.options.content_source ? e.options.content_source : e.$elem.attr("href")
      }, e.$elem.attr("data-modaal-scope", e.scope.id), e.private_options = {
        active_class: "is_active"
      }, e.lastFocus = null, e.options.is_locked || "confirm" == e.options.type || e.options.hide_close ? e.scope.close_btn = "" : e.scope.close_btn = '<button type="button" class="modaal-close" id="modaal-close" aria-label="' + e.options.close_aria_label + '"><span>' + e.options.close_text + "</span></button>", "none" === e.options.animation && (e.options.animation_speed = 0, e.options.after_callback_delay = 0), a(o).on("click.Modaal", function (a) {
        a.preventDefault(), e.create_modaal(e, a);
      }), !0 === e.options.outer_controls) var i = "outer";else var i = "inner";
      e.scope.prev_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-prev modaal-gallery-prev-' + i + '" id="modaal-gallery-prev" aria-label="Previous image (use left arrow to change)"><span>Previous Image</span></button>', e.scope.next_btn = '<button type="button" class="modaal-gallery-control modaal-gallery-next modaal-gallery-next-' + i + '" id="modaal-gallery-next" aria-label="Next image (use right arrow to change)"><span>Next Image</span></button>', !0 === e.options.start_open && e.create_modaal(e);
    },
    create_modaal: function create_modaal(a, t) {
      var o,
          a = this;

      if (a.lastFocus = a.$elem, !1 !== a.options.should_open && ("function" != typeof a.options.should_open || !1 !== a.options.should_open())) {
        switch (a.options.before_open.call(a, t), a.options.type) {
          case "inline":
            a.create_basic();
            break;

          case "ajax":
            o = a.options.source(a.$elem, a.scope.source), a.fetch_ajax(o);
            break;

          case "confirm":
            a.options.is_locked = !0, a.create_confirm();
            break;

          case "image":
            a.create_image();
            break;

          case "iframe":
            o = a.options.source(a.$elem, a.scope.source), a.create_iframe(o);
            break;

          case "video":
            a.create_video(a.scope.source);
            break;

          case "instagram":
            a.create_instagram();
        }

        a.watch_events();
      }
    },
    watch_events: function watch_events() {
      var t = this;
      t.dom.off("click.Modaal keyup.Modaal keydown.Modaal"), t.dom.on("keydown.Modaal", function (o) {
        var e = o.keyCode,
            i = o.target;
        9 == e && t.scope.is_open && (a.contains(document.getElementById(t.scope.id), i) || a("#" + t.scope.id).find('*[tabindex="0"]').focus());
      }), t.dom.on("keyup.Modaal", function (o) {
        var e = o.keyCode,
            i = o.target;
        return o.shiftKey && 9 == o.keyCode && t.scope.is_open && (a.contains(document.getElementById(t.scope.id), i) || a("#" + t.scope.id).find(".modaal-close").focus()), !t.options.is_locked && 27 == e && t.scope.is_open ? !a(document.activeElement).is("input:not(:checkbox):not(:radio)") && void t.modaal_close() : "image" == t.options.type ? (37 == e && t.scope.is_open && !a("#" + t.scope.id + " .modaal-gallery-prev").hasClass("is_hidden") && t.gallery_update("prev"), void (39 == e && t.scope.is_open && !a("#" + t.scope.id + " .modaal-gallery-next").hasClass("is_hidden") && t.gallery_update("next"))) : void 0;
      }), t.dom.on("click.Modaal", function (o) {
        var e = a(o.target);
        if (!t.options.is_locked && (t.options.overlay_close && e.is(".modaal-inner-wrapper") || e.is(".modaal-close") || e.closest(".modaal-close").length)) return void t.modaal_close();
        if (e.is(".modaal-confirm-btn")) return e.is(".modaal-ok") && t.options.confirm_callback.call(t, t.lastFocus), e.is(".modaal-cancel") && t.options.confirm_cancel_callback.call(t, t.lastFocus), void t.modaal_close();

        if (e.is(".modaal-gallery-control")) {
          if (e.hasClass("is_hidden")) return;
          return e.is(".modaal-gallery-prev") && t.gallery_update("prev"), void (e.is(".modaal-gallery-next") && t.gallery_update("next"));
        }
      });
    },
    build_modal: function build_modal(t) {
      var o = this,
          e = "";
      "instagram" == o.options.type && (e = " modaal-instagram");
      var i,
          l = "video" == o.options.type ? "modaal-video-wrap" : "modaal-content";

      switch (o.options.animation) {
        case "fade":
          i = " modaal-start_fade";
          break;

        case "slide-down":
          i = " modaal-start_slidedown";
          break;

        default:
          i = " modaal-start_none";
      }

      var n = "";
      o.options.fullscreen && (n = " modaal-fullscreen"), "" === o.options.custom_class && void 0 === o.options.custom_class || (o.options.custom_class = " " + o.options.custom_class);
      var s = "";
      o.options.width && o.options.height && "number" == typeof o.options.width && "number" == typeof o.options.height ? s = ' style="max-width:' + o.options.width + "px;height:" + o.options.height + 'px;overflow:auto;"' : o.options.width && "number" == typeof o.options.width ? s = ' style="max-width:' + o.options.width + 'px;"' : o.options.height && "number" == typeof o.options.height && (s = ' style="height:' + o.options.height + 'px;overflow:auto;"'), ("image" == o.options.type || "video" == o.options.type || "instagram" == o.options.type || o.options.fullscreen) && (s = "");
      var d = "";
      o.is_touch() && (d = ' style="cursor:pointer;"');
      var r = '<div class="modaal-wrapper modaal-' + o.options.type + i + e + n + o.options.custom_class + '" id="' + o.scope.id + '"><div class="modaal-outer-wrapper"><div class="modaal-inner-wrapper"' + d + ">";
      "video" != o.options.type && (r += '<div class="modaal-container"' + s + ">"), r += '<div class="' + l + ' modaal-focus" aria-hidden="false" aria-label="' + o.options.accessible_title + " - " + o.options.close_aria_label + '" role="dialog">', "inline" == o.options.type ? r += '<div class="modaal-content-container" role="document"></div>' : r += t, r += "</div>" + o.scope.close_btn, "video" != o.options.type && (r += "</div>"), r += "</div>", "image" == o.options.type && !0 === o.options.outer_controls && (r += o.scope.prev_btn + o.scope.next_btn), r += "</div></div>", a("#" + o.scope.id + "_overlay").length < 1 && o.dom.append(r), "inline" == o.options.type && t.appendTo("#" + o.scope.id + " .modaal-content-container"), o.modaal_overlay("show");
    },
    create_basic: function create_basic() {
      var t = this,
          o = a(t.scope.source),
          e = "";
      o.length ? (e = o.contents().detach(), o.empty()) : e = "Content could not be loaded. Please check the source and try again.", t.build_modal(e);
    },
    create_instagram: function create_instagram() {
      var t = this,
          o = t.options.instagram_id,
          e = "",
          i = "Instagram photo couldn't be loaded, please check the embed code and try again.";

      if (t.build_modal('<div class="modaal-content-container' + ("" != t.options.loading_class ? " " + t.options.loading_class : "") + '">' + t.options.loading_content + "</div>"), "" != o && null !== o && void 0 !== o) {
        var l = "https://api.instagram.com/oembed?url=http://instagr.am/p/" + o + "/";
        a.ajax({
          url: l,
          dataType: "jsonp",
          cache: !1,
          success: function success(o) {
            t.dom.append('<div id="temp-ig" style="width:0;height:0;overflow:hidden;">' + o.html + "</div>"), t.dom.attr("data-igloaded") ? window.instgrm.Embeds.process() : t.dom.attr("data-igloaded", "true");
            var e = "#" + t.scope.id + " .modaal-content-container";
            a(e).length > 0 && setTimeout(function () {
              a("#temp-ig").contents().clone().appendTo(e), a("#temp-ig").remove();
            }, 1e3);
          },
          error: function error() {
            e = i;
            var o = a("#" + t.scope.id + " .modaal-content-container");
            o.length > 0 && (o.removeClass(t.options.loading_class).addClass(t.options.ajax_error_class), o.html(e));
          }
        });
      } else e = i;

      return !1;
    },
    fetch_ajax: function fetch_ajax(t) {
      var o = this;
      null == o.options.accessible_title && (o.options.accessible_title = "Dialog Window"), null !== o.xhr && (o.xhr.abort(), o.xhr = null), o.build_modal('<div class="modaal-content-container' + ("" != o.options.loading_class ? " " + o.options.loading_class : "") + '">' + o.options.loading_content + "</div>"), o.xhr = a.ajax(t, {
        success: function success(t) {
          var e = a("#" + o.scope.id).find(".modaal-content-container");
          e.length > 0 && (e.removeClass(o.options.loading_class), e.html(t), o.options.ajax_success.call(o, e));
        },
        error: function error(t) {
          if ("abort" != t.statusText) {
            var e = a("#" + o.scope.id + " .modaal-content-container");
            e.length > 0 && (e.removeClass(o.options.loading_class).addClass(o.options.ajax_error_class), e.html("Content could not be loaded. Please check the source and try again."));
          }
        }
      });
    },
    create_confirm: function create_confirm() {
      var a,
          t = this;
      a = '<div class="modaal-content-container"><h1 id="modaal-title">' + t.options.confirm_title + '</h1><div class="modaal-confirm-content">' + t.options.confirm_content + '</div><div class="modaal-confirm-wrap"><button type="button" class="modaal-confirm-btn modaal-ok" aria-label="Confirm">' + t.options.confirm_button_text + '</button><button type="button" class="modaal-confirm-btn modaal-cancel" aria-label="Cancel">' + t.options.confirm_cancel_button_text + "</button></div></div></div>", t.build_modal(a);
    },
    create_image: function create_image() {
      var t,
          o,
          e = this,
          i = "";

      if (e.$elem.is("[data-group]") || e.$elem.is("[rel]")) {
        var l = e.$elem.is("[data-group]"),
            n = l ? e.$elem.attr("data-group") : e.$elem.attr("rel"),
            s = a(l ? '[data-group="' + n + '"]' : '[rel="' + n + '"]');
        s.removeAttr("data-gallery-active", "is_active"), e.$elem.attr("data-gallery-active", "is_active"), o = s.length - 1;
        var d = [];
        i = '<div class="modaal-gallery-item-wrap">', s.each(function (t, o) {
          var e = "",
              i = "",
              l = "",
              n = !1,
              s = !1,
              r = o.getAttribute("data-modaal-desc"),
              c = o.getAttribute("data-gallery-active");
          a(o).attr("data-modaal-content-source") ? e = a(o).attr("data-modaal-content-source") : a(o).attr("href") ? e = a(o).attr("href") : a(o).attr("src") ? e = a(o).attr("src") : (e = "trigger requires href or data-modaal-content-source attribute", s = !0), "" != r && null !== r && void 0 !== r ? (i = r, l = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (t + 1) + " - </span>" + r.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>") : l = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image ' + (t + 1) + "</span></div>", c && (n = !0);
          var m = {
            url: e,
            alt: i,
            rawdesc: r,
            desc: l,
            active: n,
            src_error: s
          };
          d.push(m);
        });

        for (var r = 0; r < d.length; r++) {
          var c = "",
              m = d[r].rawdesc ? "Image: " + d[r].rawdesc : "Image " + r + " no description";
          d[r].active && (c = " " + e.private_options.active_class);
          var p = d[r].src_error ? d[r].url : '<img src="' + d[r].url + '" alt=" " style="width:100%">';
          i += '<div class="modaal-gallery-item gallery-item-' + r + c + '" aria-label="' + m + '">' + p + d[r].desc + "</div>";
        }

        i += "</div>", 1 != e.options.outer_controls && (i += e.scope.prev_btn + e.scope.next_btn);
      } else {
        var u,
            _ = !1;

        e.$elem.attr("data-modaal-content-source") ? u = e.$elem.attr("data-modaal-content-source") : e.$elem.attr("href") ? u = e.$elem.attr("href") : e.$elem.attr("src") ? u = e.$elem.attr("src") : (u = "trigger requires href or data-modaal-content-source attribute", _ = !0);
        var v = "",
            f = "",
            m = "";
        e.$elem.attr("data-modaal-desc") ? (m = e.$elem.attr("data-modaal-desc"), v = e.$elem.attr("data-modaal-desc"), f = '<div class="modaal-gallery-label"><span class="modaal-accessible-hide">Image - </span>' + v.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>") : m = "Image with no description";
        var p = _ ? u : '<img src="' + u + '" alt=" " style="width:100%">';
        i = '<div class="modaal-gallery-item is_active" aria-label="' + m + '">' + p + f + "</div>";
      }

      t = i, e.build_modal(t), a(".modaal-gallery-item.is_active").is(".gallery-item-0") && a(".modaal-gallery-prev").hide(), a(".modaal-gallery-item.is_active").is(".gallery-item-" + o) && a(".modaal-gallery-next").hide();
    },
    gallery_update: function gallery_update(t) {
      var o = this,
          e = a("#" + o.scope.id),
          i = e.find(".modaal-gallery-item"),
          l = i.length - 1;
      if (0 == l) return !1;
      var n = e.find(".modaal-gallery-prev"),
          s = e.find(".modaal-gallery-next"),
          d = 0,
          r = 0,
          c = e.find(".modaal-gallery-item." + o.private_options.active_class),
          m = "next" == t ? c.next(".modaal-gallery-item") : c.prev(".modaal-gallery-item");
      return o.options.before_image_change.call(o, c, m), ("prev" != t || !e.find(".gallery-item-0").hasClass("is_active")) && ("next" != t || !e.find(".gallery-item-" + l).hasClass("is_active")) && void c.stop().animate({
        opacity: 0
      }, 250, function () {
        m.addClass("is_next").css({
          position: "absolute",
          display: "block",
          opacity: 0
        });
        var t = a(document).width(),
            i = t > 1140 ? 280 : 50;
        d = e.find(".modaal-gallery-item.is_next").width(), r = e.find(".modaal-gallery-item.is_next").height();
        var p = e.find(".modaal-gallery-item.is_next img").prop("naturalWidth"),
            u = e.find(".modaal-gallery-item.is_next img").prop("naturalHeight");
        p > t - i ? (d = t - i, e.find(".modaal-gallery-item.is_next").css({
          width: d
        }), e.find(".modaal-gallery-item.is_next img").css({
          width: d
        }), r = e.find(".modaal-gallery-item.is_next").find("img").height()) : (d = p, r = u), e.find(".modaal-gallery-item-wrap").stop().animate({
          width: d,
          height: r
        }, 250, function () {
          c.removeClass(o.private_options.active_class + " " + o.options.gallery_active_class).removeAttr("style"), c.find("img").removeAttr("style"), m.addClass(o.private_options.active_class + " " + o.options.gallery_active_class).removeClass("is_next").css("position", ""), m.stop().animate({
            opacity: 1
          }, 250, function () {
            a(this).removeAttr("style").css({
              width: "100%"
            }), a(this).find("img").css("width", "100%"), e.find(".modaal-gallery-item-wrap").removeAttr("style"), o.options.after_image_change.call(o, m);
          }), e.find(".modaal-gallery-item").removeAttr("tabindex"), e.find(".modaal-gallery-item." + o.private_options.active_class).attr("tabindex", "0").focus(), e.find(".modaal-gallery-item." + o.private_options.active_class).is(".gallery-item-0") ? n.stop().animate({
            opacity: 0
          }, 150, function () {
            a(this).hide();
          }) : n.stop().css({
            display: "block",
            opacity: n.css("opacity")
          }).animate({
            opacity: 1
          }, 150), e.find(".modaal-gallery-item." + o.private_options.active_class).is(".gallery-item-" + l) ? s.stop().animate({
            opacity: 0
          }, 150, function () {
            a(this).hide();
          }) : s.stop().css({
            display: "block",
            opacity: n.css("opacity")
          }).animate({
            opacity: 1
          }, 150);
        });
      });
    },
    create_video: function create_video(a) {
      var t,
          o = this;
      t = '<iframe src="' + a + '" class="modaal-video-frame" frameborder="0" allowfullscreen></iframe>', o.build_modal('<div class="modaal-video-container">' + t + "</div>");
    },
    create_iframe: function create_iframe(a) {
      var t,
          o = this;
      t = null !== o.options.width || void 0 !== o.options.width || null !== o.options.height || void 0 !== o.options.height ? '<iframe src="' + a + '" class="modaal-iframe-elem" frameborder="0" allowfullscreen></iframe>' : '<div class="modaal-content-container">Please specify a width and height for your iframe</div>', o.build_modal(t);
    },
    modaal_open: function modaal_open() {
      var t = this,
          o = a("#" + t.scope.id),
          e = t.options.animation;
      "none" === e && (o.removeClass("modaal-start_none"), t.options.after_open.call(t, o)), "fade" === e && o.removeClass("modaal-start_fade"), "slide-down" === e && o.removeClass("modaal-start_slide_down");
      var i = o;
      a(".modaal-wrapper *[tabindex=0]").removeAttr("tabindex"), i = "image" == t.options.type ? a("#" + t.scope.id).find(".modaal-gallery-item." + t.private_options.active_class) : o.find(".modaal-iframe-elem").length ? o.find(".modaal-iframe-elem") : o.find(".modaal-video-wrap").length ? o.find(".modaal-video-wrap") : o.find(".modaal-focus"), i.attr("tabindex", "0").focus(), "none" !== e && setTimeout(function () {
        t.options.after_open.call(t, o);
      }, t.options.after_callback_delay);
    },
    modaal_close: function modaal_close() {
      var t = this,
          o = a("#" + t.scope.id);
      t.options.before_close.call(t, o), null !== t.xhr && (t.xhr.abort(), t.xhr = null), "none" === t.options.animation && o.addClass("modaal-start_none"), "fade" === t.options.animation && o.addClass("modaal-start_fade"), "slide-down" === t.options.animation && o.addClass("modaal-start_slide_down"), setTimeout(function () {
        "inline" == t.options.type && a("#" + t.scope.id + " .modaal-content-container").contents().detach().appendTo(t.scope.source), o.remove(), t.options.after_close.call(t), t.scope.is_open = !1;
      }, t.options.after_callback_delay), t.modaal_overlay("hide"), null != t.lastFocus && t.lastFocus.focus();
    },
    modaal_overlay: function modaal_overlay(t) {
      var o = this;
      "show" == t ? (o.scope.is_open = !0, o.options.background_scroll || o.dom.addClass("modaal-noscroll"), a("#" + o.scope.id + "_overlay").length < 1 && o.dom.append('<div class="modaal-overlay" id="' + o.scope.id + '_overlay"></div>'), a("#" + o.scope.id + "_overlay").css("background", o.options.background).stop().animate({
        opacity: o.options.overlay_opacity
      }, o.options.animation_speed, function () {
        o.modaal_open();
      })) : "hide" == t && a("#" + o.scope.id + "_overlay").stop().animate({
        opacity: 0
      }, o.options.animation_speed, function () {
        a(this).remove(), o.dom.removeClass("modaal-noscroll");
      });
    },
    is_touch: function is_touch() {
      return "ontouchstart" in window || navigator.maxTouchPoints;
    }
  },
      e = [];
  a.fn.modaal = function (t) {
    return this.each(function (i) {
      var l = a(this).data("modaal");

      if (l) {
        if ("string" == typeof t) switch (t) {
          case "open":
            l.create_modaal(l);
            break;

          case "close":
            l.modaal_close();
        }
      } else {
        var n = Object.create(o);
        n.init(t, this), a.data(this, "modaal", n), e.push({
          element: a(this).attr("class"),
          options: t
        });
      }
    });
  }, a.fn.modaal.options = {
    type: "inline",
    content_source: null,
    animation: "fade",
    animation_speed: 300,
    after_callback_delay: 350,
    is_locked: !1,
    hide_close: !1,
    background: "#000",
    overlay_opacity: "0.8",
    overlay_close: !0,
    accessible_title: "Dialog Window",
    start_open: !1,
    fullscreen: !1,
    custom_class: "",
    background_scroll: !1,
    should_open: !0,
    close_text: "Close",
    close_aria_label: "Close (Press escape to close)",
    width: null,
    height: null,
    before_open: function before_open() {},
    after_open: function after_open() {},
    before_close: function before_close() {},
    after_close: function after_close() {},
    source: function source(a, t) {
      return t;
    },
    confirm_button_text: "Confirm",
    confirm_cancel_button_text: "Cancel",
    confirm_title: "Confirm Title",
    confirm_content: "<p>This is the default confirm dialog content. Replace me through the options</p>",
    confirm_callback: function confirm_callback() {},
    confirm_cancel_callback: function confirm_cancel_callback() {},
    gallery_active_class: "gallery_active_item",
    outer_controls: !1,
    before_image_change: function before_image_change(a, t) {},
    after_image_change: function after_image_change(a) {},
    loading_content: '<div class="modaal-loading-spinner"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>',
    loading_class: "is_loading",
    ajax_error_class: "modaal-error",
    ajax_success: function ajax_success() {},
    instagram_id: null
  }, a(function () {
    var o = a(".modaal");
    o.length && o.each(function () {
      t(a(this));
    });
    var i = new MutationObserver(function (o) {
      o.forEach(function (o) {
        if (o.addedNodes && o.addedNodes.length > 0) {
          [].some.call(o.addedNodes, function (o) {
            var i = a(o);
            (i.is("a") || i.is("button")) && (i.hasClass("modaal") ? t(i) : e.forEach(function (t) {
              if (t.element == i.attr("class")) return a(i).modaal(t.options), !1;
            }));
          });
        }
      });
    }),
        l = {
      subtree: !0,
      attributes: !0,
      childList: !0,
      characterData: !0
    };
    setTimeout(function () {
      i.observe(document.body, l);
    }, 500);
  });
}(jQuery, window, document);
"use strict";

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
(function () {
  var container, button, menu, links, i, len;
  container = document.getElementById('site-navigation');

  if (!container) {
    return;
  }

  button = container.getElementsByTagName('button')[0];

  if ('undefined' === typeof button) {
    return;
  }

  menu = container.getElementsByTagName('ul')[0]; // Hide menu toggle button if menu is empty and return early.

  if ('undefined' === typeof menu) {
    button.style.display = 'none';
    return;
  }

  menu.setAttribute('aria-expanded', 'false');

  if (-1 === menu.className.indexOf('nav-menu')) {
    menu.className += ' nav-menu';
  }

  button.onclick = function () {
    if (-1 !== container.className.indexOf('toggled')) {
      container.className = container.className.replace(' toggled', '');
      button.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-expanded', 'false');
    } else {
      container.className += ' toggled';
      button.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-expanded', 'true');
    }
  };

  var closeBtn = document.getElementById('menu-toggle--close'); // console.log(closeBtn);

  closeBtn.onclick = function () {
    if (-1 !== container.className.indexOf('toggled')) {
      container.className = container.className.replace(' toggled', '');
      button.setAttribute('aria-expanded', 'false');
      closeBtn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-expanded', 'false');
    } else {
      container.className += ' toggled';
      button.setAttribute('aria-expanded', 'true');
      closeBtn.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-expanded', 'true');
    }
  }; // Get all the link elements within the menu.


  links = menu.getElementsByTagName('a'); // Each time a menu link is focused or blurred, toggle focus.

  for (i = 0, len = links.length; i < len; i++) {
    links[i].addEventListener('focus', toggleFocus, true);
    links[i].addEventListener('blur', toggleFocus, true);
  }
  /**
   * Sets or removes .focus class on an element.
   */


  function toggleFocus() {
    var self = this; // Move up through the ancestors of the current link until we hit .nav-menu.

    while (-1 === self.className.indexOf('nav-menu')) {
      // On li elements toggle the class .focus.
      if ('li' === self.tagName.toLowerCase()) {
        if (-1 !== self.className.indexOf('focus')) {
          self.className = self.className.replace(' focus', '');
        } else {
          self.className += ' focus';
        }
      }

      self = self.parentElement;
    }
  }
  /**
   * Toggles `focus` class to allow submenu access on tablets.
   */


  (function (container) {
    var touchStartFn,
        i,
        parentLink = container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

    if ('ontouchstart' in window) {
      touchStartFn = function touchStartFn(e) {
        var menuItem = this.parentNode,
            i;

        if (!menuItem.classList.contains('focus')) {
          e.preventDefault();

          for (i = 0; i < menuItem.parentNode.children.length; ++i) {
            if (menuItem === menuItem.parentNode.children[i]) {
              continue;
            }

            menuItem.parentNode.children[i].classList.remove('focus');
          }

          menuItem.classList.add('focus');
        } else {
          menuItem.classList.remove('focus');
        }
      };

      for (i = 0; i < parentLink.length; ++i) {
        parentLink[i].addEventListener('touchstart', touchStartFn, false);
      }
    }
  })(container);
})();
"use strict";

/*! Pushy - v1.4.0 - 2020-12-28
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */
(function ($) {
  var pushy = $('.pushy'),
      //menu css class
  body = $('body'),
      push = $('.push'),
      //css class to add pushy capability
  pushyLeft = 'pushy-left',
      //css class for left menu position
  pushyOpenLeft = 'pushy-open-left',
      //css class when menu is open (left position)
  pushyOpenRight = 'pushy-open-right',
      //css class when menu is open (right position)
  siteOverlay = $('.site-overlay'),
      //site overlay
  menuLinkFocus = $(pushy.data('focus')),
      //focus on link when menu is open
  menuSpeed = 200,
      //jQuery fallback menu speed
  menuWidth = pushy.width() + 'px',
      //jQuery fallback menu width
  submenuClass = '.pushy-submenu',
      submenuOpenClass = 'pushy-submenu-open',
      submenuClosedClass = 'pushy-submenu-closed'; //check if menu-btn-selector data attribute exists

  if (typeof pushy.data('menu-btn-selector') !== 'undefined') {
    var menuBtnClass = pushy.data('menu-btn-selector'); //take user defined menu button CSS class
  } else {
    var menuBtnClass = '.menu-btn'; //set default menu button CSS class
  } //css classes to toggle the menu


  var menuBtn = $(menuBtnClass + ', .pushy-link'); //css class to focus when menu is closed w/ esc key

  var menuBtnFocus = $(menuBtnClass); // check if container-selector data attribute exists

  var containerSelector = '#container';

  if (typeof pushy.data('container-selector') !== 'undefined') {
    containerSelector = pushy.data('container-selector');
  }

  var container = $(containerSelector); //close menu w/ esc key

  $(document).on('keyup', function (e) {
    //check if esc key is pressed
    if (e.keyCode == 27) {
      //check if menu is open
      if (body.hasClass(pushyOpenLeft) || body.hasClass(pushyOpenRight)) {
        if (cssTransforms3d) {
          closePushy(); //close pushy
        } else {
          closePushyFallback();
          opened = false; //set menu state
        } //focus on menu button after menu is closed


        if (menuBtnFocus) {
          menuBtnFocus.trigger('focus');
        }
      }
    }
  });

  function togglePushy() {
    //add class to body based on menu position
    if (pushy.hasClass(pushyLeft)) {
      body.toggleClass(pushyOpenLeft);
    } else {
      body.toggleClass(pushyOpenRight);
    } //focus on link in menu after css transition ends


    if (menuLinkFocus) {
      pushy.one('transitionend', function () {
        menuLinkFocus.trigger('focus');
      });
    }
  }

  function closePushy() {
    if (pushy.hasClass(pushyLeft)) {
      body.removeClass(pushyOpenLeft);
    } else {
      body.removeClass(pushyOpenRight);
    }
  }

  function openPushyFallback() {
    //animate menu position based on CSS class
    if (pushy.hasClass(pushyLeft)) {
      body.addClass(pushyOpenLeft);
      pushy.animate({
        left: "0px"
      }, menuSpeed);
      container.animate({
        left: menuWidth
      }, menuSpeed); //css class to add pushy capability

      push.animate({
        left: menuWidth
      }, menuSpeed);
    } else {
      body.addClass(pushyOpenRight);
      pushy.animate({
        right: '0px'
      }, menuSpeed);
      container.animate({
        right: menuWidth
      }, menuSpeed);
      push.animate({
        right: menuWidth
      }, menuSpeed);
    } //focus on link in menu


    if (menuLinkFocus) {
      menuLinkFocus.trigger('focus');
    }
  }

  function closePushyFallback() {
    //animate menu position based on CSS class
    if (pushy.hasClass(pushyLeft)) {
      body.removeClass(pushyOpenLeft);
      pushy.animate({
        left: "-" + menuWidth
      }, menuSpeed);
      container.animate({
        left: "0px"
      }, menuSpeed); //css class to add pushy capability

      push.animate({
        left: "0px"
      }, menuSpeed);
    } else {
      body.removeClass(pushyOpenRight);
      pushy.animate({
        right: "-" + menuWidth
      }, menuSpeed);
      container.animate({
        right: "0px"
      }, menuSpeed);
      push.animate({
        right: "0px"
      }, menuSpeed);
    }
  }

  function toggleSubmenu() {
    //hide submenu by default
    $(submenuClass).addClass(submenuClosedClass);
    $(submenuClass).on('click', function (e) {
      var selected = $(this);

      if (selected.hasClass(submenuClosedClass)) {
        //hide same-level opened submenus
        selected.siblings(submenuClass).addClass(submenuClosedClass).removeClass(submenuOpenClass); //show submenu

        selected.removeClass(submenuClosedClass).addClass(submenuOpenClass);
      } else {
        //hide submenu
        selected.addClass(submenuClosedClass).removeClass(submenuOpenClass);
      } // prevent event to be triggered on parent


      e.stopPropagation();
    });
  } //checks if 3d transforms are supported removing the modernizr dependency


  var cssTransforms3d = function csstransforms3d() {
    var el = document.createElement('p'),
        supported = false,
        transforms = {
      'webkitTransform': '-webkit-transform',
      'OTransform': '-o-transform',
      'msTransform': '-ms-transform',
      'MozTransform': '-moz-transform',
      'transform': 'transform'
    };

    if (document.body !== null) {
      // Add it to the body to get the computed style
      document.body.insertBefore(el, null);

      for (var t in transforms) {
        if (el.style[t] !== undefined) {
          el.style[t] = 'translate3d(1px,1px,1px)';
          supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
        }
      }

      document.body.removeChild(el);
      return supported !== undefined && supported.length > 0 && supported !== "none";
    } else {
      return false;
    }
  }();

  if (cssTransforms3d) {
    //toggle submenu
    toggleSubmenu(); //toggle menu

    menuBtn.on('click', function () {
      togglePushy();
    }); //close menu when clicking site overlay

    siteOverlay.on('click', function () {
      togglePushy();
    });
  } else {
    //add css class to body
    body.addClass('no-csstransforms3d'); //hide menu by default

    if (pushy.hasClass(pushyLeft)) {
      pushy.css({
        left: "-" + menuWidth
      });
    } else {
      pushy.css({
        right: "-" + menuWidth
      });
    } //fixes IE scrollbar issue


    container.css({
      "overflow-x": "hidden"
    }); //keep track of menu state (open/close)

    var opened = false; //toggle submenu

    toggleSubmenu(); //toggle menu

    menuBtn.on('click', function () {
      if (opened) {
        closePushyFallback();
        opened = false;
      } else {
        openPushyFallback();
        opened = true;
      }
    }); //close menu when clicking site overlay

    siteOverlay.on('click', function () {
      if (opened) {
        closePushyFallback();
        opened = false;
      } else {
        openPushyFallback();
        opened = true;
      }
    });
  }
})(jQuery);
"use strict";

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
  var isIe = /(trident|msie)/i.test(navigator.userAgent);

  if (isIe && document.getElementById && window.addEventListener) {
    window.addEventListener('hashchange', function () {
      var id = location.hash.substring(1),
          element;

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      element = document.getElementById(id);

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
})();
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

/* global window, document, define, jQuery, setInterval, clearInterval */
;

(function (factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(function ($) {
  'use strict';

  var Slick = window.Slick || {};

  Slick = function () {
    var instanceUid = 0;

    function Slick(element, settings) {
      var _ = this,
          dataSettings;

      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function customPaging(slider, i) {
          return $('<button type="button" />').text(i + 1);
        },
        dots: false,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000
      };
      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false
      };
      $.extend(_, _.initials);
      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = 'hidden';
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = 'visibilitychange';
      _.windowWidth = 0;
      _.windowTimer = null;
      dataSettings = $(element).data('slick') || {};
      _.options = $.extend({}, _.defaults, settings, dataSettings);
      _.currentSlide = _.options.initialSlide;
      _.originalSettings = _.options;

      if (typeof document.mozHidden !== 'undefined') {
        _.hidden = 'mozHidden';
        _.visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        _.hidden = 'webkitHidden';
        _.visibilityChange = 'webkitvisibilitychange';
      }

      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);
      _.instanceUid = instanceUid++; // A simple way to check for HTML strings
      // Strict HTML recognition (must start with <)
      // Extracted from jQuery v1.11 source

      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

      _.registerBreakpoints();

      _.init(true);
    }

    return Slick;
  }();

  Slick.prototype.activateADA = function () {
    var _ = this;

    _.$slideTrack.find('.slick-active').attr({
      'aria-hidden': 'false'
    }).find('a, input, button, select').attr({
      'tabindex': '0'
    });
  };

  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
    var _ = this;

    if (typeof index === 'boolean') {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }

    _.unload();

    if (typeof index === 'number') {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index);
    });

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.animateHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.animate({
        height: targetHeight
      }, _.options.speed);
    }
  };

  Slick.prototype.animateSlide = function (targetLeft, callback) {
    var animProps = {},
        _ = this;

    _.animateHeight();

    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }

    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate({
          left: targetLeft
        }, _.options.speed, _.options.easing, callback);
      } else {
        _.$slideTrack.animate({
          top: targetLeft
        }, _.options.speed, _.options.easing, callback);
      }
    } else {
      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }

        $({
          animStart: _.currentLeft
        }).animate({
          animStart: targetLeft
        }, {
          duration: _.options.speed,
          easing: _.options.easing,
          step: function step(now) {
            now = Math.ceil(now);

            if (_.options.vertical === false) {
              animProps[_.animType] = 'translate(' + now + 'px, 0px)';

              _.$slideTrack.css(animProps);
            } else {
              animProps[_.animType] = 'translate(0px,' + now + 'px)';

              _.$slideTrack.css(animProps);
            }
          },
          complete: function complete() {
            if (callback) {
              callback.call();
            }
          }
        });
      } else {
        _.applyTransition();

        targetLeft = Math.ceil(targetLeft);

        if (_.options.vertical === false) {
          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }

        _.$slideTrack.css(animProps);

        if (callback) {
          setTimeout(function () {
            _.disableTransition();

            callback.call();
          }, _.options.speed);
        }
      }
    }
  };

  Slick.prototype.getNavTarget = function () {
    var _ = this,
        asNavFor = _.options.asNavFor;

    if (asNavFor && asNavFor !== null) {
      asNavFor = $(asNavFor).not(_.$slider);
    }

    return asNavFor;
  };

  Slick.prototype.asNavFor = function (index) {
    var _ = this,
        asNavFor = _.getNavTarget();

    if (asNavFor !== null && _typeof(asNavFor) === 'object') {
      asNavFor.each(function () {
        var target = $(this).slick('getSlick');

        if (!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }
  };

  Slick.prototype.applyTransition = function (slide) {
    var _ = this,
        transition = {};

    if (_.options.fade === false) {
      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
    } else {
      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
    }

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.autoPlay = function () {
    var _ = this;

    _.autoPlayClear();

    if (_.slideCount > _.options.slidesToShow) {
      _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
    }
  };

  Slick.prototype.autoPlayClear = function () {
    var _ = this;

    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };

  Slick.prototype.autoPlayIterator = function () {
    var _ = this,
        slideTo = _.currentSlide + _.options.slidesToScroll;

    if (!_.paused && !_.interrupted && !_.focussed) {
      if (_.options.infinite === false) {
        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        } else if (_.direction === 0) {
          slideTo = _.currentSlide - _.options.slidesToScroll;

          if (_.currentSlide - 1 === 0) {
            _.direction = 1;
          }
        }
      }

      _.slideHandler(slideTo);
    }
  };

  Slick.prototype.buildArrows = function () {
    var _ = this;

    if (_.options.arrows === true) {
      _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
      _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

      if (_.slideCount > _.options.slidesToShow) {
        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }

        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }

        if (_.options.infinite !== true) {
          _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        }
      } else {
        _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
          'aria-disabled': 'true',
          'tabindex': '-1'
        });
      }
    }
  };

  Slick.prototype.buildDots = function () {
    var _ = this,
        i,
        dot;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$slider.addClass('slick-dotted');

      dot = $('<ul />').addClass(_.options.dotsClass);

      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
      }

      _.$dots = dot.appendTo(_.options.appendDots);

      _.$dots.find('li').first().addClass('slick-active');
    }
  };

  Slick.prototype.buildOut = function () {
    var _ = this;

    _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');
    _.slideCount = _.$slides.length;

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
    });

    _.$slider.addClass('slick-slider');

    _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
    _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();

    _.$slideTrack.css('opacity', 0);

    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }

    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

    _.setupInfinite();

    _.buildArrows();

    _.buildDots();

    _.updateDots();

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    if (_.options.draggable === true) {
      _.$list.addClass('draggable');
    }
  };

  Slick.prototype.buildRows = function () {
    var _ = this,
        a,
        b,
        c,
        newSlides,
        numOfSlides,
        originalSlides,
        slidesPerSection;

    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();

    if (_.options.rows > 0) {
      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement('div');

        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement('div');

          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);

            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }

          slide.appendChild(row);
        }

        newSlides.appendChild(slide);
      }

      _.$slider.empty().append(newSlides);

      _.$slider.children().children().children().css({
        'width': 100 / _.options.slidesPerRow + '%',
        'display': 'inline-block'
      });
    }
  };

  Slick.prototype.checkResponsive = function (initial, forceUpdate) {
    var _ = this,
        breakpoint,
        targetBreakpoint,
        respondToWidth,
        triggerBreakpoint = false;

    var sliderWidth = _.$slider.width();

    var windowWidth = window.innerWidth || $(window).width();

    if (_.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (_.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }

    if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
      targetBreakpoint = null;

      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }

      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint = targetBreakpoint;

            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }

              _.refresh(initial);
            }

            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;

          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }

            _.refresh(initial);
          }

          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;

          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }

          _.refresh(initial);

          triggerBreakpoint = targetBreakpoint;
        }
      } // only trigger breakpoints during an actual break. not on initialize.


      if (!initial && triggerBreakpoint !== false) {
        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
      }
    }
  };

  Slick.prototype.changeSlide = function (event, dontAnimate) {
    var _ = this,
        $target = $(event.currentTarget),
        indexOffset,
        slideOffset,
        unevenOffset; // If target is a link, prevent default action.


    if ($target.is('a')) {
      event.preventDefault();
    } // If target is not the <li> element (ie: a child), find the <li>.


    if (!$target.is('li')) {
      $target = $target.closest('li');
    }

    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

    switch (event.data.message) {
      case 'previous':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }

        break;

      case 'next':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }

        break;

      case 'index':
        var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

        _.slideHandler(_.checkNavigable(index), false, dontAnimate);

        $target.children().trigger('focus');
        break;

      default:
        return;
    }
  };

  Slick.prototype.checkNavigable = function (index) {
    var _ = this,
        navigables,
        prevNavigable;

    navigables = _.getNavigableIndexes();
    prevNavigable = 0;

    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }

        prevNavigable = navigables[n];
      }
    }

    return index;
  };

  Slick.prototype.cleanUpEvents = function () {
    var _ = this;

    if (_.options.dots && _.$dots !== null) {
      $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

      if (_.options.accessibility === true) {
        _.$dots.off('keydown.slick', _.keyHandler);
      }
    }

    _.$slider.off('focus.slick blur.slick');

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
        _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
      }
    }

    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);

    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);

    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);

    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

    _.$list.off('click.slick', _.clickHandler);

    $(document).off(_.visibilityChange, _.visibility);

    _.cleanUpSlideEvents();

    if (_.options.accessibility === true) {
      _.$list.off('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
    }

    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
  };

  Slick.prototype.cleanUpSlideEvents = function () {
    var _ = this;

    _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));

    _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
  };

  Slick.prototype.cleanUpRows = function () {
    var _ = this,
        originalSlides;

    if (_.options.rows > 0) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr('style');

      _.$slider.empty().append(originalSlides);
    }
  };

  Slick.prototype.clickHandler = function (event) {
    var _ = this;

    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  Slick.prototype.destroy = function (refresh) {
    var _ = this;

    _.autoPlayClear();

    _.touchObject = {};

    _.cleanUpEvents();

    $('.slick-cloned', _.$slider).detach();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.$prevArrow.length) {
      _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove();
      }
    }

    if (_.$nextArrow && _.$nextArrow.length) {
      _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove();
      }
    }

    if (_.$slides) {
      _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
        $(this).attr('style', $(this).data('originalStyling'));
      });

      _.$slideTrack.children(this.options.slide).detach();

      _.$slideTrack.detach();

      _.$list.detach();

      _.$slider.append(_.$slides);
    }

    _.cleanUpRows();

    _.$slider.removeClass('slick-slider');

    _.$slider.removeClass('slick-initialized');

    _.$slider.removeClass('slick-dotted');

    _.unslicked = true;

    if (!refresh) {
      _.$slider.trigger('destroy', [_]);
    }
  };

  Slick.prototype.disableTransition = function (slide) {
    var _ = this,
        transition = {};

    transition[_.transitionType] = '';

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.fadeSlide = function (slideIndex, callback) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).css({
        zIndex: _.options.zIndex
      });

      _.$slides.eq(slideIndex).animate({
        opacity: 1
      }, _.options.speed, _.options.easing, callback);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 1,
        zIndex: _.options.zIndex
      });

      if (callback) {
        setTimeout(function () {
          _.disableTransition(slideIndex);

          callback.call();
        }, _.options.speed);
      }
    }
  };

  Slick.prototype.fadeSlideOut = function (slideIndex) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).animate({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      }, _.options.speed, _.options.easing);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      });
    }
  };

  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
    var _ = this;

    if (filter !== null) {
      _.$slidesCache = _.$slides;

      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.focusHandler = function () {
    var _ = this; // If any child element receives focus within the slider we need to pause the autoplay


    _.$slider.off('focus.slick blur.slick').on('focus.slick', '*', function (event) {
      var $sf = $(this);
      setTimeout(function () {
        if (_.options.pauseOnFocus) {
          if ($sf.is(':focus')) {
            _.focussed = true;

            _.autoPlay();
          }
        }
      }, 0);
    }).on('blur.slick', '*', function (event) {
      var $sf = $(this); // When a blur occurs on any elements within the slider we become unfocused

      if (_.options.pauseOnFocus) {
        _.focussed = false;

        _.autoPlay();
      }
    });
  };

  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
    var _ = this;

    return _.currentSlide;
  };

  Slick.prototype.getDotCount = function () {
    var _ = this;

    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;

    if (_.options.infinite === true) {
      if (_.slideCount <= _.options.slidesToShow) {
        ++pagerQty;
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if (!_.options.asNavFor) {
      pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }
    }

    return pagerQty - 1;
  };

  Slick.prototype.getLeft = function (slideIndex) {
    var _ = this,
        targetLeft,
        verticalHeight,
        verticalOffset = 0,
        targetSlide,
        coef;

    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);

    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        coef = -1;

        if (_.options.vertical === true && _.options.centerMode === true) {
          if (_.options.slidesToShow === 2) {
            coef = -1.5;
          } else if (_.options.slidesToShow === 1) {
            coef = -2;
          }
        }

        verticalOffset = verticalHeight * _.options.slidesToShow * coef;
      }

      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
          if (slideIndex > _.slideCount) {
            _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
            verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
          } else {
            _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
            verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }

    if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
      _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
    } else if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }

    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }

    if (_.options.variableWidth === true) {
      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
      }

      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        } else {
          targetLeft = 0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }

      if (_.options.centerMode === true) {
        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        }

        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
          } else {
            targetLeft = 0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }

        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }

    return targetLeft;
  };

  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
    var _ = this;

    return _.options[option];
  };

  Slick.prototype.getNavigableIndexes = function () {
    var _ = this,
        breakPoint = 0,
        counter = 0,
        indexes = [],
        max;

    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }

    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    }

    return indexes;
  };

  Slick.prototype.getSlick = function () {
    return this;
  };

  Slick.prototype.getSlideCount = function () {
    var _ = this,
        slidesTraversed,
        swipedSlide,
        swipeTarget,
        centerOffset;

    centerOffset = _.options.centerMode === true ? Math.floor(_.$list.width() / 2) : 0;
    swipeTarget = _.swipeLeft * -1 + centerOffset;

    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find('.slick-slide').each(function (index, slide) {
        var slideOuterWidth, slideOffset, slideRightBoundary;
        slideOuterWidth = $(slide).outerWidth();
        slideOffset = slide.offsetLeft;

        if (_.options.centerMode !== true) {
          slideOffset += slideOuterWidth / 2;
        }

        slideRightBoundary = slideOffset + slideOuterWidth;

        if (swipeTarget < slideRightBoundary) {
          swipedSlide = slide;
          return false;
        }
      });

      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };

  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'index',
        index: parseInt(slide)
      }
    }, dontAnimate);
  };

  Slick.prototype.init = function (creation) {
    var _ = this;

    if (!$(_.$slider).hasClass('slick-initialized')) {
      $(_.$slider).addClass('slick-initialized');

      _.buildRows();

      _.buildOut();

      _.setProps();

      _.startLoad();

      _.loadSlider();

      _.initializeEvents();

      _.updateArrows();

      _.updateDots();

      _.checkResponsive(true);

      _.focusHandler();
    }

    if (creation) {
      _.$slider.trigger('init', [_]);
    }

    if (_.options.accessibility === true) {
      _.initADA();
    }

    if (_.options.autoplay) {
      _.paused = false;

      _.autoPlay();
    }
  };

  Slick.prototype.initADA = function () {
    var _ = this,
        numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
        tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
      return val >= 0 && val < _.slideCount;
    });

    _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
      'aria-hidden': 'true',
      'tabindex': '-1'
    }).find('a, input, button, select').attr({
      'tabindex': '-1'
    });

    if (_.$dots !== null) {
      _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
        var slideControlIndex = tabControlIndexes.indexOf(i);
        $(this).attr({
          'role': 'tabpanel',
          'id': 'slick-slide' + _.instanceUid + i,
          'tabindex': -1
        });

        if (slideControlIndex !== -1) {
          var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;

          if ($('#' + ariaButtonControl).length) {
            $(this).attr({
              'aria-describedby': ariaButtonControl
            });
          }
        }
      });

      _.$dots.attr('role', 'tablist').find('li').each(function (i) {
        var mappedSlideIndex = tabControlIndexes[i];
        $(this).attr({
          'role': 'presentation'
        });
        $(this).find('button').first().attr({
          'role': 'tab',
          'id': 'slick-slide-control' + _.instanceUid + i,
          'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
          'aria-label': i + 1 + ' of ' + numDotGroups,
          'aria-selected': null,
          'tabindex': '-1'
        });
      }).eq(_.currentSlide).find('button').attr({
        'aria-selected': 'true',
        'tabindex': '0'
      }).end();
    }

    for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
      if (_.options.focusOnChange) {
        _.$slides.eq(i).attr({
          'tabindex': '0'
        });
      } else {
        _.$slides.eq(i).removeAttr('tabindex');
      }
    }

    _.activateADA();
  };

  Slick.prototype.initArrowEvents = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.off('click.slick').on('click.slick', {
        message: 'previous'
      }, _.changeSlide);

      _.$nextArrow.off('click.slick').on('click.slick', {
        message: 'next'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow.on('keydown.slick', _.keyHandler);

        _.$nextArrow.on('keydown.slick', _.keyHandler);
      }
    }
  };

  Slick.prototype.initDotEvents = function () {
    var _ = this;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('click.slick', {
        message: 'index'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$dots.on('keydown.slick', _.keyHandler);
      }
    }

    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initSlideEvents = function () {
    var _ = this;

    if (_.options.pauseOnHover) {
      _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));

      _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initializeEvents = function () {
    var _ = this;

    _.initArrowEvents();

    _.initDotEvents();

    _.initSlideEvents();

    _.$list.on('touchstart.slick mousedown.slick', {
      action: 'start'
    }, _.swipeHandler);

    _.$list.on('touchmove.slick mousemove.slick', {
      action: 'move'
    }, _.swipeHandler);

    _.$list.on('touchend.slick mouseup.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('touchcancel.slick mouseleave.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('click.slick', _.clickHandler);

    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

    if (_.options.accessibility === true) {
      _.$list.on('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
    $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(_.setPosition);
  };

  Slick.prototype.initUI = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.show();

      _.$nextArrow.show();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.show();
    }
  };

  Slick.prototype.keyHandler = function (event) {
    var _ = this; //Dont slide if the cursor is inside the form fields and arrow keys are pressed


    if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'next' : 'previous'
          }
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'previous' : 'next'
          }
        });
      }
    }
  };

  Slick.prototype.lazyLoad = function () {
    var _ = this,
        loadRange,
        cloneRange,
        rangeStart,
        rangeEnd;

    function loadImages(imagesScope) {
      $('img[data-lazy]', imagesScope).each(function () {
        var image = $(this),
            imageSource = $(this).attr('data-lazy'),
            imageSrcSet = $(this).attr('data-srcset'),
            imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
            imageToLoad = document.createElement('img');

        imageToLoad.onload = function () {
          image.animate({
            opacity: 0
          }, 100, function () {
            if (imageSrcSet) {
              image.attr('srcset', imageSrcSet);

              if (imageSizes) {
                image.attr('sizes', imageSizes);
              }
            }

            image.attr('src', imageSource).animate({
              opacity: 1
            }, 200, function () {
              image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
            });

            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
          });
        };

        imageToLoad.onerror = function () {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
        };

        imageToLoad.src = imageSource;
      });
    }

    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);

      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }

    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

    if (_.options.lazyLoad === 'anticipated') {
      var prevSlide = rangeStart - 1,
          nextSlide = rangeEnd,
          $slides = _.$slider.find('.slick-slide');

      for (var i = 0; i < _.options.slidesToScroll; i++) {
        if (prevSlide < 0) prevSlide = _.slideCount - 1;
        loadRange = loadRange.add($slides.eq(prevSlide));
        loadRange = loadRange.add($slides.eq(nextSlide));
        prevSlide--;
        nextSlide++;
      }
    }

    loadImages(loadRange);

    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-slide');
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };

  Slick.prototype.loadSlider = function () {
    var _ = this;

    _.setPosition();

    _.$slideTrack.css({
      opacity: 1
    });

    _.$slider.removeClass('slick-loading');

    _.initUI();

    if (_.options.lazyLoad === 'progressive') {
      _.progressiveLazyLoad();
    }
  };

  Slick.prototype.next = Slick.prototype.slickNext = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'next'
      }
    });
  };

  Slick.prototype.orientationChange = function () {
    var _ = this;

    _.checkResponsive();

    _.setPosition();
  };

  Slick.prototype.pause = Slick.prototype.slickPause = function () {
    var _ = this;

    _.autoPlayClear();

    _.paused = true;
  };

  Slick.prototype.play = Slick.prototype.slickPlay = function () {
    var _ = this;

    _.autoPlay();

    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;
  };

  Slick.prototype.postSlide = function (index) {
    var _ = this;

    if (!_.unslicked) {
      _.$slider.trigger('afterChange', [_, index]);

      _.animating = false;

      if (_.slideCount > _.options.slidesToShow) {
        _.setPosition();
      }

      _.swipeLeft = null;

      if (_.options.autoplay) {
        _.autoPlay();
      }

      if (_.options.accessibility === true) {
        _.initADA();

        if (_.options.focusOnChange) {
          var $currentSlide = $(_.$slides.get(_.currentSlide));
          $currentSlide.attr('tabindex', 0).focus();
        }
      }
    }
  };

  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'previous'
      }
    });
  };

  Slick.prototype.preventDefault = function (event) {
    event.preventDefault();
  };

  Slick.prototype.progressiveLazyLoad = function (tryCount) {
    tryCount = tryCount || 1;

    var _ = this,
        $imgsToLoad = $('img[data-lazy]', _.$slider),
        image,
        imageSource,
        imageSrcSet,
        imageSizes,
        imageToLoad;

    if ($imgsToLoad.length) {
      image = $imgsToLoad.first();
      imageSource = image.attr('data-lazy');
      imageSrcSet = image.attr('data-srcset');
      imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
      imageToLoad = document.createElement('img');

      imageToLoad.onload = function () {
        if (imageSrcSet) {
          image.attr('srcset', imageSrcSet);

          if (imageSizes) {
            image.attr('sizes', imageSizes);
          }
        }

        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }

        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);

        _.progressiveLazyLoad();
      };

      imageToLoad.onerror = function () {
        if (tryCount < 3) {
          /**
           * try to load the image 3 times,
           * leave a slight delay so we don't get
           * servers blocking the request.
           */
          setTimeout(function () {
            _.progressiveLazyLoad(tryCount + 1);
          }, 500);
        } else {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

          _.progressiveLazyLoad();
        }
      };

      imageToLoad.src = imageSource;
    } else {
      _.$slider.trigger('allImagesLoaded', [_]);
    }
  };

  Slick.prototype.refresh = function (initializing) {
    var _ = this,
        currentSlide,
        lastVisibleIndex;

    lastVisibleIndex = _.slideCount - _.options.slidesToShow; // in non-infinite sliders, we don't want to go past the
    // last visible index.

    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    } // if less slides than to show, go to start.


    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    currentSlide = _.currentSlide;

    _.destroy(true);

    $.extend(_, _.initials, {
      currentSlide: currentSlide
    });

    _.init();

    if (!initializing) {
      _.changeSlide({
        data: {
          message: 'index',
          index: currentSlide
        }
      }, false);
    }
  };

  Slick.prototype.registerBreakpoints = function () {
    var _ = this,
        breakpoint,
        currentBreakpoint,
        l,
        responsiveSettings = _.options.responsive || null;

    if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
      _.respondTo = _.options.respondTo || 'window';

      for (breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;

        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint; // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.

          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }

            l--;
          }

          _.breakpoints.push(currentBreakpoint);

          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
        }
      }

      _.breakpoints.sort(function (a, b) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  };

  Slick.prototype.reinit = function () {
    var _ = this;

    _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');
    _.slideCount = _.$slides.length;

    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    _.registerBreakpoints();

    _.setProps();

    _.setupInfinite();

    _.buildArrows();

    _.updateArrows();

    _.initArrowEvents();

    _.buildDots();

    _.updateDots();

    _.initDotEvents();

    _.cleanUpSlideEvents();

    _.initSlideEvents();

    _.checkResponsive(false, true);

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    _.setPosition();

    _.focusHandler();

    _.paused = !_.options.autoplay;

    _.autoPlay();

    _.$slider.trigger('reInit', [_]);
  };

  Slick.prototype.resize = function () {
    var _ = this;

    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function () {
        _.windowWidth = $(window).width();

        _.checkResponsive();

        if (!_.unslicked) {
          _.setPosition();
        }
      }, 50);
    }
  };

  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
    var _ = this;

    if (typeof index === 'boolean') {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }

    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }

    _.unload();

    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.setCSS = function (position) {
    var _ = this,
        positionProps = {},
        x,
        y;

    if (_.options.rtl === true) {
      position = -position;
    }

    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
    positionProps[_.positionProp] = position;

    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};

      if (_.cssTransitions === false) {
        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';

        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';

        _.$slideTrack.css(positionProps);
      }
    }
  };

  Slick.prototype.setDimensions = function () {
    var _ = this;

    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: '0px ' + _.options.centerPadding
        });
      }
    } else {
      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);

      if (_.options.centerMode === true) {
        _.$list.css({
          padding: _.options.centerPadding + ' 0px'
        });
      }
    }

    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();

    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);

      _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);

      _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
    }

    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();

    if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
  };

  Slick.prototype.setFade = function () {
    var _ = this,
        targetLeft;

    _.$slides.each(function (index, element) {
      targetLeft = _.slideWidth * index * -1;

      if (_.options.rtl === true) {
        $(element).css({
          position: 'relative',
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      } else {
        $(element).css({
          position: 'relative',
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      }
    });

    _.$slides.eq(_.currentSlide).css({
      zIndex: _.options.zIndex - 1,
      opacity: 1
    });
  };

  Slick.prototype.setHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.css('height', targetHeight);
    }
  };

  Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
    /**
     * accepts arguments in format of:
     *
     *  - for changing a single option's value:
     *     .slick("setOption", option, value, refresh )
     *
     *  - for changing a set of responsive options:
     *     .slick("setOption", 'responsive', [{}, ...], refresh )
     *
     *  - for updating multiple values at once (not responsive)
     *     .slick("setOption", { 'option': value, ... }, refresh )
     */
    var _ = this,
        l,
        item,
        option,
        value,
        refresh = false,
        type;

    if ($.type(arguments[0]) === 'object') {
      option = arguments[0];
      refresh = arguments[1];
      type = 'multiple';
    } else if ($.type(arguments[0]) === 'string') {
      option = arguments[0];
      value = arguments[1];
      refresh = arguments[2];

      if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
        type = 'responsive';
      } else if (typeof arguments[1] !== 'undefined') {
        type = 'single';
      }
    }

    if (type === 'single') {
      _.options[option] = value;
    } else if (type === 'multiple') {
      $.each(option, function (opt, val) {
        _.options[opt] = val;
      });
    } else if (type === 'responsive') {
      for (item in value) {
        if ($.type(_.options.responsive) !== 'array') {
          _.options.responsive = [value[item]];
        } else {
          l = _.options.responsive.length - 1; // loop through the responsive object and splice out duplicates.

          while (l >= 0) {
            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
              _.options.responsive.splice(l, 1);
            }

            l--;
          }

          _.options.responsive.push(value[item]);
        }
      }
    }

    if (refresh) {
      _.unload();

      _.reinit();
    }
  };

  Slick.prototype.setPosition = function () {
    var _ = this;

    _.setDimensions();

    _.setHeight();

    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }

    _.$slider.trigger('setPosition', [_]);
  };

  Slick.prototype.setProps = function () {
    var _ = this,
        bodyStyle = document.body.style;

    _.positionProp = _.options.vertical === true ? 'top' : 'left';

    if (_.positionProp === 'top') {
      _.$slider.addClass('slick-vertical');
    } else {
      _.$slider.removeClass('slick-vertical');
    }

    if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }

    if (_.options.fade) {
      if (typeof _.options.zIndex === 'number') {
        if (_.options.zIndex < 3) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }

    if (bodyStyle.OTransform !== undefined) {
      _.animType = 'OTransform';
      _.transformType = '-o-transform';
      _.transitionType = 'OTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.MozTransform !== undefined) {
      _.animType = 'MozTransform';
      _.transformType = '-moz-transform';
      _.transitionType = 'MozTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = 'webkitTransform';
      _.transformType = '-webkit-transform';
      _.transitionType = 'webkitTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.msTransform !== undefined) {
      _.animType = 'msTransform';
      _.transformType = '-ms-transform';
      _.transitionType = 'msTransition';
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }

    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = 'transform';
      _.transformType = 'transform';
      _.transitionType = 'transition';
    }

    _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
  };

  Slick.prototype.setSlideClasses = function (index) {
    var _ = this,
        centerOffset,
        allSlides,
        indexOffset,
        remainder;

    allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

    _.$slides.eq(index).addClass('slick-current');

    if (_.options.centerMode === true) {
      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
      centerOffset = Math.floor(_.options.slidesToShow / 2);

      if (_.options.infinite === true) {
        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          indexOffset = _.options.slidesToShow + index;
          allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
        }

        if (index === 0) {
          allSlides.eq(_.options.slidesToShow + _.slideCount + 1).addClass('slick-center');
        } else if (index === _.slideCount - 1) {
          allSlides.eq(_.options.slidesToShow).addClass('slick-center');
        }
      }

      _.$slides.eq(index).addClass('slick-center');
    } else {
      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
      } else if (allSlides.length <= _.options.slidesToShow) {
        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
      } else {
        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
          allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
        }
      }
    }

    if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
      _.lazyLoad();
    }
  };

  Slick.prototype.setupInfinite = function () {
    var _ = this,
        i,
        slideIndex,
        infiniteCount;

    if (_.options.fade === true) {
      _.options.centerMode = false;
    }

    if (_.options.infinite === true && _.options.fade === false) {
      slideIndex = null;

      if (_.slideCount > _.options.slidesToShow) {
        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }

        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
        }

        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
        }

        _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
          $(this).attr('id', '');
        });
      }
    }
  };

  Slick.prototype.interrupt = function (toggle) {
    var _ = this;

    if (!toggle) {
      _.autoPlay();
    }

    _.interrupted = toggle;
  };

  Slick.prototype.selectHandler = function (event) {
    var _ = this;

    var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');
    var index = parseInt(targetElement.attr('data-slick-index'));
    if (!index) index = 0;

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideHandler(index, false, true);

      return;
    }

    _.slideHandler(index);
  };

  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
    var targetSlide,
        animSlide,
        oldSlide,
        slideLeft,
        targetLeft = null,
        _ = this,
        navTarget;

    sync = sync || false;

    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }

    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }

    if (sync === false) {
      _.asNavFor(index);
    }

    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);
    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    }

    if (_.options.autoplay) {
      clearInterval(_.autoPlayTimer);
    }

    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }

    _.animating = true;

    _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;

    _.setSlideClasses(_.currentSlide);

    if (_.options.asNavFor) {
      navTarget = _.getNavTarget();
      navTarget = navTarget.slick('getSlick');

      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
        navTarget.setSlideClasses(_.currentSlide);
      }
    }

    _.updateDots();

    _.updateArrows();

    if (_.options.fade === true) {
      if (dontAnimate !== true) {
        _.fadeSlideOut(oldSlide);

        _.fadeSlide(animSlide, function () {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }

      _.animateHeight();

      return;
    }

    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
      _.animateSlide(targetLeft, function () {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };

  Slick.prototype.startLoad = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.hide();

      _.$nextArrow.hide();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.hide();
    }

    _.$slider.addClass('slick-loading');
  };

  Slick.prototype.swipeDirection = function () {
    var xDist,
        yDist,
        r,
        swipeAngle,
        _ = this;

    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round(r * 180 / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? 'right' : 'left';
    }

    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 'down';
      } else {
        return 'up';
      }
    }

    return 'vertical';
  };

  Slick.prototype.swipeEnd = function (event) {
    var _ = this,
        slideCount,
        direction;

    _.dragging = false;
    _.swiping = false;

    if (_.scrolling) {
      _.scrolling = false;
      return false;
    }

    _.interrupted = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

    if (_.touchObject.curX === undefined) {
      return false;
    }

    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger('edge', [_, _.swipeDirection()]);
    }

    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
      direction = _.swipeDirection();

      switch (direction) {
        case 'left':
        case 'down':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
          _.currentDirection = 0;
          break;

        case 'right':
        case 'up':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
          _.currentDirection = 1;
          break;

        default:
      }

      if (direction != 'vertical') {
        _.slideHandler(slideCount);

        _.touchObject = {};

        _.$slider.trigger('swipe', [_, direction]);
      }
    } else {
      if (_.touchObject.startX !== _.touchObject.curX) {
        _.slideHandler(_.currentSlide);

        _.touchObject = {};
      }
    }
  };

  Slick.prototype.swipeHandler = function (event) {
    var _ = this;

    if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
      return;
    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
      return;
    }

    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }

    switch (event.data.action) {
      case 'start':
        _.swipeStart(event);

        break;

      case 'move':
        _.swipeMove(event);

        break;

      case 'end':
        _.swipeEnd(event);

        break;
    }
  };

  Slick.prototype.swipeMove = function (event) {
    var _ = this,
        edgeWasHit = false,
        curLeft,
        swipeDirection,
        swipeLength,
        positionOffset,
        touches,
        verticalSwipeLength;

    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

    if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
      return false;
    }

    curLeft = _.getLeft(_.currentSlide);
    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
    _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
    verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
      _.scrolling = true;
      return false;
    }

    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = verticalSwipeLength;
    }

    swipeDirection = _.swipeDirection();

    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      _.swiping = true;
      event.preventDefault();
    }

    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);

    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }

    swipeLength = _.touchObject.swipeLength;
    _.touchObject.edgeHit = false;

    if (_.options.infinite === false) {
      if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }

    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }

    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }

    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }

    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }

    _.setCSS(_.swipeLeft);
  };

  Slick.prototype.swipeStart = function (event) {
    var _ = this,
        touches;

    _.interrupted = true;

    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
      _.touchObject = {};
      return false;
    }

    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
      touches = event.originalEvent.touches[0];
    }

    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
    _.dragging = true;
  };

  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
    var _ = this;

    if (_.$slidesCache !== null) {
      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.unload = function () {
    var _ = this;

    $('.slick-cloned', _.$slider).remove();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }

    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }

    _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
  };

  Slick.prototype.unslick = function (fromBreakpoint) {
    var _ = this;

    _.$slider.trigger('unslick', [_, fromBreakpoint]);

    _.destroy();
  };

  Slick.prototype.updateArrows = function () {
    var _ = this,
        centerOffset;

    centerOffset = Math.floor(_.options.slidesToShow / 2);

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
      _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      if (_.currentSlide === 0) {
        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      }
    }
  };

  Slick.prototype.updateDots = function () {
    var _ = this;

    if (_.$dots !== null) {
      _.$dots.find('li').removeClass('slick-active').end();

      _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
    }
  };

  Slick.prototype.visibility = function () {
    var _ = this;

    if (_.options.autoplay) {
      if (document[_.hidden]) {
        _.interrupted = true;
      } else {
        _.interrupted = false;
      }
    }
  };

  $.fn.slick = function () {
    var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;

    for (i = 0; i < l; i++) {
      if (_typeof(opt) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != 'undefined') return ret;
    }

    return _;
  };
});
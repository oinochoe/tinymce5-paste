/* Tiny PowerPaste plugin
 *
 * Copyright 2010-2019 Tiny Technologies LLC. All rights reserved.
 *
 * Version: 4.0.1-317
 */
!(function (y) {
  "use strict";
  var n = function (e) {
      return parseInt(e, 10);
    },
    r = function (e, t, n) {
      return { major: e, minor: t, patch: n };
    },
    o = function (e) {
      var t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e);
      return t ? r(n(t[1]), n(t[2]), n(t[3])) : r(0, 0, 0);
    },
    i = function (e, t) {
      var n = e - t;
      return 0 === n ? 0 : 0 < n ? 1 : -1;
    },
    c = function (e, t) {
      return (
        -1 ===
        (function (e, t) {
          var n = i(e.major, t.major);
          if (0 !== n) return n;
          var r = i(e.minor, t.minor);
          if (0 !== r) return r;
          var o = i(e.patch, t.patch);
          return 0 !== o ? o : 0;
        })((n = e) ? o([(r = n).majorVersion, r.minorVersion].join(".").split(".").slice(0, 3).join(".")) : null, o(t))
      );
      var n, r;
    },
    e = function (r, o) {
      return function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        var n = r.console;
        n && o in n && n[o].apply(n, arguments);
      };
    },
    t = { log: e(window, "log"), error: e(window, "error"), warn: e(window, "warm") },
    s = {
      register: function (e, t) {
        e.addCommand("mceTogglePlainTextPaste", t.toggle);
      },
    },
    l = function (e) {
      return e.getParam("powerpaste_block_drop", !1, "boolean");
    },
    a = function (e) {
      return void 0 !== e.settings.images_upload_url;
    },
    f = function (e) {
      return e.getParam("paste_as_text", !1);
    },
    u = function (e, t) {
      e.dom.bind(t, "drop dragstart dragend dragover dragenter dragleave dragdrop draggesture", function (e) {
        e.preventDefault(), e.stopImmediatePropagation();
      });
    },
    d = function (t) {
      t.on("init", function (e) {
        u(t, t.getBody()), t.inline || u(t, t.getDoc());
      });
    },
    C = function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
    },
    g = function (n, r) {
      return function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return n(r.apply(null, e));
      };
    },
    v = function (e) {
      return function () {
        return e;
      };
    },
    m = function (e) {
      return e;
    };
  function N(r) {
    for (var o = [], e = 1; e < arguments.length; e++) o[e - 1] = arguments[e];
    return function () {
      for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
      var n = o.concat(e);
      return r.apply(null, n);
    };
  }
  var p,
    h,
    b,
    x,
    T,
    E = function (e) {
      return function () {
        throw new Error(e);
      };
    },
    w = v(!1),
    I = v(!0),
    S = w,
    L = I,
    D = function () {
      return O;
    },
    O =
      ((x = {
        fold: function (e, t) {
          return e();
        },
        is: S,
        isSome: S,
        isNone: L,
        getOr: (b = function (e) {
          return e;
        }),
        getOrThunk: (h = function (e) {
          return e();
        }),
        getOrDie: function (e) {
          throw new Error(e || "error: getOrDie called on none.");
        },
        getOrNull: function () {
          return null;
        },
        getOrUndefined: function () {},
        or: b,
        orThunk: h,
        map: D,
        ap: D,
        each: function () {},
        bind: D,
        flatten: D,
        exists: S,
        forall: L,
        filter: D,
        equals: (p = function (e) {
          return e.isNone();
        }),
        equals_: p,
        toArray: function () {
          return [];
        },
        toString: v("none()"),
      }),
      Object.freeze && Object.freeze(x),
      x),
    A = function (n) {
      var e = function () {
          return n;
        },
        t = function () {
          return o;
        },
        r = function (e) {
          return e(n);
        },
        o = {
          fold: function (e, t) {
            return t(n);
          },
          is: function (e) {
            return n === e;
          },
          isSome: L,
          isNone: S,
          getOr: e,
          getOrThunk: e,
          getOrDie: e,
          getOrNull: e,
          getOrUndefined: e,
          or: t,
          orThunk: t,
          map: function (e) {
            return A(e(n));
          },
          ap: function (e) {
            return e.fold(D, function (e) {
              return A(e(n));
            });
          },
          each: function (e) {
            e(n);
          },
          bind: r,
          flatten: e,
          exists: r,
          forall: r,
          filter: function (e) {
            return e(n) ? o : O;
          },
          equals: function (e) {
            return e.is(n);
          },
          equals_: function (e, t) {
            return e.fold(S, function (e) {
              return t(n, e);
            });
          },
          toArray: function () {
            return [n];
          },
          toString: function () {
            return "some(" + n + ")";
          },
        };
      return o;
    },
    _ = {
      some: A,
      none: D,
      from: function (e) {
        return null == e ? O : A(e);
      },
    },
    P = function (t) {
      return function (e) {
        return (
          (function (e) {
            if (null === e) return "null";
            var t = typeof e;
            return "object" === t && Array.prototype.isPrototypeOf(e) ? "array" : "object" === t && String.prototype.isPrototypeOf(e) ? "string" : t;
          })(e) === t
        );
      };
    },
    k = P("string"),
    M = P("object"),
    R = P("array"),
    F = P("boolean"),
    j = P("function"),
    U = P("number"),
    B =
      void 0 === (T = Array.prototype.indexOf)
        ? function (e, t) {
            return z(e, t);
          }
        : function (e, t) {
            return T.call(e, t);
          },
    Y = function (e, t) {
      return -1 < B(e, t);
    },
    H = function (e, t) {
      return G(e, t).isSome();
    },
    W = function (e, t) {
      for (var n = e.length, r = new Array(n), o = 0; o < n; o++) {
        var i = e[o];
        r[o] = t(i, o, e);
      }
      return r;
    },
    q = function (e, t) {
      for (var n = 0, r = e.length; n < r; n++) t(e[n], n, e);
    },
    $ = function (e, t) {
      for (var n = [], r = 0, o = e.length; r < o; r++) {
        var i = e[r];
        t(i, r, e) && n.push(i);
      }
      return n;
    },
    V = function (e, t, n) {
      return (
        q(e, function (e) {
          n = t(n, e);
        }),
        n
      );
    },
    X = function (e, t) {
      for (var n = 0, r = e.length; n < r; n++) {
        var o = e[n];
        if (t(o, n, e)) return _.some(o);
      }
      return _.none();
    },
    G = function (e, t) {
      for (var n = 0, r = e.length; n < r; n++) if (t(e[n], n, e)) return _.some(n);
      return _.none();
    },
    z = function (e, t) {
      for (var n = 0, r = e.length; n < r; ++n) if (e[n] === t) return n;
      return -1;
    },
    K = Array.prototype.push,
    Z = function (e) {
      for (var t = [], n = 0, r = e.length; n < r; ++n) {
        if (!Array.prototype.isPrototypeOf(e[n])) throw new Error("Arr.flatten item " + n + " was not an array, input: " + e);
        K.apply(t, e[n]);
      }
      return t;
    },
    J = function (e, t) {
      var n = W(e, t);
      return Z(n);
    },
    Q = function (e, t) {
      for (var n = 0, r = e.length; n < r; ++n) if (!0 !== t(e[n], n, e)) return !1;
      return !0;
    },
    ee = Array.prototype.slice,
    te = (j(Array.from) && Array.from, Object.keys),
    ne = function (e, t) {
      for (var n = te(e), r = 0, o = n.length; r < o; r++) {
        var i = n[r];
        t(e[i], i, e);
      }
    },
    re = function (e, r) {
      return oe(e, function (e, t, n) {
        return { k: t, v: r(e, t, n) };
      });
    },
    oe = function (r, o) {
      var i = {};
      return (
        ne(r, function (e, t) {
          var n = o(e, t, r);
          i[n.k] = n.v;
        }),
        i
      );
    },
    ie = function (e) {
      return (
        (n = function (e) {
          return e;
        }),
        (r = []),
        ne(e, function (e, t) {
          r.push(n(e, t));
        }),
        r
      );
      var n, r;
    },
    ae = function (e) {
      return te(e).length;
    },
    ue = function (a) {
      if (!R(a)) throw new Error("cases must be an array");
      if (0 === a.length) throw new Error("there must be at least one case");
      var u = [],
        n = {};
      return (
        q(a, function (e, r) {
          var t = te(e);
          if (1 !== t.length) throw new Error("one and only one name per case");
          var o = t[0],
            i = e[o];
          if (void 0 !== n[o]) throw new Error("duplicate key detected:" + o);
          if ("cata" === o) throw new Error("cannot have a case named cata (sorry)");
          if (!R(i)) throw new Error("case arguments must be an array");
          u.push(o),
            (n[o] = function () {
              var e = arguments.length;
              if (e !== i.length) throw new Error("Wrong number of arguments to case " + o + ". Expected " + i.length + " (" + i + "), got " + e);
              for (var n = new Array(e), t = 0; t < n.length; t++) n[t] = arguments[t];
              return {
                fold: function () {
                  if (arguments.length !== a.length) throw new Error("Wrong number of arguments to fold. Expected " + a.length + ", got " + arguments.length);
                  return arguments[r].apply(null, n);
                },
                match: function (e) {
                  var t = te(e);
                  if (u.length !== t.length) throw new Error("Wrong number of arguments to match. Expected: " + u.join(",") + "\nActual: " + t.join(","));
                  if (
                    !Q(u, function (e) {
                      return Y(t, e);
                    })
                  )
                    throw new Error("Not all branches were specified when using match. Specified: " + t.join(", ") + "\nRequired: " + u.join(", "));
                  return e[o].apply(null, n);
                },
                log: function (e) {
                  console.log(e, { constructors: u, constructor: o, params: n });
                },
              };
            });
        }),
        n
      );
    },
    ce = Object.prototype.hasOwnProperty,
    se = function (a) {
      return function () {
        for (var e = new Array(arguments.length), t = 0; t < e.length; t++) e[t] = arguments[t];
        if (0 === e.length) throw new Error("Can't merge zero objects");
        for (var n = {}, r = 0; r < e.length; r++) {
          var o = e[r];
          for (var i in o) ce.call(o, i) && (n[i] = a(n[i], o[i]));
        }
        return n;
      };
    },
    le = se(function (e, t) {
      return M(e) && M(t) ? le(e, t) : t;
    }),
    fe = se(function (e, t) {
      return t;
    }),
    de = ue([{ blob: ["id", "imageresult", "objurl"] }, { url: ["id", "url", "raw"] }]),
    me = fe(de, {
      cata: function (e, t, n) {
        return e.fold(t, n);
      },
    });
  function pe(e, t) {
    return ve(y.document.createElement("canvas"), e, t);
  }
  function ge(e) {
    return e.getContext("2d");
  }
  function ve(e, t, n) {
    return (e.width = t), (e.height = n), e;
  }
  var he = {
      create: pe,
      clone: function (e) {
        var t;
        return ge((t = pe(e.width, e.height))).drawImage(e, 0, 0), t;
      },
      resize: ve,
      get2dContext: ge,
      get3dContext: function (e) {
        var t = null;
        try {
          t = e.getContext("webgl") || e.getContext("experimental-webgl");
        } catch (e) {}
        return t || (t = null), t;
      },
    },
    ye = {
      getWidth: function (e) {
        return e.naturalWidth || e.width;
      },
      getHeight: function (e) {
        return e.naturalHeight || e.height;
      },
    },
    be = window.Promise
      ? window.Promise
      : (function () {
          var e = function (e) {
              if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
              if ("function" != typeof e) throw new TypeError("not a function");
              (this._state = null), (this._value = null), (this._deferreds = []), s(e, n(o, this), n(a, this));
            },
            t =
              e.immediateFn ||
              ("function" == typeof window.setImmediate && window.setImmediate) ||
              function (e) {
                y.setTimeout(e, 1);
              };
          function n(e, t) {
            return function () {
              e.apply(t, arguments);
            };
          }
          var r =
            Array.isArray ||
            function (e) {
              return "[object Array]" === Object.prototype.toString.call(e);
            };
          function i(n) {
            var r = this;
            null !== this._state
              ? t(function () {
                  var e = r._state ? n.onFulfilled : n.onRejected;
                  if (null !== e) {
                    var t;
                    try {
                      t = e(r._value);
                    } catch (e) {
                      return void n.reject(e);
                    }
                    n.resolve(t);
                  } else (r._state ? n.resolve : n.reject)(r._value);
                })
              : this._deferreds.push(n);
          }
          function o(e) {
            try {
              if (e === this) throw new TypeError("A promise cannot be resolved with itself.");
              if (e && ("object" == typeof e || "function" == typeof e)) {
                var t = e.then;
                if ("function" == typeof t) return void s(n(t, e), n(o, this), n(a, this));
              }
              (this._state = !0), (this._value = e), u.call(this);
            } catch (e) {
              a.call(this, e);
            }
          }
          function a(e) {
            (this._state = !1), (this._value = e), u.call(this);
          }
          function u() {
            for (var e = 0, t = this._deferreds.length; e < t; e++) i.call(this, this._deferreds[e]);
            this._deferreds = null;
          }
          function c(e, t, n, r) {
            (this.onFulfilled = "function" == typeof e ? e : null), (this.onRejected = "function" == typeof t ? t : null), (this.resolve = n), (this.reject = r);
          }
          function s(e, t, n) {
            var r = !1;
            try {
              e(
                function (e) {
                  r || ((r = !0), t(e));
                },
                function (e) {
                  r || ((r = !0), n(e));
                }
              );
            } catch (e) {
              if (r) return;
              (r = !0), n(e);
            }
          }
          return (
            (e.prototype.catch = function (e) {
              return this.then(null, e);
            }),
            (e.prototype.then = function (n, r) {
              var o = this;
              return new e(function (e, t) {
                i.call(o, new c(n, r, e, t));
              });
            }),
            (e.all = function () {
              var u = Array.prototype.slice.call(1 === arguments.length && r(arguments[0]) ? arguments[0] : arguments);
              return new e(function (r, o) {
                if (0 === u.length) return r([]);
                var i = u.length;
                function a(t, e) {
                  try {
                    if (e && ("object" == typeof e || "function" == typeof e)) {
                      var n = e.then;
                      if ("function" == typeof n)
                        return void n.call(
                          e,
                          function (e) {
                            a(t, e);
                          },
                          o
                        );
                    }
                    (u[t] = e), 0 == --i && r(u);
                  } catch (e) {
                    o(e);
                  }
                }
                for (var e = 0; e < u.length; e++) a(e, u[e]);
              });
            }),
            (e.resolve = function (t) {
              return t && "object" == typeof t && t.constructor === e
                ? t
                : new e(function (e) {
                    e(t);
                  });
            }),
            (e.reject = function (n) {
              return new e(function (e, t) {
                t(n);
              });
            }),
            (e.race = function (o) {
              return new e(function (e, t) {
                for (var n = 0, r = o.length; n < r; n++) o[n].then(e, t);
              });
            }),
            e
          );
        })(),
    xe = "undefined" != typeof window ? window : Function("return this;")(),
    Te = function (e, t) {
      return (function (e, t) {
        for (var n = null != t ? t : xe, r = 0; r < e.length && null != n; ++r) n = n[e[r]];
        return n;
      })(e.split("."), t);
    },
    Ee = function (e, t) {
      return (function (e, t) {
        for (var n, r, o = void 0 !== t ? t : xe, i = 0; i < e.length; ++i) (n = o), (r = e[i]), (void 0 !== n[r] && null !== n[r]) || (n[r] = {}), (o = n[r]);
        return o;
      })(e.split("."), t);
    },
    we = {
      getOrDie: function (e, t) {
        var n = Te(e, t);
        if (null == n) throw e + " not available on this browser";
        return n;
      },
    };
  function Ie(e, t) {
    return new (we.getOrDie("Blob"))(e, t);
  }
  function Se() {
    return new (we.getOrDie("FileReader"))();
  }
  function Le(e) {
    return new (we.getOrDie("Uint8Array"))(e);
  }
  var Ce = {
    atob: function (e) {
      return we.getOrDie("atob")(e);
    },
    requestAnimationFrame: function (e) {
      we.getOrDie("requestAnimationFrame")(e);
    },
  };
  function Ne(u) {
    return new be(function (e, t) {
      var n = y.URL.createObjectURL(u),
        r = new y.Image(),
        o = function () {
          r.removeEventListener("load", i), r.removeEventListener("error", a);
        };
      function i() {
        o(), e(r);
      }
      function a() {
        o(), t("Unable to load data of type " + u.type + ": " + n);
      }
      r.addEventListener("load", i), r.addEventListener("error", a), (r.src = n), r.complete && i();
    });
  }
  function De(r) {
    return new be(function (e, n) {
      var t = new y.XMLHttpRequest();
      t.open("GET", r, !0),
        (t.responseType = "blob"),
        (t.onload = function () {
          200 == this.status && e(this.response);
        }),
        (t.onerror = function () {
          var e,
            t = this;
          n(0 === this.status ? (((e = new Error("No access to download image")).code = 18), (e.name = "SecurityError"), e) : new Error("Error " + t.status + " downloading image"));
        }),
        t.send();
    });
  }
  function Oe(e) {
    var t = e.split(","),
      n = /data:([^;]+)/.exec(t[0]);
    if (!n) return _.none();
    for (var r = n[1], o = t[1], i = Ce.atob(o), a = i.length, u = Math.ceil(a / 1024), c = new Array(u), s = 0; s < u; ++s) {
      for (var l = 1024 * s, f = Math.min(l + 1024, a), d = new Array(f - l), m = l, p = 0; m < f; ++p, ++m) d[p] = i[m].charCodeAt(0);
      c[s] = Le(d);
    }
    return _.some(Ie(c, { type: r }));
  }
  function Ae(n) {
    return new be(function (e, t) {
      Oe(n).fold(function () {
        t("uri is not base64: " + n);
      }, e);
    });
  }
  function _e(n) {
    return new be(function (e) {
      var t = Se();
      (t.onloadend = function () {
        e(t.result);
      }),
        t.readAsDataURL(n);
    });
  }
  var Pe = {
      blobToImage: Ne,
      imageToBlob: function (e) {
        var t = e.src;
        return 0 === t.indexOf("data:") ? Ae(t) : De(t);
      },
      blobToArrayBuffer: function (n) {
        return new be(function (e) {
          var t = Se();
          (t.onloadend = function () {
            e(t.result);
          }),
            t.readAsArrayBuffer(n);
        });
      },
      blobToDataUri: _e,
      blobToBase64: function (e) {
        return _e(e).then(function (e) {
          return e.split(",")[1];
        });
      },
      dataUriToBlobSync: Oe,
      canvasToBlob: function (e, n, r) {
        return (
          (n = n || "image/png"),
          y.HTMLCanvasElement.prototype.toBlob
            ? new be(function (t) {
                e.toBlob(
                  function (e) {
                    t(e);
                  },
                  n,
                  r
                );
              })
            : Ae(e.toDataURL(n, r))
        );
      },
      canvasToDataURL: function (e, t, n) {
        return (
          (t = t || "image/png"),
          e.then(function (e) {
            return e.toDataURL(t, n);
          })
        );
      },
      blobToCanvas: function (e) {
        return Ne(e).then(function (e) {
          var t, n;
          return (t = e), y.URL.revokeObjectURL(t.src), (n = he.create(ye.getWidth(e), ye.getHeight(e))), he.get2dContext(n).drawImage(e, 0, 0), n;
        });
      },
      uriToBlob: function (e) {
        return 0 === e.indexOf("blob:") ? De(e) : 0 === e.indexOf("data:") ? Ae(e) : null;
      },
    },
    ke = function (e) {
      return Pe.blobToDataUri(e);
    },
    Me = function (e) {
      return Pe.dataUriToBlobSync(e);
    },
    Re = function (e) {
      return _.from(Pe.uriToBlob(e));
    };
  function Fe(e, t, n) {
    var r = t.type;
    function o(t, n) {
      return e.then(function (e) {
        return Pe.canvasToDataURL(e, t, n);
      });
    }
    return {
      getType: v(r),
      toBlob: function () {
        return be.resolve(t);
      },
      toDataURL: function () {
        return n;
      },
      toBase64: function () {
        return n.split(",")[1];
      },
      toAdjustedBlob: function (t, n) {
        return e.then(function (e) {
          return Pe.canvasToBlob(e, t, n);
        });
      },
      toAdjustedDataURL: o,
      toAdjustedBase64: function (e, t) {
        return o(e, t).then(function (e) {
          return e.split(",")[1];
        });
      },
      toCanvas: function () {
        return e.then(he.clone);
      },
    };
  }
  function je(t) {
    return Pe.blobToDataUri(t).then(function (e) {
      return Fe(Pe.blobToCanvas(t), t, e);
    });
  }
  var Ue,
    Be,
    Ye = {
      fromBlob: je,
      fromCanvas: function (t, e) {
        return Pe.canvasToBlob(t, e).then(function (e) {
          return Fe(be.resolve(t), e, t.toDataURL());
        });
      },
      fromImage: function (e) {
        return Pe.imageToBlob(e).then(function (e) {
          return je(e);
        });
      },
      fromBlobAndUrlSync: function (e, t) {
        return Fe(Pe.blobToCanvas(e), e, t);
      },
    },
    He = function (e) {
      return e.toBlob();
    },
    We = {
      blobToImageResult: function (e) {
        return Ye.fromBlob(e);
      },
      fromBlobAndUrlSync: function (e, t) {
        return Ye.fromBlobAndUrlSync(e, t);
      },
      imageToImageResult: function (e) {
        return Ye.fromImage(e);
      },
      imageResultToBlob: function (e, t, n) {
        return void 0 === t && void 0 === n ? He(e) : e.toAdjustedBlob(t, n);
      },
      imageResultToOriginalBlob: He,
      imageResultToDataURL: function (e) {
        return e.toDataURL();
      },
    },
    qe = function (e) {
      var n = _.none(),
        t = [],
        r = function (e) {
          o() ? a(e) : t.push(e);
        },
        o = function () {
          return n.isSome();
        },
        i = function (e) {
          q(e, a);
        },
        a = function (t) {
          n.each(function (e) {
            setTimeout(function () {
              t(e);
            }, 0);
          });
        };
      return (
        e(function (e) {
          (n = _.some(e)), i(t), (t = []);
        }),
        {
          get: r,
          map: function (n) {
            return qe(function (t) {
              r(function (e) {
                t(n(e));
              });
            });
          },
          isReady: o,
        }
      );
    },
    $e = {
      nu: qe,
      pure: function (t) {
        return qe(function (e) {
          e(t);
        });
      },
    },
    Ve = function (t) {
      var e = function (e) {
          var r;
          t(
            ((r = e),
            function () {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              var n = this;
              setTimeout(function () {
                r.apply(n, e);
              }, 0);
            })
          );
        },
        n = function () {
          return $e.nu(e);
        };
      return {
        map: function (r) {
          return Ve(function (n) {
            e(function (e) {
              var t = r(e);
              n(t);
            });
          });
        },
        bind: function (n) {
          return Ve(function (t) {
            e(function (e) {
              n(e).get(t);
            });
          });
        },
        anonBind: function (n) {
          return Ve(function (t) {
            e(function (e) {
              n.get(t);
            });
          });
        },
        toLazy: n,
        toCached: function () {
          var t = null;
          return Ve(function (e) {
            null === t && (t = n()), t.get(e);
          });
        },
        get: e,
      };
    },
    Xe = {
      nu: Ve,
      pure: function (t) {
        return Ve(function (e) {
          e(t);
        });
      },
    },
    Ge = function (a, e) {
      return e(function (r) {
        var o = [],
          i = 0;
        0 === a.length
          ? r([])
          : q(a, function (e, t) {
              var n;
              e.get(
                ((n = t),
                function (e) {
                  (o[n] = e), ++i >= a.length && r(o);
                })
              );
            });
      });
    },
    ze = function (e) {
      return Ge(e, Xe.nu);
    },
    Ke = function (e, t) {
      var n = W(e, t);
      return ze(n);
    },
    Ze = 0,
    Je = function (e) {
      var t = new Date().getTime();
      return e + "_" + Math.floor(1e9 * Math.random()) + ++Ze + String(t);
    },
    Qe = function (n) {
      var r,
        o = !1;
      return function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return o || ((o = !0), (r = n.apply(null, e))), r;
      };
    },
    et = function () {
      return tt(0, 0);
    },
    tt = function (e, t) {
      return { major: e, minor: t };
    },
    nt = {
      nu: tt,
      detect: function (e, t) {
        var n = String(t).toLowerCase();
        return 0 === e.length
          ? et()
          : (function (e, t) {
              var n = (function (e, t) {
                for (var n = 0; n < e.length; n++) {
                  var r = e[n];
                  if (r.test(t)) return r;
                }
              })(e, t);
              if (!n) return { major: 0, minor: 0 };
              var r = function (e) {
                return Number(t.replace(n, "$" + e));
              };
              return tt(r(1), r(2));
            })(e, n);
      },
      unknown: et,
    },
    rt = "Firefox",
    ot = function (e, t) {
      return function () {
        return t === e;
      };
    },
    it = function (e) {
      var t = e.current;
      return { current: t, version: e.version, isEdge: ot("Edge", t), isChrome: ot("Chrome", t), isIE: ot("IE", t), isOpera: ot("Opera", t), isFirefox: ot(rt, t), isSafari: ot("Safari", t) };
    },
    at = {
      unknown: function () {
        return it({ current: void 0, version: nt.unknown() });
      },
      nu: it,
      edge: v("Edge"),
      chrome: v("Chrome"),
      ie: v("IE"),
      opera: v("Opera"),
      firefox: v(rt),
      safari: v("Safari"),
    },
    ut = "Windows",
    ct = "Android",
    st = "Solaris",
    lt = "FreeBSD",
    ft = function (e, t) {
      return function () {
        return t === e;
      };
    },
    dt = function (e) {
      var t = e.current;
      return {
        current: t,
        version: e.version,
        isWindows: ft(ut, t),
        isiOS: ft("iOS", t),
        isAndroid: ft(ct, t),
        isOSX: ft("OSX", t),
        isLinux: ft("Linux", t),
        isSolaris: ft(st, t),
        isFreeBSD: ft(lt, t),
      };
    },
    mt = {
      unknown: function () {
        return dt({ current: void 0, version: nt.unknown() });
      },
      nu: dt,
      windows: v(ut),
      ios: v("iOS"),
      android: v(ct),
      linux: v("Linux"),
      osx: v("OSX"),
      solaris: v(st),
      freebsd: v(lt),
    },
    pt = function (e, t) {
      var n = String(t).toLowerCase();
      return X(e, function (e) {
        return e.search(n);
      });
    },
    gt = function (e, n) {
      return pt(e, n).map(function (e) {
        var t = nt.detect(e.versionRegexes, n);
        return { current: e.name, version: t };
      });
    },
    vt = function (e, n) {
      return pt(e, n).map(function (e) {
        var t = nt.detect(e.versionRegexes, n);
        return { current: e.name, version: t };
      });
    },
    ht = function (e, t, n) {
      return "" === t || (!(e.length < t.length) && e.substr(n, n + t.length) === t);
    },
    yt = function (e, t) {
      return Et(e, t) ? ((n = e), (r = t.length), n.substring(r)) : e;
      var n, r;
    },
    bt = function (e, t) {
      return wt(e, t) ? ((n = e), (r = t.length), n.substring(0, n.length - r)) : e;
      var n, r;
    },
    xt = function (e, t) {
      return -1 !== e.indexOf(t);
    },
    Tt = function (n) {
      return ((e = n), "" === e ? _.none() : _.some(e.substr(0, 1)))
        .bind(function (t) {
          return ((e = n), "" === e ? _.none() : _.some(e.substring(1))).map(function (e) {
            return t.toUpperCase() + e;
          });
          var e;
        })
        .getOr(n);
      var e;
    },
    Et = function (e, t) {
      return ht(e, t, 0);
    },
    wt = function (e, t) {
      return ht(e, t, e.length - t.length);
    },
    It = function (e) {
      return e.replace(/^\s+|\s+$/g, "");
    },
    St = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
    Lt = function (t) {
      return function (e) {
        return xt(e, t);
      };
    },
    Ct = [
      {
        name: "Edge",
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (e) {
          return xt(e, "edge/") && xt(e, "chrome") && xt(e, "safari") && xt(e, "applewebkit");
        },
      },
      {
        name: "Chrome",
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, St],
        search: function (e) {
          return xt(e, "chrome") && !xt(e, "chromeframe");
        },
      },
      {
        name: "IE",
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: function (e) {
          return xt(e, "msie") || xt(e, "trident");
        },
      },
      { name: "Opera", versionRegexes: [St, /.*?opera\/([0-9]+)\.([0-9]+).*/], search: Lt("opera") },
      { name: "Firefox", versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/], search: Lt("firefox") },
      {
        name: "Safari",
        versionRegexes: [St, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search: function (e) {
          return (xt(e, "safari") || xt(e, "mobile/")) && xt(e, "applewebkit");
        },
      },
    ],
    Nt = [
      { name: "Windows", search: Lt("win"), versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/] },
      {
        name: "iOS",
        search: function (e) {
          return xt(e, "iphone") || xt(e, "ipad");
        },
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/],
      },
      { name: "Android", search: Lt("android"), versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/] },
      { name: "OSX", search: Lt("os x"), versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/] },
      { name: "Linux", search: Lt("linux"), versionRegexes: [] },
      { name: "Solaris", search: Lt("sunos"), versionRegexes: [] },
      { name: "FreeBSD", search: Lt("freebsd"), versionRegexes: [] },
    ],
    Dt = { browsers: v(Ct), oses: v(Nt) },
    Ot = function (e) {
      var t,
        n,
        r,
        o,
        i,
        a,
        u,
        c,
        s,
        l,
        f,
        d = Dt.browsers(),
        m = Dt.oses(),
        p = gt(d, e).fold(at.unknown, at.nu),
        g = vt(m, e).fold(mt.unknown, mt.nu);
      return {
        browser: p,
        os: g,
        deviceType:
          ((n = p),
          (r = e),
          (o = (t = g).isiOS() && !0 === /ipad/i.test(r)),
          (i = t.isiOS() && !o),
          (a = t.isAndroid() && 3 === t.version.major),
          (u = t.isAndroid() && 4 === t.version.major),
          (c = o || a || (u && !0 === /mobile/i.test(r))),
          (s = t.isiOS() || t.isAndroid()),
          (l = s && !c),
          (f = n.isSafari() && t.isiOS() && !1 === /safari/i.test(r)),
          { isiPad: v(o), isiPhone: v(i), isTablet: v(c), isPhone: v(l), isTouch: v(s), isAndroid: t.isAndroid, isiOS: t.isiOS, isWebView: v(f) }),
      };
    },
    At = {
      detect: Qe(function () {
        var e = y.navigator.userAgent;
        return Ot(e);
      }),
    },
    _t = function () {
      return we.getOrDie("URL");
    },
    Pt = function (e) {
      return _t().createObjectURL(e);
    },
    kt = function (e) {
      _t().revokeObjectURL(e);
    },
    Mt = (y.Node.ATTRIBUTE_NODE, y.Node.CDATA_SECTION_NODE, y.Node.COMMENT_NODE),
    Rt = y.Node.DOCUMENT_NODE,
    Ft = (y.Node.DOCUMENT_TYPE_NODE, y.Node.DOCUMENT_FRAGMENT_NODE, y.Node.ELEMENT_NODE),
    jt = y.Node.TEXT_NODE,
    Ut =
      (y.Node.PROCESSING_INSTRUCTION_NODE,
      y.Node.ENTITY_REFERENCE_NODE,
      y.Node.ENTITY_NODE,
      y.Node.NOTATION_NODE,
      function (e) {
        return e.dom().nodeName.toLowerCase();
      }),
    Bt = function (e) {
      return e.dom().nodeType;
    },
    Yt = function (t) {
      return function (e) {
        return Bt(e) === t;
      };
    },
    Ht = function (e) {
      return Bt(e) === Mt || "#comment" === Ut(e);
    },
    Wt = Yt(Ft),
    qt = Yt(jt),
    $t = function (e, t, n) {
      if (!(k(n) || F(n) || U(n))) throw (y.console.error("Invalid call to Attr.set. Key ", t, ":: Value ", n, ":: Element ", e), new Error("Attribute value was not simple"));
      e.setAttribute(t, n + "");
    },
    Vt = function (e, t, n) {
      $t(e.dom(), t, n);
    },
    Xt = function (e, t) {
      var n = e.dom();
      ne(t, function (e, t) {
        $t(n, t, e);
      });
    },
    Gt = function (e, t) {
      var n = e.dom().getAttribute(t);
      return null === n ? void 0 : n;
    },
    zt = function (e, t) {
      var n = e.dom();
      return !(!n || !n.hasAttribute) && n.hasAttribute(t);
    },
    Kt = function (e, t) {
      e.dom().removeAttribute(t);
    },
    Zt = At.detect(),
    Jt = function (e) {
      var t = Pt(e);
      return Qt(e, t);
    },
    Qt = function (i, a) {
      return Xe.nu(function (o) {
        ke(i).then(function (e) {
          var t = We.fromBlobAndUrlSync(i, e),
            n = Je("image"),
            r = me.blob(n, t, a);
          o(r);
        });
      });
    },
    en = function (e) {
      return 1 === e.length && Y(e, "Files");
    },
    tn = function (e) {
      return !Y(e, "text/_moz_htmlcontext");
    },
    nn = function (e) {
      return Y(e, "Files");
    },
    rn = function (e) {
      return !0;
    },
    on = {
      multiple: function (e) {
        return 0 === e.length ? Xe.pure([]) : Ke(e, Jt);
      },
      toFiles: function (e) {
        return e.raw().target.files || e.raw().dataTransfer.files;
      },
      isFiles: Zt.browser.isChrome() || Zt.browser.isSafari() || Zt.browser.isOpera() ? nn : Zt.browser.isFirefox() ? tn : Zt.browser.isIE() ? en : rn,
      fromImages: function (e) {
        var t = W(e, function (e) {
          var t = Je("image");
          return me.url(t, Gt(e, "src"), e);
        });
        return Xe.pure(t);
      },
      single: Jt,
      singleWithUrl: Qt,
    },
    an = {
      multiple: function (e) {
        return on.multiple(e);
      },
      single: function (e) {
        return on.single(e);
      },
      singleWithUrl: function (e, t) {
        return on.singleWithUrl(e, t);
      },
    },
    un = function (e) {
      if (null == e) throw new Error("Node cannot be null or undefined");
      return { dom: v(e) };
    },
    cn = {
      fromHtml: function (e, t) {
        var n = (t || y.document).createElement("div");
        if (((n.innerHTML = e), !n.hasChildNodes() || 1 < n.childNodes.length)) throw (y.console.error("HTML does not have a single root node", e), new Error("HTML must have a single root node"));
        return un(n.childNodes[0]);
      },
      fromTag: function (e, t) {
        var n = (t || y.document).createElement(e);
        return un(n);
      },
      fromText: function (e, t) {
        var n = (t || y.document).createTextNode(e);
        return un(n);
      },
      fromDom: un,
      fromPoint: function (e, t, n) {
        var r = e.dom();
        return _.from(r.elementFromPoint(t, n)).map(un);
      },
    },
    sn = {
      "cement.dialog.paste.title": "Paste Formatting Options",
      "cement.dialog.paste.instructions": "Choose to keep or remove formatting in the pasted content.",
      "cement.dialog.paste.merge": "Keep Formatting",
      "cement.dialog.paste.clean": "Remove Formatting",
      "cement.dialog.flash.title": "Additional step needed to paste images",
      "cement.dialog.flash.trigger-paste": "Your browser requires you to take one more action to paste the images in your content. Please press the below keys to complete the image paste:",
      "cement.dialog.flash.missing": 'Adobe Flash is required to import images from Microsoft Office. Install the <a href="http://get.adobe.com/flashplayer/" target="_blank">Adobe Flash Player</a>.',
      "cement.dialog.flash.press-escape": 'Press <span class="ephox-polish-help-kbd">"Close"</span> to paste your content without images.',
      "loading.wait": "Please wait...",
      "flash.clipboard.no.rtf":
        tinymce.Env.mac && tinymce.Env.webkit
          ? 'Your browser security settings may be preventing images from being imported. <a href="https://support.ephox.com/entries/59328357-Safari-6-1-and-7-Flash-Sandboxing" style="text-decoration: underline">More information on paste for Safari</a>'
          : "Your browser security settings may be preventing images from being imported.",
      "safari.imagepaste":
        'Safari does not support direct paste of images. <a href="https://support.ephox.com/entries/88543243-Safari-Direct-paste-of-images-does-not-work" style="text-decoration: underline">More information on image pasting for Safari</a>',
      "webview.imagepaste":
        'Safari does not support direct paste of images. <a href="https://support.ephox.com/entries/88543243-Safari-Direct-paste-of-images-does-not-work" style="text-decoration: underline">More information on image pasting for Safari</a>',
      "error.code.images.not.found": "The images service was not found: (",
      "error.imageupload": "Image failed to upload: (",
      "error.full.stop": ").",
      "errors.local.images.disallowed": "Local image paste has been disabled. Local images have been removed from pasted content.",
      "flash.crashed": "Images have not been imported as Adobe Flash appears to have crashed. This may be caused by pasting large documents.",
      "errors.imageimport.failed": "Some images failed to import.",
      "errors.imageimport.unsupported": "Unsupported image type.",
      "errors.imageimport.invalid": "Image is invalid.",
    },
    ln = {
      translate: function (e) {
        return tinymce.translate(sn[e]);
      },
    },
    fn = {
      insert: function (e, t) {
        var n,
          r = t.getDoc(),
          o = "ephoxInsertMarker",
          i = t.selection,
          a = t.dom;
        i.setContent('<span id="' + o + '">&nbsp;</span>'), (n = a.get(o));
        for (var u = r.createDocumentFragment(); e.firstChild && !a.isBlock(e.firstChild); ) u.appendChild(e.firstChild);
        for (var c = r.createDocumentFragment(); e.lastChild && !a.isBlock(e.lastChild); ) c.appendChild(e.lastChild);
        if ((n.parentNode.insertBefore(u, n), a.insertAfter(c, n), e.firstChild)) {
          if (a.isBlock(e.firstChild)) {
            for (; !a.isBlock(n.parentNode) && n.parentNode !== a.getRoot(); ) n = a.split(n.parentNode, n);
            a.is(n.parentNode, "td,th") || n.parentNode === a.getRoot() || (n = a.split(n.parentNode, n));
          }
          a.replace(e, n);
        } else a.remove(n);
      },
    },
    dn = {
      each: tinymce.each,
      trim: tinymce.trim,
      bind: function (e, t) {
        return function () {
          return e.apply(t, arguments);
        };
      },
      extend: function (n) {
        for (var e = [], t = 1; t < arguments.length; t++) e[t - 1] = arguments[t];
        return (
          tinymce.each(Array.prototype.slice.call(arguments, 1), function (e) {
            for (var t in e) n[t] = e[t];
          }),
          n
        );
      },
      ephoxGetComputedStyle: function (e) {
        return e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle || {};
      },
      log: function (e) {
        "undefined" != typeof console && console.log && console.log(e);
      },
      compose: function (e) {
        var r = Array.prototype.slice.call(e).reverse();
        return function (e) {
          for (var t = e, n = 0; n < r.length; n++) t = (0, r[n])(t);
          return t;
        };
      },
    },
    mn = { strip_class_attributes: "all", retain_style_properties: "none" },
    pn = { strip_class_attributes: "none", retain_style_properties: "valid" },
    gn = function (e, t, n) {
      var r = (function (e, t) {
        if (e && "string" != typeof e) return e;
        switch (e) {
          case "clean":
            return mn;
          case "merge":
            return pn;
          default:
            return t;
        }
      })(e, t);
      return (r = dn.extend(r, { base_64_images: n }));
    },
    vn = {
      create: function (e, t, n) {
        var r = gn(e, mn, n),
          o = gn(t, pn, n),
          i = o;
        return {
          setWordContent: function (e) {
            i = e ? r : o;
          },
          get: function (e) {
            return i[e];
          },
        };
      },
    },
    hn = "startElement",
    yn = "endElement",
    bn = "text",
    xn = "comment",
    Tn = function (o) {
      var i,
        t,
        a = 0,
        u = function () {
          return i;
        };
      t = function () {
        return (
          (i = {}),
          (a = 0),
          dn.each(o.attributes, function (e) {
            var t,
              n = e.nodeName,
              r = e.value;
            (!1 !== (t = e).specified || ("name" === t.nodeName && "" !== t.value)) && null != r && ((i[n] = r), a++);
          }),
          void 0 === i.style && o.style.cssText && ((i.style = o.style.cssText), a++),
          (t = u),
          i
        );
      };
      var c,
        s,
        l = function (n) {
          dn.each(t(), function (e, t) {
            n(t, e);
          });
        };
      return {
        get: function (e) {
          return t()[e];
        },
        each: l,
        filter: function (e) {
          var n, r;
          c || (s = t),
            (r = e),
            (c =
              (n = c) && r
                ? function (e, t) {
                    return r(e, n(e, t));
                  }
                : n || r),
            (t = function () {
              return (
                (t = s),
                l(function (e, t) {
                  var n = c(e, t);
                  null === n ? (o.removeAttribute(e), delete i[e], a--) : n !== t && ("class" === e ? (o.className = n) : o.setAttribute(e, n), (i[e] = n));
                }),
                (t = u),
                i
              );
            });
        },
        getAttributes: function () {
          return t();
        },
        getAttributeCount: function () {
          return t(), a;
        },
      };
    },
    En = function (e) {
      return e.replace(/-(.)/g, function (e, t) {
        return t.toUpperCase();
      });
    },
    wn = !1,
    In = function (i, e, t) {
      var n, r, o, a, u, c, s, l, f, d;
      switch (i.nodeType) {
        case 1:
          e
            ? (n = yn)
            : ((n = hn),
              (a = Tn(i)),
              (u = {}),
              (c = i),
              (s = function (e, t) {
                u[e] = t;
              }),
              (null != (d = t || c.getAttribute("style")) && d.split) || (d = c.style.cssText),
              dn.each(d.split(";"), function (e) {
                var t = e.indexOf(":");
                0 < t &&
                  ((l = dn.trim(e.substring(0, t))).toUpperCase() === l && (l = l.toLowerCase()),
                  (l = l.replace(/([A-Z])/g, function (e, t) {
                    return "-" + t.toLowerCase();
                  })),
                  (f = dn.trim(e.substring(t + 1))),
                  wn || (wn = 0 === l.indexOf("mso-")),
                  s(l, f));
              }),
              wn || ((f = c.style["mso-list"]) && s("mso-list", f))),
            (r = "HTML" !== i.scopeName && i.scopeName && i.tagName && i.tagName.indexOf(":") <= 0 ? (i.scopeName + ":" + i.tagName).toUpperCase() : i.tagName);
          break;
        case 3:
          (n = bn), (o = i.nodeValue);
          break;
        case 8:
          (n = xn), (o = i.nodeValue);
          break;
        default:
          dn.log("WARNING: Unsupported node type encountered: " + i.nodeType);
      }
      var m = function () {
          return n;
        },
        p = function (e) {
          n === hn && a.filter(e);
        };
      return {
        getNode: function () {
          return a && a.getAttributes(), i;
        },
        tag: function () {
          return r;
        },
        type: m,
        text: function () {
          return o;
        },
        toString: function () {
          return "Type: " + n + ", Tag: " + r + " Text: " + o;
        },
        getAttribute: function (e) {
          return a.get(e.toLowerCase());
        },
        filterAttributes: p,
        filterStyles: function (r) {
          if (m() === hn) {
            var o = "";
            dn.each(u, function (e, t) {
              var n = r(t, e);
              null === n ? (i.style.removeProperty ? i.style.removeProperty(En(t)) : i.style.removeAttribute(En(t)), delete u[t]) : ((o += t + ": " + n + "; "), (u[t] = n));
            }),
              (o = o || null),
              p(function (e, t) {
                return "style" === e ? o : t;
              }),
              (i.style.cssText = o);
          }
        },
        getAttributeCount: function () {
          return a.getAttributeCount();
        },
        attributes: function (e) {
          a.each(e);
        },
        getStyle: function (e) {
          return u[e];
        },
        styles: function (n) {
          dn.each(u, function (e, t) {
            n(t, e);
          });
        },
        getComputedStyle: function () {
          return dn.ephoxGetComputedStyle(i);
        },
        isWhitespace: function () {
          return n === bn && /^[\s\u00A0]*$/.test(o);
        },
      };
    },
    Sn = function (e, t) {
      return In(t.createElement(e), !0);
    },
    Ln = Sn("HTML", window.document),
    Cn = {
      START_ELEMENT_TYPE: hn,
      END_ELEMENT_TYPE: yn,
      TEXT_TYPE: bn,
      COMMENT_TYPE: xn,
      FINISHED: Ln,
      token: In,
      createStartElement: function (e, t, n, r) {
        var o = r.createElement(e),
          i = "";
        return (
          dn.each(t, function (e, t) {
            o.setAttribute(t, e);
          }),
          dn.each(n, function (e, t) {
            (i += t + ":" + e + ";"), (o.style[En(t)] = e);
          }),
          In(o, !1, "" !== i ? i : null)
        );
      },
      createEndElement: Sn,
      createComment: function (e, t) {
        return In(t.createComment(e), !1);
      },
      createText: function (e, t) {
        return In(t.createTextNode(e));
      },
    },
    Nn = function (i) {
      var a = i.createDocumentFragment(),
        u = function (e) {
          a.appendChild(e);
        };
      return {
        dom: a,
        receive: function (e) {
          var t, n, r, o;
          switch (e.type()) {
            case Cn.START_ELEMENT_TYPE:
              (o = e.getNode().cloneNode(!1)), u((r = o)), (a = r);
              break;
            case Cn.TEXT_TYPE:
              (t = e), (n = i.createTextNode(t.text())), u(n);
              break;
            case Cn.END_ELEMENT_TYPE:
              a = a.parentNode;
              break;
            case Cn.COMMENT_TYPE:
              break;
            default:
              throw { message: "Unsupported token type: " + e.type() };
          }
        },
      };
    },
    Dn = function (e, o) {
      var i;
      (o = o || window.document), (i = o.createElement("div")), o.body.appendChild(i), (i.style.position = "absolute"), (i.style.left = "-10000px"), (i.innerHTML = e);
      var a = i.firstChild || Cn.FINISHED,
        u = [],
        c = !1;
      return {
        hasNext: function () {
          return void 0 !== a;
        },
        next: function () {
          var e,
            t,
            n = a,
            r = c;
          return (
            !c && a.firstChild ? (u.push(a), (a = a.firstChild)) : c || 1 !== a.nodeType ? (a.nextSibling ? ((a = a.nextSibling), (c = !1)) : ((a = u.pop()), (c = !0))) : (c = !0),
            n === Cn.FINISHED || a || (o.body.removeChild(i), (a = Cn.FINISHED)),
            (t = r),
            (e = n) === Cn.FINISHED ? e : e ? Cn.token(e, t) : void 0
          );
        },
      };
    },
    On = function (p, g) {
      return function (t, e, n) {
        var r,
          o,
          i,
          a = !1,
          u = function () {
            g && g(m), (a = !1), (o = []), (i = []);
          },
          c = function (e) {
            dn.each(e, function (e) {
              t.receive(e);
            });
          },
          s = function (e) {
            a ? i.push(e) : t.receive(e);
          },
          l = function () {
            f(), c(i), u();
          },
          f = function () {
            dn.each(r, function (e) {
              s(e);
            }),
              d();
          },
          d = function () {
            r = [];
          },
          m = {
            document: n || window.document,
            settings: e || {},
            emit: s,
            receive: function (e) {
              g && o.push(e), p(m, e), e === Cn.FINISHED && l();
            },
            startTransaction: function () {
              a = !0;
            },
            rollback: function () {
              c(o), u();
            },
            commit: l,
            defer: function (e) {
              (r = r || []).push(e);
            },
            hasDeferred: function () {
              return r && 0 < r.length;
            },
            emitDeferred: f,
            dropDeferred: d,
          };
        return u(), m;
      };
    },
    An = On,
    _n = function (n) {
      return On(function (e, t) {
        t.filterAttributes(dn.bind(n, e)), e.emit(t);
      });
    },
    Pn = /^(P|H[1-6]|T[DH]|LI|DIV|BLOCKQUOTE|PRE|ADDRESS|FIELDSET|DD|DT|CENTER)$/,
    kn = function () {
      return null;
    },
    Mn = !1,
    Rn = An(function (e, t) {
      var n,
        r = function () {
          Mn || (e.emit(Cn.createStartElement("P", {}, {}, e.document)), (Mn = !0));
        };
      switch (t.type()) {
        case Cn.TEXT_TYPE:
          r(), e.emit(t);
          break;
        case Cn.END_ELEMENT_TYPE:
          Mn && ((n = t), Pn.test(n.tag()) || t === Cn.FINISHED) ? (e.emit(Cn.createEndElement("P", e.document)), (Mn = !1)) : "BR" === t.tag() && e.emit(t);
          break;
        case Cn.START_ELEMENT_TYPE:
          "BR" === t.tag() ? (t.filterAttributes(kn), t.filterStyles(kn), e.emit(t)) : "IMG" === t.tag() && t.getAttribute("alt") && (r(), e.emit(Cn.createText(t.getAttribute("alt"), e.document)));
      }
      t === Cn.FINISHED && e.emit(t);
    }),
    Fn = function (e) {
      var t = e;
      return 65279 === t.charCodeAt(t.length - 1) ? t.substring(0, t.length - 1) : e;
    },
    jn = [Fn],
    Un =
      tinymce.isIE && 9 <= document.documentMode
        ? [
            function (e) {
              return e.replace(/<BR><BR>/g, "<br>");
            },
            function (e) {
              return e.replace(/<br>/g, " ");
            },
            function (e) {
              return e.replace(/<br><br>/g, "<BR><BR>");
            },
            function (e) {
              return /<(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)/.test(e)
                ? e.replace(
                    /(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g,
                    "$1"
                  )
                : e;
            },
          ].concat(jn)
        : jn,
    Bn = { all: dn.compose(Un), textOnly: Fn },
    Yn =
      /^(mso-.*|tab-stops|tab-interval|language|text-underline|text-effect|text-line-through|font-color|horiz-align|list-image-[0-9]+|separator-image|table-border-color-(dark|light)|vert-align|vnd\..*)$/,
    Hn = An(function (e, t) {
      var r,
        n = e.settings.get("retain_style_properties");
      t.filterStyles(
        ((r = n),
        function (e, t) {
          var n = !1;
          switch (r) {
            case "all":
            case "*":
              n = !0;
              break;
            case "valid":
              n = !Yn.test(e);
              break;
            case void 0:
            case "none":
              n = "list-style-type" === e;
              break;
            default:
              n = 0 <= ("," + r + ",").indexOf("," + e + ",");
          }
          return n ? t : null;
        })
      ),
        e.emit(t);
    }),
    Wn = An(function (e, t) {
      e.seenList ||
        (e.inferring
          ? "LI" === t.tag() && (t.type() === Cn.START_ELEMENT_TYPE ? e.inferring++ : (e.inferring--, e.inferring || (e.needsClosing = !0)))
          : ("OL" === t.tag() || "UL" === t.tag() ? (e.seenList = !0) : "LI" === t.tag() && ((e.inferring = 1), e.needsClosing || e.emit(Cn.createStartElement("UL", {}, {}, e.document))),
            !e.needsClosing || e.inferring || t.isWhitespace() || ((e.needsClosing = !1), e.emit(Cn.createEndElement("UL", e.document))))),
        e.emit(t);
    }),
    qn = _n(function (e, t) {
      return "name" === e || "id" === e ? null : t;
    }),
    $n = _n(function (e, t) {
      if ("class" === e)
        switch (this.settings.get("strip_class_attributes")) {
          case "mso":
            return 0 === t.indexOf("Mso") ? null : t;
          case "none":
            return t;
          default:
            return null;
        }
      return t;
    }),
    Vn = (function () {
      if (0 < navigator.userAgent.indexOf("Gecko") && navigator.userAgent.indexOf("WebKit") < 0) return !1;
      var e = document.createElement("div");
      try {
        e.innerHTML = '<p style="mso-list: Ignore;">&nbsp;</p>';
      } catch (e) {
        return !1;
      }
      return "Ignore" === Cn.token(e.firstChild).getStyle("mso-list");
    })(),
    Xn = function (e, t) {
      return e.type() === Cn.START_ELEMENT_TYPE
        ? 0 === e.getAttributeCount() || (t && 1 === e.getAttributeCount() && null !== e.getAttribute("style") && void 0 !== e.getAttribute("style"))
        : e.type() === Cn.END_ELEMENT_TYPE;
    },
    Gn = Vn,
    zn = function (e) {
      return "A" === e.tag() || "SPAN" === e.tag();
    },
    Kn = function (e) {
      var t = e.getStyle("mso-list");
      return t && "skip" !== t;
    },
    Zn = [],
    Jn = [],
    Qn = !1,
    er = function (e, t) {
      var n,
        r,
        o = 1;
      for (n = t + 1; n < e; n++)
        if ((r = Zn[n]) && "SPAN" === r.tag())
          if (r.type() === Cn.START_ELEMENT_TYPE) o++;
          else if (r.type() === Cn.END_ELEMENT_TYPE && 0 == --o) return void (Zn[n] = null);
    },
    tr = function (e, t) {
      if ((Zn.push(t), (Jn = Jn || []), t.type() === Cn.START_ELEMENT_TYPE)) Jn.push(t);
      else if (t.type() === Cn.END_ELEMENT_TYPE && (Jn.pop(), 0 === Jn.length))
        return void (function (e) {
          if (Qn) {
            var t = void 0,
              n = Zn.length,
              r = void 0;
            for (r = 0; r < n; r++) (t = Zn[r]) && (t.type() === Cn.START_ELEMENT_TYPE && "SPAN" === t.tag() && Xn(t) ? er(n, r) : e.emit(t));
          }
          (Zn = []), (Qn = !(Jn = []));
        })(e);
    },
    nr = An(function (e, t) {
      var n = function (e) {
        return !(0 <= ",FONT,EM,STRONG,SAMP,ACRONYM,CITE,CODE,DFN,KBD,TT,B,I,U,S,SUB,SUP,INS,DEL,VAR,SPAN,".indexOf("," + e.tag() + ",") && Xn(e, !0));
      };
      0 === (Zn = Zn || []).length ? (t.type() === Cn.START_ELEMENT_TYPE ? (n(t) ? e.emit(t) : tr(e, t)) : e.emit(t)) : (Qn || (Qn = n(t)), tr(e, t));
    }),
    rr = _n(function (e, t) {
      return "style" === e && "" === t ? null : t;
    }),
    or = _n(function (e, t) {
      return "lang" === e ? null : t;
    }),
    ir = An(function (e, t) {
      if ("IMG" === t.tag()) {
        if (t.type() === Cn.END_ELEMENT_TYPE && e.skipEnd) return void (e.skipEnd = !1);
        if (t.type() === Cn.START_ELEMENT_TYPE) {
          if (/^file:/.test(t.getAttribute("src"))) return void (e.skipEnd = !0);
          if (e.settings.get("base_64_images") && /^data:image\/.*;base64/.test(t.getAttribute("src"))) return void (e.skipEnd = !0);
        }
      }
      e.emit(t);
    }),
    ar = An(function (e, t) {
      "META" !== t.tag() && "LINK" !== t.tag() && e.emit(t);
    }),
    ur = function (e) {
      return !Xn(e) && !/^OLE_LINK/.test(e.getAttribute("name"));
    },
    cr = [],
    sr = An(function (e, t) {
      var n;
      t.type() === Cn.START_ELEMENT_TYPE && "A" === t.tag()
        ? (cr.push(t), ur(t) && e.defer(t))
        : t.type() === Cn.END_ELEMENT_TYPE && "A" === t.tag()
        ? ((n = cr.pop()), ur(n) && e.defer(t), 0 === cr.length && e.emitDeferred())
        : e.hasDeferred()
        ? e.defer(t)
        : e.emit(t);
    }),
    lr = !1,
    fr = [
      An(function (e, t) {
        "SCRIPT" === t.tag()
          ? (lr = t.type() === Cn.START_ELEMENT_TYPE)
          : lr ||
            (t.filterAttributes(function (e, t) {
              return /^on/.test(e) || "language" === e ? null : t;
            }),
            e.emit(t));
      }),
      qn,
      ir,
      Hn,
      or,
      rr,
      $n,
      sr,
      nr,
      ar,
      Wn,
    ],
    dr = An(function (e, n) {
      n.filterAttributes(function (e, t) {
        return "align" === e ? null : ("UL" !== n.tag() && "OL" !== n.tag()) || "type" !== e ? t : null;
      }),
        e.emit(n);
    }),
    mr = _n(function (e, t) {
      return /^xmlns(:|$)/.test(e) ? null : t;
    }),
    pr = An(function (e, t) {
      (t.tag && /^([OVWXP]|U[0-9]+|ST[0-9]+):/.test(t.tag())) || e.emit(t);
    }),
    gr = _n(function (e, t) {
      return "href" === e && (0 <= t.indexOf("#_Toc") || 0 <= t.indexOf("#_mso")) ? null : t;
    }),
    vr = _n(function (e, t) {
      return /^v:/.test(e) ? null : t;
    }),
    hr = [
      { regex: /^\(?[dc][\.\)]$/, type: { tag: "OL", type: "lower-alpha" } },
      { regex: /^\(?[DC][\.\)]$/, type: { tag: "OL", type: "upper-alpha" } },
      { regex: /^\(?M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[\.\)]$/, type: { tag: "OL", type: "upper-roman" } },
      { regex: /^\(?m*(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[\.\)]$/, type: { tag: "OL", type: "lower-roman" } },
      { regex: /^\(?[0-9]+[\.\)]$/, type: { tag: "OL" } },
      { regex: /^([0-9]+\.)*[0-9]+\.?$/, type: { tag: "OL", variant: "outline" } },
      { regex: /^\(?[a-z]+[\.\)]$/, type: { tag: "OL", type: "lower-alpha" } },
      { regex: /^\(?[A-Z]+[\.\)]$/, type: { tag: "OL", type: "upper-alpha" } },
    ],
    yr = { "\u2022": { tag: "UL", type: "disc" }, "\xb7": { tag: "UL", type: "disc" }, "\xa7": { tag: "UL", type: "square" } },
    br = { o: { tag: "UL", type: "circle" }, "-": { tag: "UL", type: "disc" }, "\u25cf": { tag: "UL", type: "disc" } },
    xr = function (e, t) {
      var n = { tag: e.tag, type: e.type, variant: t };
      return e.start && (n.start = e.start), e.type || delete n.type, n;
    },
    Tr = function (e, t, n) {
      return e === t || (e && t && e.tag === t.tag && e.type === t.type && (n || e.variant === t.variant));
    },
    Er = {
      guessListType: function (e, t, n) {
        var r,
          o,
          i,
          a = null;
        return (
          e && ((r = e.text), (o = e.symbolFont)),
          (r = dn.trim(r)),
          (a = br[r])
            ? (a = xr(a, r))
            : o
            ? (a = (a = yr[r]) ? xr(a, r) : { tag: "UL", variant: r })
            : (dn.each(hr, function (e) {
                if (e.regex.test(r)) {
                  if (t && Tr(e.type, t, !0)) return ((a = e.type).start = parseInt(r, 10)), !1;
                  a || (a = e.type), (a.start = parseInt(r, 10));
                }
              }),
              a && !a.variant && ((i = "(" === r.charAt(0) ? "()" : ")" === r.charAt(r.length - 1) ? ")" : "."), (a = xr(a, i)))),
          a && "OL" === a.tag && n && ("P" !== n.tag() || /^MsoHeading/.test(n.getAttribute("class"))) && (a = null),
          a
        );
      },
      eqListType: Tr,
      checkFont: function (e, t) {
        if (e.type() === Cn.START_ELEMENT_TYPE) {
          var n = e.getStyle("font-family");
          n ? (t = "Wingdings" === n || "Symbol" === n) : /^(P|H[1-6]|DIV)$/.test(e.tag()) && (t = !1);
        }
        return t;
      },
    },
    wr = function (e) {
      var t = e.indexOf(".");
      if (0 <= t && void 0 === dn.trim(e.substring(t + 1))) return (void 0)[2], !1;
    },
    Ir =
      ((Ue = function (e, t) {
        var n,
          r = /([^{]+){([^}]+)}/g;
        for (r.lastIndex = 0; null !== (n = r.exec(e)); ) dn.each(n[1].split(","), wr(void 0));
        return !1;
      }),
      (Be = {}),
      function (e, t) {
        var n,
          r = e + "," + t;
        return Be.hasOwnProperty(r) ? Be[r] : ((n = Ue.call(null, e, t)), (Be[r] = n));
      }),
    Sr = function (e, t) {
      var n,
        r,
        o,
        i = !1,
        a = function (e) {
          var t = e.style.fontFamily;
          t && (i = "Wingdings" === t || "Symbol" === t);
        };
      if (e.type() === Cn.START_ELEMENT_TYPE && t.openedTag && "SPAN" === e.tag()) {
        for (
          a((n = t.openedTag.getNode())), 1 < n.childNodes.length && "A" === n.firstChild.tagName && "" === n.firstChild.textContent && (n = n.childNodes[1]);
          n.firstChild && ("SPAN" === n.firstChild.tagName || "A" === n.firstChild.tagName);

        )
          a((n = n.firstChild));
        if (!(n = n.firstChild) || 3 !== n.nodeType) return n && "IMG" === n.tagName;
        if (((r = n.value), dn.trim(r) || (r = (n = n.parentNode.nextSibling) ? n.value : ""), !n || dn.trim(n.parentNode.textContent) != r)) return !1;
        if ((o = Er.guessListType({ text: r, symbolFont: i }, null, t.originalToken)))
          return n.nextSibling && "SPAN" === n.nextSibling.tagName && /^[\u00A0\s]/.test(n.nextSibling.firstChild.value) && ("P" === t.openedTag.tag() || "UL" === o.tag);
      }
      return !1;
    },
    Lr = function () {
      var a, u;
      return {
        guessIndentLevel: function (e, t, n, r) {
          var o, i;
          return r && /^([0-9]+\.)+[0-9]+\.?$/.test(r.text)
            ? r.text.replace(/([0-9]+|\.$)/g, "").length + 1
            : ((o = u || parseInt(Ir(n, t.getAttribute("class")))),
              (i = (function (e, t) {
                var n,
                  r = 0;
                for (n = e.parentNode; null != n && n !== t.parentNode; ) (r += n.offsetLeft), (n = n.offsetParent);
                return r;
              })(e.getNode(), t.getNode())),
              o ? (a ? (i += a) : 0 === i && (i += a = o)) : (o = 48),
              (u = o = Math.min(i, o)),
              Math.max(1, Math.floor(i / o)) || 1);
        },
      };
    },
    Cr = function () {
      var t = !1;
      return {
        check: function (e) {
          return t && e.type() === Cn.TEXT_TYPE
            ? (e.text(), !0)
            : e.type() === Cn.START_ELEMENT_TYPE && "STYLE" === e.tag()
            ? (t = !0)
            : e.type() === Cn.END_ELEMENT_TYPE && "STYLE" === e.tag() && !(t = !1);
        },
      };
    },
    Nr = ["disc", "circle", "square"];
  function Dr(a, u) {
    var i,
      o = [],
      c = [],
      s = 0,
      l = function (e, t) {
        var n = {},
          r = {};
        s++, t && e.type && (n = { "list-style-type": e.type }), e.start && 1 < e.start && (r = { start: e.start }), o.push(e), a.emit(Cn.createStartElement(e.tag, r, n, u)), (i = e);
      },
      f = function () {
        a.emit(Cn.createEndElement(o.pop().tag, u)), s--, (i = o[o.length - 1]);
      },
      d = function () {
        var e = c ? c.pop() : "P";
        "P" !== e && a.emit(Cn.createEndElement(e, u)), a.emit(Cn.createEndElement("LI", u));
      },
      m = function (e, t, n) {
        var r = {};
        if (e) {
          var o = e.getStyle("margin-left");
          void 0 !== o && (r["margin-left"] = o);
        } else r["list-style-type"] = "none";
        i && !Er.eqListType(i, t) && (f(), n && (a.emit(Cn.createStartElement("P", {}, {}, u)), a.emit(Cn.createText("\xa0", u)), a.emit(Cn.createEndElement("P", u))), l(t, !0)),
          a.emit(Cn.createStartElement("LI", {}, r, u)),
          e && "P" !== e.tag()
            ? (c.push(e.tag()),
              e.filterStyles(function () {
                return null;
              }),
              a.emit(e))
            : c.push("P");
      };
    return {
      openList: l,
      closelist: f,
      closeAllLists: function () {
        for (; 0 < s; ) d(), f();
        a.commit();
      },
      closeItem: d,
      openLI: m,
      openItem: function (e, t, n, r) {
        if (n) {
          for (s || (s = 0); e < s; ) d(), f();
          var o, i;
          if (((i = e), "UL" === (o = n).tag && Nr[i - 1] === o.type && (o = { tag: "UL" }), (n = o), s === e)) d(), m(t, n, r);
          else
            for (1 < e && 0 < c.length && "P" !== c[c.length - 1] && (a.emit(Cn.createEndElement(c[c.length - 1], u)), (c[c.length - 1] = "P")); s < e; ) l(n, s === e - 1), m(s === e ? t : void 0, n);
        }
      },
      getCurrentListType: function () {
        return i;
      },
      getCurrentLevel: function () {
        return s;
      },
    };
  }
  var Or = function (e, t) {
      dn.log("Unexpected token in list conversion: " + t.toString()), e.rollback();
    },
    Ar = function (e, t, n) {
      n.type() === Cn.TEXT_TYPE && "" === dn.trim(n.text())
        ? e.defer(n)
        : t.skippedPara || n.type() !== Cn.START_ELEMENT_TYPE || "P" !== n.tag() || Kn(n)
        ? Pr(e, t, n)
        : ((t.openedTag = n), e.defer(n), (t.nextFilter = _r));
    },
    _r = function (e, t, n) {
      n.type() !== Cn.START_ELEMENT_TYPE || "SPAN" !== n.tag() || 0 !== t.spanCount.length || (!Gn && Sr(n, t)) || Kn(n)
        ? n.type() === Cn.END_ELEMENT_TYPE
          ? "SPAN" === n.tag()
            ? (e.defer(n), t.spanCount.pop())
            : "P" === n.tag()
            ? (e.defer(n), (t.skippedPara = !0), (t.openedTag = null), (t.nextFilter = Ar))
            : ((t.nextFilter = Pr), t.nextFilter(e, t, n))
          : n.isWhitespace()
          ? e.defer(n)
          : ((t.nextFilter = Pr), t.nextFilter(e, t, n))
        : (e.defer(n), t.spanCount.push(n));
    },
    Pr = function (e, t, n) {
      var r = function () {
        t.emitter.closeAllLists(), e.emitDeferred(), (t.openedTag = null), e.emit(n), (t.nextFilter = Pr);
      };
      if (n.type() === Cn.START_ELEMENT_TYPE && Kn(n) && "LI" !== n.tag()) {
        var o = / level([0-9]+)/.exec(n.getStyle("mso-list"));
        o && o[1]
          ? ((t.itemLevel = parseInt(o[1], 10) + t.styleLevelAdjust),
            t.nextFilter === Pr ? e.emitDeferred() : e.dropDeferred(),
            (t.nextFilter = Mr),
            e.startTransaction(),
            (t.originalToken = n),
            (t.commentMode = !1))
          : r();
      } else
        !Gn && ((n.type() === Cn.COMMENT_TYPE && "[if !supportLists]" === n.text()) || Sr(n, e))
          ? (n.type() === Cn.START_ELEMENT_TYPE && "SPAN" === n.tag() && t.spanCount.push(n),
            (t.nextFilter = Mr),
            e.startTransaction(),
            (t.originalToken = t.openedTag),
            (t.commentMode = !0),
            (t.openedTag = null),
            e.dropDeferred())
          : n.type() === Cn.END_ELEMENT_TYPE && zn(n)
          ? (e.defer(n), t.spanCount.pop())
          : n.type() === Cn.START_ELEMENT_TYPE
          ? zn(n)
            ? (e.defer(n), t.spanCount.push(n))
            : (t.openedTag && (t.emitter.closeAllLists(), e.emitDeferred()), (t.openedTag = n), e.defer(n))
          : r();
    },
    kr = function (e, t, n) {
      n.type() === Cn.END_ELEMENT_TYPE && t.originalToken.tag() === n.tag() && ((t.nextFilter = Ar), (t.styleLevelAdjust = -1)), e.emit(n);
    },
    Mr = function (e, t, n) {
      if ((n.type() === Cn.START_ELEMENT_TYPE && "Ignore" === n.getStyle("mso-list") && (t.nextFilter = Rr), n.type() === Cn.START_ELEMENT_TYPE && "SPAN" === n.tag()))
        t.spanCount.push(n), ((t.commentMode && "" === n.getAttribute("style")) || null === n.getAttribute("style")) && (t.nextFilter = Rr);
      else if ("A" === n.tag()) n.type() === Cn.START_ELEMENT_TYPE ? t.spanCount.push(n) : t.spanCount.pop();
      else if (n.type() === Cn.TEXT_TYPE)
        if (t.commentMode) (t.nextFilter = Rr), t.nextFilter(e, t, n);
        else {
          var r = t.originalToken,
            o = t.spanCount;
          t.emitter.closeAllLists(), e.emit(r), dn.each(o, dn.bind(e.emit, e)), e.emit(n), e.commit(), (t.originalToken = r), (t.nextFilter = kr);
        }
      else (t.commentMode || n.type() !== Cn.COMMENT_TYPE) && Or(e, n);
    },
    Rr = function (e, t, n) {
      n.type() === Cn.TEXT_TYPE
        ? n.isWhitespace() || ((t.nextFilter = Fr), (t.bulletInfo = { text: n.text(), symbolFont: t.symbolFont }))
        : zn(n)
        ? n.type() === Cn.START_ELEMENT_TYPE
          ? t.spanCount.push(n)
          : t.spanCount.pop()
        : n.type() === Cn.START_ELEMENT_TYPE && "IMG" === n.tag()
        ? ((t.nextFilter = Fr), (t.bulletInfo = { text: "\u2202", symbolFont: !0 }))
        : Or(e, n);
    },
    Fr = function (e, t, n) {
      n.type() === Cn.START_ELEMENT_TYPE && zn(n)
        ? (t.spanCount.push(n), (t.nextFilter = jr))
        : n.type() === Cn.END_ELEMENT_TYPE && zn(n)
        ? (t.spanCount.pop(), (t.nextFilter = Ur))
        : (n.type() === Cn.END_ELEMENT_TYPE && "IMG" === n.tag()) || Or(e, n);
    },
    jr = function (e, t, n) {
      n.type() === Cn.END_ELEMENT_TYPE && (zn(n) && t.spanCount.pop(), (t.nextFilter = Ur));
    },
    Ur = function (o, i, a) {
      var e = function (e) {
        var t, n, r;
        if (
          ((i.nextFilter = Br),
          i.commentMode && (i.itemLevel = i.indentGuesser.guessIndentLevel(a, i.originalToken, i.styles.styles, i.bulletInfo)),
          (i.listType = Er.guessListType(i.bulletInfo, ((t = i.emitter.getCurrentListType()), (n = i.emitter.getCurrentLevel()), (r = i.itemLevel), n === r ? t : null), i.originalToken)),
          i.listType)
        ) {
          for (i.emitter.openItem(i.itemLevel, i.originalToken, i.listType, i.skippedPara), o.emitDeferred(); 0 < i.spanCount.length; ) o.emit(i.spanCount.shift());
          e && o.emit(a);
        } else dn.log("Unknown list type: " + i.bulletInfo.text + " Symbol font? " + i.bulletInfo.symbolFont), o.rollback();
      };
      a.type() === Cn.TEXT_TYPE || a.type() === Cn.START_ELEMENT_TYPE
        ? e(!0)
        : a.type() === Cn.COMMENT_TYPE
        ? e("[endif]" !== a.text())
        : a.type() === Cn.END_ELEMENT_TYPE
        ? zn(a) && i.spanCount.pop()
        : Or(o, a);
    },
    Br = function (e, t, n) {
      n.type() === Cn.END_ELEMENT_TYPE && n.tag() === t.originalToken.tag() ? ((t.nextFilter = Ar), (t.skippedPara = !1)) : e.emit(n);
    },
    Yr = { initial: Pr },
    Hr = {},
    Wr = function (e) {
      (Hr.nextFilter = Yr.initial),
        (Hr.itemLevel = 0),
        (Hr.originalToken = null),
        (Hr.commentMode = !1),
        (Hr.openedTag = null),
        (Hr.symbolFont = !1),
        (Hr.listType = null),
        (Hr.indentGuesser = Lr()),
        (Hr.emitter = Dr(e, e.document)),
        (Hr.styles = Cr()),
        (Hr.spanCount = []),
        (Hr.skippedPara = !1),
        (Hr.styleLevelAdjust = 0),
        (Hr.bulletInfo = void 0);
    };
  Wr({});
  var qr = [
      pr,
      An(
        function (e, t) {
          Hr.styles.check(t) || ((Hr.symbolFont = Er.checkFont(t, Hr.symbolFont)), Hr.nextFilter(e, Hr, t));
        },
        function (e) {
          Wr(e);
        }
      ),
      gr,
      vr,
      mr,
      dr,
    ],
    $r = function (e, t, n, r) {
      for (
        var o = Nn(n),
          i = Dn(e, n),
          a = (function (e, t, n, r) {
            var o,
              i = t;
            for (o = e.length - 1; 0 <= o; o--) i = e[o](i, n, r);
            return i;
          })(r, o, t, n);
        i.hasNext();

      )
        a.receive(i.next());
      return o.dom;
    },
    Vr = function (e) {
      return 0 <= e.indexOf("<o:p>") || 0 <= e.indexOf("p.MsoNormal, li.MsoNormal, div.MsoNormal") || 0 <= e.indexOf("MsoListParagraphCxSpFirst") || 0 <= e.indexOf("<w:WordDocument>");
    },
    Xr = {
      filter: function (e, t, n) {
        var r = Bn.all(e),
          o = Vr(r);
        t.setWordContent(o);
        var i = fr;
        return o && (i = qr.concat(fr)), $r(r, t, n, i);
      },
      filterPlainText: function (e, t, n) {
        var r = Bn.textOnly(e);
        return $r(r, t, n, [Rn]);
      },
      isWordContent: Vr,
    },
    Gr = { officeStyles: "prompt", htmlStyles: "clean" },
    zr = {
      openDialog: function (e, t, n) {
        var r,
          o = t("cement.dialog.paste.clean"),
          i = t("cement.dialog.paste.merge"),
          a = [
            {
              text: o,
              ariaLabel: o,
              onclick: function () {
                r.close(), n("clean");
              },
            },
            {
              text: i,
              ariaLabel: i,
              onclick: function () {
                r.close(), n("merge");
              },
            },
          ],
          u = { title: t("cement.dialog.paste.title"), spacing: 10, padding: 10, items: [{ type: "container", html: t("cement.dialog.paste.instructions") }], buttons: a };
        (r = e.windowManager.open(u)),
          setTimeout(function () {
            r && r.getEl().focus();
          }, 1);
      },
    },
    Kr = {
      openDialog: function (e, t, n) {
        var r = t("cement.dialog.paste.clean"),
          o = t("cement.dialog.paste.merge"),
          i = {
            title: t("cement.dialog.paste.title"),
            body: { type: "panel", items: [{ type: "htmlpanel", name: "instructions", html: t("cement.dialog.paste.instructions") }] },
            buttons: [
              { text: r, type: "custom", name: "clean" },
              { text: o, type: "custom", name: "merge" },
            ],
            onAction: function (e, t) {
              switch (t.name) {
                case "clean":
                  e.close(), n("clean");
                  break;
                case "merge":
                  e.close(), n("merge");
              }
            },
          };
        e.windowManager.open(i);
      },
    };
  function Zr(a, u, c) {
    return {
      showDialog: function (o) {
        var e,
          t = a.settings.powerpaste_word_import || Gr.officeStyles,
          n = a.settings.powerpaste_html_import || Gr.htmlStyles,
          r = Xr.isWordContent(o) ? t : n,
          i = function (e) {
            var t = { content: o };
            a.fire("PastePreProcess", { content: t, internal: !1 });
            var n = vn.create(e, e, !0),
              r = Xr.filter(t.content, n, a.getDoc());
            a.fire("PastePostProcess", { node: r, internal: !1 }),
              a.undoManager.transact(function () {
                fn.insert(r, a);
              });
          };
        "clean" === (e = r) || "merge" === e ? i(r) : (c ? Kr : zr).openDialog(a, u, i);
      },
    };
  }
  function Jr(u, e, t, r, c) {
    var s,
      l = /^image\/(jpe?g|png|gif|bmp)$/i;
    u.on("dragstart dragend", function (e) {
      s = "dragstart" === e.type;
    }),
      u.on("dragover dragend dragleave", function (e) {
        s || e.preventDefault();
      });
    var f = function (e, t) {
        return t in e && 0 < e[t].length;
      },
      d = function (e) {
        var t = e["text/plain"];
        return !!t && 0 === t.indexOf("file://");
      },
      m = function (e) {
        an.multiple(e).get(function (e) {
          var t = W(e, function (e) {
            var t = cn.fromTag("img"),
              n = me.cata(e, r.getLocalURL, function (e, t, n) {
                return t;
              });
            return Vt(t, "src", n), t.dom().outerHTML;
          }).join("");
          u.insertContent(t, { merge: !1 !== u.settings.paste_merge_formats }), r.uploadImages(e);
        });
      };
    u.on("drop", function (e) {
      if (!s) {
        if (tinymce.dom.RangeUtils && tinymce.dom.RangeUtils.getCaretRangeFromPoint) {
          var t = tinymce.dom.RangeUtils.getCaretRangeFromPoint(e.clientX, e.clientY, u.getDoc());
          t && u.selection.setRng(t);
        }
        var n =
          ((a = (i = e).target.files || i.dataTransfer.files),
          $(a, function (e) {
            return l.test(e.type);
          }));
        if (0 < n.length) return m(n), void e.preventDefault();
        var r = (function (e) {
          var t = {};
          if (e) {
            if (e.getData) {
              var n = e.getData("Text");
              n && 0 < n.length && (t["text/plain"] = n);
            }
            if (e.types)
              for (var r = 0; r < e.types.length; r++) {
                var o = e.types[r];
                t[o] = e.getData(o);
              }
          }
          return t;
        })(e.dataTransfer);
        d((o = r)) || (!f(o, "text/html") && !f(o, "text/plain")) || (Zr(u, ln.translate, c).showDialog(r["text/html"] || r["text/plain"]), e.preventDefault());
      }
      var o, i, a;
    });
  }
  var Qr = function () {
      for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
      return function () {
        for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
        if (t.length !== n.length) throw new Error('Wrong number of arguments to struct. Expected "[' + t.length + ']", got ' + n.length + " arguments");
        var r = {};
        return (
          q(t, function (e, t) {
            r[e] = v(n[t]);
          }),
          r
        );
      };
    },
    eo = function (e) {
      return e.slice(0).sort();
    },
    to = function (t, e) {
      if (!R(e)) throw new Error("The " + t + " fields must be an array. Was: " + e + ".");
      q(e, function (e) {
        if (!k(e)) throw new Error("The value " + e + " in the " + t + " fields was not a string.");
      });
    },
    no = function (o, i) {
      var n,
        a = o.concat(i);
      if (0 === a.length) throw new Error("You must specify at least one required or optional field.");
      return (
        to("required", o),
        to("optional", i),
        (n = eo(a)),
        X(n, function (e, t) {
          return t < n.length - 1 && e === n[t + 1];
        }).each(function (e) {
          throw new Error("The field: " + e + " occurs more than once in the combined fields: [" + n.join(", ") + "].");
        }),
        function (t) {
          var n = te(t);
          Q(o, function (e) {
            return Y(n, e);
          }) ||
            (function (e, t) {
              throw new Error("All required keys (" + eo(e).join(", ") + ") were not specified. Specified keys were: " + eo(t).join(", ") + ".");
            })(o, n);
          var e = $(n, function (e) {
            return !Y(a, e);
          });
          0 < e.length &&
            (function (e) {
              throw new Error("Unsupported keys for object: " + eo(e).join(", "));
            })(e);
          var r = {};
          return (
            q(o, function (e) {
              r[e] = v(t[e]);
            }),
            q(i, function (e) {
              r[e] = v(Object.prototype.hasOwnProperty.call(t, e) ? _.some(t[e]) : _.none());
            }),
            r
          );
        }
      );
    },
    ro = Qr("id", "imageresult", "objurl");
  function oo() {
    var o = {},
      n = function (e) {
        kt(e.objurl());
      };
    return {
      add: function (e, t, n) {
        var r = ro(e, t, n);
        return (o[e] = r);
      },
      get: function (e) {
        return _.from(o[e]);
      },
      remove: function (e) {
        var t = o[e];
        delete o[e], void 0 !== t && n(t);
      },
      lookupByData: function (t) {
        return (function (e, t) {
          for (var n = te(e), r = 0, o = n.length; r < o; r++) {
            var i = n[r],
              a = e[i];
            if (t(a, i, e)) return _.some(a);
          }
          return _.none();
        })(o, function (e) {
          return We.imageResultToDataURL(e.imageresult()) === t;
        });
      },
      destroy: function () {
        ne(o, n), (o = {});
      },
    };
  }
  function io(e) {
    var n = Qr.apply(null, e),
      r = [];
    return {
      bind: function (e) {
        if (void 0 === e) throw "Event bind error: undefined handler";
        r.push(e);
      },
      unbind: function (t) {
        r = $(r, function (e) {
          return e !== t;
        });
      },
      trigger: function () {
        var t = n.apply(null, arguments);
        q(r, function (e) {
          e(t);
        });
      },
    };
  }
  var ao = {
      create: function (e) {
        return {
          registry: re(e, function (e) {
            return { bind: e.bind, unbind: e.unbind };
          }),
          trigger: re(e, function (e) {
            return e.trigger;
          }),
        };
      },
    },
    uo = function (e) {
      return e.replace(/\./g, "-");
    },
    co = function (e, t) {
      return e + "-" + t;
    },
    so = function (e) {
      var n = uo(e);
      return {
        resolve: function (e) {
          var t = e.split(" ");
          return W(t, function (e) {
            return co(n, e);
          }).join(" ");
        },
      };
    },
    lo = { resolve: so("ephox-salmon").resolve },
    fo = lo.resolve("upload-image-in-progress"),
    mo = "data-" + lo.resolve("image-blob"),
    po = "data-" + lo.resolve("image-upload"),
    go = { uploadInProgress: v(fo), blobId: v(mo), trackedImage: v(po) },
    vo = function (e) {
      var t = qt(e) ? e.dom().parentNode : e.dom();
      return null != t && t.ownerDocument.body.contains(t);
    },
    ho = function (e, t) {
      for (
        var n = [],
          r = function (e) {
            return n.push(e), t(e);
          },
          o = t(e);
        (o = o.bind(r)).isSome();

      );
      return n;
    },
    yo = Ft,
    bo = Rt,
    xo = function (e, t) {
      var n = e.dom();
      if (n.nodeType !== yo) return !1;
      if (void 0 !== n.matches) return n.matches(t);
      if (void 0 !== n.msMatchesSelector) return n.msMatchesSelector(t);
      if (void 0 !== n.webkitMatchesSelector) return n.webkitMatchesSelector(t);
      if (void 0 !== n.mozMatchesSelector) return n.mozMatchesSelector(t);
      throw new Error("Browser lacks native selectors");
    },
    To = function (e) {
      return (e.nodeType !== yo && e.nodeType !== bo) || 0 === e.childElementCount;
    },
    Eo = function (e, t) {
      var n = void 0 === t ? y.document : t.dom();
      return To(n) ? [] : W(n.querySelectorAll(e), cn.fromDom);
    },
    wo = function (e, t) {
      var n = void 0 === t ? y.document : t.dom();
      return To(n) ? _.none() : _.from(n.querySelector(e)).map(cn.fromDom);
    },
    Io = function (e, t) {
      return e.dom() === t.dom();
    },
    So = (At.detect().browser.isIE(), xo),
    Lo = function (e) {
      return cn.fromDom(e.dom().ownerDocument);
    },
    Co = function (e) {
      var t = e.dom();
      return _.from(t.parentNode).map(cn.fromDom);
    },
    No = function (e, t) {
      for (var n = j(t) ? t : v(!1), r = e.dom(), o = []; null !== r.parentNode && void 0 !== r.parentNode; ) {
        var i = r.parentNode,
          a = cn.fromDom(i);
        if ((o.push(a), !0 === n(a))) break;
        r = i;
      }
      return o;
    },
    Do = function (e) {
      var t = e.dom();
      return _.from(t.previousSibling).map(cn.fromDom);
    },
    Oo = function (e) {
      var t = e.dom();
      return _.from(t.nextSibling).map(cn.fromDom);
    },
    Ao = function (e) {
      return (t = ho(e, Do)), (n = ee.call(t, 0)).reverse(), n;
      var t, n;
    },
    _o = function (e) {
      var t = e.dom();
      return W(t.childNodes, cn.fromDom);
    },
    Po = function (e) {
      return (t = 0), (n = e.dom().childNodes), _.from(n[t]).map(cn.fromDom);
      var t, n;
    },
    ko = function (e) {
      return e.dom().childNodes.length;
    },
    Mo =
      (Qr("element", "offset"),
      function (e, t) {
        var n = [];
        return (
          q(_o(e), function (e) {
            t(e) && (n = n.concat([e])), (n = n.concat(Mo(e, t)));
          }),
          n
        );
      }),
    Ro = function (e, t) {
      return Eo(t, e);
    },
    Fo = go.trackedImage(),
    jo = function (e, t) {
      return Ro(e, "img[" + Fo + '="' + t + '"]');
    },
    Uo = function (e) {
      return Ro(e, "img:not([" + Fo + "])[" + go.blobId() + "]");
    };
  function Bo() {
    var o = [],
      i = [],
      e = ao.create({ complete: io(["response"]) }),
      a = function () {
        e.trigger.complete(i), (i = []);
      },
      u = function () {
        return 0 < o.length;
      };
    return {
      findById: jo,
      findAll: Uo,
      register: function (e, t) {
        Vt(e, Fo, t), o.push(t);
      },
      report: function (e, t, r) {
        var n;
        q(t, function (e) {
          var t, n;
          Kt(e, Fo), (t = r), (n = e), i.push({ success: t, element: n.dom() });
        }),
          (n = e),
          (o = $(o, function (e, t) {
            return e !== n;
          })),
          !1 === u() && a();
      },
      inProgress: u,
      isActive: function (e) {
        return Y(o, e);
      },
      events: e.registry,
    };
  }
  var Yo = ue([{ get: [] }, { post: [] }, { put: [] }, { del: [] }]),
    Ho = { get: Yo.get, post: Yo.post, put: Yo.put, del: Yo.del },
    Wo = function (e, t, n, r) {
      var o = e.bind(function (e) {
          return e.match({
            file: function () {
              return _.none();
            },
            form: function () {
              return _.some("application/x-www-form-urlencoded; charset=UTF-8");
            },
            json: function () {
              return _.some("application/json");
            },
            plain: function () {
              return _.some("text/plain");
            },
            html: function () {
              return _.some("text/html");
            },
          });
        }),
        i = n.match({ none: _.none, xhr: v(_.some(!0)) }),
        a = t.match({ json: _.none, blob: v(_.some("blob")), xml: v(_.some("document")), html: v(_.some("document")), text: v(_.some("text")) }),
        u =
          t.match({ json: v("application/json, text/javascript"), blob: v("application/octet-stream"), text: v("text/plain"), html: v("text/html"), xml: v("application/xml, text/xml") }) +
          ", */*; q=0.01",
        c = r;
      return { contentType: v(o), credentials: v(i), responseType: v(a), accept: v(u), headers: v(c) };
    },
    qo = function (n, e) {
      e.contentType().each(function (e) {
        n.setRequestHeader("Content-Type", e);
      });
      var t = e.accept();
      n.setRequestHeader("Accept", t),
        e.credentials().each(function (e) {
          n.withCredentials = e;
        }),
        e.responseType().each(function (e) {
          n.responseType = e;
        });
      var r = e.headers();
      ne(r, function (e, t) {
        k(t) || k(e) ? n.setRequestHeader(t, e) : y.console.error("Request header data was not a string: ", t, " -> ", e);
      });
    },
    $o = function (t) {
      return Xe.nu(function (n) {
        var e = Se();
        (e.onload = function (e) {
          var t = e.target;
          n(t.result);
        }),
          e.readAsText(t);
      });
    },
    Vo = function (n) {
      return {
        is: function (e) {
          return n === e;
        },
        isValue: I,
        isError: w,
        getOr: v(n),
        getOrThunk: v(n),
        getOrDie: v(n),
        or: function (e) {
          return Vo(n);
        },
        orThunk: function (e) {
          return Vo(n);
        },
        fold: function (e, t) {
          return t(n);
        },
        map: function (e) {
          return Vo(e(n));
        },
        mapError: function (e) {
          return Vo(n);
        },
        each: function (e) {
          e(n);
        },
        bind: function (e) {
          return e(n);
        },
        exists: function (e) {
          return e(n);
        },
        forall: function (e) {
          return e(n);
        },
        toOption: function () {
          return _.some(n);
        },
      };
    },
    Xo = function (n) {
      return {
        is: w,
        isValue: w,
        isError: I,
        getOr: m,
        getOrThunk: function (e) {
          return e();
        },
        getOrDie: function () {
          return E(String(n))();
        },
        or: function (e) {
          return e;
        },
        orThunk: function (e) {
          return e();
        },
        fold: function (e, t) {
          return e(n);
        },
        map: function (e) {
          return Xo(n);
        },
        mapError: function (e) {
          return Xo(e(n));
        },
        each: C,
        bind: function (e) {
          return Xo(n);
        },
        exists: w,
        forall: I,
        toOption: _.none,
      };
    },
    Go = { value: Vo, error: Xo },
    zo = function () {
      return we.getOrDie("JSON");
    },
    Ko = {
      parse: function (e) {
        return zo().parse(e);
      },
      stringify: function (e, t, n) {
        return zo().stringify(e, t, n);
      },
    },
    Zo = function (e) {
      try {
        var t = Ko.parse(e);
        return Go.value(t);
      } catch (e) {
        return Go.error("Response was not JSON");
      }
    },
    Jo = no(["message", "status", "responseText"], []),
    Qo = function (e) {
      var t = Jo(e);
      return (t.toString = t.message), t;
    },
    ei = {
      handle: function (n, e, r) {
        var t = function () {
          return Xe.pure(r.response);
        };
        return e
          .match({
            json: function () {
              return Zo(r.response).fold(t, Xe.pure);
            },
            blob: function () {
              return (e = r), _.from(e.response).map($o).getOr(Xe.pure("no response content"));
              var e;
            },
            text: t,
            html: t,
            xml: t,
          })
          .map(function (e) {
            var t = 0 === r.status ? "Unknown HTTP error (possible cross-domain request)" : 'Could not load url "' + n + '": ' + r.statusText;
            return Qo({ message: t, status: r.status, responseText: e });
          });
      },
      nu: Qo,
    },
    ti = function () {
      return (ti =
        Object.assign ||
        function (e) {
          for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in (t = arguments[n])) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
          return e;
        }).apply(this, arguments);
    },
    ni = function (i) {
      return ti({}, i, {
        toCached: function () {
          return ni(i.toCached());
        },
        bindFuture: function (t) {
          return ni(
            i.bind(function (e) {
              return e.fold(
                function (e) {
                  return Xe.pure(Go.error(e));
                },
                function (e) {
                  return t(e);
                }
              );
            })
          );
        },
        bindResult: function (t) {
          return ni(
            i.map(function (e) {
              return e.bind(t);
            })
          );
        },
        mapResult: function (t) {
          return ni(
            i.map(function (e) {
              return e.map(t);
            })
          );
        },
        mapError: function (t) {
          return ni(
            i.map(function (e) {
              return e.mapError(t);
            })
          );
        },
        foldResult: function (t, n) {
          return i.map(function (e) {
            return e.fold(t, n);
          });
        },
        withTimeout: function (e, o) {
          return ni(
            Xe.nu(function (t) {
              var n = !1,
                r = window.setTimeout(function () {
                  (n = !0), t(Go.error(o()));
                }, e);
              i.get(function (e) {
                n || (window.clearTimeout(r), t(e));
              });
            })
          );
        },
      });
    },
    ri = function (e) {
      return ni(Xe.nu(e));
    },
    oi = function (e) {
      return ni(Xe.pure(Go.value(e)));
    },
    ii = ri,
    ai = oi,
    ui = function (e) {
      return ni(Xe.pure(Go.error(e)));
    },
    ci = function (e, t) {
      var n,
        r,
        o = function () {
          return ai(t.response);
        },
        i = function (e) {
          return ei.nu({ message: e, status: t.status, responseText: t.responseText });
        };
      return e.match({
        json: function () {
          return Zo(t.response).fold(function (e) {
            return ui(i(e));
          }, ai);
        },
        blob: o,
        text: o,
        html: o,
        xml:
          ((n = "Invalid XML document"),
          (r = o),
          function () {
            return r().bindResult(function (e) {
              return null === e ? Go.error(i(n)) : Go.value(e);
            });
          }),
      });
    },
    si = function (i, a, u, c, s, e) {
      var l = void 0 !== e ? e : {};
      return ii(function (t) {
        var e = a.match({ get: v("get"), put: v("put"), post: v("post"), del: v("delete") }),
          n = new (we.getOrDie("XMLHttpRequest"))();
        n.open(e, i, !0);
        var r = Wo(u, c, s, l);
        qo(n, r);
        var o = function () {
          ei.handle(i, c, n).get(function (e) {
            t(Go.error(e));
          });
        };
        (n.onload = function () {
          0 !== n.status || Et(i, "file:") ? (n.status < 100 || 400 <= n.status ? o() : ci(c, n).get(t)) : o();
        }),
          (n.onerror = o),
          u.fold(
            function () {
              n.send();
            },
            function (e) {
              var t = e.match({ file: m, form: m, json: Ko.stringify, plain: m, html: m });
              n.send(t);
            }
          );
      }).toLazy();
    },
    li = ue([{ file: ["data"] }, { form: ["data"] }, { json: ["data"] }, { plain: ["data"] }, { html: ["data"] }]),
    fi = { file: li.file, form: li.form, json: li.json, plain: li.plain, html: li.html },
    di = ue([{ none: [] }, { xhr: [] }]),
    mi = { none: di.none, xhr: di.xhr },
    pi = ue([{ json: [] }, { blob: [] }, { text: [] }, { html: [] }, { xml: [] }]),
    gi = {
      json: pi.json,
      blob: pi.blob,
      text: pi.text,
      html: pi.html,
      xml: pi.xml,
      cata: function (e, t, n, r, o, i) {
        return e.match({ json: t, blob: n, text: r, html: o, xml: i });
      },
    },
    vi = Qr("message", "status", "contents"),
    hi = ["jpg", "png", "gif", "jpeg"],
    yi = {
      failureObject: vi,
      getFilename: function (e, t) {
        return k(e.name) && !wt(e.name, ".tmp")
          ? e.name
          : (function (e, t) {
              if (k(e.type) && Et(e.type, "image/")) {
                var n = e.type.substr("image/".length);
                return Y(hi, n) ? t + "." + n : t;
              }
              return t;
            })(e, t);
      },
      buildData: function (e, t, n) {
        var r = new (we.getOrDie("FormData"))();
        return r.append(e, t, n), r;
      },
    },
    bi = function (e) {
      var t = "";
      return (
        "" !== e.protocol && ((t += e.protocol), (t += ":")),
        "" !== e.authority && ((t += "//"), (t += e.authority)),
        (t += e.path),
        "" !== e.query && ((t += "?"), (t += e.query)),
        "" !== e.anchor && ((t += "#"), (t += e.anchor)),
        t
      );
    },
    xi = {
      strictMode: !1,
      key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
      q: { name: "queryKey", parser: /(?:^|&)([^&=]*)=?([^&]*)/g },
      parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose:
          /^(?:(?![^:@\/]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*)(?::([^:@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
      },
    },
    Ti = function (e, t) {
      return (function (e, t) {
        for (var r = t, n = r.parser[r.strictMode ? "strict" : "loose"].exec(e), o = {}, i = 14; i--; ) o[r.key[i]] = n[i] || "";
        return (
          (o[r.q.name] = {}),
          o[r.key[12]].replace(r.q.parser, function (e, t, n) {
            t && (o[r.q.name][t] = n);
          }),
          o
        );
      })(e, fe(xi, t));
    },
    Ei = function (e) {
      return bt(e, wi(e));
    },
    wi = function (e) {
      return e.substring(e.lastIndexOf("/"));
    },
    Ii = function (e) {
      for (var t = e, n = ""; "" !== t; )
        if (Et(t, "../")) t = yt(t, "../");
        else if (Et(t, "./")) t = yt(t, "./");
        else if (Et(t, "/./")) t = "/" + yt(t, "/./");
        else if ("/." === t) t = "/";
        else if (Et(t, "/../")) (t = "/" + yt(t, "/../")), (n = Ei(n));
        else if ("/.." === t) (t = "/"), (n = Ei(n));
        else if ("." === t || ".." === t) t = "";
        else {
          var r = t.match(/(^\/?.*?)(\/|$)/)[1];
          (t = yt(t, r)), (n += r);
        }
      return n;
    },
    Si = function (e, t, n) {
      if ("" !== n && "" === e) return "/" + t;
      var r = e.substring(e.lastIndexOf("/") + 1);
      return bt(e, r) + t;
    },
    Li = function (e, t) {
      var n = { strictMode: !0 },
        r = Ti(e, n),
        o = Ti(t, n),
        i = {};
      return (
        "" !== o.protocol
          ? ((i.protocol = o.protocol), (i.authority = o.authority), (i.path = Ii(o.path)), (i.query = o.query))
          : ("" !== o.authority
              ? ((i.authority = o.authority), (i.path = Ii(o.path)), (i.query = o.query))
              : ("" === o.path
                  ? ((i.path = r.path), "" !== o.query ? (i.query = o.query) : (i.query = r.query))
                  : (Et(o.path, "/") ? (i.path = Ii(o.path)) : ((i.path = Si(r.path, o.path, e.authority)), (i.path = Ii(i.path))), (i.query = o.query)),
                (i.authority = r.authority)),
            (i.protocol = r.protocol)),
        (i.anchor = o.anchor),
        i
      );
    },
    Ci = function (e, t) {
      var n = Li(e, t);
      return bi(n);
    };
  function Ni(d) {
    var e,
      t,
      n,
      r,
      m = ((e = d.url), (t = e.lastIndexOf("/")), (n = 0 < t ? e.substr(0, t) : e), (r = void 0 === d.basePath ? n : d.basePath), wt(r, "/") ? r : r + "/"),
      o = function (e, t, l) {
        var n,
          r,
          o,
          i,
          a,
          u,
          f = yi.getFilename(e, t),
          c = !0 === d.credentials ? mi.xhr() : mi.none(),
          s = fi.file(yi.buildData("image", e, f));
        ((n = d.url), (r = s), (o = gi.text()), (i = c), (u = Ho.post()), si(n, u, _.some(r), o, i, a)).map(function (e) {
          e.fold(
            function (e) {
              l(Go.error(yi.failureObject(e.message(), e.status(), e.responseText())));
            },
            function (t) {
              var n, e, r, o;
              try {
                var i = Ko.parse(t);
                if (!k(i.location)) return (e = "JSON response did not contain a string location"), (r = 500), (o = t), void l(Go.error(yi.failureObject(e, r, o)));
                n = i.location;
              } catch (e) {
                n = t;
              }
              var a,
                u,
                c,
                s = ((a = f), (u = n.split(/\s+/)), (c = 1 === u.length && "" !== u[0] ? u[0] : a), Ci(m, c));
              l(Go.value({ location: s }));
            }
          );
        });
      };
    return {
      upload: function (e, t, n) {
        var r = e.imageresult();
        We.imageResultToBlob(r).then(function (e) {
          o(e, t, n);
        });
      },
    };
  }
  Qr("id", "filename", "blob", "base64");
  var Di = function (e) {
      return Ni(e);
    },
    Oi = function (e, t) {
      var n = Gt(e, t);
      return void 0 === n || "" === n ? [] : n.split(" ");
    },
    Ai = function (e) {
      return void 0 !== e.dom().classList;
    },
    _i = function (e) {
      return Oi(e, "class");
    },
    Pi = function (e, t) {
      return (o = t), (i = Oi((n = e), (r = "class")).concat([o])), Vt(n, r, i.join(" ")), !0;
      var n, r, o, i;
    },
    ki = function (e, t) {
      return (
        (o = t),
        0 <
        (i = $(Oi((n = e), (r = "class")), function (e) {
          return e !== o;
        })).length
          ? Vt(n, r, i.join(" "))
          : Kt(n, r),
        !1
      );
      var n, r, o, i;
    },
    Mi = function (e, t) {
      Ai(e) ? e.dom().classList.add(t) : Pi(e, t);
    },
    Ri = function (e, t) {
      var n;
      Ai(e) ? e.dom().classList.remove(t) : ki(e, t), 0 === (Ai((n = e)) ? n.dom().classList : _i(n)).length && Kt(n, "class");
    },
    Fi = function (e, t) {
      return Ai(e) && e.dom().classList.contains(t);
    },
    ji = function (t, e) {
      q(e, function (e) {
        Mi(t, e);
      });
    },
    Ui = function (e) {
      return Ai(e)
        ? (function (e) {
            for (var t = e.dom().classList, n = new Array(t.length), r = 0; r < t.length; r++) n[r] = t.item(r);
            return n;
          })(e)
        : _i(e);
    },
    Bi = function (t) {
      return function (e) {
        return Fi(e, t);
      };
    },
    Yi = function (e, t, n) {
      for (var r = e.dom(), o = j(n) ? n : v(!1); r.parentNode; ) {
        r = r.parentNode;
        var i = cn.fromDom(r);
        if (t(i)) return _.some(i);
        if (o(i)) break;
      }
      return _.none();
    },
    Hi = function (e, t) {
      return X(e.dom().childNodes, g(t, cn.fromDom)).map(cn.fromDom);
    },
    Wi = function (e, r) {
      var o = function (e) {
        for (var t = 0; t < e.childNodes.length; t++) {
          if (r(cn.fromDom(e.childNodes[t]))) return _.some(cn.fromDom(e.childNodes[t]));
          var n = o(e.childNodes[t]);
          if (n.isSome()) return n;
        }
        return _.none();
      };
      return o(e.dom());
    },
    qi = function (e) {
      return wo(e);
    },
    $i = function (e, t, n) {
      return Yi(
        e,
        function (e) {
          return xo(e, t);
        },
        n
      );
    },
    Vi = function (e, t) {
      return wo(t, e);
    },
    Xi = function (e, t, n) {
      return (r = $i), (a = n), xo((o = e), (i = t)) ? _.some(o) : j(a) && a(o) ? _.none() : r(o, i, a);
      var r, o, i, a;
    },
    Gi = Qr("image", "blobInfo"),
    zi = ue([{ failure: ["error"] }, { success: ["result", "images", "blob"] }]),
    Ki = function (e, t, n, r, o) {
      var i = We.imageResultToDataURL(n),
        a = e.lookupByData(i).getOrThunk(function () {
          return e.add(t, n, r);
        });
      return Vt(o, go.blobId(), a.id()), Gi(o, a);
    },
    Zi = function (t, n) {
      return t.get(n).fold(
        function () {
          return Go.error("Internal error with blob cache");
        },
        function (e) {
          return t.remove(n), Go.value(e);
        }
      );
    },
    Ji = function (e, t, n) {
      var r = e.isActive(t);
      return e.register(n, t), Mi(n, go.uploadInProgress()), r ? _.none() : _.some(t);
    },
    Qi = function (e, n, a, r, u, t, c) {
      var s = function () {
        y.console.error("Internal error with blob cache", u), c(zi.failure({ status: v(666) }));
      };
      e.upload(t, u, function (e) {
        var t,
          i = n.findById(r, u);
        q(
          i,
          ((t = go.uploadInProgress()),
          function (e) {
            Ri(e, t);
          })
        ),
          e.fold(
            function (e) {
              c(zi.failure(e));
            },
            function (t) {
              var e, n, r, o;
              ((e = a),
              (n = i),
              (r = u),
              (o = t),
              q(n, function (e) {
                Vt(e, "src", o.location), Kt(e, go.blobId());
              }),
              Zi(e, r)).fold(s, function (e) {
                c(zi.success(t, i, e));
              });
            }
          ),
          n.report(u, i, e.isValue());
      });
    },
    ea = function (o, i, e) {
      return J(e, function (e) {
        return me.cata(
          e,
          function (t, n, r) {
            return Vi(i, 'img[src="' + r + '"]').fold(
              function () {
                return [Go.error("Image that was just inserted could not be found: " + r)];
              },
              function (e) {
                return [Go.value(Ki(o, t, n, r, e))];
              }
            );
          },
          v([])
        );
      });
    },
    ta = function (e, o, t) {
      var n = e.findAll(t);
      return e.inProgress()
        ? []
        : W(n, function (e) {
            return (
              (t = o),
              (r = Gt((n = e), go.blobId())),
              t.get(r).fold(
                function () {
                  return Go.error(r);
                },
                function (e) {
                  return Go.value(Gi(n, e));
                }
              )
            );
            var t, n, r;
          });
    },
    na = function (e) {
      return parseInt(e, 10);
    },
    ra = function (e, t, n) {
      return { major: v(e), minor: v(t), patch: v(n) };
    },
    oa = {
      getTinymceVersion: function () {
        var e,
          t,
          n = [tinymce.majorVersion, tinymce.minorVersion].join(".");
        return (e = n.split(".").slice(0, 3).join(".")), (t = /([0-9]+)\.([0-9]+)\.([0-9]+)(?:(\-.+)?)/.exec(e)) ? ra(na(t[1]), na(t[2]), na(t[3])) : ra(0, 0, 0);
      },
    };
  function ia(c) {
    var s = function (e, t) {
      return v(
        4 === (o = oa.getTinymceVersion()).major() && o.minor() < 6
          ? e
          : e + "." + ((n = t.toLowerCase()), (r = { "image/jpeg": "jpg", "image/jpg": "jpg", "image/gif": "gif", "image/png": "png" }).hasOwnProperty(n) ? r[n] : "dat")
      );
      var n, r, o;
    };
    return {
      importImages: function (e) {
        var t = J(e, function (e) {
          return me.cata(
            e,
            function (e, t, n) {
              var r,
                o,
                i,
                a,
                u = We.imageResultToDataURL(t);
              return [
                ((r = e),
                (o = t),
                (i = u),
                (a = n),
                Xe.nu(function (t) {
                  We.imageResultToOriginalBlob(o).then(function (e) {
                    c.editorUpload.blobCache.add({ id: v(r), name: v(r), filename: s(r, e.type), blob: v(e), base64: v(i.split(",")[1]), blobUri: v(a), uri: v(null) }), t(e);
                  });
                })),
              ];
            },
            v([])
          );
        });
        return ze(t);
      },
      uploadImages: function () {
        c.uploadImages();
      },
      prepareImages: C,
      getLocalURL: function (e, t, n) {
        return We.imageResultToDataURL(t);
      },
    };
  }
  var aa = function (e, t) {
      var n = (t || y.document).createElement("div");
      return (n.innerHTML = e), _o(cn.fromDom(n));
    },
    ua = function (t, n) {
      Co(t).each(function (e) {
        e.dom().insertBefore(n.dom(), t.dom());
      });
    },
    ca = function (e, t) {
      Oo(e).fold(
        function () {
          Co(e).each(function (e) {
            la(e, t);
          });
        },
        function (e) {
          ua(e, t);
        }
      );
    },
    sa = function (t, n) {
      Po(t).fold(
        function () {
          la(t, n);
        },
        function (e) {
          t.dom().insertBefore(n.dom(), e.dom());
        }
      );
    },
    la = function (e, t) {
      e.dom().appendChild(t.dom());
    },
    fa = function (e, t) {
      ua(e, t), la(t, e);
    },
    da = function (r, o) {
      q(o, function (e, t) {
        var n = 0 === t ? r : o[t - 1];
        ca(n, e);
      });
    },
    ma = function (t, e) {
      q(e, function (e) {
        la(t, e);
      });
    },
    pa = function (e) {
      Ri(e, go.uploadInProgress());
    },
    ga = function (e) {
      for (var t = 0; t < e.undoManager.data.length; t++) {
        var n = e.undoManager.data[t].content,
          r = cn.fromTag("div");
        ma(r, aa(n));
        var o = Ro(r, "." + go.uploadInProgress());
        q(o, pa), (e.undoManager.data[t].content = r.dom().innerHTML);
      }
    },
    va = function (e, t, n) {
      for (var r = 0; r < e.undoManager.data.length; r++) e.undoManager.data[r].content = e.undoManager.data[r].content.split(t.objurl()).join(n.location);
    },
    ha = {
      showDialog: function (e, t) {
        var n,
          r = {
            title: "Error",
            spacing: 10,
            padding: 10,
            items: [{ type: "container", html: t }],
            buttons: [
              {
                text: "Ok",
                onclick: function () {
                  n.close();
                },
              },
            ],
          };
        n = e.windowManager.open(r);
      },
    },
    ya = function (r, e) {
      var o,
        t,
        i,
        a,
        u,
        n,
        c = oo(),
        s = Bo(),
        l =
          ((o = r),
          (t = e.url),
          (i = ha),
          (a = function () {
            return ln.translate("error.code.images.not.found") + t + ln.translate("error.full.stop");
          }),
          (u = function () {
            return ln.translate("error.imageupload") + t + ln.translate("error.full.stop");
          }),
          (n = function (e) {
            var t = e.status(),
              n = 0 === t || 400 <= t || t < 500 ? a : u;
            i.showDialog(o, n());
          }),
          {
            instance: function () {
              return (
                (e = n),
                (t = !1),
                function () {
                  t || ((t = !0), e.apply(null, arguments));
                }
              );
              var e, t;
            },
          }),
        f = Di(e),
        d = function () {
          return cn.fromDom(r.getBody());
        },
        m = function (t, e, n) {
          q(e, function (e) {
            Vt(e, "data-mce-src", t.location);
          }),
            va(r, n, t);
        };
      s.events.complete.bind(function (e) {
        ga(r);
      });
      var p = function (o, i) {
        Ji(s, o.blobInfo().id(), o.image()).each(function (e) {
          var t, n, r;
          (t = e),
            (n = o.blobInfo()),
            (r = i),
            Qi(f, s, c, d(), t, n, function (e) {
              e.fold(function (e) {
                r(e);
              }, m);
            });
        });
      };
      return {
        importImages: function () {
          return Xe.pure([]);
        },
        uploadImages: function (e) {
          var t, n, r, o, i;
          (t = l.instance()),
            (n = ta(s, c, d())),
            q(n, function (e) {
              e.fold(
                function (e) {
                  s.report(e, _.none(), !1);
                },
                function (e) {
                  p(e, t);
                }
              );
            }),
            (r = e),
            (o = l.instance()),
            (i = ea(c, d(), r)),
            q(i, function (e) {
              e.fold(
                function (e) {
                  console.error(e);
                },
                function (e) {
                  p(e, o);
                }
              );
            });
        },
        prepareImages: C,
        getLocalURL: function (e, t, n) {
          return n;
        },
      };
    },
    ba = function (o) {
      var e = ia(o);
      return {
        importImages: function () {
          return Xe.pure([]);
        },
        uploadImages: C,
        prepareImages: function (e) {
          q(e, function (e) {
            me.cata(
              e,
              function (e, t, n) {
                var r = We.imageResultToDataURL(t);
                q(o.dom.select('img[src="' + n + '"]'), function (e) {
                  o.dom.setAttrib(e, "src", r);
                });
              },
              C
            );
          });
        },
        getLocalURL: e.getLocalURL,
      };
    };
  function xa(e) {
    return void 0 !== e.uploadImages
      ? ia(e)
      : (function (e) {
          if (a(e)) {
            var t = { url: e.settings.images_upload_url, basePath: e.settings.images_upload_base_path, credentials: e.settings.images_upload_credentials };
            return ya(e, t);
          }
          return ba(e);
        })(e);
  }
  var Ta = function (t, r, e, n) {
      var o,
        i,
        a,
        u,
        c,
        s = t.selection,
        l = t.dom,
        f = t.getBody();
      if (((c = e.isText()), e.reset(), n.clipboardData && n.clipboardData.getData("text/html"))) {
        n.preventDefault();
        var d = n.clipboardData.getData("text/html"),
          m = d.match(/<html[\s\S]+<\/html>/i),
          p = null === m ? d : m[0];
        return r(p);
      }
      if (!l.get("_mcePaste")) {
        if (
          ((o = l.add(f, "div", { id: "_mcePaste", class: "mcePaste" }, '\ufeff<br _mce_bogus="1">')),
          (u = f !== t.getDoc().body ? l.getPos(t.selection.getStart(), f).y : f.scrollTop),
          l.setStyles(o, { position: "absolute", left: -1e4, top: u, width: 1, height: 1, overflow: "hidden" }),
          tinymce.isIE)
        )
          return (
            (a = l.doc.body.createTextRange()).moveToElementText(o),
            a.execCommand("Paste"),
            l.remove(o),
            "\ufeff" === o.innerHTML ? (t.execCommand("mcePasteWord"), void n.preventDefault()) : (r(c ? o.innerText : o.innerHTML), tinymce.dom.Event.cancel(n))
          );
        var g = function (e) {
          e.preventDefault();
        };
        if (
          (l.bind(t.getDoc(), "mousedown", g), l.bind(t.getDoc(), "keydown", g), tinymce.isGecko && (a = t.selection.getRng(!0)).startContainer === a.endContainer && 3 === a.startContainer.nodeType)
        ) {
          var v = l.select("p,h1,h2,h3,h4,h5,h6,pre", o);
          1 === v.length && l.remove(v.reverse(), !0);
        }
        (i = t.selection.getRng()),
          (o = o.firstChild),
          (a = t.getDoc().createRange()).setStart(o, 0),
          a.setEnd(o, 1),
          s.setRng(a),
          window.setTimeout(function () {
            var n = "",
              e = l.select("div.mcePaste");
            dn.each(e, function (e) {
              var t = e.firstChild;
              t && "DIV" === t.nodeName && t.style.marginTop && t.style.backgroundColor && l.remove(t, 1),
                dn.each(l.select("div.mcePaste", e), function (e) {
                  l.remove(e, 1);
                }),
                dn.each(l.select("span.Apple-style-span", e), function (e) {
                  l.remove(e, 1);
                }),
                dn.each(l.select("br[_mce_bogus]", e), function (e) {
                  l.remove(e);
                }),
                (n += e.innerHTML);
            }),
              dn.each(e, function (e) {
                l.remove(e);
              }),
              i && s.setRng(i),
              r(n),
              l.unbind(t.getDoc(), "mousedown", g),
              l.unbind(t.getDoc(), "keydown", g);
          }, 0);
      }
    },
    Ea = {
      getOnPasteFunction: function (t, n, r) {
        return function (e) {
          Ta(t, n, r, e);
        };
      },
      getOnKeyDownFunction: function (t, n, r) {
        return function (e) {
          (tinymce.isOpera || 0 < navigator.userAgent.indexOf("Firefox/2")) && (((tinymce.isMac ? e.metaKey : e.ctrlKey) && 86 === e.keyCode) || (e.shiftKey && 45 === e.keyCode)) && Ta(t, n, r, e);
        };
      },
    },
    wa = ["officeStyles", "htmlStyles", "isWord", "isGoogleDocs", "proxyBin", "isInternal", "backgroundAssets"],
    Ia = no([], wa),
    Sa = {
      nu: Ia,
      merge: function (e, n) {
        var r = {};
        return (
          q(wa, function (t) {
            n[t]()
              .or(e[t]())
              .each(function (e) {
                r[t] = e;
              });
          }),
          Ia(r)
        );
      },
    },
    La = ue([{ error: ["message"] }, { paste: ["elements", "correlated"] }, { cancel: [] }, { incomplete: ["elements", "correlated", "message"] }]),
    Ca = function (e, t, n, r, o) {
      return e.fold(t, n, r, o);
    },
    Na = {
      error: La.error,
      paste: La.paste,
      cancel: La.cancel,
      incomplete: La.incomplete,
      cata: Ca,
      carry: function (e, r) {
        return Ca(e, _.none, _.none, _.none, function (e, t, n) {
          return Ca(
            r,
            _.none,
            function (e, t) {
              return _.some(La.incomplete(e, t, n));
            },
            _.none,
            _.none
          );
        }).getOr(r);
      },
    },
    Da = no(["response", "bundle"], []),
    Oa = function (t) {
      return Aa(function (e) {
        e(Da(t));
      });
    },
    Aa = function (t) {
      var e = function (e) {
          t(e);
        },
        o = Aa;
      return {
        get: e,
        map: function (r) {
          return o(function (n) {
            e(function (e) {
              var t = r(e);
              n(t);
            });
          });
        },
        bind: function (n) {
          return o(function (t) {
            e(function (e) {
              n(e).get(t);
            });
          });
        },
      };
    },
    _a = {
      call: function (e, t) {
        e(Da(t));
      },
      sync: Aa,
      pure: Oa,
      pass: function (e) {
        return Oa({ response: e.response(), bundle: e.bundle() });
      },
      done: Da,
      error: function (e) {
        return Oa({ response: Na.error(e), bundle: Sa.nu({}) });
      },
      initial: function () {
        return Oa({ response: Na.paste([], []), bundle: Sa.nu({}) });
      },
      cancel: function () {
        return Oa({ response: Na.cancel(), bundle: Sa.nu({}) });
      },
    },
    Pa = function (e, t) {
      for (var n = 0; n < e.length; n++) {
        var r = t(e[n], n);
        if (r.isSome()) return r;
      }
      return _.none();
    },
    ka = Qr("steps", "input", "label", "capture"),
    Ma = {
      choose: function (e, t, n) {
        var r;
        return ((r = n),
        Pa(e, function (t) {
          return t.getAvailable(r).map(function (e) {
            return ka(t.steps(), e, t.label(), t.capture());
          });
        })).getOrThunk(function () {
          var e = t.getAvailable(n);
          return ka(t.steps(), e, t.label(), t.capture());
        });
      },
      run: function (e, a) {
        return V(
          e,
          function (e, i) {
            return e.bind(function (e) {
              var r, t, n, o;
              return (
                (r = e),
                (t = function () {
                  return i(a, e);
                }),
                (n = N(_a.pass, r)),
                (o = function () {
                  return t().map(function (e) {
                    var t = Sa.merge(r.bundle(), e.bundle()),
                      n = Na.carry(r.response(), e.response());
                    return _a.done({ response: n, bundle: t });
                  });
                }),
                Na.cata(r.response(), n, o, n, o)
              );
            });
          },
          _a.initial()
        );
      },
    },
    Ra = function (e) {
      (e.dom().textContent = ""),
        q(_o(e), function (e) {
          Fa(e);
        });
    },
    Fa = function (e) {
      var t = e.dom();
      null !== t.parentNode && t.parentNode.removeChild(t);
    },
    ja = function (e) {
      var t,
        n = _o(e);
      0 < n.length &&
        ((t = e),
        q(n, function (e) {
          ua(t, e);
        })),
        Fa(e);
    },
    Ua = function (e) {
      return (t = e), (n = !1), cn.fromDom(t.dom().cloneNode(n));
      var t, n;
    },
    Ba = function (e) {
      return void 0 !== e.style;
    },
    Ya = function (e, t, n) {
      if (!k(n)) throw (y.console.error("Invalid call to CSS.set. Property ", t, ":: Value ", n, ":: Element ", e), new Error("CSS value must be a string: " + n));
      Ba(e) && e.style.setProperty(t, n);
    },
    Ha = function (e, t, n) {
      var r = e.dom();
      Ya(r, t, n);
    },
    Wa = function (e, t) {
      var n = e.dom();
      ne(t, function (e, t) {
        Ya(n, t, e);
      });
    },
    qa = function (e, t) {
      var n = e.dom(),
        r = y.window.getComputedStyle(n).getPropertyValue(t),
        o = "" !== r || vo(e) ? r : $a(n, t);
      return null === o ? void 0 : o;
    },
    $a = function (e, t) {
      return Ba(e) ? e.style.getPropertyValue(t) : "";
    },
    Va = function (e, t) {
      var n = e.dom(),
        r = $a(n, t);
      return _.from(r).filter(function (e) {
        return 0 < e.length;
      });
    },
    Xa = function (e, t) {
      var n,
        r,
        o = e.dom();
      (r = t), Ba((n = o)) && n.style.removeProperty(r), zt(e, "style") && "" === It(Gt(e, "style")) && Kt(e, "style");
    },
    Ga = function (e) {
      return Ht(e)
        ? ((t = "v:shape"),
          (n = e.dom().nodeValue),
          (r = cn.fromTag("div")),
          (o = n.indexOf("]>")),
          (r.dom().innerHTML = n.substr(o + "]>".length)),
          Wi(r, function (e) {
            return Ut(e) === t;
          }))
        : _.none();
      var t, n, r, o;
    },
    za = function (e) {
      return Ro(e, ".rtf-data-image");
    },
    Ka = {
      local: function (e) {
        if ("img" === Ut(e)) {
          var t = Gt(e, "src");
          if (null != t && Et(t, "file://")) {
            var n = Ua(e),
              r = t.split(/[\/\\]/),
              o = r[r.length - 1];
            return Vt(n, "data-image-id", o), Kt(n, "src"), Vt(n, "data-image-type", "local"), Mi(n, "rtf-data-image"), _.some(n);
          }
          return _.none();
        }
        return _.none();
      },
      vshape: function (e) {
        return Ga(e).map(function (e) {
          var t = Gt(e, "o:spid"),
            n = void 0 === t ? Gt(e, "id") : t,
            r = cn.fromTag("img");
          return Mi(r, "rtf-data-image"), Vt(r, "data-image-id", n.substr("_x0000_".length)), Vt(r, "data-image-type", "code"), Wa(r, { width: qa(e, "width"), height: qa(e, "height") }), r;
        });
      },
      find: za,
      exists: function (e) {
        return 0 < za(e).length;
      },
      scour: Ga,
    },
    Za = function () {
      return /^(mso-.*|tab-stops|tab-interval|language|text-underline|text-effect|text-line-through|font-color|horiz-align|list-image-[0-9]+|separator-image|table-border-color-(dark|light)|vert-align|vnd\..*)$/;
    },
    Ja = function () {
      return /^(font|em|strong|samp|acronym|cite|code|dfn|kbd|tt|b|i|u|s|sub|sup|ins|del|var|span)$/;
    },
    Qa = ue([{ starts: ["value", "f"] }, { pattern: ["regex", "f"] }, { contains: ["value", "f"] }, { exact: ["value", "f"] }, { all: [] }, { not: ["stringMatch"] }]),
    eu = function (e, n) {
      return e.fold(
        function (e, t) {
          return 0 === t(n).indexOf(t(e));
        },
        function (e, t) {
          return e.test(t(n));
        },
        function (e, t) {
          return 0 <= t(n).indexOf(t(e));
        },
        function (e, t) {
          return t(n) === t(e);
        },
        function () {
          return !0;
        },
        function (e) {
          return !eu(e, n);
        }
      );
    },
    tu = {
      starts: Qa.starts,
      pattern: Qa.pattern,
      contains: Qa.contains,
      exact: Qa.exact,
      all: Qa.all,
      not: Qa.not,
      cata: function (e, t, n, r, o, i, a) {
        return e.fold(t, n, r, o, i, a);
      },
      matches: eu,
      caseSensitive: function (e) {
        return e;
      },
      caseInsensitive: function (e) {
        return e.toLowerCase();
      },
    },
    nu = function (e, t, n, r) {
      var o = r.name,
        i = void 0 !== r.condition ? r.condition : v(!0),
        a = void 0 !== r.value ? r.value : tu.all();
      return tu.matches(o, n) && tu.matches(a, t) && i(e);
    },
    ru = function (e, t) {
      var n = Ut(e),
        r = t.name,
        o = void 0 !== t.condition ? t.condition : v(!0);
      return tu.matches(r, n) && o(e);
    },
    ou = function (e, t) {
      var n = {};
      return (
        q(e.dom().attributes, function (e) {
          t(e.value, e.name) || (n[e.name] = e.value);
        }),
        n
      );
    },
    iu = function (e, t, n) {
      var r,
        o,
        i = W(e.dom().attributes, function (e) {
          return e.name;
        });
      ae(t) !== i.length &&
        ((r = e),
        (o = t),
        q(i, function (e) {
          Kt(r, e);
        }),
        ne(o, function (e, t) {
          Vt(r, t, e);
        }));
    },
    au =
      (v({}),
      function (t) {
        var e = te(t);
        return W(e, function (e) {
          return e + ": " + t[e];
        }).join("; ");
      }),
    uu = function (r, o) {
      var e = r.dom().style,
        i = {};
      return (
        q(null == e ? [] : e, function (e) {
          var t,
            n = ((t = e), r.dom().style.getPropertyValue(t));
          o(n, e) || (i[e] = n);
        }),
        i
      );
    },
    cu = function (n, e, t) {
      Vt(n, "style", "");
      var r = ae(e),
        o = ae(t);
      if (0 === r && 0 === o) Kt(n, "style");
      else if (0 === r) Vt(n, "style", au(t));
      else {
        ne(e, function (e, t) {
          Ha(n, t, e);
        });
        var i = Gt(n, "style"),
          a = 0 < o ? au(t) + "; " : "";
        Vt(n, "style", a + i);
      }
    },
    su = function (e, t, n) {
      var r,
        o,
        i,
        a = e.dom().getAttribute("style"),
        u =
          ((o = {}),
          (i = null != (r = a) ? r.split(";") : []),
          q(i, function (e) {
            var t = e.split(":");
            2 === t.length && (o[It(t[0])] = It(t[1]));
          }),
          o),
        c = {};
      return (
        q(t, function (e) {
          var t = u[e];
          void 0 === t || n(t, e) || (c[e] = t);
        }),
        c
      );
    },
    lu = ["mso-list"],
    fu = function (e, t) {
      var n = su(e, lu, t),
        r = uu(e, t);
      cu(e, r, n);
    },
    du = function (e, t) {
      var n = ou(e, t);
      iu(e, n, {});
    },
    mu = fu,
    pu = du,
    gu = function (e, t) {
      fu(cn.fromDom(e), t);
    },
    vu = function (e, r, o) {
      e(o, function (t, n) {
        return H(r, function (e) {
          return nu(o, t, n, e);
        });
      });
    },
    hu = function (e, t) {
      var r = fe({ styles: [], attributes: [], classes: [], tags: [] }, t),
        n = Ro(e, "*");
      q(n, function (n) {
        vu(mu, r.styles, n),
          vu(pu, r.attributes, n),
          q(r.classes, function (t) {
            var e = zt(n, "class") ? Ui(n) : [];
            q(e, function (e) {
              tu.matches(t.name, e) && Ri(n, e);
            });
          });
      });
      var o = Ro(e, "*");
      q(o, function (e) {
        H(r.tags, N(ru, e)) && Fa(e);
      });
    },
    yu = function (e, t) {
      var n = fe({ tags: [] }, t),
        r = Ro(e, "*");
      q(r, function (e) {
        H(n.tags, N(ru, e)) && ja(e);
      });
    },
    bu = function (e, t) {
      var n = fe({ tags: [] }, t),
        r = Ro(e, "*");
      q(r, function (t) {
        X(n.tags, N(ru, t)).each(function (e) {
          e.mutate(t);
        });
      });
    },
    xu = "startElement",
    Tu = "endElement",
    Eu = "comment",
    wu = function (e, t, n) {
      var r,
        o,
        i,
        a = cn.fromDom(e);
      switch (e.nodeType) {
        case 1:
          t ? (r = Tu) : ((r = xu), Wa(a, n || {})),
            (o = "HTML" !== e.scopeName && e.scopeName && e.tagName && e.tagName.indexOf(":") <= 0 ? (e.scopeName + ":" + e.tagName).toUpperCase() : e.tagName);
          break;
        case 3:
          (r = "text"), (i = e.nodeValue);
          break;
        case 8:
          (r = Eu), (i = e.nodeValue);
          break;
        default:
          y.console.log("WARNING: Unsupported node type encountered: " + e.nodeType);
      }
      return {
        getNode: function () {
          return e;
        },
        tag: function () {
          return o;
        },
        type: function () {
          return r;
        },
        text: function () {
          return i;
        },
      };
    },
    Iu = function (e, t) {
      return wu(t.createElement(e), !0);
    },
    Su = Iu("HTML", y.window.document),
    Lu = {
      START_ELEMENT_TYPE: xu,
      END_ELEMENT_TYPE: Tu,
      TEXT_TYPE: "text",
      COMMENT_TYPE: Eu,
      FINISHED: Su,
      token: wu,
      createStartElement: function (e, t, n, r) {
        var o = r.createElement(e);
        return (
          ne(t, function (e, t) {
            o.setAttribute(t, e);
          }),
          wu(o, !1, n)
        );
      },
      createEndElement: Iu,
      createComment: function (e, t) {
        return wu(t.createComment(e), !1);
      },
      createText: function (e, t) {
        return wu(t.createTextNode(e));
      },
    },
    Cu = function (i) {
      var a = i.createDocumentFragment(),
        u = a,
        c = function (e) {
          a.appendChild(e);
        };
      return {
        dom: u,
        receive: function (e) {
          var t, n, r, o;
          switch (e.type()) {
            case Lu.START_ELEMENT_TYPE:
              (o = e.getNode().cloneNode(!1)), c((r = o)), (a = r);
              break;
            case Lu.TEXT_TYPE:
              (t = e), (n = i.createTextNode(t.text())), c(n);
              break;
            case Lu.END_ELEMENT_TYPE:
              null === (a = a.parentNode) && (a = u);
              break;
            case Lu.COMMENT_TYPE:
              break;
            default:
              throw { message: "Unsupported token type: " + e.type() };
          }
        },
        label: "SERIALISER",
      };
    },
    Nu = function (e, o) {
      var i;
      (o = o || y.window.document), (i = o.createElement("div")), o.body.appendChild(i), (i.style.position = "absolute"), (i.style.left = "-10000px"), (i.innerHTML = e);
      var a = i.firstChild || Lu.FINISHED,
        u = [],
        c = !1;
      return {
        hasNext: function () {
          return void 0 !== a;
        },
        next: function () {
          var e,
            t,
            n = a,
            r = c;
          return (
            !c && a.firstChild ? (u.push(a), (a = a.firstChild)) : c || 1 !== a.nodeType ? (a.nextSibling ? ((a = a.nextSibling), (c = !1)) : ((a = u.pop()), (c = !0))) : (c = !0),
            n === Lu.FINISHED || a || (o.body.removeChild(i), (a = Lu.FINISHED)),
            (t = r),
            (e = n) === Lu.FINISHED ? e : e ? Lu.token(e, t) : void 0
          );
        },
      };
    },
    Du = function (e, t, n) {
      var r,
        o = n;
      for (r = t.length - 1; 0 <= r; r--) o = t[r](o, {}, e);
      return o;
    },
    Ou = function (e, t, n) {
      for (var r = Cu(e), o = Nu(t, e), i = Du(e, n, r); o.hasNext(); ) {
        var a = o.next();
        i.receive(a);
      }
      return r.dom;
    },
    Au = function (e) {
      return e.dom().innerHTML;
    },
    _u = function (e, t) {
      var n = Lo(e).dom(),
        r = cn.fromDom(n.createDocumentFragment()),
        o = aa(t, n);
      ma(r, o), Ra(e), la(e, r);
    },
    Pu = function (t) {
      return function (e) {
        hu(e, t);
      };
    },
    ku = function (t) {
      return function (e) {
        yu(e, t);
      };
    },
    Mu = function (t) {
      return function (e) {
        bu(e, t);
      };
    },
    Ru = function (o) {
      return function (e) {
        var t = Au(e),
          n = Lo(e),
          r = Ou(n.dom(), t, o);
        Ra(e), e.dom().appendChild(r);
      };
    },
    Fu = function (e, t) {
      return (
        0 <= e.indexOf("<o:p>") ||
        (t.browser.isEdge() && 0 <= e.indexOf('v:shapes="')) ||
        (t.browser.isEdge() && 0 <= e.indexOf("mso-")) ||
        0 <= e.indexOf("mso-list") ||
        0 <= e.indexOf("p.MsoNormal, li.MsoNormal, div.MsoNormal") ||
        0 <= e.indexOf("MsoListParagraphCxSpFirst") ||
        0 <= e.indexOf("<w:WordDocument>")
      );
    },
    ju = function (e, t, n) {
      var r = cn.fromTag("div", e.dom());
      return (
        (r.dom().innerHTML = t),
        q(n, function (e) {
          e(r);
        }),
        Au(r)
      );
    };
  function Uu(a, u, e) {
    return function (t, e, n) {
      var r = function (e) {
          t.receive(e);
        },
        o = function (e, t, n) {
          return (n = void 0 !== n ? n : e.type() === Lu.END_ELEMENT_TYPE), Lu.token(t, n, {});
        },
        i = {
          emit: r,
          emitTokens: function (e) {
            q(e, r);
          },
          receive: function (e) {
            a(i, e, o);
          },
          document: y.window.document,
        };
      return u(i), i;
    };
  }
  var Bu = function (e, t) {
      var n = cn.fromDom(e.getNode());
      return Gt(n, t);
    },
    Yu = function (e, t) {
      var n = cn.fromDom(e.getNode());
      return qa(n, t);
    },
    Hu = function (e) {
      return e.type() === Lu.TEXT_TYPE && /^[\s\u00A0]*$/.test(e.text());
    },
    Wu = function (e, t, n) {
      return e === t || (e && t && e.tag === t.tag && e.type === t.type && (n || e.variant === t.variant));
    },
    qu = {
      guessFrom: function (t, n) {
        return X(t, function (e) {
          return "UL" === e.tag || (n && Wu(e, n, !0));
        }).orThunk(function () {
          return 0 === (e = t).length ? _.none() : _.some(e[0]);
          var e;
        });
      },
      eqListType: Wu,
    },
    $u = function (e, t) {
      if (void 0 === e || void 0 === t) throw (y.console.trace(), "brick");
      e.nextFilter.set(t);
    },
    Vu = function (e, t, n) {
      t.nextFilter.get()(e, t, n);
    },
    Xu = $u,
    Gu = Vu,
    zu = Qr("level", "token", "type"),
    Ku = function (e, n, t, r) {
      var o = t.getCurrentListType(),
        i = t.getCurrentLevel() == r.level() ? o : null;
      return qu.guessFrom(r.emblems(), i).filter(function (e) {
        return !("OL" === e.tag && (!Y(["P"], (t = n).tag()) || /^MsoHeading/.test(Bu(t, "class"))));
        var t;
      });
    },
    Zu = function (e, t) {
      return zt(cn.fromDom(t.getNode()), "data-list-level");
    },
    Ju = function (d) {
      return function (e, t, n) {
        var r,
          o,
          i,
          a,
          u =
            ((r = cn.fromDom(n.getNode())),
            (o = parseInt(Gt(r, "data-list-level"), 10)),
            (i = Gt(r, "data-list-emblems")),
            (a = JSON.parse(i)),
            Kt(r, "data-list-level"),
            Kt(r, "data-list-emblems"),
            { level: v(o), emblems: v(a) });
        u.level(), t.originalToken.set(n);
        var c,
          s,
          l,
          f = ((c = n), (s = u), Ku((l = t).listType.get(), c, l.emitter, s).each(l.listType.set), zu(s.level(), l.originalToken.get(), l.listType.get()));
        t.emitter.openItem(f.level(), f.token(), f.type()), Xu(t, d.inside());
      };
    };
  function Qu(e, t, n) {
    return { pred: e, action: t, label: v(n) };
  }
  var ec = function (e, r) {
    return function (e, t, n) {
      return r(e, t, n);
    };
  };
  function tc(e, r, t) {
    var o = ec(0, t),
      n = function (e, t, n) {
        X(r, function (e) {
          return e.pred(t, n);
        }).fold(v(o), function (e) {
          var t = e.label();
          return void 0 === t ? e.action : ec(0, e.action);
        })(e, t, n);
      };
    return (
      (n.toString = function () {
        return "Handlers for " + e;
      }),
      n
    );
  }
  var nc,
    rc,
    oc,
    ic,
    ac,
    uc = function (r) {
      return tc(
        "Inside.List.Item",
        [
          Qu(
            function (e, t) {
              return t.type() === Lu.END_ELEMENT_TYPE && e.originalToken.get() && t.tag() === e.originalToken.get().tag();
            },
            function (e, t, n) {
              Xu(t, r.outside());
            },
            "Closing open tag"
          ),
        ],
        function (e, t, n) {
          e.emit(n);
        }
      );
    },
    cc = function (r) {
      return tc(
        "Outside.List.Item",
        [
          Qu(Zu, Ju(r), "Data List ****"),
          Qu(
            function (e, t) {
              return t.type() === Lu.TEXT_TYPE && Hu(t);
            },
            function (e, t, n) {
              e.emit(n);
            },
            "Whitespace"
          ),
        ],
        function (e, t, n) {
          t.emitter.closeAllLists(), e.emit(n), Xu(t, r.outside());
        }
      );
    },
    sc = Qr("state", "result"),
    lc = Qr("state", "value"),
    fc = { state: Qr("level", "type", "types", "items"), value: lc, result: sc },
    dc = function (e, t) {
      var n = e.items().slice(0),
        r = void 0 !== t && "P" !== t ? _.some(t) : _.none();
      r.fold(
        function () {
          n.push("P");
        },
        function (e) {
          n.push(e);
        }
      );
      var o = fc.state(e.level(), e.type(), e.types(), n);
      return fc.value(o, r);
    },
    mc = function (e) {
      var t = e.items().slice(0);
      if (0 < t.length && "P" !== t[t.length - 1]) {
        var n = t[t.length - 1];
        t[t.length - 1] = "P";
        var r = fc.state(e.level(), e.type(), e.types(), t);
        return fc.value(r, _.some(n));
      }
      return fc.value(e, _.none());
    },
    pc = function (e, t, n) {
      for (var r = [], o = e; t(o); ) {
        var i = n(o);
        (o = i.state()), (r = r.concat(i.result()));
      }
      return fc.result(o, r);
    },
    gc = function (e, t, n) {
      return pc(
        e,
        function (e) {
          return e.level() < t;
        },
        n
      );
    },
    vc = function (e, t, n) {
      return pc(
        e,
        function (e) {
          return e.level() > t;
        },
        n
      );
    },
    hc = function (e) {
      var t;
      return e ? (void 0 !== (t = Yu(e, "margin-left")) && "0px" !== t ? { "margin-left": t } : {}) : { "list-style-type": "none" };
    },
    yc = function (e, t, n) {
      var r = t.start && 1 < t.start ? { start: t.start } : {},
        o = e.level() + 1,
        i = t,
        a = e.types().concat([t]),
        u = [N(Lu.createStartElement, t.tag, r, n)],
        c = fc.state(o, i, a, e.items());
      return fc.result(c, u);
    },
    bc = function (e) {
      var t = e.types().slice(0),
        n = [N(Lu.createEndElement, t.pop().tag)],
        r = e.level() - 1,
        o = t[t.length - 1],
        i = fc.state(r, o, t, e.items());
      return fc.result(i, n);
    },
    xc = yc,
    Tc = function (e, t, n) {
      var r,
        o,
        i,
        a = hc(t),
        u =
          e.type() && !qu.eqListType(e.type(), n)
            ? ((r = n), (o = bc(e)), (i = yc(o.state(), r, r.type ? { "list-style-type": r.type } : {})), fc.result(i.state(), o.result().concat(i.result())))
            : fc.result(e, []),
        c = [N(Lu.createStartElement, "LI", {}, a)],
        s = dc(u.state(), t && t.tag()),
        l = s
          .value()
          .map(function (e) {
            return gu(t.getNode(), v(!0)), [v(t)];
          })
          .getOr([]);
      return fc.result(s.state(), u.result().concat(c).concat(l));
    },
    Ec = bc,
    wc = function (e) {
      var t = N(Lu.createEndElement, "LI"),
        n = mc(e),
        r = n.value().fold(
          function () {
            return [t];
          },
          function (e) {
            return [N(Lu.createEndElement, e), t];
          }
        );
      return fc.result(n.state(), r);
    },
    Ic = function (e) {
      if (0 === e.length) throw "Compose must have at least one element in the list";
      var t = e[e.length - 1],
        n = J(e, function (e) {
          return e.result();
        });
      return fc.result(t.state(), n);
    },
    Sc = function (e) {
      var t = wc(e),
        n = Ec(t.state());
      return Ic([t, n]);
    },
    Lc = function (e, c, s, l) {
      return gc(e, s, function (e) {
        return (
          (n = c),
          (r = s),
          (o = l),
          (i = (t = e).level() === r - 1 && n.type ? { "list-style-type": n.type } : {}),
          (a = xc(t, n, i)),
          (u = Tc(a.state(), a.state().level() == r ? o : void 0, n)),
          Ic([a, u])
        );
        var t, n, r, o, i, a, u;
      });
    },
    Cc = function (e, t) {
      return vc(e, t, Sc);
    },
    Nc = {
      openItem: function (e, t, n, r) {
        var o,
          i,
          a,
          u,
          c,
          s,
          l,
          f,
          d,
          m,
          p,
          g,
          v = e.level() > t ? Cc(e, t) : fc.result(e, []),
          h =
            v.state().level() === t
              ? ((f = v.state()), (d = r), (m = n), (p = 0 < f.level() ? wc(f) : fc.result(f, [])), (g = Tc(p.state(), m, d)), Ic([p, g]))
              : ((o = v.state()),
                (i = r),
                (u = n),
                (c = 1 < (a = t) ? mc(o) : fc.value(o, _.none())),
                (s = c
                  .value()
                  .map(function (e) {
                    return [N(Lu.createEndElement, e)];
                  })
                  .getOr([])),
                c.state().level(),
                (l = Lc(c.state(), i, a, u)),
                fc.result(l.state(), s.concat(l.result())));
        return Ic([v, h]);
      },
      closeAllLists: Cc,
    },
    Dc = ["disc", "circle", "square"],
    Oc = function (e, t) {
      return "UL" === e.tag && Dc[t - 1] === e.type && (e = { tag: "UL" }), e;
    },
    Ac = function (e) {
      var t = e,
        n = function () {
          return t;
        };
      return {
        get: n,
        set: function (e) {
          t = e;
        },
        clone: function () {
          return Ac(n());
        },
      };
    },
    _c = {
      getCurrentListType: function () {
        return Pc().getCurrentListType();
      },
      getCurrentLevel: function () {
        return Pc().getCurrentLevel();
      },
      closeAllLists: function () {
        return Pc().closeAllLists.apply(void 0, arguments);
      },
      openItem: function () {
        return Pc().openItem.apply(void 0, arguments);
      },
    },
    Pc = function () {
      return { getCurrentListType: v({}), getCurrentLevel: v(1), closeAllLists: m, openItem: m };
    },
    kc = {
      inside: function () {
        return Rc;
      },
      outside: function () {
        return Fc;
      },
    },
    Mc =
      ((nc = !1),
      {
        check: function (e) {
          return nc && e.type() === Lu.TEXT_TYPE
            ? (e.text(), !0)
            : e.type() === Lu.START_ELEMENT_TYPE && "STYLE" === e.tag()
            ? (nc = !0)
            : e.type() === Lu.END_ELEMENT_TYPE && "STYLE" === e.tag() && !(nc = !1);
        },
      }),
    Rc = uc(kc),
    Fc = cc(kc),
    jc =
      ((oc = Ac((rc = Fc))),
      (ic = Ac(null)),
      (ac = Ac(null)),
      {
        reset: function (e) {
          oc.set(rc), ic.set(null), ac.set(null);
          var n,
            r,
            i,
            a,
            t =
              ((r = (n = e).document),
              (i = fc.state(0, void 0, [], [])),
              (a = function (e) {
                q(e.result(), function (e) {
                  var t = e(r);
                  n.emit(t);
                });
              }),
              {
                closeAllLists: function () {
                  var e = Nc.closeAllLists(i, 0);
                  (i = e.state()), a(e);
                },
                openItem: function (e, t, n) {
                  if (n) {
                    var r = Oc(n, e),
                      o = Nc.openItem(i, e, t, r);
                    (i = o.state()), a(o);
                  }
                },
                getCurrentListType: function () {
                  return i.type();
                },
                getCurrentLevel: function () {
                  return i.level();
                },
              });
          Pc = v(t);
        },
        nextFilter: oc,
        originalToken: ic,
        listType: ac,
        emitter: _c,
      }),
    Uc = Uu(function (e, t, n) {
      Mc.check(t) || Gu(e, jc, t);
    }, jc.reset),
    Bc = [
      { regex: /^\(?[dc][\.\)]$/, type: { tag: "OL", type: "lower-alpha" } },
      { regex: /^\(?[DC][\.\)]$/, type: { tag: "OL", type: "upper-alpha" } },
      { regex: /^\(?M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})[\.\)]$/, type: { tag: "OL", type: "upper-roman" } },
      { regex: /^\(?m*(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})[\.\)]$/, type: { tag: "OL", type: "lower-roman" } },
      { regex: /^\(?[0-9]+[\.\)]$/, type: { tag: "OL" } },
      { regex: /^([0-9]+\.)*[0-9]+\.?$/, type: { tag: "OL", variant: "outline" } },
      { regex: /^\(?[a-z]+[\.\)]$/, type: { tag: "OL", type: "lower-alpha" } },
      { regex: /^\(?[A-Z]+[\.\)]$/, type: { tag: "OL", type: "upper-alpha" } },
    ],
    Yc = { "\u2022": { tag: "UL", type: "disc" }, "\xb7": { tag: "UL", type: "disc" }, "\xa7": { tag: "UL", type: "square" } },
    Hc = { o: { tag: "UL", type: "circle" }, "-": { tag: "UL", type: "disc" }, "\u25cf": { tag: "UL", type: "disc" }, "\ufffd": { tag: "UL", type: "circle" } },
    Wc = function (u, e) {
      var t = Hc[u] ? [Hc[u]] : [],
        n = e && Yc[u] ? [Yc[u]] : e ? [{ tag: "UL", variant: u }] : [],
        r = J(Bc, function (e) {
          return e.regex.test(u)
            ? [
                fe(
                  e.type,
                  ((r = u),
                  (o = r.split(".")),
                  (i = (function () {
                    if (0 === o.length) return r;
                    var e = o[o.length - 1];
                    return 0 === e.length && 1 < o.length ? o[o.length - 2] : e;
                  })()),
                  (a = parseInt(i, 10)),
                  isNaN(a) ? {} : { start: a }),
                  { variant: ((t = e.type), (n = u), void 0 !== t.variant ? t.variant : "(" === n.charAt(0) ? "()" : ")" === n.charAt(n.length - 1) ? ")" : ".") }
                ),
              ]
            : [];
          var t, n, r, o, i, a;
        }),
        o = t.concat(n).concat(r);
      return W(o, function (e) {
        return void 0 !== e.variant ? e : fe(e, { variant: u });
      });
    },
    qc = function (e) {
      return e.dom().textContent;
    },
    $c = function (e) {
      return su(e, ["mso-list"], v(!1))["mso-list"];
    },
    Vc = function (e) {
      return (
        Wt(e) &&
        Va(e, "font-family").exists(function (e) {
          return Y(["wingdings", "symbol"], e.toLowerCase());
        })
      );
    },
    Xc = {
      getMsoList: $c,
      extractLevel: function (e) {
        var t = $c(e),
          n = / level([0-9]+)/.exec(t);
        return n && n[1] ? _.some(parseInt(n[1], 10)) : _.none();
      },
      extractEmblem: function (e, t) {
        var n = qc(e).trim(),
          r = Wc(n, t);
        return 0 < r.length ? _.some(r) : _.none();
      },
      extractSymSpan: function (e) {
        return Hi(e, Vc);
      },
      extractMsoIgnore: function (e) {
        return Wi(e, function (e) {
          return !!(Wt(e) ? su(e, ["mso-list"], v(!1)) : [])["mso-list"];
        });
      },
      extractCommentSpan: function (e) {
        return Hi(e, Ht)
          .bind(Oo)
          .filter(function (e) {
            return "span" === Ut(e);
          });
      },
      isSymbol: Vc,
      deduceLevel: function (e) {
        return Va(e, "margin-left").bind(function (e) {
          var t = parseInt(e, 10);
          return isNaN(t) ? _.none() : _.some(Math.max(1, Math.ceil(t / 18)));
        });
      },
    },
    Gc = function (e) {
      for (var t = []; null !== e.nextNode(); ) t.push(cn.fromDom(e.currentNode));
      return t;
    },
    zc = At.detect().browser,
    Kc =
      zc.isIE() || zc.isEdge()
        ? function (e) {
            try {
              return Gc(e);
            } catch (e) {
              return [];
            }
          }
        : Gc,
    Zc = v(v(!0)),
    Jc = function (e, t) {
      var n = t.fold(Zc, function (t) {
        return function (e) {
          return t(e.nodeValue);
        };
      });
      n.acceptNode = n;
      var r = y.document.createTreeWalker(e.dom(), we.getOrDie("NodeFilter").SHOW_COMMENT, n, !1);
      return Kc(r);
    },
    Qc = function (e, t, n, r) {
      var o;
      !(function (e, t, n) {
        Vt(e, "data-list-level", t);
        var r = JSON.stringify(n);
        Vt(e, "data-list-emblems", r);
      })(e, t, n),
        (o = Jc(e, _.none())),
        q(o, Fa),
        q(r, Fa),
        Kt(e, "style"),
        Kt(e, "class");
    },
    es = function (e) {
      return ((r = e),
      Xc.extractLevel(r).bind(function (n) {
        return Xc.extractSymSpan(r).bind(function (t) {
          return Xc.extractEmblem(t, !0).map(function (e) {
            return {
              mutate: function () {
                Qc(r, n, e, [t]);
              },
            };
          });
        });
      }))
        .orThunk(function () {
          return (
            (r = e),
            Xc.extractLevel(r).bind(function (n) {
              return Xc.extractCommentSpan(r).bind(function (t) {
                return Xc.extractEmblem(t, Xc.isSymbol(t)).map(function (e) {
                  return {
                    mutate: function () {
                      Qc(r, n, e, [t]);
                    },
                  };
                });
              });
            })
          );
          var r;
        })
        .orThunk(function () {
          return (
            (r = e),
            Xc.extractLevel(r).bind(function (n) {
              return Xc.extractCommentSpan(r).bind(function (t) {
                return Xc.extractEmblem(t, Xc.isSymbol(t)).map(function (e) {
                  return {
                    mutate: function () {
                      Qc(r, n, e, [t]);
                    },
                  };
                });
              });
            })
          );
          var r;
        })
        .orThunk(function () {
          return "p" !== Ut((r = e))
            ? _.none()
            : Xc.extractLevel(r).bind(function (n) {
                return Xc.extractMsoIgnore(r).bind(function (t) {
                  return Xc.extractEmblem(t, !1).map(function (e) {
                    return {
                      mutate: function () {
                        Qc(r, n, e, [Co(t).getOr(t)]);
                      },
                    };
                  });
                });
              });
          var r;
        })
        .orThunk(function () {
          return "p" !== Ut((r = e))
            ? _.none()
            : Xc.extractMsoIgnore(r).bind(function (e) {
                var n = Co(e).getOr(e),
                  t = Xc.isSymbol(n);
                return Xc.extractEmblem(e, t).bind(function (t) {
                  return Xc.deduceLevel(r).map(function (e) {
                    return {
                      mutate: function () {
                        Qc(r, e, t, [n]);
                      },
                    };
                  });
                });
              });
          var r;
        });
      var r;
    },
    ts = {
      filter: Uc,
      preprocess: Mu({
        tags: [
          {
            name: tu.pattern(/^(p|h\d+)$/, tu.caseInsensitive),
            mutate: function (e) {
              es(e).each(function (e) {
                e.mutate();
              });
            },
          },
        ],
      }),
    },
    ns = function (e, t) {
      return Wi(e, t).isSome();
    },
    rs = function (e) {
      return void 0 === e.dom().attributes || null === e.dom().attributes || 0 === e.dom().attributes.length || (1 === e.dom().attributes.length && "style" === e.dom().attributes[0].name);
    },
    os = {
      isNotImage: function (e) {
        return "img" !== Ut(e);
      },
      hasContent: function (e) {
        return (
          !rs(e) ||
          ((n = (t = e).dom().attributes),
          (r = null != n && 0 < n.length),
          ("span" !== Ut(t) || r) &&
            ns(e, function (e) {
              var t = !rs(e),
                n = !Y(["font", "em", "strong", "samp", "acronym", "cite", "code", "dfn", "kbd", "tt", "b", "i", "u", "s", "sub", "sup", "ins", "del", "var", "span"], Ut(e));
              return qt(e) || t || n;
            }))
        );
        var t, n, r;
      },
      isList: function (e) {
        return "ol" === Ut(e) || "ul" === Ut(e);
      },
      isLocal: function (e) {
        var t = Gt(e, "src");
        return /^file:/.test(t);
      },
      hasNoAttributes: rs,
      isEmpty: function (e) {
        return 0 === Au(e).length;
      },
    };
  function is(n, r) {
    var t = function (e) {
        return n(e) ? _.from(e.dom().nodeValue) : _.none();
      },
      e = At.detect().browser,
      o =
        e.isIE() && 10 === e.version.major
          ? function (e) {
              try {
                return t(e);
              } catch (e) {
                return _.none();
              }
            }
          : t;
    return {
      get: function (e) {
        if (!n(e)) throw new Error("Can only get " + r + " value of a " + r + " node");
        return o(e).getOr("");
      },
      getOption: o,
      set: function (e, t) {
        if (!n(e)) throw new Error("Can only set raw " + r + " value of a " + r + " node");
        e.dom().nodeValue = t;
      },
    };
  }
  var as,
    us,
    cs,
    ss,
    ls,
    fs,
    ds,
    ms = is(qt, "text"),
    ps = function (e) {
      return ms.get(e);
    },
    gs = function (e, t) {
      ms.set(e, t);
    },
    vs = function (e, t) {
      var n = cn.fromTag(e);
      ua(t, n);
      var r = t.dom().attributes;
      q(r, function (e) {
        n.dom().setAttribute(e.name, e.value);
      });
      var o = _o(t);
      return ma(n, o), Fa(t), n;
    },
    hs = function (e) {
      return Do(e).bind(function (e) {
        return qt(e) && 0 === ps(e).trim().length ? hs(e) : "li" === Ut(e) ? _.some(e) : _.none();
      });
    },
    ys = {
      changeTag: vs,
      addBrTag: function (e) {
        0 === Au(e).length && la(e, cn.fromTag("br"));
      },
      properlyNest: function (n) {
        Co(n).each(function (e) {
          var t = Ut(e);
          Y(["ol", "ul"], t) &&
            hs(n).fold(
              function () {
                var e = cn.fromTag("li");
                Ha(e, "list-style-type", "none"), fa(n, e);
              },
              function (e) {
                la(e, n);
              }
            );
        });
      },
      fontToSpan: function (e) {
        var o = vs("span", e),
          i = { "font-size": { 1: "8pt", 2: "10pt", 3: "12pt", 4: "14pt", 5: "18pt", 6: "24pt", 7: "36pt" } };
        ne({ face: "font-family", size: "font-size", color: "color" }, function (e, t) {
          if (zt(o, t)) {
            var n = Gt(o, t),
              r = void 0 !== i[e] && void 0 !== i[e][n] ? i[e][n] : n;
            Ha(o, e, r), Kt(o, t);
          }
        });
      },
    },
    bs = function (e, t, n, r) {
      var o = Lo(e).dom().createRange();
      return o.setStart(e.dom(), t), o.setEnd(n.dom(), r), o;
    },
    xs = is(Ht, "comment"),
    Ts = function (e) {
      return xs.get(e);
    },
    Es = ku({ tags: [{ name: tu.pattern(/^([OVWXP]|U[0-9]+|ST[0-9]+):/i, tu.caseInsensitive) }] }),
    ws = Pu({ attributes: [{ name: tu.exact("id", tu.caseInsensitive), value: tu.starts("docs-internal-guid", tu.caseInsensitive) }] }),
    Is = [Ru([ts.filter])],
    Ss = Pu({
      attributes: [
        { name: tu.pattern(/^v:/, tu.caseInsensitive) },
        { name: tu.exact("href", tu.caseInsensitive), value: tu.contains("#_toc", tu.caseInsensitive) },
        { name: tu.exact("href", tu.caseInsensitive), value: tu.contains("#_mso", tu.caseInsensitive) },
        { name: tu.pattern(/^xmlns(:|$)/, tu.caseInsensitive) },
        { name: tu.exact("type", tu.caseInsensitive), condition: os.isList },
      ],
    }),
    Ls = Pu({
      tags: [{ name: tu.exact("script", tu.caseInsensitive) }, { name: tu.exact("link", tu.caseInsensitive) }, { name: tu.exact("style", tu.caseInsensitive), condition: os.isEmpty }],
      attributes: [
        { name: tu.starts("on", tu.caseInsensitive) },
        { name: tu.exact('"', tu.caseInsensitive) },
        { name: tu.exact("lang", tu.caseInsensitive) },
        { name: tu.exact("language", tu.caseInsensitive) },
      ],
      styles: [{ name: tu.all(), value: tu.pattern(/OLE_LINK/i, tu.caseInsensitive) }],
    }),
    Cs = Pu({ tags: [{ name: tu.exact("meta", tu.caseInsensitive) }] }),
    Ns = Pu({ tags: [{ name: tu.exact("style", tu.caseInsensitive) }] }),
    Ds = Pu({
      styles: [
        {
          name: tu.not(tu.pattern(/width|height|list-style-type/, tu.caseInsensitive)),
          condition: function (e) {
            return !Fi(e, "ephox-limbo-transform");
          },
        },
        { name: tu.pattern(/width|height/, tu.caseInsensitive), condition: os.isNotImage },
      ],
    }),
    Os = Pu({ classes: [{ name: tu.not(tu.exact("rtf-data-image", tu.caseInsensitive)) }] }),
    As = Pu({ styles: [{ name: tu.pattern(Za(), tu.caseInsensitive) }] }),
    _s = Pu({ classes: [{ name: tu.pattern(/mso/i, tu.caseInsensitive) }] }),
    Ps = ku({
      tags: [
        { name: tu.exact("img", tu.caseInsensitive), condition: os.isLocal },
        { name: tu.exact("a", tu.caseInsensitive), condition: os.hasNoAttributes },
      ],
    }),
    ks = ku({ tags: [{ name: tu.exact("a", tu.caseInsensitive), condition: os.hasNoAttributes }] }),
    Ms = Pu({ attributes: [{ name: tu.exact("style", tu.caseInsensitive), value: tu.exact("", tu.caseInsensitive), debug: !0 }] }),
    Rs = Pu({ attributes: [{ name: tu.exact("class", tu.caseInsensitive), value: tu.exact("", tu.caseInsensitive), debug: !0 }] }),
    Fs = ku({
      tags: [
        {
          name: tu.pattern(Ja(), tu.caseInsensitive),
          condition:
            ((as = os.hasContent),
            function () {
              for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
              return !as.apply(null, e);
            }),
        },
      ],
    }),
    js = ku({
      tags: [
        {
          name: tu.exact("p", tu.caseInsensitive),
          condition:
            ((us = "li"),
            function (e) {
              return Co(e).exists(function (e) {
                return Ut(e) === us && 1 === _o(e).length;
              });
            }),
        },
      ],
    }),
    Us = Mu({ tags: [{ name: tu.exact("p", tu.caseInsensitive), mutate: ys.addBrTag }] }),
    Bs = Mu({ tags: [{ name: tu.pattern(/ol|ul/, tu.caseInsensitive), mutate: ys.properlyNest }] }),
    Ys = Mu({
      tags: [
        { name: tu.exact("b", tu.caseInsensitive), mutate: N(ys.changeTag, "strong") },
        { name: tu.exact("i", tu.caseInsensitive), mutate: N(ys.changeTag, "em") },
        {
          name: tu.exact("u", tu.caseInsensitive),
          mutate: function (e) {
            var t = ys.changeTag("span", e);
            Mi(t, "ephox-limbo-transform"), Ha(t, "text-decoration", "underline");
          },
        },
        { name: tu.exact("s", tu.caseInsensitive), mutate: N(ys.changeTag, "strike") },
        { name: tu.exact("font", tu.caseInsensitive), mutate: ys.fontToSpan, debug: !0 },
      ],
    }),
    Hs = Pu({ classes: [{ name: tu.exact("ephox-limbo-transform", tu.caseInsensitive) }] }),
    Ws = Pu({ tags: [{ name: tu.exact("br", tu.caseInsensitive), condition: Bi("Apple-interchange-newline") }] }),
    qs = {
      unwrapWordTags: Es,
      removeWordAttributes: Ss,
      removeGoogleDocsId: ws,
      parseLists: Is,
      removeExcess: Ls,
      removeMetaTags: Cs,
      removeStyleTags: Ns,
      cleanStyles: Ds,
      cleanClasses: Os,
      cleanupBrowserCruft: Pu({
        styles: [
          { name: tu.pattern(/^-/, tu.caseInsensitive) },
          { name: tu.all(), value: tu.exact("initial", tu.caseInsensitive) },
          { name: tu.exact("background-color", tu.caseInsensitive), value: tu.exact("transparent", tu.caseInsensitive) },
          { name: tu.exact("font-style", tu.caseInsensitive), value: tu.exact("normal", tu.caseInsensitive) },
          { name: tu.pattern(/font-variant.*/, tu.caseInsensitive) },
          { name: tu.exact("letter-spacing", tu.caseInsensitive) },
          { name: tu.exact("font-weight", tu.caseInsensitive), value: tu.pattern(/400|normal/, tu.caseInsensitive) },
          { name: tu.exact("orphans", tu.caseInsensitive) },
          { name: tu.exact("text-decoration", tu.caseInsensitive), value: tu.exact("none", tu.caseInsensitive) },
          { name: tu.exact("text-size-adjust", tu.caseInsensitive) },
          { name: tu.exact("text-indent", tu.caseInsensitive), value: tu.exact("0px", tu.caseInsensitive) },
          { name: tu.exact("text-transform", tu.caseInsensitive), value: tu.exact("none", tu.caseInsensitive) },
          { name: tu.exact("white-space", tu.caseInsensitive), value: tu.exact("normal", tu.caseInsensitive) },
          { name: tu.exact("widows", tu.caseInsensitive) },
          { name: tu.exact("word-spacing", tu.caseInsensitive), value: tu.exact("0px", tu.caseInsensitive) },
          { name: tu.exact("text-align", tu.caseInsensitive), value: tu.pattern(/start|end/, tu.caseInsensitive) },
          {
            name: tu.exact("font-weight", tu.caseInsensitive),
            value: tu.pattern(/700|bold/, tu.caseInsensitive),
            condition: function (e) {
              return /^h\d$/.test(Ut(e));
            },
          },
        ],
      }),
      cleanupBrowserTags: Ws,
      unwrapConvertedSpace:
        ((ss = (cs = function (e, n) {
          return function (t) {
            return e(t)
              .filter(function (e) {
                return qt(t) && n(qc(e), " ");
              })
              .isSome();
          };
        })(Do, wt)),
        (ls = cs(Oo, Et)),
        Mu({
          tags: [
            {
              name: tu.exact("span", tu.caseInsensitive),
              condition: Bi("Apple-converted-space"),
              mutate: function (e) {
                "\xa0" === qc(e) && (ss(e) || ls(e) ? ja(e) : (ua(e, cn.fromText(" ")), Fa(e)));
              },
            },
          ],
        })),
      mergeStyles: As,
      mergeClasses: _s,
      removeLocalImages: Ps,
      removeVacantLinks: ks,
      removeEmptyStyle: Ms,
      removeEmptyClass: Rs,
      pruneInlineTags: Fs,
      unwrapSingleParagraphsInlists: js,
      addPlaceholders: Us,
      nestedListFixes: Bs,
      inlineTagFixes: Ys,
      cleanupFlags: Hs,
      distillAnchorsFromLocalLinks:
        ((fs = /^file:\/\/\/[^#]+(#[^#]+)$/),
        Mu({
          tags: [
            {
              name: tu.exact("a", tu.caseInsensitive),
              condition: function (e) {
                var t = Gt(e, "href");
                return !!t && fs.test(t);
              },
              mutate: function (e) {
                var t = Gt(e, "href");
                Vt(e, "href", t.replace(fs, "$1"));
              },
            },
          ],
        })),
      removeLocalLinks: Pu({ attributes: [{ name: tu.exact("href", tu.caseInsensitive), value: tu.starts("file:///", tu.caseInsensitive), debug: !0 }] }),
      replaceClipboardChangedUrls: Mu({
        tags: [
          (ds = function (e, n, r) {
            return {
              name: tu.exact(e, tu.caseInsensitive),
              condition: function (e) {
                return zt(e, n);
              },
              mutate: function (e) {
                var t = Gt(e, n);
                Vt(e, r, t), Kt(e, n);
              },
            };
          })("a", "data-ephox-href", "href"),
          ds("img", "data-ephox-src", "src"),
        ],
      }),
      removeFragmentComments: function (a) {
        var u = ["table", "thead", "tbody", "tfoot", "th", "tr", "td", "ul", "ol", "li"],
          e = Mo(a, Ht),
          t = X(e, function (e) {
            return xt(Ts(e), "StartFragment");
          }),
          n = X(e, function (e) {
            return xt(Ts(e), "EndFragment");
          });
        t.each(function (i) {
          n.each(function (e) {
            for (var t, n = i, r = [], o = ((t = bs(i, 0, e, 0)), cn.fromDom(t.commonAncestorContainer)); void 0 !== o && !Io(o, a); ) Y(u, Ut(o)) ? (n = o) : r.push(o), (o = Co(o).getOr(void 0));
            q(r, ja), q(Ao(n), Fa);
          }),
            Fa(i);
        }),
          n.each(Fa);
      },
      none: C,
    },
    $s = function (e) {
      return e.browser.isIE() && 11 <= e.browser.version.major;
    },
    Vs = function (i, a) {
      return Uu(function (e, t) {
        var r,
          o,
          n =
            ((r = t),
            (o = a),
            i(cn.fromDom(r.getNode())).fold(
              function () {
                return [r];
              },
              function (e) {
                var t = r.type() === Lu.END_ELEMENT_TYPE,
                  n = [Lu.token(e.dom(), t)];
                return !t && o && n.push(Lu.token(e.dom(), !0)), n;
              }
            ));
        q(n, e.emit);
      }, C);
    },
    Xs = function (e, t, n) {
      var r,
        o,
        i,
        a,
        u,
        c,
        s,
        l,
        f,
        d,
        m,
        p,
        g,
        v =
          ((r = e),
          (i = (o = n).browser.isFirefox() || o.browser.isEdge()),
          (a = i ? Ka.local : Ka.vshape),
          (u = !i),
          (c = $s(o) ? qs.none : Ru([Vs(a, u)])),
          { annotate: [r ? c : qs.none], local: [i ? qs.none : qs.removeLocalImages] });
      return Z([
        ((p = e), (g = n), $s(g) || !p ? [] : [ts.preprocess]),
        v.annotate,
        [qs.inlineTagFixes],
        (function (e, t, n) {
          if (!e) return [qs.none];
          var r = [qs.unwrapWordTags],
            o = $s(n) ? [] : qs.parseLists;
          return r.concat(o).concat([qs.removeWordAttributes]);
        })(e, 0, n),
        [qs.removeGoogleDocsId],
        [qs.nestedListFixes],
        [qs.removeExcess],
        [qs.removeMetaTags],
        v.local,
        ((m = t), m ? [qs.mergeStyles, qs.mergeClasses] : [qs.cleanStyles, qs.cleanClasses]),
        [qs.distillAnchorsFromLocalLinks, qs.removeLocalLinks, qs.removeVacantLinks, qs.replaceClipboardChangedUrls],
        [qs.removeEmptyStyle],
        [qs.removeEmptyClass],
        [qs.pruneInlineTags],
        [qs.cleanupBrowserTags],
        ((f = e), (d = t), !f && d ? [qs.cleanupBrowserCruft] : []),
        [qs.unwrapConvertedSpace],
        [qs.addPlaceholders],
        ((s = e), (l = n), $s(l) && s ? [qs.unwrapSingleParagraphsInlists] : []),
        [qs.cleanupFlags],
        [qs.removeStyleTags],
      ]);
    },
    Gs = [
      "body",
      "p",
      "div",
      "article",
      "aside",
      "figcaption",
      "figure",
      "footer",
      "header",
      "nav",
      "section",
      "ol",
      "ul",
      "li",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "caption",
      "tr",
      "td",
      "th",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "pre",
      "address",
    ],
    zs = function (e) {
      return (
        (t = e),
        (n = v(0)),
        (r = v(0)),
        (o = _.none()),
        {
          term: function () {
            return new RegExp(t, o.getOr("g"));
          },
          prefix: n,
          suffix: r,
        }
      );
      var t, n, r, o;
    },
    Ks = function (e, t) {
      return G(e, function (e) {
        return e.start() === t;
      });
    },
    Zs = function (e, t, n) {
      var r,
        o,
        i = n(e, t);
      return (
        (r = i),
        (o = e.start()),
        W(r, function (e) {
          return ti({}, e, { start: v(e.start() + o), finish: v(e.finish() + o) });
        })
      );
    },
    Js = function (e, n, t) {
      return (
        void 0 === t && (t = 0),
        V(
          e,
          function (t, e) {
            return n(e, t.len).fold(v(t), function (e) {
              return { len: e.finish(), list: t.list.concat([e]) };
            });
          },
          { len: t, list: [] }
        ).list
      );
    },
    Qs = function (e, t, n) {
      return 0 === t.length
        ? e
        : J(e, function (r) {
            var e = J(t, function (e) {
              return (n = e) >= (t = r).start() && n <= t.finish() ? [e - r.start()] : [];
              var t, n;
            });
            return 0 < e.length ? Zs(r, e, n) : [r];
          });
    },
    el = function (o, e, i) {
      var t = Ks(o, e),
        a = Ks(o, i);
      return t
        .bind(function (e) {
          var t,
            n,
            r = a.getOr(((n = i), (t = o)[t.length - 1] && t[t.length - 1].finish() === n ? t.length + 1 : -1));
          return -1 < r ? _.some(o.slice(e, r)) : _.none();
        })
        .getOr([]);
    },
    tl = function (n, e) {
      var t,
        r,
        o = J(e, function (t) {
          var e = (function (e, t) {
            for (var n = t.term(), r = [], o = n.exec(e); o; ) {
              var i = o.index + t.prefix(o),
                a = o[0].length - t.prefix(o) - t.suffix(o);
              r.push({ start: v(i), finish: v(i + a) }), (n.lastIndex = i + a), (o = n.exec(e));
            }
            return r;
          })(n, t.pattern());
          return W(e, function (e) {
            return ti({}, t, e);
          });
        });
      return (
        (t = o),
        (r = Array.prototype.slice.call(t, 0)).sort(function (e, t) {
          return e.start() < t.start() ? -1 : t.start() < e.start() ? 1 : 0;
        }),
        r
      );
    },
    nl = (Qr("word", "pattern"), Qr("element", "offset"), Qr("element", "deltaOffset"), Qr("element", "start", "finish")),
    rl = (Qr("begin", "end"), Qr("element", "text"), ue([{ include: ["item"] }, { excludeWith: ["item"] }, { excludeWithout: ["item"] }])),
    ol = {
      include: rl.include,
      excludeWith: rl.excludeWith,
      excludeWithout: rl.excludeWithout,
      cata: function (e, t, n, r) {
        return e.fold(t, n, r);
      },
    },
    il = function (e, n) {
      var r = [],
        o = [];
      return (
        q(e, function (e) {
          var t = n(e);
          ol.cata(
            t,
            function () {
              o.push(e);
            },
            function () {
              0 < o.length && r.push(o), r.push([e]), (o = []);
            },
            function () {
              0 < o.length && r.push(o), (o = []);
            }
          );
        }),
        0 < o.length && r.push(o),
        r
      );
    },
    al = ue([{ boundary: ["item", "universe"] }, { empty: ["item", "universe"] }, { text: ["item", "universe"] }]),
    ul = w,
    cl = I,
    sl = v(0),
    ll = v(1),
    fl = function (e) {
      return ti({}, e, {
        isBoundary: function () {
          return e.fold(cl, ul, ul);
        },
        toText: function () {
          return e.fold(_.none, _.none, function (e) {
            return _.some(e);
          });
        },
        is: function (n) {
          return e.fold(ul, ul, function (e, t) {
            return t.eq(e, n);
          });
        },
        len: function () {
          return e.fold(sl, ll, function (e, t) {
            return t.property().getText(e).length;
          });
        },
      });
    },
    dl = {
      text: g(fl, al.text),
      boundary: g(fl, al.boundary),
      empty: g(fl, al.empty),
      cata: function (e, t, n, r) {
        return e.fold(t, n, r);
      },
    },
    ml = function (t, e, n) {
      if (t.property().isText(e)) return [dl.text(e, t)];
      if (t.property().isEmptyTag(e)) return [dl.empty(e, t)];
      if (t.property().isElement(e)) {
        var r = t.property().children(e),
          o = t.property().isBoundary(e) ? [dl.boundary(e, t)] : [],
          i =
            void 0 !== n && n(e)
              ? []
              : J(r, function (e) {
                  return ml(t, e, n);
                });
        return o.concat(i).concat(o);
      }
      return [];
    },
    pl = ml,
    gl = function (t, e, n) {
      var r = J(e, function (e) {
          return pl(t, e, n);
        }),
        o = il(r, function (e) {
          return e.match({
            boundary: function () {
              return ol.excludeWithout(e);
            },
            empty: function () {
              return ol.excludeWith(e);
            },
            text: function () {
              return ol.include(e);
            },
          });
        });
      return $(o, function (e) {
        return 0 < e.length;
      });
    },
    vl = function (r, e) {
      if (0 === e.length) return [r];
      var t = V(
          e,
          function (e, t) {
            if (0 === t) return e;
            var n = r.substring(e.prev, t);
            return { prev: t, values: e.values.concat([n]) };
          },
          { prev: 0, values: [] }
        ),
        n = e[e.length - 1];
      return n < r.length ? t.values.concat(r.substring(n)) : t.values;
    },
    hl = function (o, e, t) {
      var n = J(t, function (e) {
          return [e.start(), e.finish()];
        }),
        i = Qs(e, n, function (e, t) {
          return (function (o, e, t) {
            var n = o.property().getText(e),
              r = $(vl(n, t), function (e) {
                return 0 < e.length;
              });
            if (r.length <= 1) return [nl(e, 0, n.length)];
            o.property().setText(e, r[0]);
            var i = Js(
                r.slice(1),
                function (e, t) {
                  var n = o.create().text(e),
                    r = nl(n, t, t + e.length);
                  return _.some(r);
                },
                r[0].length
              ),
              a = W(i, function (e) {
                return e.element();
              });
            return o.insert().afterAll(e, a), [nl(e, 0, r[0].length)].concat(i);
          })(o, e.element(), t);
        });
      return W(t, function (e) {
        var t = el(i, e.start(), e.finish()),
          n = W(t, function (e) {
            return e.element();
          }),
          r = W(n, o.property().getText).join("");
        return {
          elements: function () {
            return n;
          },
          word: e.word,
          exact: function () {
            return r;
          },
        };
      });
    },
    yl = function (a, e, u, t) {
      var n = gl(a, e, t);
      return J(n, function (e) {
        var r,
          t = J(e, function (e) {
            return e.fold(v([]), v([]), function (e) {
              return [e];
            });
          }),
          n = W(t, a.property().getText).join(""),
          o = tl(n, u),
          i =
            ((r = a),
            Js(t, function (e, t) {
              var n = t + r.property().getText(e).length;
              return _.from(nl(e, t, n));
            }));
        return hl(a, i, o);
      });
    },
    bl = {
      up: v({ selector: $i, closest: Xi, predicate: Yi, all: No }),
      down: v({ selector: Ro, predicate: Mo }),
      styles: v({ get: qa, getRaw: Va, set: Ha, remove: Xa }),
      attrs: v({
        get: Gt,
        set: Vt,
        remove: Kt,
        copyTo: function (e, t) {
          var n = V(
            e.dom().attributes,
            function (e, t) {
              return (e[t.name] = t.value), e;
            },
            {}
          );
          Xt(t, n);
        },
      }),
      insert: v({ before: ua, after: ca, afterAll: da, append: la, appendAll: ma, prepend: sa, wrap: fa }),
      remove: v({ unwrap: ja, remove: Fa }),
      create: v({
        nu: cn.fromTag,
        clone: function (e) {
          return cn.fromDom(e.dom().cloneNode(!1));
        },
        text: cn.fromText,
      }),
      query: v({
        comparePosition: function (e, t) {
          return e.dom().compareDocumentPosition(t.dom());
        },
        prevSibling: Do,
        nextSibling: Oo,
      }),
      property: v({
        children: _o,
        name: Ut,
        parent: Co,
        document: function (e) {
          return e.dom().ownerDocument;
        },
        isText: qt,
        isComment: Ht,
        isElement: Wt,
        getText: ps,
        setText: gs,
        isBoundary: function (e) {
          return !!Wt(e) && ("body" === Ut(e) || Y(Gs, Ut(e)));
        },
        isEmptyTag: function (e) {
          return !!Wt(e) && Y(["br", "img", "hr", "input"], Ut(e));
        },
      }),
      eq: Io,
      is: So,
    },
    xl = function (e) {
      return qi(e).isSome();
    },
    Tl =
      /(?:(?:[A-Za-z]{3,9}:(?:\/\/))(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*|(?:www\.|[-;:&=+$,.\w]+@)[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*)(?::[0-9]+)?(?:\/[-+~=%.()\/\w]*)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?/g
        .source,
    El = function (e) {
      var t,
        n = Qr("word", "pattern")("__INTERNAL__", zs(Tl));
      return yl(bl, e, [n], t);
    },
    wl = function (e) {
      return !Xi(e, "a", t).isSome();
      var t;
    },
    Il = function (e) {
      var t = e.indexOf("://");
      return 3 <= t && t <= 9;
    },
    Sl = {
      links: function (e) {
        var t = El(e);
        q(t, function (e) {
          var n,
            t = e.exact();
          (t.indexOf("@") < 0 || Il(t)) &&
            ((n = e.elements()),
            _.from(n[0])
              .filter(wl)
              .map(function (e) {
                var t = cn.fromTag("a");
                return ua(e, t), ma(t, n), Vt(t, "href", qc(t)), t;
              }));
        });
      },
      position: function (e) {
        q(e, function (e) {
          Wt(e) && Va(e, "position").isSome() && Xa(e, "position");
        });
      },
      list: function (e) {
        var t = $(e, function (e) {
          return "li" === Ut(e);
        });
        if (0 < t.length) {
          var n = Ao(t[0]),
            r = cn.fromTag("ul");
          if ((ua(e[0], r), 0 < n.length)) {
            var o = cn.fromTag("li");
            la(r, o), ma(o, n);
          }
          ma(r, t);
        }
      },
    },
    Ll = function (e) {
      var t = _o(e);
      q([Sl.links, Sl.position, Sl.list], function (e) {
        e(t);
      });
    },
    Cl = function (e, t, n, r, o) {
      Ll(n);
      var i = Au(n),
        a = Xs(o, r, t);
      return ju(e, i, a);
    },
    Nl = Ll,
    Dl = function (e, t) {
      var n = Au(t);
      return ju(e, n, [qs.removeMetaTags, qs.replaceClipboardChangedUrls]);
    },
    Ol = function (e, t) {
      var n = Au(t);
      return ju(e, n, [qs.removeFragmentComments]);
    },
    Al = Je("simple-adt"),
    _l = function (e) {
      var i = function (e) {
          return Al + "_" + e;
        },
        o = function (e, t) {
          return e._simpleAdt === i(t);
        },
        a = te(e),
        n = {};
      q(a, function (t) {
        n["as" + Tt(t)] = function (e) {
          return o(e, t) ? _.some(e.data) : _.none();
        };
      });
      var t = {};
      return (
        ne(e, function (r, o) {
          t[o] = function (e) {
            return { _simpleAdt: i(o), data: ((t = r), (n = e), 0 === t.length ? {} : no(t, [])(n)), _simpleAdt_data: e };
            var t, n;
          };
        }),
        le(n, {
          constructors: t,
          match: function (t, n) {
            var e,
              r = te(n);
            if (r.length !== a.length) throw new Error("Partial match");
            return Pa(r, function (e) {
              return o(t, e) ? _.some(n[e]) : _.none();
            }).getOrDie("Must find branch for constructor: " + (0 === (e = t._simpleAdt).indexOf(Al) ? e.substring(Al.length + "_".length) : e))(t.data);
          },
        })
      );
    },
    Pl = _l({ getFromFlash: [], disabled: [], fromClipboard: ["rtf"] }),
    kl = { getFromFlash: Pl.constructors.getFromFlash, disabled: Pl.constructors.disabled, fromClipboard: Pl.constructors.fromClipboard, match: Pl.match },
    Ml = function (e, t) {
      var n = new RegExp(t, "i");
      return Pa(e, function (e) {
        return null !== e.match(n) ? _.some({ type: e, flavor: t }) : _.none();
      });
    },
    Rl = {
      isValidData: function (e) {
        return void 0 !== e && void 0 !== e.types && null !== e.types;
      },
      getPreferredFlavor: function (e, t) {
        return Pa(e, function (e) {
          return Ml(t, e);
        });
      },
      getFlavor: Ml,
    },
    Fl = _l({ event: ["nativeEvent"], html: ["container"], word: ["html", "rtf"], text: ["text"], images: ["images"] }),
    jl = At.detect().browser,
    Ul = !(jl.isIE() || (jl.isEdge() && jl.version.major < 16)),
    Bl = ["^image/", "file"],
    Yl = function (e) {
      return xt(e, "<html") && (xt(e, 'xmlns:o="urn:schemas-microsoft-com:office:office"') || xt(e, 'xmlns:x="urn:schemas-microsoft-com:office:excel"'));
    },
    Hl = function (e) {
      return xt(e, "<meta") && xt(e, 'id="docs-internal-guid');
    },
    Wl = function (e) {
      return 0 < e.length;
    },
    ql = function (t, e) {
      return Rl.getFlavor(t.types, e)
        .map(function (e) {
          return t.getData(e.type);
        })
        .filter(Wl);
    },
    $l = function (e) {
      return ql(e, "html");
    },
    Vl = function (e) {
      return $l(e).filter(Hl);
    },
    Xl = function (e) {
      return Ul ? _.some(e.clipboardData).filter(Rl.isValidData) : _.none();
    },
    Gl = function (e) {
      var t = cn.fromTag("div");
      _u(t, e);
      var n = Ol(Lo(t), t),
        r = cn.fromTag("div");
      return _u(r, n), Fl.constructors.html({ container: r });
    },
    zl = {
      fromEvent: function (e) {
        var t = function (t) {
            return void 0 === t.items
              ? _.none()
              : Rl.getPreferredFlavor(Bl, t.types).map(function (e) {
                  return Fl.constructors.images({ images: t.items });
                });
          },
          r = function (t) {
            return Pa(t.types, function (e) {
              return "text/plain" === e
                ? _.some(t.getData(e)).map(function (e) {
                    return Fl.constructors.text({ text: e });
                  })
                : _.none();
            });
          };
        return {
          getWordData: function () {
            return Xl(e).bind(function (n) {
              return ((e = n), $l(e).filter(Yl)).map(function (e) {
                var t = ql(n, "rtf");
                return Fl.constructors.word({
                  html: e,
                  rtf: t.fold(kl.getFromFlash, function (e) {
                    return kl.fromClipboard({ rtf: e });
                  }),
                });
              });
              var e;
            });
          },
          getGoogleDocsData: function () {
            return Xl(e).bind(Vl).map(Gl);
          },
          getImage: function () {
            return Xl(e).bind(t);
          },
          getText: function () {
            return Xl(e).fold(function () {
              var e = y.window.clipboardData;
              return void 0 !== e ? _.some(Fl.constructors.text({ text: e.getData("text") })) : _.none();
            }, r);
          },
          getHtml: function () {
            return Xl(e).bind($l).map(Gl);
          },
          getOnlyText: function () {
            return Xl(e).bind(function (e) {
              return (t = e.types), (n = "text/plain"), 1 === t.length && t[0] === n ? r(e) : _.none();
              var t, n;
            });
          },
          getNative: function () {
            return Fl.constructors.event({ nativeEvent: e });
          },
        };
      },
      fromHtml: function (e) {
        return {
          getWordData: function () {
            return _.some(Fl.constructors.word({ html: e, rtf: kl.disabled() }));
          },
          getGoogleDocsData: _.none,
          getImage: _.none,
          getHtml: _.none,
          getText: _.none,
          getNative: E("There is no native event"),
          getOnlyText: _.none,
        };
      },
      fromText: function (e) {
        return {
          getWordData: _.none,
          getGoogleDocsData: _.none,
          getImage: _.none,
          getHtml: _.none,
          getText: function () {
            return _.some(Fl.constructors.text({ text: e }));
          },
          getNative: E("There is no native event"),
          getOnlyText: _.none,
        };
      },
    },
    Kl = function () {
      var e = !1;
      return {
        isBlocked: function () {
          return e;
        },
        block: function () {
          e = !0;
        },
        unblock: function () {
          e = !1;
        },
      };
    },
    Zl = function (e, t) {
      return { control: e, instance: t };
    },
    Jl = {
      tap: function (n) {
        var r = Kl();
        return Zl(r, function () {
          for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
          r.isBlocked() || n.apply(null, e);
        });
      },
    },
    Ql = so("ephox-sloth").resolve("bin"),
    ef = { bin: v(Ql) },
    tf = At.detect(),
    nf = tf.browser.isIE() && tf.browser.version.major <= 10,
    rf = nf
      ? function (e, t, n) {
          t.control.block(), e.dom().execCommand("paste"), n(), t.control.unblock();
        }
      : function (e, t, n) {
          setTimeout(n, 1);
        },
    of = {
      willBlock: v(nf),
      run: function (e, t, n) {
        return rf(e, t, n);
      },
    },
    af = ue([{ before: ["element"] }, { on: ["element", "offset"] }, { after: ["element"] }]),
    uf = {
      before: af.before,
      on: af.on,
      after: af.after,
      cata: function (e, t, n, r) {
        return e.fold(t, n, r);
      },
      getStart: function (e) {
        return e.fold(m, m, m);
      },
    },
    cf = ue([{ domRange: ["rng"] }, { relative: ["startSitu", "finishSitu"] }, { exact: ["start", "soffset", "finish", "foffset"] }]),
    sf = Qr("start", "soffset", "finish", "foffset"),
    lf = cf.relative,
    ff = function (e, t, n) {
      var r,
        o,
        i = e.document.createRange();
      return (
        (r = i),
        t.fold(
          function (e) {
            r.setStartBefore(e.dom());
          },
          function (e, t) {
            r.setStart(e.dom(), t);
          },
          function (e) {
            r.setStartAfter(e.dom());
          }
        ),
        (o = i),
        n.fold(
          function (e) {
            o.setEndBefore(e.dom());
          },
          function (e, t) {
            o.setEnd(e.dom(), t);
          },
          function (e) {
            o.setEndAfter(e.dom());
          }
        ),
        i
      );
    },
    df = function (e, t, n, r, o) {
      var i = e.document.createRange();
      return i.setStart(t.dom(), n), i.setEnd(r.dom(), o), i;
    },
    mf = ue([{ ltr: ["start", "soffset", "finish", "foffset"] }, { rtl: ["start", "soffset", "finish", "foffset"] }]),
    pf = function (e, t, n) {
      return t(cn.fromDom(n.startContainer), n.startOffset, cn.fromDom(n.endContainer), n.endOffset);
    },
    gf = function (e, t) {
      var o,
        n,
        r,
        i =
          ((o = e),
          t.match({
            domRange: function (e) {
              return { ltr: v(e), rtl: _.none };
            },
            relative: function (e, t) {
              return {
                ltr: Qe(function () {
                  return ff(o, e, t);
                }),
                rtl: Qe(function () {
                  return _.some(ff(o, t, e));
                }),
              };
            },
            exact: function (e, t, n, r) {
              return {
                ltr: Qe(function () {
                  return df(o, e, t, n, r);
                }),
                rtl: Qe(function () {
                  return _.some(df(o, n, r, e, t));
                }),
              };
            },
          }));
      return (r = (n = i).ltr()).collapsed
        ? n
            .rtl()
            .filter(function (e) {
              return !1 === e.collapsed;
            })
            .map(function (e) {
              return mf.rtl(cn.fromDom(e.endContainer), e.endOffset, cn.fromDom(e.startContainer), e.startOffset);
            })
            .getOrThunk(function () {
              return pf(0, mf.ltr, r);
            })
        : pf(0, mf.ltr, r);
    },
    vf =
      (document.caretPositionFromPoint || document.caretRangeFromPoint,
      function (e, t) {
        var n = Ut(e);
        return "input" === n ? uf.after(e) : Y(["br", "img"], n) ? (0 === t ? uf.before(e) : uf.after(e)) : uf.on(e, t);
      }),
    hf = function (e, t, n, r, o) {
      var i,
        a,
        u = df(e, t, n, r, o);
      (i = e),
        (a = u),
        _.from(i.getSelection()).each(function (e) {
          e.removeAllRanges(), e.addRange(a);
        });
    },
    yf = function (e, t, n, r, o) {
      var i,
        a,
        u,
        c,
        l,
        s = ((i = r), (a = o), (u = vf(t, n)), (c = vf(i, a)), lf(u, c));
      gf((l = e), s).match({
        ltr: function (e, t, n, r) {
          hf(l, e, t, n, r);
        },
        rtl: function (t, n, r, o) {
          var e,
            i,
            a,
            u,
            c,
            s = l.getSelection();
          if (s.setBaseAndExtent) s.setBaseAndExtent(t.dom(), n, r.dom(), o);
          else if (s.extend)
            try {
              (i = t), (a = n), (u = r), (c = o), (e = s).collapse(i.dom(), a), e.extend(u.dom(), c);
            } catch (e) {
              hf(l, r, o, t, n);
            }
          else hf(l, r, o, t, n);
        },
      });
    },
    bf = function (e) {
      var t,
        n,
        r,
        o,
        i,
        a,
        u = cn.fromDom(e.anchorNode),
        c = cn.fromDom(e.focusNode);
      return (
        (t = u),
        (n = e.anchorOffset),
        (r = c),
        (o = e.focusOffset),
        (i = bs(t, n, r, o)),
        (a = Io(t, r) && n === o),
        i.collapsed && !a
          ? _.some(sf(u, e.anchorOffset, c, e.focusOffset))
          : (function (e) {
              if (0 < e.rangeCount) {
                var t = e.getRangeAt(0),
                  n = e.getRangeAt(e.rangeCount - 1);
                return _.some(sf(cn.fromDom(t.startContainer), t.startOffset, cn.fromDom(n.endContainer), n.endOffset));
              }
              return _.none();
            })(e)
      );
    },
    xf = function (e) {
      return _.from(e.getSelection())
        .filter(function (e) {
          return 0 < e.rangeCount;
        })
        .bind(bf);
    },
    Tf = function (e) {
      return W(e, function (e) {
        return e.asset();
      });
    };
  function Ef(i, a) {
    var u = ao.create({ cancel: io([]), error: io(["message"]), insert: io(["elements", "assets", "correlated", "isInternal"]) }),
      r = function (e, t, n) {
        var r = Ma.choose(i, a, e);
        r.capture() && n();
        var o = W(r.steps(), function (e) {
          return e(t);
        });
        Ma.run(o, r.input()).get(function (e) {
          var r = e.bundle().isInternal().getOr(!1);
          Na.cata(
            e.response(),
            function (e) {
              u.trigger.error(e);
            },
            function (e, t) {
              u.trigger.insert(e, Tf(t), t, r);
            },
            function () {
              u.trigger.cancel();
            },
            function (e, t, n) {
              u.trigger.insert(e, Tf(t), t, r), u.trigger.error(n);
            }
          );
        });
      },
      o = Jl.tap(function (n) {
        xf(n.target.ownerDocument.defaultView).each(function (e) {
          if (!Fi(e.start(), ef.bin())) {
            var t = zl.fromEvent(n);
            of.willBlock() && (o.control.block(), n.preventDefault()),
              r(t, o.control, function () {
                n.preventDefault();
              });
          }
        });
      });
    return {
      paste: o.instance,
      pasteCustom: function (e) {
        var t = Jl.tap(C);
        r(e, t.control, C);
      },
      isBlocked: o.control.isBlocked,
      destroy: C,
      events: u.registry,
    };
  }
  var wf = Qr("asset", "image"),
    If = function (e, o) {
      return me.cata(
        e,
        function (e, t, n, r) {
          return Vt(o, "src", n), !0;
        },
        w
      );
    },
    Sf = {
      assetImage: wf,
      createImages: function (e) {
        var a = [],
          u = [];
        return (
          q(e, function (i) {
            return me.cata(
              i,
              function (e, t, n, r) {
                var o = cn.fromTag("img");
                Vt(o, "src", n), a.push(o), u.push(wf(i, o));
              },
              function (e, t, n) {
                y.console.error("Internal error: Paste operation produced an image URL instead of a Data URI: ", t);
              }
            );
          }),
          Na.paste(a, u)
        );
      },
      findImages: function (e, t) {
        var i = [],
          a = J(e, function (e) {
            return "img" === Ut(e) ? [e] : Ro(e, "img");
          });
        return (
          q(t, function (o) {
            me.cata(
              o,
              function (e, t, n, r) {
                q(a, function (e) {
                  Gt(e, "src") === n && i.push(wf(o, e));
                });
              },
              C
            );
          }),
          i
        );
      },
      updateSource: If,
      updateSources: function (e, r) {
        var o = [];
        return (
          q(e, function (e, t) {
            var n = r[t];
            If(e, n) && o.push(wf(e, n));
          }),
          o
        );
      },
      browserBlobs: function (e) {
        return Ke(e, function (u) {
          return Xe.nu(function (i) {
            var a = u.dom();
            We.imageToImageResult(a).then(function (o) {
              o.toBlob().then(function (e) {
                var t = Et(a.src, "blob:") ? a.src : y.URL.createObjectURL(e),
                  n = Je("image"),
                  r = me.blob(n, o, t);
                i(wf(r, u));
              });
            });
          });
        });
      },
    },
    Lf = function (o) {
      var i = function () {
        return Xe.pure(o);
      };
      return me.cata(
        o.asset(),
        function (e, t, n) {
          return /tiff$/.test(t.getType())
            ? ((r = t),
              Xe.nu(function (t) {
                var e = We.imageResultToBlob(r, "image/png").then(function (e) {
                  an.single(e).map(_.some).get(t);
                });
                return e.catch.call(e, function (e) {
                  y.console.warn(e), t(_.none());
                });
              })).map(function (e) {
                return e
                  .map(function (e) {
                    var t = o.image();
                    return kt(n), Sf.updateSource(e, t), Sf.assetImage(e, t);
                  })
                  .getOr(o);
              })
            : i();
          var r;
        },
        i
      );
    };
  function Cf() {
    return function (e, o) {
      return _a.sync(function (n) {
        var e = function () {
            _a.call(n, { response: o.response(), bundle: o.bundle() });
          },
          r = function (e, t) {
            Ke(e, Lf).get(function (e) {
              _a.call(n, { response: t(e), bundle: o.bundle() });
            });
          };
        Na.cata(
          o.response(),
          e,
          function (t, e) {
            r(e, function (e) {
              return Na.paste(t, e);
            });
          },
          e,
          function (t, e, n) {
            r(e, function (e) {
              return Na.incomplete(t, e, n);
            });
          }
        );
      });
    };
  }
  var Nf = function (r) {
      return function (n) {
        return function (e, t) {
          return (
            n.block(),
            r(e, t).map(function (e) {
              return n.unblock(), e;
            })
          );
        };
      };
    },
    Df = function (e) {
      return v(e);
    },
    Of = function (n) {
      var e,
        t = Te("window.clipboardData.files"),
        r = void 0 !== (e = n).convertURL ? e.convertURL : void 0 !== e.msConvertURL ? e.msConvertURL : void 0;
      if (void 0 !== t && void 0 !== r && 0 < t.length) {
        var o = Ke(t, function (e) {
          var t = Pt(e);
          return r.apply(n, [e, "specified", t]), an.singleWithUrl(e, t);
        });
        return _.some(o);
      }
      return _.none();
    },
    Af = function () {
      var t = _.none();
      return {
        convert: function (e) {
          t = Of(e);
        },
        listen: function (e) {
          return t
            .fold(
              function () {
                return Xe.nu(function (e) {
                  e([]);
                });
              },
              function (e) {
                return e;
              }
            )
            .get(e);
        },
        clear: function () {
          t = _.none();
        },
      };
    },
    _f = function (e) {
      var t = cn.fromTag("div");
      return ma(t, e), Ro(t, "img[src]");
    },
    Pf = function (e) {
      return 0 === e.indexOf("data:") && -1 < e.indexOf("base64");
    },
    kf = function (e) {
      return 0 === e.indexOf("blob:");
    },
    Mf = function (e) {
      var t = Gt(e, "src");
      return Pf(t) || kf(t);
    },
    Rf = function (e) {
      return J(_f(e), function (e) {
        var n,
          t,
          r,
          o,
          i = Gt(e, "src");
        return Pf(i)
          ? ((r = e),
            (o = i),
            Me(o).map(function (e) {
              return Sf.assetImage(an.single(e), r);
            })).toArray()
          : kf(i)
          ? ((n = e),
            (t = i),
            Re(t).map(function (e) {
              var t = Xe.nu(function (t) {
                e.then(function (e) {
                  an.single(e).get(t);
                });
              });
              return Sf.assetImage(t, n);
            })).toArray()
          : [];
      });
    };
  function Ff(f) {
    return function (e, l) {
      return _a.sync(function (u) {
        var c = function () {
            _a.call(u, { response: l.response(), bundle: l.bundle() });
          },
          s = function (e) {
            var t,
              n,
              r = $(_f(e), Mf);
            q(r, Fa),
              _a.call(u, {
                response:
                  0 < r.length
                    ? ((t = e),
                      (n = $(t, function (e) {
                        return "img" !== Ut(e) || !Mf(e);
                      })),
                      Na.incomplete(n, [], "errors.local.images.disallowed"))
                    : l.response(),
                bundle: l.bundle(),
              });
          },
          e = function (e, t, n) {
            var r, o, i, a;
            !1 === f.allowLocalImages
              ? s(e)
              : 0 === t.length
              ? ((o = Rf((r = e))),
                (i = Ke(o, function (e) {
                  return e.asset();
                })),
                (a = W(o, function (e) {
                  return e.image();
                })),
                i.get(function (e) {
                  var t = Sf.updateSources(e, a);
                  _a.call(u, { response: Na.paste(r, t), bundle: l.bundle() });
                }))
              : c();
          };
        Na.cata(l.response(), c, e, c, e);
      });
    };
  }
  var jf = function (e, t) {
      if (0 === e.length) throw "Zero length content passed to Hex conversion";
      return Ie(
        [
          Le(
            (function (e) {
              for (var t = new Array(e.length / 2), n = 0; n < e.length; n += 2) {
                var r = e.substr(n, 2);
                t[Math.floor(n / 2)] = parseInt(r, 16);
              }
              return t;
            })(e)
          ),
        ],
        { type: t }
      );
    },
    Uf = ue([{ unsupported: ["id", "message", "isEquation"] }, { supported: ["id", "contentType", "blob", "isEquation"] }]),
    Bf = {
      unsupported: Uf.unsupported,
      supported: Uf.supported,
      cata: function (e, t, n) {
        return e.fold(t, n);
      },
    },
    Yf = function (e, t, n) {
      return t.indexOf(e, n);
    },
    Hf = function (e, t, n, r, o, i) {
      return -1 === e || -1 === t ? _.none() : _.some({ start: e, end: t, bower: n, regex: r, idRef: o, isEquation: i });
    },
    Wf = function (e, t, n) {
      return e.substring(t, n);
    },
    qf = function (e, t) {
      if (-1 === t) return t;
      var n,
        r,
        o = 0,
        i = e.length;
      do {
        if (((n = e.indexOf("{", t)) < (r = e.indexOf("}", t)) && -1 !== n ? ((t = n + 1), ++o) : (r < n || n < 0) && -1 !== r && ((t = r + 1), --o), i < t || -1 === r)) return -1;
      } while (0 < o);
      return t;
    },
    $f = function (e, t, n, r, o) {
      var i = Wf(e, n, r);
      return Hf(n, r, i, /[^a-fA-F0-9]([a-fA-F0-9]+)\}$/, "i", o);
    },
    Vf = function (e, t, n, r, o) {
      var i = Wf(e, n, r);
      return Hf(n, r, i, /([a-fA-F0-9]{64,})(?:\}.*)/, "s", o);
    },
    Xf = function (e, t) {
      var n = Yf("{\\pict{", e, t),
        r = qf(e, n),
        o = Yf("{\\shp{", e, t),
        i = qf(e, o),
        a = Yf("{\\mmathPict{", e, t),
        u = qf(e, a),
        c = -1 !== a && ((a < n && r < u) || (a < o && i < u)),
        s = N(Vf, e, t, o, i, c),
        l = N($f, e, t, n, r, c);
      return -1 === n && -1 === o ? _.none() : -1 === n ? s() : -1 === o ? l() : o < n && r < i ? l() : n < o && i < r ? s() : n < o ? l() : o < n ? s() : _.none();
    },
    Gf = function (e, t) {
      return Xf(e, t);
    },
    zf = function (e) {
      return 0 <= e.indexOf("\\pngblip") ? Go.value("image/png") : 0 <= e.indexOf("\\jpegblip") ? Go.value("image/jpeg") : Go.error("errors.imageimport.unsupported");
    },
    Kf = function (e, t) {
      var n = e.match(t);
      return n && n[1] && n[1].length % 2 == 0 ? Go.value(n[1]) : Go.error("errors.imageimport.invalid");
    },
    Zf = function (e) {
      var t = e.match(/\\shplid(\d+)/);
      return null !== t ? _.some(t[1]) : _.none();
    },
    Jf = function (e) {
      for (
        var a = [],
          t = function () {
            return e.length;
          },
          n = function (e) {
            var t,
              r,
              o,
              i,
              n =
                ((r = (t = e).bower),
                (o = t.regex),
                (i = t.isEquation),
                Zf(r).map(function (e) {
                  var n = t.idRef + e;
                  return zf(r).fold(
                    function (e) {
                      return Bf.unsupported(n, e, i);
                    },
                    function (t) {
                      return Kf(r, o).fold(
                        function (e) {
                          return Bf.unsupported(n, e, i);
                        },
                        function (e) {
                          return Bf.supported(n, t, jf(e, t), i);
                        }
                      );
                    }
                  );
                }));
            return (a = a.concat(n.toArray())), e.end;
          },
          r = 0;
        r < e.length;

      )
        r = Gf(e, r).fold(t, n);
      return a;
    },
    Qf = function (e) {
      var t = e.replace(/\r/g, "").replace(/\n/g, "");
      return Jf(t);
    },
    ed = {
      images: function (e) {
        return Qf(e);
      },
      toId: function (e) {
        return Bf.cata(
          e,
          function (e, t, n) {
            return e;
          },
          function (e, t, n, r) {
            return e;
          }
        );
      },
      isEquation: function (e) {
        return Bf.cata(
          e,
          function (e, t, n) {
            return n;
          },
          function (e, t, n, r) {
            return r;
          }
        );
      },
      toBlob: function (e) {
        return Bf.cata(
          e,
          function (e, t, n) {
            return Go.error(t);
          },
          function (e, t, n, r) {
            return Go.value(n);
          }
        );
      },
    },
    td = {
      convert: function (e, t, n, o) {
        var i = V(
            t,
            function (t, n) {
              var r = ed.toId(n),
                o = ed.isEquation(n);
              return G(t, function (e) {
                return ed.toId(e) === r && ed.isEquation(e) === o;
              }).fold(
                function () {
                  return t.concat([n]);
                },
                function (e) {
                  return ed.toBlob(t[e]).isValue()
                    ? t
                    : t
                        .slice(0, e)
                        .concat(t.slice(e + 1))
                        .concat([n]);
                }
              );
            },
            []
          ),
          a = [],
          u = !1,
          r = J(e, function (t, e) {
            var n = Gt(t, "data-image-id"),
              r = "true" === Gt(t, "data-ms-equation");
            return (
              Kt(t, "rtf-data-image"),
              Kt(t, "data-image-id"),
              Kt(t, "data-ms-equation"),
              "unsupported" === n
                ? ((u = !0), Vt(t, "alt", o("errors.imageimport.unsupported")), [])
                : X(i, function (e) {
                    return ed.toId(e) === n && ed.isEquation(e) === r;
                  }).fold(
                    function () {
                      return y.console.log("WARNING: unable to find data for image ", t.dom()), (u = !0), Vt(t, "alt", o("errors.imageimport.unsupported")), [];
                    },
                    function (e) {
                      return ed.toBlob(e).fold(
                        function (e) {
                          return (u = !0), Vt(t, "alt", o(e)), [];
                        },
                        function (e) {
                          return a.push(t), [e];
                        }
                      );
                    }
                  )
            );
          });
        an.multiple(r).get(function (e) {
          var t = Sf.updateSources(e, a);
          n(t, u);
        });
      },
    },
    nd = function (e) {
      return Ro(e, "[rtf-data-image]");
    },
    rd = {
      exists: function (e) {
        return 0 < nd(e).length;
      },
      find: nd,
    };
  function od(e) {
    var r = e.translations,
      u = ao.create({ insert: io(["elements", "correlated"]), incomplete: io(["elements", "correlated", "message"]) });
    return {
      events: u.registry,
      processRtf: function (o, i, e, a) {
        var t = ed.images(e),
          n = rd.find(o);
        td.convert(
          n,
          t,
          function (e, t) {
            var n = _o(o),
              r = e.concat(i);
            t ? u.trigger.incomplete(n, r, "errors.imageimport.failed") : u.trigger.insert(n, r), a();
          },
          r
        );
      },
    };
  }
  function id(e, t) {
    var i,
      a,
      u,
      c,
      s =
        ((i = e),
        (a = t),
        (u = ao.create({ insert: io(["elements", "correlated"]), incomplete: io(["elements", "correlated", "message"]) })),
        (c = od(a)).events.incomplete.bind(function (e) {
          u.trigger.incomplete(e.elements(), e.correlated(), e.message());
        }),
        c.events.insert.bind(function (e) {
          u.trigger.insert(e.elements(), e.correlated());
        }),
        {
          events: u.registry,
          gordon: function (n, r) {
            var t = function (e) {
                var t = rd.find(n);
                q(t, Fa), u.trigger.incomplete(_o(n), r, e);
              },
              e = function (e) {
                t(e.message());
              };
            if (!0 === a.allowLocalImages && !0 === a.enableFlashImport) {
              var o = i(a);
              o.events.response.bind(function (e) {
                c.processRtf(n, r, e.rtf(), e.hide());
              }),
                o.events.cancel.bind(function () {
                  var e = rd.find(n);
                  q(e, Fa), u.trigger.insert(_o(n), r);
                }),
                o.events.failed.bind(e),
                o.events.error.bind(e),
                o.open();
            } else t("errors.local.images.disallowed");
          },
        }),
      l = Ac(_.none()),
      n = function (t) {
        l.get().each(function (e) {
          _a.call(e, { response: t, bundle: Sa.nu({}) });
        });
      };
    return (
      s.events.insert.bind(function (e) {
        n(Na.paste(e.elements(), e.correlated()));
      }),
      s.events.incomplete.bind(function (e) {
        n(Na.incomplete(e.elements(), e.correlated(), e.message()));
      }),
      function (e, t) {
        return _a.sync(function (o) {
          var i = function () {
              _a.call(o, { response: t.response(), bundle: t.bundle() });
            },
            e = function (e, t, n) {
              l.set(_.some(o));
              var r = cn.fromTag("div");
              ma(r, e), rd.exists(r) ? s.gordon(r, t, n) : i();
            };
          Na.cata(t.response(), i, e, i, e);
        });
      }
    );
  }
  var ad = function (e) {
      return e.officeStyles().getOr(!0);
    },
    ud = function (e) {
      return e.htmlStyles().getOr(!1);
    },
    cd = function (e) {
      return e.isWord().getOr(!1);
    },
    sd = {
      proxyBin: function (n) {
        return {
          handle: function (e, t) {
            return n.proxyBin().fold(function () {
              return y.console.error(e), _a.pure({ response: Na.cancel(), bundle: Sa.nu({}) });
            }, t);
          },
        };
      },
      backgroundAssets: function (e) {
        return Xe.nu(function (t) {
          e.backgroundAssets().fold(
            function () {
              t([]);
            },
            function (e) {
              e.listen(t);
            }
          );
        });
      },
      merging: function (e) {
        var t = cd(e);
        return (t && ad(e)) || (!t && ud(e));
      },
      mergeOffice: ad,
      mergeNormal: ud,
      isWord: cd,
      isGoogleDocs: function (e) {
        return e.isGoogleDocs().getOr(!1);
      },
      isInternal: function (e) {
        return e.isInternal().getOr(!1);
      },
    },
    ld = { resolve: so("ephox-cement").resolve };
  function fd(s, r) {
    var l = r.translations,
      f = function (e, t, n) {
        n(_.some(fe(t, { officeStyles: e, htmlStyles: e })));
      };
    return {
      get: function (e, t) {
        var n = r[e ? "officeStyles" : "htmlStyles"];
        "clean" === n
          ? f(!1, r, t)
          : "merge" === n
          ? f(!0, r, t)
          : (function (e, t) {
              var n = cn.fromTag("div");
              Mi(n, ld.resolve("styles-dialog-content"));
              var r = cn.fromTag("p"),
                o = aa(l("cement.dialog.paste.instructions"));
              ma(r, o), la(n, r);
              var i = {
                  text: l("cement.dialog.paste.clean"),
                  tabindex: 0,
                  className: ld.resolve("clean-styles"),
                  click: function () {
                    u(), f(!1, e, t);
                  },
                },
                a = {
                  text: l("cement.dialog.paste.merge"),
                  tabindex: 1,
                  className: ld.resolve("merge-styles"),
                  click: function () {
                    u(), f(!0, e, t);
                  },
                },
                u = function () {
                  c.destroy();
                },
                c = s(!0);
              c.setTitle(l("cement.dialog.paste.title")),
                c.setContent(n),
                c.setButtons([i, a]),
                c.events.close.bind(function () {
                  t(_.none()), u();
                }),
                c.show();
            })(r, t);
      },
      destroy: C,
    };
  }
  var dd,
    md,
    pd,
    gd = function (e, t) {
      var i = fd(e, t);
      return function (e, r) {
        var t = r.bundle(),
          o = r.response();
        return _a.sync(function (n) {
          i.get(sd.isWord(t), function (e) {
            var t = e.fold(
              function () {
                return { response: Na.cancel(), bundle: r.bundle() };
              },
              function (e) {
                return { response: o, bundle: Sa.nu({ officeStyles: e.officeStyles, htmlStyles: e.htmlStyles }) };
              }
            );
            _a.call(n, t);
          });
        });
      };
    },
    vd = gd,
    hd = function (r, o) {
      return function (e, t) {
        var n = function (e) {
          return _a.pure({ response: t.response(), bundle: Sa.nu({ officeStyles: e, htmlStyles: e }) });
        };
        return sd.isInternal(t.bundle()) ? n(!0) : sd.isGoogleDocs(t.bundle()) ? n(!1) : gd(r, o)(e, t);
      };
    },
    yd = function (m, p) {
      return function (e) {
        if (m(e)) {
          var t,
            n,
            r,
            o,
            i,
            a,
            u,
            c = cn.fromDom(e.target),
            s = function () {
              e.stopPropagation();
            },
            l = function () {
              e.preventDefault();
            },
            f = g(l, s),
            d = ((t = c), (n = e.clientX), (r = e.clientY), (o = s), (i = l), (a = f), (u = e), { target: v(t), x: v(n), y: v(r), stop: o, prevent: i, kill: a, raw: v(u) });
          p(d);
        }
      };
    },
    bd = function (e, t, n, r) {
      return (o = e), (i = t), (a = !1), (u = yd(n, r)), o.dom().addEventListener(i, u, a), { unbind: N(xd, o, i, u, a) };
      var o, i, a, u;
    },
    xd = function (e, t, n, r) {
      e.dom().removeEventListener(t, n, r);
    },
    Td = v(!0),
    Ed = function (e, t, n) {
      return bd(e, t, Td, n);
    },
    wd = function (e) {
      return (function (e) {
        var t = e.dom();
        try {
          var n = t.contentWindow ? t.contentWindow.document : t.contentDocument;
          return null != n ? _.some(cn.fromDom(n)) : _.none();
        } catch (e) {
          return y.console.log("Error reading iframe: ", t), y.console.log("Error was: " + e), _.none();
        }
      })(e).fold(
        function () {
          return e;
        },
        function (e) {
          return e;
        }
      );
    },
    Id = function (e, t) {
      if (!vo(e)) throw "Internal error: attempted to write to an iframe that is not in the DOM";
      var n = wd(e).dom();
      n.open("text/html", "replace"), n.writeln(t), n.close();
    },
    Sd = function (e) {
      var t = e.dom().styleSheets;
      return Array.prototype.slice.call(t);
    },
    Ld = Qr("selector", "style", "raw"),
    Cd = function (e) {
      var t = e.cssRules;
      return J(t, function (e) {
        return e.type === y.CSSRule.IMPORT_RULE
          ? Cd(e.styleSheet)
          : e.type === y.CSSRule.STYLE_RULE
          ? [
              (function (e) {
                var t = e.selectorText,
                  n = e.style.cssText;
                if (void 0 === n) throw "WARNING: Browser does not support cssText property";
                return Ld(t, n, e.style);
              })(e),
            ]
          : [];
      });
    },
    Nd = function (e) {
      return J(e, Cd);
    },
    Dd = {},
    Od = { exports: Dd };
  (md = Dd),
    (pd = Od),
    (dd = void 0),
    (function (e) {
      "object" == typeof md && void 0 !== pd
        ? (pd.exports = e())
        : "function" == typeof dd && dd.amd
        ? dd([], e)
        : (("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).EphoxContactWrapper = e());
    })(function () {
      return (function i(a, u, c) {
        function s(t, e) {
          if (!u[t]) {
            if (!a[t]) {
              var n = !1;
              if (!e && n) return n(t, !0);
              if (l) return l(t, !0);
              var r = new Error("Cannot find module '" + t + "'");
              throw ((r.code = "MODULE_NOT_FOUND"), r);
            }
            var o = (u[t] = { exports: {} });
            a[t][0].call(
              o.exports,
              function (e) {
                return s(a[t][1][e] || e);
              },
              o,
              o.exports,
              i,
              a,
              u,
              c
            );
          }
          return u[t].exports;
        }
        for (var l = !1, e = 0; e < c.length; e++) s(c[e]);
        return s;
      })(
        {
          1: [
            function (e, t, n) {
              var r,
                a,
                o =
                  ((r = function (e) {
                    var t,
                      n,
                      r,
                      o,
                      i = [];
                    for (r = 0, o = (t = e.split(",")).length; r < o; r += 1) 0 < (n = t[r]).length && i.push(a(n));
                    return i;
                  }),
                  (a = function (c) {
                    var e,
                      t,
                      n,
                      s = c,
                      l = { a: 0, b: 0, c: 0 },
                      f = [];
                    return (
                      (e = function (e, t) {
                        var n, r, o, i, a, u;
                        if (e.test(s))
                          for (r = 0, o = (n = s.match(e)).length; r < o; r += 1)
                            (l[t] += 1), (i = n[r]), (a = s.indexOf(i)), (u = i.length), f.push({ selector: c.substr(a, u), type: t, index: a, length: u }), (s = s.replace(i, Array(u + 1).join(" ")));
                      }),
                      (t = function (e) {
                        var t, n, r, o;
                        if (e.test(s)) for (n = 0, r = (t = s.match(e)).length; n < r; n += 1) (o = t[n]), (s = s.replace(o, Array(o.length + 1).join("A")));
                      })(/\\[0-9A-Fa-f]{6}\s?/g),
                      t(/\\[0-9A-Fa-f]{1,5}\s/g),
                      t(/\\./g),
                      (n = /:not\(([^\)]*)\)/g).test(s) && (s = s.replace(n, "     $1 ")),
                      (function () {
                        var e,
                          t,
                          n,
                          r,
                          o = /{[^]*/gm;
                        if (o.test(s)) for (t = 0, n = (e = s.match(o)).length; t < n; t += 1) (r = e[t]), (s = s.replace(r, Array(r.length + 1).join(" ")));
                      })(),
                      e(/(\[[^\]]+\])/g, "b"),
                      e(/(#[^\#\s\+>~\.\[:]+)/g, "a"),
                      e(/(\.[^\s\+>~\.\[:]+)/g, "b"),
                      e(/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi, "c"),
                      e(/(:[\w-]+\([^\)]*\))/gi, "b"),
                      e(/(:[^\s\+>~\.\[:]+)/g, "b"),
                      (s = (s = s.replace(/[\*\s\+>~]/g, " ")).replace(/[#\.]/g, " ")),
                      e(/([^\s\+>~\.\[:]+)/g, "c"),
                      f.sort(function (e, t) {
                        return e.index - t.index;
                      }),
                      { selector: c, specificity: "0," + l.a.toString() + "," + l.b.toString() + "," + l.c.toString(), specificityArray: [0, l.a, l.b, l.c], parts: f }
                    );
                  }),
                  {
                    calculate: r,
                    compare: function (e, t) {
                      var n, r, o;
                      if ("string" == typeof e) {
                        if (-1 !== e.indexOf(",")) throw "Invalid CSS selector";
                        n = a(e).specificityArray;
                      } else {
                        if (!Array.isArray(e)) throw "Invalid CSS selector or specificity array";
                        if (
                          4 !==
                          e.filter(function (e) {
                            return "number" == typeof e;
                          }).length
                        )
                          throw "Invalid specificity array";
                        n = e;
                      }
                      if ("string" == typeof t) {
                        if (-1 !== t.indexOf(",")) throw "Invalid CSS selector";
                        r = a(t).specificityArray;
                      } else {
                        if (!Array.isArray(t)) throw "Invalid CSS selector or specificity array";
                        if (
                          4 !==
                          t.filter(function (e) {
                            return "number" == typeof e;
                          }).length
                        )
                          throw "Invalid specificity array";
                        r = t;
                      }
                      for (o = 0; o < 4; o += 1) {
                        if (n[o] < r[o]) return -1;
                        if (n[o] > r[o]) return 1;
                      }
                      return 0;
                    },
                  });
              void 0 !== n && ((n.calculate = o.calculate), (n.compare = o.compare));
            },
            {},
          ],
          2: [
            function (e, t, n) {
              var r = e("specificity");
              t.exports = { boltExport: r };
            },
            { specificity: 1 },
          ],
        },
        {},
        [2]
      )(2);
    });
  var Ad = Od.exports.boltExport,
    _d = Qr("selector", "raw"),
    Pd = function (t, e) {
      var n = J(e, function (i) {
        var e = Ro(t, i.selector());
        return (
          q(e, function (e) {
            var n,
              r,
              o,
              t =
                ((n = i.raw()),
                (r = e),
                (o = {}),
                q(n, function (e) {
                  if (void 0 !== n[e]) {
                    var t = r.dom().style;
                    Y(t, e) || (o[e] = n[e]);
                  }
                }),
                o);
            Wa(e, t);
          }),
          e
        );
      });
      q(n, function (e) {
        Kt(e, "class");
      });
    },
    kd = function (e, t) {
      var n = function (e) {
          return -1 !== e.selector().indexOf(",");
        },
        r = J($(e, n), function (n) {
          var e = n.selector().split(",");
          return W(e, function (e) {
            var t = e.trim();
            return _d(t, n.raw());
          });
        }),
        o = $(e, function (e) {
          return !n(e);
        }).concat(r);
      o
        .sort(function (e, t) {
          return Ad.compare(e.selector(), t.selector());
        })
        .reverse(),
        Pd(t, o);
    },
    Md = function (e, t, r) {
      var n = Sd(e),
        o = Nd(n).map(function (e) {
          var t = e.selector(),
            n = r.hasOwnProperty(t) ? r[t] : t;
          return _d(n, e.raw());
        });
      kd(o, t);
    },
    Rd = function (e, t, n) {
      var r = Sd(e),
        o = Nd(r),
        i = $(o, function (e) {
          return Et(e.selector(), n);
        });
      kd(i, t);
    },
    Fd = {
      inlineStyles: function (e, t, n) {
        Md(e, t, n);
      },
      inlinePrefixedStyles: function (e, t, n) {
        Rd(e, t, n);
      },
    },
    jd = { p: "p, li[data-converted-paragraph]" },
    Ud = C,
    Bd = function (l, e) {
      var f = function (n) {
          Kt(n, "data-list-level"),
            Kt(n, "data-text-indent-alt"),
            Kt(n, "data-border-margin"),
            Xa(n, "margin-left"),
            Xa(n, "text-indent"),
            ne(
              (function (e) {
                var t = {},
                  n = e.dom();
                if (Ba(n))
                  for (var r = 0; r < n.style.length; r++) {
                    var o = n.style.item(r);
                    t[o] = n.style[o];
                  }
                return t;
              })(n),
              function (e, t) {
                !t.startsWith("border") || ("border-image" !== t && "none" !== e.trim() && "initial" !== e.trim()) || Xa(n, t);
              }
            );
        },
        t = Ro(l, "li[data-converted-paragraph]");
      if (
        (q(t, function (e) {
          Kt(e, "data-converted-paragraph");
        }),
        e)
      ) {
        var n = Ro(l, "li");
        q(n, function (e) {
          var t,
            n,
            r,
            o,
            i,
            a,
            u =
              ((t = l),
              (n = cn.fromTag("span")),
              sa(t, n),
              (r = n),
              {
                convertToPx: function (e) {
                  var t;
                  return Ha(r, "margin-left", e), (t = qa(r, "margin-left")), parseFloat(t.match(/-?\d+\.?\d*/)[0]);
                },
                destroy: function () {
                  return Fa(r);
                },
              }),
            c = ((i = u), (a = zt((o = l), "data-tab-interval") ? Gt(o, "data-tab-interval") : "36pt"), i.convertToPx(a)),
            s = Yd(e, c, u).getOr({});
          f(e), u.destroy(), Wa(e, s);
        });
        var r = Ro(l, "ol,ul");
        q(r, function (t) {
          var e = Ro(t, "li");
          Va(t, "margin-top").isNone() &&
            _.from(e[0]).each(function (e) {
              Ha(t, "margin-top", qa(e, "margin-top"));
            }),
            Va(t, "margin-bottom").isNone() &&
              _.from(e[e.length - 1]).each(function (e) {
                Ha(t, "margin-bottom", qa(e, "margin-bottom"));
              });
        });
      }
      Kt(l, "data-tab-interval");
    },
    Yd = function (f, d, m) {
      var p = function (e) {
        return zt(e, "data-list-level") ? parseInt(Gt(e, "data-list-level"), 10) : 1;
      };
      return Va(f, "text-indent").bind(function (l) {
        return Va(f, "margin-left").map(function (e) {
          var t = Va(f, "list-style").exists(function (e) {
              return xt(e, "none");
            }),
            n = zt(f, "data-border-margin") ? Gt(f, "data-border-margin") : "0px",
            r = t ? p(f) + 1 : p(f),
            o = m.convertToPx(e) + m.convertToPx(n),
            i = d * r,
            a = zt(f, "data-text-indent-alt") ? m.convertToPx(Gt(f, "data-text-indent-alt")) : m.convertToPx(l),
            u = {},
            c = (d / 2) * -1 - a;
          0 < c && (u["text-indent"] = c + "px");
          var s = o - i - c;
          return (u["margin-left"] = 0 < s ? s + "px" : "0px"), u;
        });
      });
    },
    Hd = function (e, t, n) {
      var r = n.mergeInline();
      (r ? Fd.inlineStyles : Ud)(e, t, jd), Bd(t, r);
    },
    Wd = function (n) {
      var e,
        r =
          ((e = cn.fromDom(y.document.body)),
          {
            play: function (i, a, u) {
              var c = cn.fromTag("div"),
                s = cn.fromTag("iframe");
              Wa(c, { display: "none" });
              var l = Ed(s, "load", function () {
                l.unbind(), Id(s, i);
                var e = s.dom().contentWindow.document;
                if (void 0 === e) throw "sandbox iframe load event did not fire correctly";
                var t = cn.fromDom(e),
                  n = e.body;
                if (void 0 === n) throw "sandbox iframe does not have a body";
                var r = cn.fromDom(n),
                  o = a(t, r);
                Fa(c), y.setTimeout(N(u, o), 0);
              });
              la(c, s), la(e, c);
            },
          });
      return function (e, t) {
        r.play(
          e,
          function (e, t) {
            return Hd(e, t, { mergeInline: v(n) }), Au(t);
          },
          t
        );
      };
    },
    qd = function (e, c, t, s) {
      var n = e.html();
      return _a.sync(function (i) {
        t.cleanDocument(n, c).get(function (e) {
          e.fold(
            function (e) {
              _a.call(i, { response: Na.error("errors.paste.process.failure"), bundle: Sa.nu({}) });
            },
            function (e) {
              var t, n, a, u, r, o;
              null == (o = e) || 0 === o.length
                ? ((r = i), _a.call(r, { response: Na.paste([], []), bundle: Sa.nu({}) }))
                : ((t = i),
                  (n = e),
                  (a = s),
                  (u = function (e) {
                    _a.call(t, { response: e, bundle: Sa.nu({}) });
                  }),
                  Wd(c)(n, function (e) {
                    var t = aa(e),
                      n = function (e) {
                        u(Na.paste(t, e));
                      },
                      r = cn.fromTag("div");
                    ma(r, t);
                    var o = Eo("img[src]", r);
                    if (0 === o.length) n([]);
                    else if (a) Sf.browserBlobs(o).get(n);
                    else {
                      q(o, Fa);
                      var i = _o(r);
                      u(Na.incomplete(i, [], "errors.local.images.disallowed"));
                    }
                  }));
            }
          );
        });
      });
    },
    $d = function (e) {
      var t = $(e, function (e) {
          return "file" === e.kind && /image/.test(e.type);
        }),
        r = W(t, function (e) {
          return e.getAsFile();
        });
      return _a.sync(function (n) {
        an.multiple(r).get(function (e) {
          var t = Sf.createImages(e);
          _a.call(n, { response: t, bundle: Sa.nu({}) });
        });
      });
    },
    Vd = At.detect(),
    Xd = function (e) {
      try {
        var t = e(),
          n = null != t && 0 < t.length ? aa(t) : [];
        return Go.value(n);
      } catch (e) {
        return y.console.error(e), Go.error("errors.paste.process.failure");
      }
    },
    Gd = function (e) {
      return e.fold(
        function (e) {
          return _a.error(e);
        },
        function (e) {
          return _a.pure({ response: Na.paste(e, []), bundle: Sa.nu({}) });
        }
      );
    },
    zd = function (e, t, n, r) {
      return Xd(function () {
        return Cl(e, Vd, t, n, r);
      });
    },
    Kd = function (e, t, n) {
      var r = zd(e, t, n, !1);
      return Gd(r);
    },
    Zd = function (e, t) {
      var n = Xd(function () {
        return Dl(e, t);
      });
      return Gd(n);
    },
    Jd = function (e, t, n, r, o) {
      return zd(e, t, r, n).fold(
        function (e) {
          return _a.error(e);
        },
        function (r) {
          return _a.sync(function (n) {
            o.get(function (e) {
              var t = Sf.findImages(r, e);
              _a.call(n, { response: Na.paste(r, t), bundle: Sa.nu({}) });
            });
          });
        }
      );
    },
    Qd = function (e, t, n) {
      var r = t.findClipboardTags(_o(n)).getOr([]);
      q(r, Fa);
      var o = Xe.nu(function (e) {
        e([]);
      });
      return Jd(e, n, !1, !0, o);
    },
    em = function (e, t, n, r, o) {
      return Jd(e, t, r, n, o);
    },
    tm = function (e) {
      var t,
        n = cn.fromTag("div");
      return (t = e), (n.dom().textContent = t), Au(n);
    },
    nm = function (e) {
      var t = e.trim().split(/\n{2,}|(?:\r\n){2,}/),
        n = W(t, function (e) {
          return e.split(/\n|\r\n/).join("<br />");
        });
      return 1 === n.length
        ? n[0]
        : W(n, function (e) {
            return "<p>" + e + "</p>";
          }).join("");
    },
    rm = function (e) {
      var a = Fl.asText(e).getOrDie("Required text input for Text Handler");
      return _a.sync(function (e) {
        var t,
          n,
          r,
          o,
          i = 0 < a.text().length ? ((t = a.text()), (n = tm(t)), (r = nm(n)), (o = aa(r)), Na.paste(o, [])) : Na.cancel();
        _a.call(e, { response: i, bundle: Sa.nu({}) });
      });
    },
    om = function (e, t, n) {
      return rm(e);
    },
    im = function (e, o) {
      var t = function (e, t) {
          var n = cn.fromTag("div");
          ma(n, e), Nl(n);
          var r = _o(n);
          return _a.pure({ response: Na.paste(r, t), bundle: o.bundle() });
        },
        n = N(_a.pass, o);
      return Na.cata(o.response(), n, t, n, t);
    },
    am = function () {
      return function (e, t) {
        return _a.error("errors.local.images.disallowed");
      };
    },
    um = function () {
      return function (e, t) {
        var n = Fl.asImages(e).getOrDie("Must have image data for images handler");
        return $d(n.images());
      };
    },
    cm = function (i) {
      return function (e, t) {
        var n = Fl.asHtml(e).getOrDie("Wrong input type for HTML handler"),
          r = i.findClipboardTags(_o(n.container()));
        r.each(function (e) {
          q(e, Fa);
        });
        var o = r.isSome();
        return _a.pure({ response: t.response(), bundle: Sa.nu({ isInternal: o }) });
      };
    },
    sm = function (a, u) {
      return function (e, t) {
        var n = Fl.asHtml(e).getOrDie("Wrong input type for HTML handler").container(),
          r = Lo(u),
          o = t.bundle();
        if (sd.isInternal(o)) return Zd(r, n);
        a(n);
        var i = sd.merging(o);
        return Kd(r, n, i);
      };
    },
    lm = function (u, c) {
      return function (e, t) {
        var a = t.bundle();
        return sd.proxyBin(a).handle("There was no proxy bin setup. Ensure you have run proxyStep first.", function (e) {
          var t = sd.merging(a),
            n = sd.isWord(a),
            r = sd.isInternal(a),
            o = sd.backgroundAssets(a),
            i = Lo(u);
          return r ? Qd(i, c, e) : em(i, e, t, n, o);
        });
      };
    },
    fm = function (o, i) {
      return function (e, t) {
        var n = Fl.asWord(e).getOrDie("Wrong input type for Word Import handler"),
          r = sd.mergeOffice(t.bundle());
        return qd(n, r, o, i);
      };
    },
    dm = function (r) {
      return function (e, t) {
        var n = Sa.merge(t.bundle(), Sa.nu(r));
        return _a.pure({ response: t.response(), bundle: n });
      };
    },
    mm = function (e, t) {
      return _a.cancel();
    },
    pm = ld.resolve("smartpaste-eph-bin"),
    gm = { binStyle: v(pm) },
    vm = function (e, t) {
      return ns(e, function (e) {
        return !!zt(e, "style") && -1 < Gt(e, "style").indexOf("mso-");
      });
    },
    hm = function (e, t) {
      var n = Au(e);
      return Fu(n, t);
    },
    ym = function (e, t) {
      var n = e.browser;
      return (n.isIE() && 11 <= n.version.major ? vm : hm)(t, e);
    },
    bm = At.detect();
  function xm(r, l, o, f, i) {
    return function (e, t) {
      var n = Fl.asEvent(e).getOrDie("Must pass through event type").nativeEvent(),
        c = i(),
        s = t.response();
      return _a.sync(function (u) {
        var e = r(o);
        e.events.after.bind(function (e) {
          var t = e.container();
          if (bm.browser.isSafari() && Vi(t, 'img[src^="webkit-fake-url"]').isSome()) {
            var n = bm.deviceType.isWebView() ? "webview.imagepaste" : "safari.imagepaste";
            _a.call(u, { response: Na.error(n), bundle: Sa.nu({}) });
          } else {
            l(t), Mi(t, gm.binStyle());
            var r = ym(bm, t),
              o = _o(t),
              i = f.findClipboardTags(o).isSome(),
              a = H(o, function (e) {
                return zt(e, "id") && Et(Gt(e, "id"), "docs-internal-guid");
              });
            _a.call(u, { response: s, bundle: Sa.nu({ isWord: r, isGoogleDocs: a, isInternal: i, proxyBin: t, backgroundAssets: c }) });
          }
        }),
          c.convert(n),
          e.run();
      });
    };
  }
  var Tm = function (e, t) {
      return e.isSupported() ? t.getWordData() : _.none();
    },
    Em = function (e) {
      return e.getNative();
    },
    wm = function (e) {
      return e.getImage();
    },
    Im = function (e) {
      return e.getHtml();
    },
    Sm = function (e) {
      return e.getText();
    },
    Lm = function (e) {
      return e.getOnlyText();
    },
    Cm = function (e) {
      return e.getGoogleDocsData();
    },
    Nm = function (e, t, n, r) {
      return { _label: e, label: v(e), getAvailable: t, steps: v(n), capture: v(r) };
    },
    Dm = {
      wordimport: function (e, t, n, r) {
        return Nm(
          "Word Import pasting",
          N(Tm, e),
          [
            Df(dm({ isWord: !0 })),
            Df(vd(t, n)),
            Df(fm(e, n.allowLocalImages)),
            Nf(
              ((o = n),
              (i = id(r, n)),
              (a = od(o)),
              (u = Ac(_.none())),
              (c = function (t) {
                u.get().each(function (e) {
                  _a.call(e, { response: t, bundle: Sa.nu({}) });
                });
              }),
              a.events.insert.bind(function (e) {
                c(Na.paste(e.elements(), e.correlated()));
              }),
              a.events.incomplete.bind(function (e) {
                c(Na.incomplete(e.elements(), e.correlated(), e.message()));
              }),
              function (t, r) {
                var e = Fl.asWord(t).getOrDie("Word input required for rtf data"),
                  n = function (o) {
                    return _a.sync(function (t) {
                      var e = function () {
                          _a.call(t, { response: r.response(), bundle: r.bundle() });
                        },
                        n = function (e, n) {
                          u.set(_.some(t));
                          var r = cn.fromTag("div");
                          ma(r, e),
                            o.fold(
                              function () {
                                var e,
                                  t = rd.find(r);
                                return 0 < t.length
                                  ? (function () {
                                      q(t, Fa);
                                      var e = _o(r);
                                      c(Na.incomplete(e, n, "errors.local.images.disallowed"));
                                    })()
                                  : ((e = _o(r)), void c(Na.paste(e, n)));
                              },
                              function (e) {
                                a.processRtf(r, n, e, C);
                              }
                            );
                        };
                      Na.cata(r.response(), e, n, e, n);
                    });
                  };
                return kl.match(e.rtf(), {
                  getFromFlash: function (e) {
                    return i(t, r);
                  },
                  disabled: function () {
                    return n(_.none());
                  },
                  fromClipboard: function (e) {
                    return n(!0 === o.allowLocalImages ? _.some(e.rtf()) : _.none());
                  },
                });
              })
            ),
            Df(Cf()),
          ],
          !0
        );
        var o, i, a, u, c;
      },
      googledocs: function (e, t, n) {
        return Nm(" pasting", Cm, [Df(dm({ officeStyles: !1, htmlStyles: !1 })), Df(sm(t, n)), Df(Ff(e)), Df(Cf())], !0);
      },
      image: function (e) {
        return Nm("Image pasting", wm, [Df(!1 === e.allowLocalImages ? am() : um()), Df(Cf())], !0);
      },
      nativeHtml: function (e, t, n, r) {
        return Nm("Outside of Textbox.io pasting HTML5 API (could be internal)", Im, [Df(cm(t.intraFlag)), Df(hd(e, t)), Df(sm(n, r)), Df(Ff(t)), Df(Cf())], !0);
      },
      text: function () {
        return Nm("Plain text pasting", Sm, [Df(om), Df(im)], !0);
      },
      onlyText: function () {
        return Nm("Only plain text is available to paste", Lm, [Df(om), Df(im)], !0);
      },
      none: function () {
        return Nm("There is no valid way to paste", _.some, [Df(mm)], !1);
      },
      fallback: function (e, t, n, r, o, i) {
        return Nm("Outside of Textbox.io pasting offscreen (could be internal)", Em, [Df(xm(r, n, o, t.intraFlag, Af)), Df(hd(e, t)), Df(lm(o, t.intraFlag)), Nf(id(i, t)), Df(Ff(t)), Df(Cf())], !1);
      },
    },
    Om = function (u) {
      var c = N(Ee, u);
      Ee("callbacks", c());
      var t = function (e, t) {
          var n,
            r,
            o,
            i = c(),
            a = ((r = void 0 === (n = i).count ? 0 : n.count), (o = "callback_" + r), (n.count = r + 1), o);
          return (
            (i.callbacks[a] = function () {
              t || s(a), e.apply(null, arguments);
            }),
            u + ".callbacks." + a
          );
        },
        s = function (e) {
          var t = e.substring(e.lastIndexOf(".") + 1),
            n = c();
          void 0 !== n.callbacks[t] && delete n.callbacks[t];
        };
      return {
        ephemeral: function (e) {
          return t(e, !1);
        },
        permanent: function (e) {
          return t(e, !0);
        },
        unregister: s,
      };
    },
    Am = function (e) {
      e.dom().focus();
    },
    _m = {
      responsive: function () {
        var a = Ac(_.none()),
          u = ao.create({ crashed: io([]), timeout: io([]) });
        return {
          start: function (e, t, n, r) {
            var o = t,
              i = y.setInterval(function () {
                n() ? y.clearInterval(i) : o <= 0 ? (u.trigger.timeout(), y.clearInterval(i)) : r() && (y.clearInterval(i), u.trigger.crashed()), o--;
              }, e);
            a.set(_.some(i));
          },
          stop: function () {
            a.get().each(function (e) {
              y.clearInterval(e);
            });
          },
          events: u.registry,
        };
      },
    };
  function Pm(n, r, o) {
    var e = !0,
      t = y.setInterval(function () {
        var t,
          e = n.dom();
        j(e.PercentLoaded) &&
          100 === e.PercentLoaded() &&
          ((t = e),
          Q(r, function (e) {
            return j(t[e]);
          })) &&
          (i(), o());
      }, 500),
      i = function () {
        e && (y.clearInterval(t), (e = !1));
      };
    return { stop: i };
  }
  var km = Om("ephox.flash"),
    Mm = At.detect(),
    Rm = _.none(),
    Fm = function (e) {
      return cn.fromHtml("<p>" + e("cement.dialog.flash.press-escape") + "</p>");
    },
    jm = function (e) {
      var t = cn.fromTag("div");
      Mi(t, ld.resolve("flashbin-helpcopy"));
      var n = At.detect().os.isOSX() ? ["\u2318"] : ["Ctrl"],
        r = cn.fromHtml("<p>" + e("cement.dialog.flash.trigger-paste") + "</p>"),
        o = cn.fromHtml('<div><span class="ephox-polish-help-kbd">' + n + '</span> + <span class="ephox-polish-help-kbd">V</span></div>');
      return Mi(o, ld.resolve("flashbin-helpcopy-kbd")), ma(t, [r, o, Fm(e)]), t;
    },
    Um = function (e) {
      var t = cn.fromTag("div");
      Mi(t, ld.resolve("flashbin-helpcopy"));
      var n = cn.fromHtml("<p>" + e("cement.dialog.flash.missing") + "</p>");
      return ma(t, [n, Fm(e)]), t;
    },
    Bm = function (e) {
      var t = cn.fromTag("div");
      Mi(t, ld.resolve("flashbin-loading"));
      var n = cn.fromTag("div");
      Mi(n, ld.resolve("flashbin-loading-spinner"));
      var r = cn.fromTag("p"),
        o = e("loading.wait");
      return _u(r, o), Vt(r, "aria-label", o), ma(t, [n, r]), t;
    },
    Ym = At.detect(),
    Hm = function () {
      try {
        return void 0 !== y.navigator.plugins["Shockwave Flash"];
      } catch (e) {
        return !1;
      }
    },
    Wm = function (e, t, n, r) {
      var o = Um(r);
      return la(e, o), { reset: C };
    },
    qm = function (e, t, n, r) {
      var o = jm(r),
        i = Bm(r);
      ma(e, [i, o, t.element()]);
      var a = function () {
        Ha(o, "display", "block"), Ha(i, "display", "none"), n();
      };
      return (
        t.events.spin.bind(function () {
          Ha(o, "display", "none"), Ha(i, "display", "block"), Xa(i, "height"), Xa(i, "padding"), n();
        }),
        t.events.reset.bind(a),
        t.events.hide.bind(function () {
          Wa(i, { height: "0", padding: "0" });
        }),
        { reset: a }
      );
    };
  function $m(c, s) {
    var l = s.translations,
      f = ao.create({ response: io(["rtf", "hide"]), cancel: io([]), error: io(["message"]), failed: io(["message"]) });
    return {
      open: function () {
        var e = (function (r) {
          var t = ao.create({ response: io(["rtf"]), spin: io([]), cancel: io([]), error: io(["message"]), reset: io([]), hide: io([]), failed: io(["message"]) }),
            e = !1,
            n = cn.fromTag("div");
          Mi(n, ld.resolve("flashbin-target"));
          var o = _m.responsive();
          o.events.crashed.bind(function () {
            t.trigger.failed("flash.crashed");
          }),
            o.events.timeout.bind(function () {
              t.trigger.failed("flash.crashed");
            });
          var i = function () {
              if ((d.stop(), !e)) {
                e = !0;
                try {
                  var r = l.dom();
                  ne(s, function (e, t) {
                    var n = r[t];
                    if (void 0 === n) throw 'Flash object does not have the method "' + t + '"';
                    n.call(r, e);
                  }),
                    t.trigger.reset(),
                    v(),
                    m();
                } catch (e) {
                  y.console.log("Flash dialog - Error during load: ", e);
                }
              }
            },
            a = km.permanent(i),
            u = function () {
              return !vo(l);
            },
            c = function () {
              return !l.dom().SetVariable;
            },
            s = {
              setSpinCallback: km.permanent(function () {
                o.start(1e3, 10, u, c), t.trigger.spin();
              }),
              setPasteCallback: km.permanent(function (e) {
                o.stop(),
                  y.setTimeout(function () {
                    "" === e ? t.trigger.error("flash.crashed") : t.trigger.response(unescape(e));
                  }, 0);
              }),
              setEscapeCallback: km.permanent(t.trigger.cancel),
              setErrorCallback: km.permanent(function (e) {
                o.stop(), t.trigger.error(e);
              }),
              setStartPasteCallback: km.permanent(C),
            },
            l = (function () {
              var e = r.replace(/^https?:\/\//, "//"),
                t = '    <param name="allowscriptaccess" value="always">    <param name="wmode" value="opaque">    <param name="FlashVars" value="onLoad=' + a + '">';
              if (Mm.browser.isIE() && 10 === Mm.browser.version.major) {
                var n = Je("flash-bin");
                return cn.fromHtml('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="' + n + '"><param name="movie" value="' + e + '">' + t + "</object>");
              }
              return cn.fromHtml('<object type="application/x-shockwave-flash" data="' + e + '">' + t + "</object>");
            })(),
            f = function () {
              Wa(l, { width: "2px", height: "2px" });
            };
          f();
          var d = Pm(l, te(s), i);
          la(n, l);
          var m = function () {
              Mm.browser.isFirefox() && y.window.getSelection().removeAllRanges(), Am(l);
            },
            p = null,
            g = function () {
              Mi(n, ld.resolve("flash-activate")), Xa(l, "height"), Xa(l, "width"), t.trigger.hide();
            },
            v = function () {
              y.clearTimeout(p), Ri(n, ld.resolve("flash-activate")), f();
            },
            h = function () {
              Ha(n, "display", "none"),
                Rm.each(function (e) {
                  q(e, function (e) {
                    e.unbind();
                  });
                });
            };
          return {
            focus: m,
            element: function () {
              return n;
            },
            activate: function () {
              (p = y.setTimeout(g, 3e3)), t.trigger.spin(), Ha(n, "display", "block"), m();
            },
            deactivate: h,
            destroy: function () {
              h(),
                q(ie(s), function (e) {
                  km.unregister(e);
                }),
                km.unregister(a),
                d.stop();
            },
            events: t.registry,
          };
        })(s.swf);
        e.deactivate();
        var t = cn.fromDom(y.window),
          n = Ed(t, "mouseup", e.focus),
          r = function () {
            u();
          },
          o = function () {
            r(), f.trigger.cancel();
          };
        e.events.cancel.bind(o),
          e.events.response.bind(function (e) {
            f.trigger.response(e.rtf(), r);
          }),
          e.events.error.bind(function (e) {
            r(), f.trigger.error(e.message());
          }),
          e.events.failed.bind(function (e) {
            r(), f.trigger.failed(e.message());
          });
        var i = c();
        i.setTitle(l("cement.dialog.flash.title"));
        var a = (function (e, t, n) {
          var r = cn.fromTag("div"),
            o = "flashbin-wrapper-" + (Ym.os.isOSX() ? "cmd" : "ctrl");
          Mi(r, ld.resolve(o));
          var i = (Hm() ? qm : Wm)(r, e, t, n.translations);
          return { element: v(r), reset: i.reset };
        })(e, i.reflow, s);
        a.reset(), i.setContent(a.element()), i.events.close.bind(o), i.show(), e.activate();
        var u = function () {
          n.unbind(), e.destroy(), i.destroy();
        };
      },
      events: f.registry,
    };
  }
  function Vm() {
    var o = {};
    return {
      getOrSetIndexed: function (e, t) {
        return void 0 !== o[e] ? o[e] : ((n = e), (r = t()), (o[n] = r));
        var n, r;
      },
      waitForLoad: function () {
        var e = ie(o);
        return ze(e);
      },
    };
  }
  var Xm,
    Gm,
    zm = Om("ephox.henchman.features"),
    Km = function (i) {
      return $e.nu(function (t) {
        var e = function () {
            r.unbind(), o.unbind();
          },
          n = cn.fromTag("script");
        Vt(n, "src", i),
          Vt(n, "type", "text/javascript"),
          Vt(n, "async", "async"),
          Vt(
            n,
            "data-main",
            zm.ephemeral(function (e) {
              t(Go.value(e));
            })
          );
        var r = Ed(n, "error", function () {
            e(), t(Go.error("Error loading external script tag " + i));
          }),
          o = Ed(n, "load", e);
        la(cn.fromDom(y.document.head), n);
      });
    },
    Zm = function (e, t) {
      var n,
        r,
        o,
        i = t || cn.fromDom(y.document),
        a = cn.fromTag("link", i.dom());
      return Xt(a, { rel: "stylesheet", type: "text/css", href: e }), (n = i), (r = a), (o = cn.fromDom(n.dom().head)), la(o, r), a;
    },
    Jm = function (o, i) {
      return $e.nu(function (t) {
        var n = function (e) {
            q(r, function (e) {
              e.unbind();
            }),
              t(
                e.fold(function (e) {
                  return Go.error(e + 'Unable to download editor stylesheets from "' + o + '"');
                }, Go.value)
              );
          },
          e = Zm(o),
          r = [
            Ed(e, "load", function (e) {
              !(function (e) {
                try {
                  var t = e.target().dom().sheet.cssRules;
                  return M(t) && 0 === t.length;
                } catch (e) {}
                return !1;
              })(e)
                ? i(n)
                : n(Go.error(""));
            }),
            Ed(e, "error", N(n, Go.error(""))),
          ];
      });
    },
    Qm =
      ((Xm = Vm()),
      {
        preload: function () {
          Gm().get(m);
        },
        addStylesheet: function (e, t) {
          return Xm.getOrSetIndexed(e, function () {
            return Jm(e, t);
          });
        },
        addScript: function (e, t) {
          return Xm.getOrSetIndexed(e, function () {
            return Km(e).map(t);
          });
        },
        waitForLoad: (Gm = function () {
          return Xm.waitForLoad();
        }),
      }),
    ep = function (e, t) {
      return Qm.addScript(e, t);
    },
    tp = At.detect(),
    np = tp.deviceType.isiOS() || tp.deviceType.isAndroid(),
    rp = v({ isSupported: v(!1), cleanDocument: v(ui("not supported")) }),
    op = np
      ? rp
      : function (e) {
          var r = ep(e + "/wordimport.js", m);
          return (
            r.get(function (e) {
              e.fold(function (e) {
                y.console.error("Unable to load word import: ", e);
              }, C);
            }),
            {
              isSupported: v(!0),
              cleanDocument: function (t, n) {
                return r.map(function (e) {
                  return e.map(function (e) {
                    return e.cleanDocument(t, n);
                  });
                });
              },
            }
          );
        };
  function ip(e, t, n, r) {
    var o = Io(e, n) && t === r;
    return { startContainer: v(e), startOffset: v(t), endContainer: v(n), endOffset: v(r), collapsed: v(o) };
  }
  var ap,
    up,
    cp = ["b", "i", "u", "sub", "sup", "strike"],
    sp = function (e) {
      q(_o(e), function (e) {
        var t;
        Wt((t = e)) && !t.dom().hasChildNodes() && Y(cp, Ut(t)) && Fa(e);
      });
    },
    lp = function (e, o) {
      var t = _o(e);
      q(t, function (e) {
        var t, n, r;
        o(e) && ((n = _o((t = e))), (r = cn.fromTag("div", Lo(t).dom())), ma(r, n), ua(t, r), Fa(t));
      });
    },
    fp = {
      consolidate: function (n, e) {
        Oo(n)
          .filter(e)
          .each(function (e) {
            var t = _o(e);
            ma(n, t), Fa(e);
          }),
          lp(n, e),
          sp(n);
      },
    },
    dp = function (e) {
      return "rtl" === qa(e, "direction") ? "rtl" : "ltr";
    },
    mp = ef.bin(),
    pp = mp + Je(""),
    gp =
      ((ap = "-100000px"),
      (up = "100000px"),
      function (e) {
        return "rtl" === dp(e) ? up : ap;
      });
  function vp(t, e, n) {
    var r = (function (t, e) {
        var n = cn.fromTag("div");
        Xt(n, e),
          Xt(n, { contenteditable: "true", "aria-hidden": "true" }),
          Wa(n, { position: "fixed", top: "0px", width: "100px", height: "100px", overflow: "hidden", opacity: "0" }),
          ji(n, [mp, pp]);
        var r = function (e) {
          return Fi(e, pp);
        };
        return {
          attach: function (e) {
            Ra(n), Ha(n, "left", gp(e)), la(e, n);
          },
          focus: function () {
            $i(n, "body").each(function (e) {
              t.toOff(e, n);
            });
          },
          contents: function () {
            return fp.consolidate(n, r), Qr("elements", "html", "container")(_o(n), Au(n), n);
          },
          container: function () {
            return n;
          },
          detach: function () {
            Fa(n);
          },
        };
      })(t, n),
      o = function () {
        t.cleanup();
        var e = r.contents();
        r.detach(), a.trigger.after(e.elements(), e.html(), r.container());
      },
      i = Jl.tap(function () {
        a.trigger.before(), r.attach(e), r.focus(), of.run(Lo(e), i, o);
      }),
      a = ao.create({ before: io([]), after: io(["elements", "html", "container"]) }),
      u = C;
    return {
      instance: v(function () {
        i.instance();
      }),
      destroy: u,
      events: a.registry,
    };
  }
  var hp = function (e) {
      return { startContainer: e.start, startOffset: e.soffset, endContainer: e.finish, endOffset: e.foffset };
    },
    yp = {
      set: function (e, t) {
        yf(e, t.startContainer(), t.startOffset(), t.endContainer(), t.endOffset());
      },
      get: function (e, t) {
        return xf(e).map(hp);
      },
    };
  function bp(a) {
    return function (t) {
      var u,
        r,
        o,
        c,
        n = ao.create({ after: io(["container"]) }),
        i =
          ((u = yp),
          (r = cn.fromTag("br")),
          (o = _.none()),
          (c = function (e) {
            return Lo(e).dom().defaultView;
          }),
          {
            cleanup: function () {
              Fa(r);
            },
            toOn: function (i, e) {
              var a = c(e);
              o.each(function (e) {
                var t = ko(i),
                  n = Io(i, e.startContainer()) && t < e.startOffset() ? t : e.startOffset,
                  r = Io(i, e.endContainer()) && t < e.endOffset() ? t : e.endOffset,
                  o = ip(e.startContainer(), n, e.endContainer(), r);
                u.set(a, o);
              });
            },
            toOff: function (e, t) {
              var n = c(t);
              la(t, r), (o = u.get(n, ip)), u.set(n, ip(r, 0, r, 0));
            },
          }),
        e = vp(i, t, a);
      return (
        e.events.after.bind(function (e) {
          i.toOn(t, e.container()), n.trigger.after(e.container());
        }),
        {
          run: function () {
            e.instance()();
          },
          events: n.registry,
        }
      );
    };
  }
  var xp = "powerpaste-styles",
    Tp = "#" + xp,
    Ep = {
      injectStyles: function (e) {
        if (!xl(Tp)) {
          var t =
              "<style>.ephox-cement-flashbin-helpcopy-kbd {font-size: 3em !important; text-align: center !important; vertical-align: middle !important; margin: .5em 0} .ephox-cement-flashbin-helpcopy-kbd .ephox-polish-help-kbd {font-size: 3em !important; vertical-align: middle !important;} .ephox-cement-flashbin-helpcopy a {text-decoration: underline} .ephox-cement-flashbin-loading-spinner {background-image: url(" +
              e +
              ") !important; width: 96px !important; height:96px !important; display: block; margin-left: auto !important; margin-right: auto !important; margin-top: 2em !important; margin-bottom: 2em !important;} .ephox-cement-flashbin-loading p {text-align: center !important; margin: 2em 0 !important} .ephox-cement-flashbin-target {height: 1px !important;} .ephox-cement-flashbin-target.ephox-cement-flash-activate {height: 150px !important; width: 100% !important;} .ephox-cement-flashbin-target object {height: 1px !important;} .ephox-cement-flashbin-target.ephox-cement-flash-activate object {height: 150px !important; width: 100% !important;} .ephox-cement-flashbin-helpcopy p {white-space: normal;}</style>",
            n = cn.fromHtml(t);
          Vt(n, "type", "text/css"), Vt(n, "id", xp);
          var r = qi("head").getOrDie("Head element could not be found.");
          la(r, n);
        }
      },
      removeStyles: function () {
        if (xl(Tp)) {
          var e = qi("head").getOrDie("Head element could not be found."),
            t = Vi(e, Tp).getOrDie("The style element could not be removed");
          Fa(t);
        }
      },
    },
    wp = "x-tinymce/html",
    Ip = "\x3c!-- " + wp + " --\x3e",
    Sp = {
      mark: function (e) {
        return Ip + e;
      },
      unmark: function (e) {
        return e.replace(Ip, "");
      },
      isMarked: function (e) {
        return -1 !== e.indexOf(Ip);
      },
      retainContentEditable: function (e) {
        return e.replace(/ contenteditable="([^"]+)"/g, ' data-mce-contenteditable="$1"');
      },
      restoreContentEditable: function (e) {
        return e.replace(/ data-mce-contenteditable="([^"]+)"/g, ' contenteditable="$1"');
      },
      internalHtmlMime: v(wp),
    },
    Lp = function () {},
    Cp = function (e, t, n) {
      if (((r = e), !1 !== tinymce.Env.iOS || void 0 === r || "function" != typeof r.setData)) return !1;
      try {
        return e.clearData(), e.setData("text/html", t), e.setData("text/plain", n), e.setData(Sp.internalHtmlMime(), t), !0;
      } catch (e) {
        return !1;
      }
      var r;
    },
    Np = function (e, t, n, r) {
      Cp(e.clipboardData, t.html, t.text) ? (e.preventDefault(), r()) : n(t.html, r);
    },
    Dp = function (a) {
      return function (e, t) {
        var n = a.dom.create("div", { contenteditable: "false", "data-mce-bogus": "all" }),
          r = a.dom.create("div", { contenteditable: "true", "data-mce-bogus": "all" }, e);
        a.dom.setStyles(n, { position: "fixed", top: "50%", left: "-3000px", width: "1000px", overflow: "hidden" }), n.appendChild(r), a.dom.add(a.getBody(), n);
        var o = a.selection.getRng();
        r.focus();
        var i = a.dom.createRng();
        i.selectNodeContents(r),
          a.selection.setRng(i),
          setTimeout(function () {
            a.selection.setRng(o), n.parentNode.removeChild(n), t();
          }, 0);
      };
    },
    Op = function (e) {
      var t = Sp.retainContentEditable(e.selection.getContent({ contextual: !0 }));
      return { html: Sp.mark(t), text: e.selection.getContent({ format: "text" }) };
    },
    Ap = {
      register: function (e) {
        var t, n;
        e.on(
          "cut",
          ((t = e),
          function (e) {
            !1 === t.selection.isCollapsed() &&
              Np(e, Op(t), Dp(t), function () {
                setTimeout(function () {
                  t.execCommand("Delete");
                }, 0);
              });
          })
        ),
          e.on(
            "copy",
            ((n = e),
            function (e) {
              !1 === n.selection.isCollapsed() && Np(e, Op(n), Dp(n), Lp);
            })
          );
      },
    },
    _p = {
      nodeToString: function (e) {
        var t = document.createElement("div");
        t.appendChild(e.cloneNode(!0));
        var n = t.innerHTML;
        return (t = e = null), n;
      },
      restoreStyleAttrs: function (e) {
        q(W(e.getElementsByTagName("*"), cn.fromDom), function (e) {
          zt(e, "data-mce-style") && !zt(e, "style") && Vt(e, "style", Gt(e, "data-mce-style"));
        });
      },
    },
    Pp = {
      showDialog: function (e, t) {
        var n = {
          title: "Error",
          body: { type: "panel", items: [{ type: "htmlpanel", name: "errorpanel", html: t }] },
          initialData: {},
          buttons: [{ text: "OK", type: "cancel", name: "ok", primary: !0 }],
        };
        e.windowManager.open(n);
      },
    },
    kp = {
      init: function () {
        var r = Ac([{ text: "Close", name: "close", type: "custom", primary: !0 }]),
          o = Ac({});
        return {
          setButtons: function (e) {
            var n = {},
              t = W(e, function (e) {
                var t = e.text;
                return (n[t.toLowerCase()] = e.click), { text: t, name: t.toLowerCase(), type: "custom" };
              });
            o.set(n), r.set(t);
          },
          getButtons: r.get,
          getAction: function (e) {
            var t = o.get();
            return t.hasOwnProperty(e) ? _.some(t[e]) : _.none();
          },
        };
      },
    },
    Mp = Qr("url", "html"),
    Rp = function (e) {
      return /^https?:\/\/[\w\?\-\/+=.&%@~#]+$/i.test(e);
    },
    Fp = Rp,
    jp = function (e) {
      return Rp(e) && /.(gif|jpe?g|png)$/.test(e);
    },
    Up = function (n) {
      var e = /^<a href="([^"]+)">([^<]+)<\/a>$/.exec(n);
      return _.from(e).bind(function (e) {
        var t = Mp(e[1], n);
        return e[1] === e[2] ? _.some(t) : _.none();
      });
    },
    Bp = function (e, t, n) {
      return "extra" in e.undoManager
        ? (e.undoManager.extra(function () {
            Yp(e, t);
          }, n),
          _.some(!0))
        : _.none();
    },
    Yp = function (e, t) {
      return e.insertContent(t, { merge: !1 !== e.settings.paste_merge_formats, paste: !0 }), _.some(!0);
    },
    Hp = {
      until: function (t, n, e) {
        return Pa(e, function (e) {
          return e(t, n);
        });
      },
      linkSelection: function (r, e) {
        return Up(e).bind(function (e) {
          var t, n;
          return !1 === r.selection.isCollapsed() && Fp(e.url())
            ? Bp((t = r), (n = e).html(), function () {
                t.execCommand("mceInsertLink", !1, n.url());
              })
            : _.none();
        });
      },
      insertImage: function (r, e) {
        return Up(e).bind(function (e) {
          return jp(e.url())
            ? Bp((t = r), (n = e).html(), function () {
                t.insertContent('<img src="' + n.url() + '">');
              })
            : _.none();
          var t, n;
        });
      },
      insertContent: Yp,
    },
    Wp = function (e, t) {
      return e.hasEventListeners(t);
    },
    qp = function (e) {
      return e.plugins.powerpaste;
    },
    $p = {
      process: function (e, t, n) {
        var r,
          o,
          i,
          a,
          u,
          c,
          s,
          l,
          f,
          d,
          m,
          p,
          g,
          v = Sp.unmark(t);
        return (
          (d = v),
          (m = n),
          (o = Wp((f = r = e), "PastePreProcess") ? ((p = d), (g = m), f.fire("PastePreProcess", { internal: g, content: p }).content) : d),
          (i = n),
          Wp(r, "PastePostProcess")
            ? ((u = o), (c = i), (s = (a = r).dom.add(a.getBody(), "div", { style: "display:none" }, u)), (l = a.fire("PastePostProcess", { internal: c, node: s }).node.innerHTML), a.dom.remove(s), l)
            : o
        );
      },
      registerEvents: function (t) {
        var n = t.settings;
        n.paste_preprocess &&
          t.on("PastePreProcess", function (e) {
            n.paste_preprocess.call(t, qp(t), e);
          }),
          n.paste_postprocess &&
            t.on("PastePostProcess", function (e) {
              n.paste_postprocess.call(t, qp(t), e);
            });
      },
    };
  function Vp(v, h, e, t, y, b) {
    var x,
      T,
      E,
      w,
      I = Ac(_.none()),
      n = function (e, t) {
        return e.replace(/\/$/, "") + "/" + t.replace(/^\//, "");
      };
    (w = n(t ? t.jsUrl : e, "/js")), (T = n(t ? t.swfUrl : e, "/flash/textboxpaste.swf")), (E = n(t ? t.imgUrl : e, "/img/spinner_96.gif"));
    var S = function (e, t, n) {
        var r,
          o = !1 !== e.settings.smart_paste ? [Hp.linkSelection, Hp.insertImage] : [];
        Hp.until(
          e,
          t,
          o.concat([
            ((r = n),
            function (e, t) {
              return (
                e.undoManager.transact(function () {
                  Hp.insertContent(e, t), _p.restoreStyleAttrs(e.getBody()), y.prepareImages(r);
                }),
                _.some(!0)
              );
            }),
          ])
        );
      },
      L = function () {
        x && v.selection.moveToBookmark(x), (x = null);
      };
    v.on("init", function (e) {
      Ep.injectStyles(E);
      var s,
        a,
        t,
        n,
        r,
        o,
        i,
        u,
        c,
        l = {
          baseUrl: w,
          swf: T,
          officeStyles: v.settings.powerpaste_word_import || Gr.officeStyles,
          htmlStyles: v.settings.powerpaste_html_import || Gr.htmlStyles,
          translations: ln.translate,
          allowLocalImages: !1 !== v.settings.powerpaste_allow_local_images,
          enableFlashImport: !1 !== v.settings.powerpaste_enable_flash_import,
          pasteBinAttrs: { "data-mce-bogus": "all" },
          intraFlag: {
            clipboardType: Sp.internalHtmlMime,
            findClipboardTags: function (e) {
              var t = $(e, function (e) {
                return Ht(e) && xt(Ts(e), Sp.internalHtmlMime());
              });
              return t.length ? _.some(t) : _.none();
            },
          },
          preprocessor: function (e) {
            return Xe.pure(e);
          },
        },
        f = b
          ? ((a = v),
            {
              createDialog: function () {
                var n = "",
                  r = null,
                  o = kp.init(),
                  t = ao.create({ close: io([]) }),
                  i = function (e) {
                    t.trigger.close();
                  };
                return {
                  events: t.registry,
                  setTitle: function (e) {
                    return (n = e);
                  },
                  setContent: function (e) {
                    return (r = e);
                  },
                  setButtons: function (e) {
                    o.setButtons(e);
                  },
                  show: function () {
                    var e = _p.nodeToString(r.dom()),
                      t = {
                        title: n,
                        body: { type: "panel", items: [{ type: "htmlpanel", name: "contentPanel", html: e }] },
                        initialData: {},
                        buttons: o.getButtons(),
                        onCancel: i,
                        onAction: function (t, e) {
                          o.getAction(e.name).each(function (e) {
                            return e(t);
                          }),
                            t.close();
                        },
                      };
                    a.windowManager.open(t);
                  },
                  destroy: C,
                  reflow: function () {},
                };
              },
            })
          : ((s = v),
            {
              createDialog: function () {
                var r,
                  o = "",
                  i = "",
                  a = [],
                  u = null,
                  t = ao.create({ close: io([]) }),
                  c = function (e) {
                    t.trigger.close();
                  },
                  e = function () {
                    r.off("close", c), r.close("close");
                  };
                return {
                  events: t.registry,
                  setTitle: function (e) {
                    o = e;
                  },
                  setContent: function (e) {
                    var t = _p.nodeToString(e.dom());
                    (i = [{ type: "container", html: t }]), (u = e);
                  },
                  setButtons: function (e) {
                    var r = [];
                    e.forEach(function (e, t, n) {
                      r.push({ text: e.text, ariaLabel: e.text, onclick: e.click });
                    }),
                      (a = r);
                  },
                  show: function () {
                    0 === a.length &&
                      (a = [
                        {
                          text: "Close",
                          onclick: function () {
                            r.close();
                          },
                        },
                      ]);
                    var e = { title: o, spacing: 10, padding: 10, minWidth: 300, minHeight: 100, layout: "flex", items: i, buttons: a };
                    r = s.windowManager.open(e);
                    var t = cn.fromDom(r.getEl()),
                      n = Vi(t, "." + Gt(u, "class")).getOrDie("We must find this element or we cannot continue");
                    ua(n, u), Fa(n), r.on("close", c);
                  },
                  hide: function () {
                    e();
                  },
                  destroy: function () {
                    e();
                  },
                  reflow: function () {},
                };
              },
            }),
        d = cn.fromDom(v.getBody()),
        m =
          ((t = d),
          (n = f.createDialog),
          (r = C),
          (i = op((o = l).baseUrl)),
          (u = N($m, n)),
          (c = bp(void 0 !== o.pasteBinAttrs ? o.pasteBinAttrs : {})),
          Ef([Dm.onlyText(), Dm.wordimport(i, n, o, u), Dm.googledocs(o, r, t), Dm.nativeHtml(n, o, r, t), Dm.image(o)], Dm.fallback(n, o, r, c, t, u))),
        p = Ef([Dm.text()], Dm.none());
      q([m, p], function (e) {
        e.events.cancel.bind(function () {
          L();
        }),
          e.events.error.bind(function (e) {
            L(), v.notificationManager ? v.notificationManager.open({ text: ln.translate(e.message()), type: "error" }) : (b ? Pp : ha).showDialog(v, ln.translate(e.message()));
          }),
          e.events.insert.bind(function (e) {
            var t = W(e.elements(), function (e) {
                return _p.nodeToString(e.dom());
              }).join(""),
              n = Sp.restoreContentEditable(t);
            v.focus(),
              y.importImages(e.assets()).get(function () {
                L(), S(v, $p.process(v, n, e.isInternal()), e.assets()), y.uploadImages(e.assets());
              });
          });
      }),
        v.addCommand("mceInsertClipboardContent", function (e, t) {
          void 0 !== t.content ? m.pasteCustom(zl.fromHtml(t.content)) : void 0 !== t.text && p.pasteCustom(zl.fromText(t.text));
        });
      var g = Ed(d, "paste", function (e) {
        x || (x = v.selection.getBookmark(1)), (h.isText() ? p : m).paste(e.raw()), h.reset();
      });
      I.set(_.some(g)), Ap.register(v);
    }),
      v.on("remove", function (e) {
        1 === tinymce.editors.length && Ep.removeStyles(),
          I.get().each(function (e) {
            return e.unbind();
          });
      });
  }
  var Xp = function (e) {
    return tinymce.util.VK.metaKeyPressed(e) && 86 === e.keyCode && e.shiftKey;
  };
  function Gp(u) {
    return c(tinymce, "4.0.28")
      ? (t.error('The "powerpaste" plugin requires at least 4.0.28 version of TinyMCE.'), function () {})
      : function (n, e) {
          var t,
            r = !c(tinymce, "5.0.0"),
            o = (function (t, n) {
              var r = Ac(f(t)),
                o = Ac(!1);
              t.on("keydown", function (e) {
                Xp(e) && (o.set(!0), tinymce.Env.ie && tinymce.Env.ie < 10 && (e.preventDefault(), t.fire("paste", {})));
              });
              var i = function () {
                var e = !r.get();
                r.set(e), t.fire("PastePlainTextToggle", { state: e }), t.focus();
              };
              return {
                buttonToggle: function (e) {
                  var t = !r.get();
                  n ? e.setActive(t) : this.active(t), i();
                },
                toggle: i,
                reset: function () {
                  o.set(!1);
                },
                isText: function () {
                  return o.get() || r.get();
                },
              };
            })(n, r),
            i = function (t) {
              t.setActive(o.isText());
              var e = function (e) {
                t.setActive(e.state);
              };
              return (
                n.on("PastePlainTextToggle", e),
                function () {
                  return n.off("PastePlainTextToggle", e);
                }
              );
            },
            a = function () {
              var t = this;
              t.active(o.isText()),
                n.on("PastePlainTextToggle", function (e) {
                  t.active(e.state);
                });
            };
          tinymce.Env.ie && tinymce.Env.ie < 10
            ? (function (t, e, n) {
                var r,
                  o,
                  i = this,
                  a = Zr(t, ln.translate, !1),
                  u = function (t) {
                    return function (e) {
                      t(e);
                    };
                  };
                (r = Ea.getOnPasteFunction(t, a.showDialog, e)),
                  t.on("paste", u(r)),
                  (o = Ea.getOnKeyDownFunction(t, a.showDialog, e)),
                  t.on("keydown", u(o)),
                  t.addCommand("mceInsertClipboardContent", function (e, t) {
                    a.showDialog(t.content || t);
                  }),
                  t.settings.paste_preprocess &&
                    t.on("PastePreProcess", function (e) {
                      t.settings.paste_preprocess.call(i, i, e);
                    });
              })(n, o)
            : ((t = xa(n)), Vp(n, o, e, u, t, r), l(n) ? d(n) : Jr(n, 0, 0, t, r)),
            $p.registerEvents(n),
            r
              ? (n.ui.registry.addToggleButton("pastetext", { icon: "paste-text", tooltip: "Paste as text", onAction: o.buttonToggle, onSetup: i }),
                n.ui.registry.addToggleMenuItem("pastetext", { icon: "paste-text", text: "Paste as text", selectable: !0, onAction: o.buttonToggle, onSetup: i }))
              : (n.addButton("pastetext", { icon: "pastetext", tooltip: "Paste as text", onclick: o.buttonToggle, onPostRender: a }),
                n.addMenuItem("pastetext", { text: "Paste as text", selectable: !0, onclick: o.buttonToggle, onPostRender: a })),
            s.register(n, o);
        };
  }
  return function (e) {
    tinymce.PluginManager.requireLangPack("powerpaste", "ar,ca,cs,da,de,el,es,fa,fi,fr_FR,he_IL,hr,hu_HU,it,ja,kk,ko_KR,nb_NO,nl,pl,pt_BR,pt_PT,ro,ru,sk,sl_SI,sv_SE,th_TH,tr,uk,zh_CN,zh_TW"),
      tinymce.PluginManager.add("powerpaste", Gp(e));
  };
})(window)();

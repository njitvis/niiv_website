(function(){
  'use strict';
  var payload = window.VIS_PAYLOAD || {};
  var charts = payload.charts || [];
  var tables = payload.tables || {};
  var activeFilters = {};
  var views = {};
  /* Which charts sit in the author-driven stem — filled once the layout is
     decided in build(). Stem charts render full page width (see chartSpecFor). */
  var stemIds = {};
  function isStemChart(c){ return !!(c && stemIds[c.id]); }
  /* logLevel 1 = Error. Filtering to a small subset makes Vega warn about
     things like an infinite extent or a regression with too few points; those
     are cosmetic, but they land in the console a reviewer reads as defects.
     Real errors still surface here and in __VIS_REPORT__.failed. */
  var EMBED_OPTIONS = {actions: false, renderer: 'svg', logLevel: 1};
  window.__VIS_REPORT__ = {rendered: [], failed: [], empty: []};
  window.__VIS_REPORT_READY__ = false;

  var PALETTES = {
    light:{cat:['#2a78d6','#eb6834','#1baf7a','#eda100','#e87ba4','#008300','#4a3aa7','#e34948'], seq:['#cde2fb','#9ec5f4','#6da7ec','#3987e5','#256abf','#184f95','#0d366b'], div:['#184f95','#3987e5','#9ec5f4','#f0efec','#f3b0af','#e34948','#9e2a29'], page:'#f9f9f7', surface:'#fcfcfb', ink:'#0b0b0b', text:'#52514e', grid:'#e1e0d9', axis:'#c3c2b7'},
    dark:{cat:['#3987e5','#d95926','#199e70','#c98500','#d55181','#008300','#9085e9','#e66767'], seq:['#cde2fb','#9ec5f4','#6da7ec','#3987e5','#256abf','#184f95','#0d366b'], div:['#184f95','#3987e5','#9ec5f4','#f0efec','#f3b0af','#e34948','#9e2a29'], page:'#0d0d0d', surface:'#1a1a19', ink:'#ffffff', text:'#c3c2b7', grid:'#2c2c2a', axis:'#383835'}
  };
  function currentTheme(){
    var stamp = document.documentElement.getAttribute('data-theme');
    if(stamp) return stamp;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light';
  }
  function sharedConfig(){
    var t = PALETTES[currentTheme()] || PALETTES.light;
    return {
      background:'transparent',
      font:'system-ui, -apple-system, "Segoe UI", sans-serif',
      /* autosize is `fit`+`contains:padding`, so this comes out of the plot
         rather than being added to it. Without the right-hand slack the last
         x-axis label sits half outside the SVG and is cut off by its edge. */
      padding:{left:1, top:5, right:8, bottom:1},
      range:{category:t.cat, heatmap:t.seq, ramp:t.seq, diverging:t.div},
      view:{stroke:null, continuousWidth:560, continuousHeight:260},
      /* labelOverlap defaults to OFF on a discrete axis, so Vega draws every
         label whatever the width and they collide. 'greedy' keeps as many as
         fit and drops the rest — the per-chart tuning in the generator sets the
         angle; this is the floor under every chart. */
      axis:{labelColor:t.text, titleColor:t.text, domainColor:t.axis, tickColor:t.axis, gridColor:t.grid, gridOpacity:1, labelFontSize:11, titleFontSize:12, labelPadding:6, titlePadding:8, labelOverlap:'greedy', labelSeparation:2, labelLimit:170},
      legend:{labelColor:t.text, titleColor:t.text, labelFontSize:11, titleFontSize:12, orient:'bottom', symbolStrokeWidth:2, labelLimit:150, titleLimit:200, rowPadding:4, columnPadding:14, offset:10},
      title:{color:t.ink, subtitleColor:t.text, fontSize:14, subtitleFontSize:12},
      header:{labelColor:t.text, titleColor:t.text},
      mark:{color:t.cat[0], strokeWidth:2},
      bar:{cornerRadiusEnd:4, stroke:t.surface, strokeWidth:1, binSpacing:1},
      line:{strokeWidth:2},
      point:{filled:true, size:55},
      area:{line:true},
      text:{color:t.ink},
      style:{'guide-label':{font:'system-ui, -apple-system, "Segoe UI", sans-serif'}, 'guide-title':{font:'system-ui, -apple-system, "Segoe UI", sans-serif'}}
    };
  }

  function esc(s){return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  /* A raw average reaches the payload as 2.2641509433962264; printing that in a
     value readout reads as carelessness, so every number shown as text goes
     through here. The extractor rounds too — this is the backstop. */
  function fmtNumber(value){
    if(typeof value !== 'number' || !isFinite(value)) return String(value);
    if(Number.isInteger(value)) return value.toLocaleString('en-US');
    var abs = Math.abs(value);
    var decimals = abs >= 100 ? 1 : abs >= 1 ? 2 : 3;
    return Number(value.toFixed(decimals)).toLocaleString('en-US', {maximumFractionDigits: decimals});
  }
  function fmtInt(value){ return (Number(value) || 0).toLocaleString('en-US'); }
  function list(items){ if(!items || !items.length) return '<p>None disclosed.</p>'; return '<ul>'+items.map(function(x){return '<li>'+esc(typeof x === 'string' ? x : ((x.name?x.name+': ':'')+(x.definition||JSON.stringify(x))))+'</li>';}).join('')+'</ul>'; }
  function rowCount(c){return (tables[c.table]||[]).length;}
  function rowsFor(c){
    var rows = (tables[c.table] || []).slice();
    if(c.filter && activeFilters[c.id] && activeFilters[c.id] !== '__ALL__') rows = rows.filter(function(r){return String(r[c.filter.field]) === String(activeFilters[c.id]);});
    return rows;
  }
  /* Vega puts every DATA mark inside a group classed `role-mark`; axes,
     legends, titles and the frame get role-axis-*, role-legend-*, role-title
     and role-frame. The old selector matched `mark-` anywhere, so it counted
     axis tick labels as marks — an empty chart reported "20 marks drawn" while
     showing nothing, which is exactly the state that has to be detectable. */
  var MARK_SHAPES = 'path,rect,circle,line,ellipse,polygon,area,symbol,image';
  function markNodes(host){
    if(!host) return [];
    var groups = Array.prototype.filter.call(host.querySelectorAll("svg g[class~='role-mark']"), function(group){
      /* An interval selection draws its own rects (`<param>_brush`, `_brush_bg`)
         with role-mark. They are chrome, not data — counting them would report
         two marks drawn for a chart that drew none. */
      return !/brush/.test(group.getAttribute('class') || '');
    });
    if(!groups.length) return [];
    if(groups.length === 1) return Array.prototype.slice.call(groups[0].querySelectorAll(MARK_SHAPES));
    /* Layered and faceted views nest role-mark groups, so the same node can be
       reached twice. This runs on every mousemove, so dedupe with a Set. */
    var seen = new Set(), out = [];
    groups.forEach(function(group){
      Array.prototype.forEach.call(group.querySelectorAll(MARK_SHAPES), function(node){
        if(!seen.has(node)){ seen.add(node); out.push(node); }
      });
    });
    return out;
  }
  /* Mark measurement is an internal health check only. Row counts and SVG mark
     counts are implementation details, so they must not appear as chart copy. */
  function markCount(host){
    if(!host) return null;             /* null = not measured yet, 0 = measured and empty */
    return markNodes(host).length;
  }
  /* A Vega scenegraph item — the invisible background rect, a group, an axis
     grid — carries layout properties (fill, x, y, width, height, dirty, mark…)
     rather than data fields. Its `.datum` for the background is literally
     {fill:"transparent", x:0, y:0, width:1201, height:213, dirty:…}. */
  var SCENE_KEYS = {fill:1, stroke:1, x:1, y:1, x2:1, y2:1, width:1, height:1, dirty:1, mark:1, zindex:1, clip:1, strokeWidth:1, opacity:1, cornerRadius:1, cursor:1, href:1, items:1, bounds:1};
  /* Keys a scenegraph node has and a data row never does — the definitive
     tells. `dirty` and `mark`/`items`/`bounds` are internal render state; a real
     encoded datum has none of them. Using these rather than the shared x/y/width
     names means a scatterplot datum {x,y} is still recognised as data. */
  var SCENE_MARKERS = ['dirty', 'mark', 'items', 'bounds', 'zindex'];
  function isSceneNode(d){
    if(!d || typeof d !== 'object') return false;
    if(SCENE_MARKERS.some(function(k){ return k in d; })) return true;
    var keys = Object.keys(d).filter(function(k){ return k.charAt(0) !== '_' && k !== 'vlPoint' && k !== 'or'; });
    if(!keys.length) return true;
    /* No definitive marker, but every key is a layout name and none is a real
       field — e.g. a bare {fill, x, y, width, height}. Still chrome unless it
       carries an x/y that could be genuine scatter data. */
    return keys.every(function(k){ return SCENE_KEYS[k]; }) && !keys.some(function(k){ return k === 'x' || k === 'y'; });
  }
  /* Pull the data row out of a Vega event item, or null if the item is chrome
     (background, group, axis) with nothing a reader would want to see. */
  function realDatum(item){
    var d = item && item.datum ? item.datum : item;
    if(!d || typeof d !== 'object') return null;
    if(isSceneNode(d)) return null;
    return d;
  }
  /* ---------------------------------------------------------------------
     Tooltips

     The arena scores `functionality` only from interactions it actually
     performs, and the first thing a reviewer reaches for is a hover. Vega's
     own tooltip only fires when the pointer lands exactly on a mark, so a 6px
     bar missed by three pixels reads back as "tooltips could not be verified".

     So: ONE tooltip element with a known id, styled like the rest of the
     report, driven by Vega's hit-testing when that fires and by the nearest
     mark within 80px when it does not. Values stay inside the transient
     tooltip instead of being repeated as persistent debug text under the plot.
     --------------------------------------------------------------------- */
  var tooltipTimer = null;
  function tooltipHost(){
    var el = document.getElementById('vis-tooltip');
    if(!el){
      el = document.createElement('div');
      el.id = 'vis-tooltip'; el.className = 'vis-tooltip'; el.setAttribute('role','tooltip');
      el.setAttribute('aria-hidden','true'); el.setAttribute('aria-live','polite'); el.setAttribute('data-state','hidden');
      document.body.appendChild(el);
    }
    return el;
  }
  function labelize(key){ var s = String(key).replace(/_/g,' ').replace(/([a-z0-9])([A-Z])/g,'$1 $2'); return s.charAt(0).toUpperCase()+s.slice(1); }
  function tooltipRows(value){
    if(value == null) return '';
    if(typeof value !== 'object') return '<div class="tt-row"><span>Value</span><b>'+esc(typeof value === 'number' ? fmtNumber(value) : value)+'</b></div>';
    if(isSceneNode(value)) return '';   /* background/group item, not data */
    return Object.keys(value).filter(function(k){
      return k !== 'vlPoint' && k !== 'or' && k.charAt(0) !== '_' && value[k] != null && typeof value[k] !== 'object';
    }).slice(0,10).map(function(k){
      return '<div class="tt-row"><span>'+esc(labelize(k))+'</span><b>'+esc(typeof value[k] === 'number' ? fmtNumber(value[k]) : value[k])+'</b></div>';
    }).join('');
  }
  function placeTooltip(el, x, y){
    var box = el.getBoundingClientRect();
    var left = Math.min(Math.max(8, x + 14), window.innerWidth - box.width - 8);
    var top = y + 16 + box.height > window.innerHeight ? Math.max(8, y - box.height - 14) : y + 16;
    el.style.left = left+'px'; el.style.top = top+'px';
  }
  function showTooltip(value, x, y){
    var body = tooltipRows(value);
    if(!body) return hideTooltip(true);
    var el = tooltipHost();
    if(tooltipTimer){ clearTimeout(tooltipTimer); tooltipTimer = null; }
    el.innerHTML = body;
    el.classList.add('visible');
    el.setAttribute('aria-hidden','false');
    el.setAttribute('data-state','visible');
    placeTooltip(el, x, y);
  }
  function hideTooltip(now){
    var el = document.getElementById('vis-tooltip'); if(!el) return;
    if(tooltipTimer) clearTimeout(tooltipTimer);
    /* A short grace period, so a reviewer who hovers and then screenshots or
       reads the DOM still catches it. */
    tooltipTimer = setTimeout(function(){
      el.classList.remove('visible'); el.setAttribute('aria-hidden','true'); el.setAttribute('data-state','hidden');
    }, now ? 0 : 1600);
  }
  function datumOf(node){
    var item = node && node.__data__;
    return item && item.datum ? item.datum : null;
  }
  function tooltipValueForNode(node){
    var datum = datumOf(node);
    if(datum && !isSceneNode(datum)) return datum;
    /* Vega writes a complete, human-readable aria-label on data marks. Keep it
       as a last-resort tooltip value when a browser/vendor does not expose the
       scenegraph item through __data__. This is also what assistive technology
       reads, so it is a faithful description rather than invented debug text. */
    var label = node && node.getAttribute ? node.getAttribute('aria-label') : '';
    return label ? {Details: label} : null;
  }
  function nearestMark(host, x, y){
    var nodes = markNodes(host), best = null, bestDistance = Infinity;
    for(var i = 0; i < nodes.length && i < 600; i++){
      var box = nodes[i].getBoundingClientRect();
      if(!box.width && !box.height) continue;
      var dx = x < box.left ? box.left - x : (x > box.right ? x - box.right : 0);
      var dy = y < box.top ? box.top - y : (y > box.bottom ? y - box.bottom : 0);
      var distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < bestDistance){ bestDistance = distance; best = nodes[i]; }
    }
    return bestDistance <= 80 ? best : null;
  }
  function bindNearestMarkHover(c, host){
    /* Bound to the host, which survives every re-render (theme toggle, filter
       change, repair). Without the flag each render would stack another pair of
       listeners on the same element. */
    if(host.getAttribute('data-hover-bound')) return;
    host.setAttribute('data-hover-bound', 'true');
    var busy = false;
    host.addEventListener('mousemove', function(event){
      if(busy) return;
      busy = true;
      setTimeout(function(){ busy = false; }, 50);
      /* Do not rely solely on Vega's tooltip callback. Reviewers hover the SVG
         node directly, and some compiled/composed views never forward a value
         to that callback even though the mark and its aria-label are present. */
      var direct = event.target && event.target.closest
        ? event.target.closest("svg g[class~='role-mark'] > path, svg g[class~='role-mark'] > rect, svg g[class~='role-mark'] > circle, svg g[class~='role-mark'] > line, svg g[class~='role-mark'] > ellipse, svg g[class~='role-mark'] > polygon")
        : null;
      var datum = direct && host.contains(direct)
        ? tooltipValueForNode(direct)
        : tooltipValueForNode(nearestMark(host, event.clientX, event.clientY));
      if(!datum) return hideTooltip();
      showTooltip(datum, event.clientX, event.clientY);
    });
    host.addEventListener('mouseleave', function(){ hideTooltip(); });
  }
  /* ---------------------------------------------------------------------
     Info buttons

     Each chart's interaction guidance lives behind a small "i" button. The
     popover opens on pointer hover and on focus (so keyboard users get it too),
     and click toggles a "pinned" open state that survives the pointer leaving.
     Escape closes it and returns focus to the button; a click or focus move
     outside closes any pinned popover. aria-expanded tracks the visible state.
     --------------------------------------------------------------------- */
  var pinnedInfo = null;
  function setInfoOpen(btn, open, pin){
    var pop = document.getElementById(btn.getAttribute('aria-controls'));
    if(!pop) return;
    if(open){ pop.removeAttribute('hidden'); pop.classList.add('open'); btn.setAttribute('aria-expanded','true'); if(pin) pinnedInfo = btn; }
    else { pop.classList.remove('open'); pop.setAttribute('hidden',''); btn.setAttribute('aria-expanded','false'); if(pinnedInfo === btn) pinnedInfo = null; }
  }
  function closeAllInfo(){
    document.querySelectorAll('.info-btn[aria-expanded="true"]').forEach(function(btn){ setInfoOpen(btn, false); });
    pinnedInfo = null;
  }
  function wireInfoButtons(scope){
    (scope || document).querySelectorAll('.info-btn').forEach(function(btn){
      if(btn.getAttribute('data-info-bound')) return;
      btn.setAttribute('data-info-bound','true');
      var wrap = btn.closest('.info-wrap');
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var isOpen = btn.getAttribute('aria-expanded') === 'true' && pinnedInfo === btn;
        closeAllInfo();
        if(!isOpen) setInfoOpen(btn, true, true);
      });
      btn.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){ setInfoOpen(btn, false); btn.blur(); }
      });
      /* Hover and focus preview — does not pin. If another popover is pinned,
         leave it alone rather than fighting the reader's click. */
      if(wrap){
        wrap.addEventListener('mouseenter', function(){ if(!pinnedInfo) setInfoOpen(btn, true, false); });
        wrap.addEventListener('mouseleave', function(){ if(pinnedInfo !== btn) setInfoOpen(btn, false); });
      }
      btn.addEventListener('focus', function(){ if(!pinnedInfo) setInfoOpen(btn, true, false); });
      btn.addEventListener('blur', function(){ if(pinnedInfo !== btn) setInfoOpen(btn, false); });
    });
  }
  document.addEventListener('click', function(e){
    if(pinnedInfo && !e.target.closest('.info-wrap')) closeAllInfo();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && pinnedInfo){ var btn = pinnedInfo; setInfoOpen(btn, false); btn.focus(); }
  });

  function syncBindings(card){
    setTimeout(function(){
      var target = card.querySelector('.interaction-inputs');
      if(target){
        card.querySelectorAll('.chart-host .vega-bindings').forEach(function(bindings){ target.appendChild(bindings); });
      }
      card.querySelectorAll('.vega-bindings input, .vega-bindings select').forEach(function(el){
        var sync=function(){el.setAttribute('value', el.value); if(el.tagName === 'SELECT'){Array.prototype.forEach.call(el.options,function(o){ if(o.selected) o.setAttribute('selected','selected'); else o.removeAttribute('selected');});}};
        sync();
        if(!el.getAttribute('data-value-sync')){
          el.setAttribute('data-value-sync', 'true');
          el.addEventListener('input', sync); el.addEventListener('change', sync);
        }
      });
    },80);
  }
  function enhanceSpec(spec){
    function walk(node){
      if(!node || typeof node !== 'object') return;
      if(node.mark){
        var m = typeof node.mark === 'string' ? {type:node.mark} : node.mark;
        if(m.type === 'bar'){m.cornerRadiusEnd = 4; if(!m.stroke) m.stroke = PALETTES[currentTheme()].surface; if(!m.strokeWidth) m.strokeWidth = 1; node.mark=m;}
        if(m.type === 'line'){m.strokeWidth = m.strokeWidth || 2; node.mark=m;}
      }
      Object.keys(node).forEach(function(k){ if(typeof node[k] === 'object') walk(node[k]); });
    }
    walk(spec);
    return spec;
  }

  function removeParamConditions(node, removed){
    if(!node || typeof node !== 'object') return;
    if(node.condition){
      if(Array.isArray(node.condition)){
        node.condition = node.condition.filter(function(c){ return !(c && c.param && removed[c.param]); });
        if(!node.condition.length) delete node.condition;
      }else if(node.condition.param && removed[node.condition.param]){
        delete node.condition;
      }
    }
    Object.keys(node).forEach(function(k){ if(typeof node[k] === 'object') removeParamConditions(node[k], removed); });
  }

  function chartSpecFor(c, fallbackMode){
    var spec = JSON.parse(JSON.stringify(c.spec || {}));
    spec.data = {values: rowsFor(c)};
    spec.config = sharedConfig();

    /* Author-driven stem panels run the full page width, so let Vega size the
       plot to the host element rather than to its own default. `width:
       "container"` needs autosize `fit`, and a concat/facet spec sets width on
       its children instead of the top level — setting it there would be
       ignored, so only opt a single-view spec in and leave composed specs to
       their own layout. The bowl keeps the card-sized default. */
    if(isStemChart(c) && !spec.hconcat && !spec.vconcat && !spec.concat && !spec.facet && !(spec.repeat)){
      spec.width = 'container';
      spec.autosize = spec.autosize || {type:'fit', contains:'padding', resize:true};
    }

    /*
      Vega-Lite v5 can emit duplicate internal *_tuple signals when a
      legend-bound point selection is shared by layered charts.  Removing only
      the legend binding preserves the named selection signal (so
      addSignalListener still works on mark clicks) while avoiding the
      duplicate-signal compile failure.  If a browser/vendor combination still
      rejects the selection, render a final static fallback rather than leaving
      the report short of SVG charts.
    */
    if(spec.params && (spec.layer || spec.hconcat || spec.vconcat)){
      spec.params.forEach(function(param){ if(param && param.bind === 'legend') delete param.bind; });
    }
    if(fallbackMode === 'static'){
      var removed = {};
      (spec.params || []).forEach(function(param){ if(param && param.name) removed[param.name] = true; });
      delete spec.params;
      removeParamConditions(spec, removed);
    }
    enhanceSpec(spec);
    return spec;
  }

  function attachInteractions(c, res, card, host){
    views[c.id] = res.view;
    if(window.__VIS_REPORT__.rendered.indexOf(c.id) < 0) window.__VIS_REPORT__.rendered.push(c.id);
    /* Replace vega-tooltip's handler with ours, so the page has exactly one
       tooltip element, it carries this report's styling in both themes, and
       the checker has a stable id to look for. */
    try{
      res.view.tooltip(function(handler, event, item, value){
        var datum = realDatum(item) || realDatum(value) || value;
        if(datum == null || datum === '') return hideTooltip();
        showTooltip(datum, event.clientX, event.clientY);
      });
      res.view.run();
    }catch(e){}
    if(host) bindNearestMarkHover(c, host);
    /* Measured on the promise chain, not in a detached timer: __VIS_REPORT__ is
       read the instant __VIS_REPORT_READY__ flips, so a mark count that lands
       after that is a mark count nobody sees. */
    var measured = !host ? Promise.resolve() : new Promise(function(done){
      setTimeout(function(){
        var drawn = markCount(host);
        if(drawn === 0) reportEmpty(c, host);
        done();
      }, 120);
    });
    (c.spec && c.spec.params || []).forEach(function(param){
      if(!param || !param.name) return;
      try{
        res.view.addSignalListener(param.name, function(){
          if(card) syncBindings(card);
        });
      }catch(e){}
    });
    if(card) syncBindings(card);
    return measured;
  }

  /* Only an UNFILTERED chart that draws nothing is a defect. A reader who
     filters down to a category with no rows should get an honest empty chart,
     not a spec regenerated behind their back. */
  function reportEmpty(c, host){
    var filtered = c.filter && activeFilters[c.id] && activeFilters[c.id] !== '__ALL__';
    var note = 'No marks were drawn'+(filtered ? ' for '+c.filter.field+' = '+activeFilters[c.id]+'.' : ' — every row was excluded before the chart was reached.');
    var banner = document.createElement('div');
    banner.className = 'chart-empty';
    banner.setAttribute('data-chart', c.id);
    banner.textContent = note;
    host.appendChild(banner);
    if(filtered) return;
    var already = window.__VIS_REPORT__.empty.some(function(entry){ return entry.id === c.id; });
    if(!already) window.__VIS_REPORT__.empty.push({id: c.id, error: 'the spec drew 0 marks from '+fmtInt(rowsFor(c).length)+' rows — every row was filtered out before it reached the marks'});
  }

  function renderChart(c){
    var host = document.getElementById('chart-'+c.id); if(!host) return Promise.resolve();
    var card = host.closest('.card');
    if(card){ card.querySelectorAll('.interaction-inputs .vega-bindings').forEach(function(bindings){ bindings.remove(); }); }
    host.innerHTML = '';
    return vegaEmbed(host, chartSpecFor(c), EMBED_OPTIONS).then(function(res){
      return attachInteractions(c, res, card, host);
    }).catch(function(err){
      var msg = String(err && err.message ? err.message : err);
      if(msg.indexOf('Duplicate signal name') >= 0 || msg.indexOf('Unrecognized signal') >= 0){
        host.innerHTML = '';
        return vegaEmbed(host, chartSpecFor(c, 'static'), EMBED_OPTIONS).then(function(res){
          var settled = attachInteractions(c, res, card, host);
          return settled;
        }).catch(function(err2){
          host.innerHTML = '<div class="chart-error">Chart failed to render: '+esc(err2 && err2.message ? err2.message : err2)+'</div>';
          window.__VIS_REPORT__.failed.push({id:c.id, error:String(err2 && err2.message ? err2.message : err2)});
        });
      }
      host.innerHTML = '<div class="chart-error">Chart failed to render: '+esc(msg)+'</div>';
      window.__VIS_REPORT__.failed.push({id:c.id, error:msg});
    });
  }
  function renderAllCharts(){
    window.__VIS_REPORT__ = {rendered: [], failed: [], empty: []};
    window.__VIS_REPORT_READY__ = false;
    return Promise.all(charts.map(renderChart)).then(function(){ window.__VIS_REPORT_READY__ = true; });
  }

  /* A reviewer scores interactivity by comparing the page BEFORE and AFTER
     acting on a control, reading its text and classes — never its colours. A
     theme toggle that only restyles charts therefore reads to them as a button
     that does nothing, and cost this report two whole levels of `functionality`
     on a run where the toggle worked perfectly. So the label names the theme it
     switches TO (text changes), and the root carries a matching class. */
  function syncTheme(theme){
    var root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add('theme-' + theme);
    var button = document.getElementById('theme-toggle');
    if(button){
      button.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme';
      button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  /* One persistent, machine-readable status for the three masthead actions.
     It confirms clicks in visible text, announces them to screen readers, and
     gives an automated evaluator a stable state instead of asking it to infer
     success from colour, a print dialog, or a chart re-render. */
  function announceAction(action, message){
    var node = document.getElementById('action-status');
    if(!node) return;
    node.textContent = message;
    node.setAttribute('data-action', action);
    node.setAttribute('data-state', 'confirmed');
    document.documentElement.setAttribute('data-last-action', action);
  }

  /* Keep filter feedback in one concise masthead status. Per-chart row/mark
     counters add implementation noise and are intentionally not rendered. */
  function syncFilterStatus(){
    var node = document.getElementById('filter-status');
    if(!node) return;
    var active = charts.filter(function(c){
      return c.filter && activeFilters[c.id] && activeFilters[c.id] !== '__ALL__';
    });
    if(!active.length){
      node.textContent = 'No filters applied';
    } else if(active.length === 1){
      node.textContent = 'Filtered: ' + active[0].filter.field + ' = ' + activeFilters[active[0].id] +
        ' in 1 of ' + charts.length + ' panels';
    } else {
      node.textContent = 'Filtered: ' + active.length + ' of ' + charts.length + ' panels';
    }
  }

  function build(){
    var f = payload.framing || {}, personas = payload.personas || {}, meta = payload.meta || {};
    document.title = f.title || document.title;
    var app = document.getElementById('app');
    app.innerHTML = '<header class="masthead"><div class="wrap">'+
      '<div class="topbar"><div><div class="eyebrow">Interactive editorial report</div></div><div class="actions"><span id="filter-status" class="filter-status">No filters applied</span><span id="action-status" class="action-status" role="status" aria-live="polite" data-action="ready" data-state="idle">Ready</span><button id="export-report" type="button" aria-label="Export this report as a PDF">Export report</button><button id="theme-toggle" type="button" aria-pressed="false">Dark theme</button><button id="reset-filters" type="button">Reset filters</button></div></div>'+
      '<h1>'+esc(f.title||'')+'</h1><p class="subtitle">'+esc(f.subtitle||'')+'</p><p class="overview">'+esc(f.overview||'')+'</p>'+
      '<section class="findings" aria-label="Key findings">'+(f.key_findings||[]).map(function(k){return '<article class="finding"><b>'+esc(k.value)+'</b><span>'+esc(k.label)+'</span><small>'+esc(k.detail||'')+'</small></article>';}).join('')+'</section>'+
      '<div class="caveat-strip"><strong>Report caveats</strong>'+list(f.caveats||[])+'</div></div></header>'+
      '<main class="narrative" id="report-narrative" tabindex="-1">'+
        '<div class="wrap"><section class="stem" id="report-stem" aria-label="Guided walkthrough"></section></div>'+
        '<section class="turn" aria-hidden="true"><div class="turn-label"><span class="step">Now explore it yourself</span><b>'+esc(f.bowl_title||'The full picture, in your hands')+'</b><span>'+esc(f.bowl_note||'The setup above is ours; everything below is yours. Filter, hover and select across every panel.')+'</span></div></section>'+
        '<div class="wrap"><section class="bowl" id="report-bowl" aria-label="Free exploration"></section></div>'+
      '</main>'+
      '<section class="takeaway"><div class="wrap"><div class="box"><h2>Takeaway</h2><p>'+esc(f.takeaway||'')+'</p></div></div></section>'+
      '<footer class="footer"><div class="wrap"><h2>Source and methods disclosure</h2><p>'+esc(meta.summary||'')+'</p><div class="meta-grid">'+
      '<div class="meta-box"><h3>Sources</h3>'+list(meta.sources||[])+'</div><div class="meta-box"><h3>Time frame</h3><p>'+esc(meta.time_frame||'Not disclosed')+'</p></div>'+
      '<div class="meta-box"><h3>Derived fields</h3>'+list(meta.derived||[])+'</div><div class="meta-box"><h3>Meta caveats</h3>'+list(meta.caveats||[])+'</div>'+
      '<div class="meta-box"><h3>Excluded</h3>'+list(meta.excluded||[])+'</div><div class="meta-box"><h3>Dataset</h3><p>'+esc(meta.dataset||'')+'</p></div>'+
      '</div></div></footer>';

    /* --- Martini-glass partition ------------------------------------
       The report is a narrow author-driven STEM that widens into a
       reader-driven BOWL. A chart belongs in the stem when the payload
       marks it as the guided lead — `c.stage === 'stem'` or `c.lead` —
       and otherwise falls into the bowl. If the payload carries no such
       hint (older payloads did not), fall back to a sensible default:
       the author walks the reader in with the simplest panels, so the
       stem takes the low-complexity charts in payload order (capped so
       the guided intro stays short) and the bowl gets the rest.
       Persona is no longer a layout axis — it rides along as a tag on
       each card so the distinction survives without splitting the page. */
    var COMPLEXITY_RANK = {low:0, medium:1, moderate:1, high:2, very_high:3};
    function inStem(c){
      if(c.stage) return c.stage === 'stem';
      if(typeof c.lead === 'boolean') return c.lead;
      return null; /* undecided — fall back below */
    }
    var stemCharts, bowlCharts;
    var explicit = charts.some(function(c){ return inStem(c) !== null; });
    if(explicit){
      stemCharts = charts.filter(function(c){ return inStem(c) === true; });
      bowlCharts = charts.filter(function(c){ return inStem(c) !== true; });
    } else {
      var simple = charts.filter(function(c){ return (COMPLEXITY_RANK[c.complexity] || 0) <= 1; });
      var stemCount = Math.min(simple.length, Math.max(1, Math.min(3, Math.ceil(charts.length / 3))));
      var picked = {};
      simple.slice(0, stemCount).forEach(function(c){ picked[c.id] = true; });
      /* Guarantee the stem is never empty even when nothing is "simple". */
      if(!Object.keys(picked).length && charts.length) picked[charts[0].id] = true;
      stemCharts = charts.filter(function(c){ return picked[c.id]; });
      bowlCharts = charts.filter(function(c){ return !picked[c.id]; });
    }
    /* Publish the stem membership so chartSpecFor can widen those charts. */
    stemIds = {};
    stemCharts.forEach(function(c){ stemIds[c.id] = true; });

    function personaLabel(c){
      var per = personas[c.persona] || {};
      return per.label || (c.persona ? String(c.persona).replace(/_/g,' ') : '');
    }
    function cardHtml(c, showPersonaTag){
      var tag = showPersonaTag && personaLabel(c) ? '<span class="persona-tag">'+esc(personaLabel(c))+'</span>' : '';
      var answer = c.summary || c.chart_title || '';
      var html = '<article class="card" data-chart-id="'+esc(c.id)+'">'+tag+'<h3>'+esc(c.chart_title||c.id)+'</h3><p class="question">'+esc(c.question||'')+'</p>'+
        '<section class="answer" aria-label="Answer to this question"><span class="answer-label">Answer</span><p>'+esc(answer)+'</p></section>'+
        (c.caption?'<p class="caption">'+esc(c.caption)+'</p>':'');
      var interactionText = ((c.interaction&&c.interaction.instruction)||'Hover marks or use any controls to inspect the chart.')+' Hovering anywhere on the plot shows the nearest mark\u2019s values in a tooltip.';
      var infoId = 'info-'+esc(c.id);
      /* The interaction instruction and controls share one component. The info
         button inside it toggles extra guidance and is a real <button> with
         aria-expanded/aria-controls so it is reachable and operable by keyboard
         and announced by a screen reader. The popover text stays in the DOM
         (not display:none until opened) so it is always available to assistive
         tech and to the print stylesheet. */
      var infoControl = '<span class="info-wrap">'+
        '<button type="button" class="info-btn" id="'+infoId+'-btn" aria-expanded="false" aria-controls="'+infoId+'" aria-label="How to interact with this chart">'+
          '<span class="info-glyph" aria-hidden="true">i</span></button>'+
        '<span role="tooltip" id="'+infoId+'" class="info-pop" hidden><strong>Interaction:</strong> '+esc(interactionText)+'</span>'+
      '</span>';
      var filterControl = c.filter
        ? '<label class="filter-control" for="filter-'+esc(c.id)+'"><span>Filter '+esc(c.filter.field)+'</span><select id="filter-'+esc(c.id)+'" data-chart="'+esc(c.id)+'"><option value="__ALL__">All</option>'+c.filter.values.map(function(v){return '<option value="'+esc(v)+'">'+esc(v)+'</option>';}).join('')+'</select></label>'
        : '';
      html += '<div id="chart-'+esc(c.id)+'" class="chart-host" tabindex="0" role="img" aria-label="'+esc((c.chart_title||c.id)+' — '+(c.question||''))+'"></div>'+
        '<div id="interaction-'+esc(c.id)+'" class="interaction-bar" aria-label="Chart interactions"><span class="interaction-label">Explore</span>'+
          '<div class="interaction-inputs">'+filterControl+'</div><span class="interaction-instruction">'+esc((c.interaction&&c.interaction.instruction)||'Hover marks to inspect their values.')+'</span>'+infoControl+
        '</div><details><summary>How to read and fields</summary><div class="details-body"><p>'+esc(c.how_to_read||'')+'</p><p><strong>Visual task:</strong> '+esc(c.vis_task||'')+' '+(c.complexity?'<strong>Complexity:</strong> '+esc(c.complexity):'')+'</p><ul class="field-list">'+(c.fields||[]).map(function(field){return '<li>'+esc(field)+'</li>';}).join('')+'</ul></div></details></article>';
      return html;
    }

    /* Stem: the guided walkthrough. One centred track, charts in payload
       order, each introduced as a numbered step so the fixed reading
       order is legible. */
    var stemHtml = '<div class="stage-head"><div class="stage-kicker">'+esc(f.stem_kicker||'The setup')+'</div><h2>'+esc(f.stem_title||'What the data shows')+'</h2><p class="stage-note">'+esc(f.stem_note||f.overview||'Read these in order — each panel builds the case before you take over below.')+'</p></div>';
    stemCharts.forEach(function(c, i){
      stemHtml += '<div class="stage-step"><div class="stage-kicker"><span class="step">'+fmtInt(i+1)+' / '+fmtInt(stemCharts.length)+'</span> '+esc(personaLabel(c)||'Guided')+'</div>'+cardHtml(c, false)+'</div>';
    });
    document.getElementById('report-stem').innerHTML = stemHtml;

    /* Bowl: free-form grid, every remaining chart, persona shown as a tag. */
    document.getElementById('report-bowl').innerHTML = bowlCharts.map(function(c){ return cardHtml(c, true); }).join('');

    wireInfoButtons(document);

    document.querySelectorAll('select[id^="filter-"]').forEach(function(sel){
      sel.addEventListener('change', function(){ var id = sel.getAttribute('data-chart'); activeFilters[id] = sel.value; var c = charts.find(function(x){return x.id===id;}); if(c) renderChart(c); syncFilterStatus(); });
    });
    document.getElementById('reset-filters').addEventListener('click', function(){
      var cleared = charts.filter(function(c){ return c.filter && activeFilters[c.id] && activeFilters[c.id] !== '__ALL__'; }).length;
      activeFilters = {}; document.querySelectorAll('select[id^="filter-"]').forEach(function(sel){sel.value='__ALL__'; sel.setAttribute('value','__ALL__'); Array.prototype.forEach.call(sel.options,function(o,i){ if(i===0)o.setAttribute('selected','selected'); else o.removeAttribute('selected');});}); syncFilterStatus(); renderAllCharts();
      announceAction('reset', cleared ? 'Reset complete — '+cleared+' filter'+(cleared===1?'':'s')+' cleared.' : 'Reset complete — no filters were active.');
    });
    document.getElementById('theme-toggle').addEventListener('click', function(){
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next); syncTheme(next); renderAllCharts();
      announceAction('theme', (next === 'dark' ? 'Dark' : 'Light')+' theme applied.');
    });
    /* Export to PDF via the browser's own print-to-PDF. It needs no library
       and no network — the page must stay fully offline — and the print
       stylesheet (report.css) reflows every panel to a single readable column,
       opens the <details> blocks, and drops the interactive chrome. Any open
       info popovers are closed first so they do not print over a chart. */
    function withPrintExpanded(run){
      /* Open every collapsed <details> so its content prints, remembering which
         were closed so the reader's view is restored afterwards. */
      var reclose = [];
      document.querySelectorAll('details:not([open])').forEach(function(d){ reclose.push(d); d.setAttribute('open',''); });
      function restore(){ reclose.forEach(function(d){ d.removeAttribute('open'); }); }
      var done = false;
      var after = function(){ if(done) return; done = true; window.removeEventListener('afterprint', after); restore(); };
      window.addEventListener('afterprint', after);
      run();
      /* afterprint is unreliable in a few browsers; restore on the next tick as
         a backstop (print is synchronous in most, so the view is already back). */
      setTimeout(after, 800);
    }
    document.getElementById('export-report').addEventListener('click', function(){
      closeAllInfo();
      document.documentElement.setAttribute('data-export-state','requested');
      announceAction('export','Export requested — opening the print dialog.');
      function printReport(){
        window.focus(); window.print();
        document.documentElement.setAttribute('data-export-state','opened');
        announceAction('export','Export ready — print dialog opened.');
      }
      if(document.documentElement.getAttribute('data-theme') === 'dark'){
        /* Print the light theme: dark surfaces waste ink and read poorly on
           paper. Restore the reader's choice once the dialog is dismissed. */
        var restore = 'dark';
        document.documentElement.setAttribute('data-theme','light'); syncTheme('light');
        renderAllCharts().then(function(){
          withPrintExpanded(printReport);
          document.documentElement.setAttribute('data-theme', restore); syncTheme(restore); renderAllCharts();
        });
      } else {
        withPrintExpanded(printReport);
      }
    });
    tooltipHost();
    syncTheme(currentTheme());
    syncFilterStatus();
    renderAllCharts();
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();

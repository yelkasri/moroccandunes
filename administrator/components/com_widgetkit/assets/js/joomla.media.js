!function(e){function t(){window.getSelection?window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges():document.selection&&document.selection.empty()}angular.module("widgetkit").service("mediaPicker",["$templateCache","$compile","$q","$rootScope","filterFilter","UIkit","mediaRequest","Application",function(n,i,o,r,l,c,a,s){var d,u,f,p,m,h,g={init:function(l){return this.options=angular.extend({multiple:!1},l),m=o.defer(),u=e(n.get("media")),f=u.data("media-path"),p=i(u)(r).scope(),p.vm=this,p.selectItem=function(n,i){if(i.shiftKey&&h){t();for(var o,r=e(i.target).closest("li"),l=r.parent().children(),c=r.index()>h.index()?1:-1,a=1===c?h.index():r.index(),s=1===c?r.index():h.index(),d=a;s>=d;d++)o=l.eq(d).scope(),o[o.folder?"folder":"file"].selected=!0}else n.selected=!n.selected;h=e(i.target).closest("li")},this.open("").then(function(){if(window.widgetkit.env.modal){var t=window.widgetkit.env.modal.element.children(":first").hide();g.close=function(){t.show(),u.remove()},t.parent().append(u)}else g.modal=e.UIkit.modal(e('<div class="uk-modal">').append(u).appendTo("body")).show(),g.close=function(){g.modal.hide()},e.UIkit.domObserve(g.modal.element);g.initUpload()}),m.promise},initUpload:function(){var t=e("#wk-upload-progressbar"),n=t.find(".uk-progress-bar"),i={param:"Filedata[]",params:{"Content-Type":"multipart/form-data"},allow:"*.(jpeg|jpg|gif|png|svg|mp3|ogg|wav|mp4|ogv|webm)",before:function(e,t){e.action=a.url({task:"file.upload",tmpl:"component",format:"html",folder:d},!0)},loadstart:function(){n.css("width","0%").text("0%"),t.removeClass("uk-hidden")},progress:function(e){e=Math.ceil(e)+"%",n.css("width",e).text(e)},allcomplete:function(i){n.css("width","100%").text("100%"),e(i).find(".alert-error, .alert-info")[0]&&c.notify(e(i).find(".alert-error p, .alert-info p").html(),"danger"),setTimeout(function(){t.addClass("uk-hidden")},250),g.open(d)}};c.uploadSelect(e("#wk-upload-select"),i),c.uploadDrop(u,i)},open:function(t){return a.get({view:"mediaList",tmpl:"component",folder:t,layout:"details"}).success(function(n){h=null,p.media=[],p.breadcrumbs=[];var i=e(n).find("tbody tr");".."==i.first().find(".description").text().trim()&&(i=i.not(i[0])),i.each(function(){var n=e(this),i=n.find("td:first a"),o=n.find("td :checkbox").val(),r=n.find("td.dimensions").text().trim().split(" x "),l=(t?t+"/":"")+o;p.media.push({title:o,path:l,url:(f?f+"/":"")+l,href:s.baseUrl()+"/"+(f?f+"/":"")+l,type:i.is("[target]")?"folder":"file",image:Boolean(l.match(/\.(jpe?g|png|gif|svg)$/i)),width:r[0],height:r[1],size:n.find("td.filesize").text().trim()})}),d=t;var o=(d?"/"+d:"").split("/");do p.breadcrumbs.unshift({path:o.join("/").substr(1),title:o.pop()});while(o.length);p.breadcrumbs[0].title="home"})},select:function(){var t=this.options,n=g.getSelected(),i=[],o=[],r=function(e){return e.replace(/[_-]/g," ").replace(/\.[^\.]+$/,"").replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1)})};if(n.forEach(function(e){e.image?(e.title=r(e.title),o.push(e)):i.push(e)}),i.length){var l=[];i.forEach(function(t){var n=new Promise(function(n,i){a.get({view:"mediaList",tmpl:"component",folder:t.title,layout:"details"}).success(function(i){var l=e(i).find("tbody tr");".."==l.first().find(".description").text().trim()&&(l=l.not(l[0])),l.each(function(){var n=e(this),i=n.find("td:first a"),l=n.find("td :checkbox").val(),c=n.find("td.dimensions").text().trim().split(" x "),a=(t.title?t.title+"/":"")+l;if(a.match(/\.(jpe?g|png|gif|svg)$/i)){var d={title:r(l),path:a,url:(f?f+"/":"")+a,href:s.baseUrl()+"/"+(f?f+"/":"")+a,type:i.is("[target]")?"folder":"file",image:Boolean(a.match(/\.(jpe?g|png|gif|svg)$/i)),width:c[0],height:c[1],size:n.find("td.filesize").text().trim()};o.push(d)}}),n()})});l.push(n)}),Promise.all(l).then(function(){m.resolve(t.multiple||!o.length?o:o[0]),g.close()})}else m.resolve(this.options.multiple||!o.length?o:o[0]),g.close()},addFolder:function(){var e=prompt("Folder Name");e&&a.post({task:"folder.create",foldername:e,folderbase:d}).success(function(){g.open(d)})},remove:function(){window.confirm("Are you sure?")&&a.post({task:"folder.delete",folder:d,rm:g.getSelected().map(function(e){return e.title})}).success(function(){g.open(d)})},getSelected:function(){return l(p.media,{selected:!0})}};return{select:function(e){return g.init(e)}}}]).service("mediaRequest",["$q","$http","Application",function(t,n,i){var o="index.php?option=com_media";return{get:function(e){return n.get(this.url(e))},post:function(t){return t[i.config.token]=1,n.post(o,e.param(t),{headers:{"Content-Type":"application/x-www-form-urlencoded"}})},url:function(t,n){return n&&(t[i.config.token]=1),o+"&"+e.param(t)}}}]),window.Promise=window.Promise||function(e,t){function n(e,t){return(typeof t)[0]==e}function i(r,l){return l=function c(a,s,d,u,f,p){if(u=c.q,a!=n)return i(function(e,t){u.push({p:this,r:e,j:t,1:a,0:s})});if(d&&n(e,d)|n(t,d))try{f=d.then}catch(m){s=0,d=m}if(n(e,f)){var h=function(e){return function(t){return f&&(f=0,c(n,e,t))}};try{f.call(d,h(1),s=h(0))}catch(m){s(m)}}else for(l=function(t,l){return n(e,t=s?t:l)?i(function(e,n){o(this,e,n,d,t)}):r},p=0;p<u.length;)f=u[p++],n(e,a=f[s])?o(f.p,f.r,f.j,d,a):(s?f.r:f.j)(d)},l.q=[],r.call(r={then:function(e,t){return l(e,t)},"catch":function(e){return l(0,e)}},function(e){l(n,1,e)},function(e){l(n,0,e)}),r}function o(i,o,r,l,c){setTimeout(function(){try{l=c(l),c=l&&n(t,l)|n(e,l)&&l.then,n(e,c)?l==i?r(TypeError()):c.call(l,o,r):o(l)}catch(a){r(a)}},0)}function r(e){return i(function(t){t(e)})}return i.resolve=r,i.reject=function(e){return i(function(t,n){n(e)})},i.all=function(e){return i(function(t,n,i,o){o=[],i=e.length||t(o),e.map(function(e,l){r(e).then(function(e){o[l]=e,i-=1,i||t(o)},n)})})},i}("f","o")}(jQuery);
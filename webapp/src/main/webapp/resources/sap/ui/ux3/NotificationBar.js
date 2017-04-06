/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','sap/ui/core/theming/Parameters','./library'],function(q,C,I,P,l){"use strict";var N=C.extend("sap.ui.ux3.NotificationBar",{metadata:{library:"sap.ui.ux3",properties:{visibleStatus:{type:"sap.ui.ux3.NotificationBarStatus",group:"Misc",defaultValue:sap.ui.ux3.NotificationBarStatus.Default},resizeEnabled:{type:"boolean",group:"Misc",defaultValue:true},alwaysShowToggler:{type:"boolean",defaultValue:false,since:"1.24.5"}},aggregations:{messageNotifier:{type:"sap.ui.core.Element",multiple:false},notifiers:{type:"sap.ui.core.Element",multiple:true,singularName:"notifier"}},events:{display:{parameters:{show:{type:"boolean"}}},resize:{parameters:{status:{type:"sap.ui.ux3.NotificationBarStatus"}}}}}});C.extend("sap.ui.ux3.NotificationBar.NotifierView",{renderMessages:function(r){r.write("<div");r.writeAttribute("id",this.getId()+"-content");r.addClass("sapUiNotifierContent");r.writeClasses();r.write(">");var m=this.getMessages();var i=m.length-1;var f=true;for(;i>=0;i--){if(!f||(i==0&&m.length>1)){r.write("<div");r.addClass("sapUiNotificationBarCltSep");r.writeClasses();r.write(">");r.write("</div>");}else{f=false;}var M=m[i];if(M._message&&M._message.getReadOnly()){M.addStyleClass("sapUiNotifierMessageReadOnly");}r.renderControl(M);}r.write("</div>");},metadata:{properties:{"title":"string","visibleItems":"int","renderMode":{type:"string",defaultValue:"callout"}},aggregations:{"messages":"sap.ui.ux3.NotificationBar.MessageView"}},init:function(){this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");},exit:function(){if(this._renderedControl){delete this._renderedControl;}delete this._oResBundle;},getTitle:function(){var t=this.getProperty("title");var c=this.getMessages().length;if(c>0){var k="NOTIBAR_NOTIFIER_VIEW_TITLE";t=this._oResBundle.getText(k,[t,c]);}return t;},renderer:function(r,c){r.write("<div");r.addClass("sapUiNotifierContainer");r.writeControlData(c);r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-title");r.addClass("sapUiNotifierTitle");r.writeClasses();r.write(">");r.writeEscaped(c.getTitle());r.write("</div>");if(c.getMessages().length>0){c.renderMessages(r);}r.write("</div>");},onAfterRendering:function(){var $=this.$("content"),a=$.children(".sapUiNotifierMessage"),c=a.length,v=this.getVisibleItems();if(c>v){q.sap.delayedCall(0,this,this._fnAfterRenderingCallback,[a,$,v]);}},_fnAfterRenderingCallback:function($,a,v){var t=v-1,c=0;$.each(function(){if(c===v){a.css("max-height",t);return;}t+=q(this).outerHeight();c++;});}});C.extend("sap.ui.ux3.NotificationBar.MessageView",{metadata:{properties:{"text":"string","timestamp":"string","icon":"sap.ui.core.URI"}},renderer:function(r,c){var i=c.getId();r.write("<div");r.writeControlData(c);r.addClass("sapUiNotifierMessage");r.writeClasses();r.writeAttribute("tabindex","0");r.write(">");if(c.getIcon()){r.write("<div");r.writeAttribute("id",i+"-icon");r.addClass("sapUiNotifierMessageIcon");r.writeClasses();r.write(">");r.write("<img");r.writeAttributeEscaped("src",c.getIcon());r.write("/>");r.write("</div>");}r.write("<div");r.writeAttribute("id",i+"-text");r.addClass("sapUiNotifierMessageText");r.writeClasses();r.write(">");r.writeEscaped(c.getText());r.write("</div>");r.write("<div");r.writeAttribute("id",i+"-timestamp");r.addClass("sapUiNotifierMessageTimestamp");r.writeClasses();r.write(">");r.writeEscaped(c.getTimestamp());r.write("</div>");r.write("</div>");},onclick:function(e){if(!this._message.getReadOnly()){var n=this._message.getParent();n.fireMessageSelected({message:this._message,notifier:n});}},onsapselect:function(e){this.onclick(e);},exit:function(e){if(this._message){delete this._message;}}});(function(){var c=function(t){var i=t.hasItems();var j=t.getVisibleStatus();if(i&&j==="None"){return true;}else if(!i&&j!=="None"){return true;}else if(!i&&j!=="Min"){return true;}else{return false;}};var s=function(t,i){var j=i.getMessages().concat([]);if(j.length>0){j.sort(sap.ui.core.Message.compareByType);var p=j.length-1;t._sSeverestMessageLevel=j[p].getLevel();}};var f=function(E){var j=E.getParameter("callout");switch(E.getParameter("type")){case"added":case"removed":var p=E.getParameter("notifier");if(this.getMessageNotifier()&&this.getMessageNotifier().getId()===p.getId()){s(this,this.getMessageNotifier());}if(c(this)){var t=this.hasItems();this.fireDisplay({show:t});}else{this.invalidate();if(E.getParameter("type")==="removed"){if(j.getContent().length>0){var u=j.getContent()[0];var M=E.getParameter("message");var v=u.getMessages();var x;for(var i=0;i<v.length;i++){x=v[i];if(M.getId()===x._message.getId()){x.destroy();j.rerender();j.adjustPosition();break;}}}}}break;case"openCallout":j.destroyContent();var p=E.getParameter("notifier");p.destroyAggregation("views",true);var y=p.getId();var z=this.getMessageNotifier();if(z&&y===z.getId()){y+="-messageNotifierView";}else{y+="-messageView";}var A=new N.NotifierView(y,{title:p.getTitle(),visibleItems:this._visibleItems});if(p._bEnableMessageSelect){A.addStyleClass("sapUiNotifierSelectable");}var B=p.getMessages();for(var i=0;i<B.length;i++){var V=a(B[i],p,this);A.addMessage(V);}p.addAggregation("views",A,true);j.addContent(A);break;}};N.HOVER_ITEM_HEIGHT=16;N.prototype.init=function(){this._oItemNavigation=new I();this._oItemNavigation.setCycling(true);this.addDelegate(this._oItemNavigation);this._iCalloutWidth=parseInt(250,10);this._iCalloutHeight=parseInt(200,10);this._visibleItems=5;this._eventListener=q.proxy(f,this);this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this._togglerPosition="50%";this._gapMessageArea="5";this._sSeverestMessageLevel=sap.ui.core.MessageType.None;q(window).bind("resize",q.proxy(o,this));this._proxyEnableMessageSelect=q.proxy(e,this);this.data("sap-ui-fastnavgroup","true",true);this.setAlwaysShowToggler(false);};N.prototype.exit=function(){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;delete this._iCalloutWidth;delete this._iCalloutHeight;delete this._visibleItems;delete this._eventListener;if(this.getMessageNotifier()){var M=this.getMessageNotifier();M._oMessageArea.destroy();delete M._oMessageArea;}delete this._resizeFrom;delete this._resizeTo;delete this._oResBundle;delete this._formerVisibleStatus;delete this._togglerPosition;delete this._gapMessageArea;delete this._isHovered;delete this._togglerClicked;delete this._sSeverestMessageLevel;q(window).unbind("resize",o);delete this._proxyEnableMessageSelect;};var a=function(M,i,j){var p=new N.MessageView(i.getId()+"-messageView-"+M.getId(),{text:M.getText(),timestamp:M.getTimestamp()});p._message=M;if(i.sParentAggregationName=="messageNotifier"){if(j.getVisibleStatus()==sap.ui.ux3.NotificationBarStatus.Max){p.setIcon(M.getIcon()||M.getDefaultIcon("32x32"));}else{p.setIcon(M.getIcon()||M.getDefaultIcon());}}else{p.setIcon(M.getIcon());}return p;};var r=function(t,i){i.attachEvent("_childControlCalling",t._eventListener,t);};var d=function(t,i){i.detachEvent("_childControlCalling",t._eventListener,t);};N.prototype.addNotifier=function(i){if(i){var j=(this.getVisibleStatus()==sap.ui.ux3.NotificationBarStatus.None)?true:false;this.addAggregation("notifiers",i,j);r(this,i);}return this;};N.prototype.insertNotifier=function(i,j){if(i){this.insertAggregation("notifiers",i,j);r(this,i);}return this;};N.prototype.removeNotifier=function(i){var j=this.removeAggregation("notifiers",i);d(this,j);return j;};N.prototype.removeAllNotifiers=function(){var j=this.removeAllAggregation("notifiers");for(var i=0;i<j.length;i++){var p=j[i];d(this,p);}return j;};N.prototype.destroyNotifiers=function(){var j=this.getNotifiers();for(var i=0;i<j.length;i++){var p=j[i];d(this,p);}this.destroyAggregation("notifiers");return this;};var e=function(E){var M=this.getMessageNotifier();if(M&&M.getId()===E.getParameter("notifier").getId()){M.invalidate();}};N.prototype.setMessageNotifier=function(M){var i=this.getMessageNotifier();if(i){i._oMessageArea.destroy();delete i._oMessageArea;i.detachEvent("_enableMessageSelect",this._proxyEnableMessageSelect);d(this,i);}this.setAggregation("messageNotifier",M);if(M){M._oMessageArea=new N.MessageView(this.getId()+"-inplaceMessage");M._oMessageArea.setParent(M);M.attachEvent("_enableMessageSelect",this._proxyEnableMessageSelect);r(this,M);}return this;};N.prototype.destroyMessageNotifier=function(M){var i=this.getMessageNotifier();if(i){i._oMessageArea.destroy();delete i._oMessageArea;i.detachEvent("_enableMessageSelect",this._proxyEnableMessageSelect);d(this,i);}this.destroyAggregation("messageNotifier");return this;};var S=function(t,i){var T=t.$();switch(i){case sap.ui.ux3.NotificationBarStatus.Min:T.addClass("sapUiNotificationBarMinimized");break;case sap.ui.ux3.NotificationBarStatus.Max:var H=t.getHeightOfStatus(t.getVisibleStatus());T.addClass("sapUiNotificationBarMaximized");T.css("height",H);var $=t.$("containers");$.css("max-height",H);break;case sap.ui.ux3.NotificationBarStatus.None:if(!t._resizeTo){T.css("display","none");}break;case sap.ui.ux3.NotificationBarStatus.Default:default:T.removeClass("sapUiNotificationBarMaximized");T.removeClass("sapUiNotificationBarMinimized");break;}};var R=function(t){if(w(t)){var F=t.getHeightOfStatus(t._resizeFrom);var T=t.$();T.css("height",F);var j=t.getHeightOfStatus(t._resizeTo);T.stop(true,true).animate({height:j},"fast",function(){var p=t.getVisibleStatus();if(p==="None"){T.css("display","none");if(t.hasItems()){if(t.getMessageNotifier()){var M=t.getMessageNotifier();M.$().css("display","none");}if(t.getNotifiers().length>0){var u=t.getNotifiers();for(var i=0;i<u.length;i++){u[i].$().css("display","none");}}}}S(t,p);m(t,p);});}else{var p=t.getVisibleStatus();S(t,p);}delete t._resizeFrom;delete t._resizeTo;};var b=function(t){if(t.getMessageNotifier()&&t.getMessageNotifier().hasItems()){var $;var j=t.getId()+"-notifiers";var p=q.sap.byId(j);if(p.length>0){var T=parseInt(p.width(),10);var u=p.children();for(var i=0;i<u.length;i++){var v=q(u[i]);if(v.hasClass("sapUiNotifier")){T-=v.width();}else if(v.hasClass("sapUiNotifierSeparator")){T-=v.width();}else if(v.hasClass("sapUiInPlaceMessage")){$=v;}}if($){T-=t._gapMessageArea+2;$.css("width",T+"px");}}}};N.prototype.onAfterRendering=function(){this._oItemNavigation.setRootDomRef(this.getDomRef());var p=[];var t=this.getVisibleStatus()===sap.ui.ux3.NotificationBarStatus.Max;if(t){var M=this.getMessageNotifier();if(M!=null){var u=M.getMessages();var v=M.getId()+"-messageNotifierView-messageView-";for(var i=u.length-1;i>=0;i--){var D=q.sap.domById(v+u[i].getId());if(D){p.push(D);}}}var x=this.getNotifiers();for(var i=0;i<x.length;i++){var u=x[i].getMessages();var v=x[i].getId()+"-notifierView-messageView-";for(var j=u.length-1;j>=0;j--){var D=q.sap.domById(v+u[j].getId());if(D){p.push(D);}}}}else{var x=this.getNotifiers();for(var i=0;i<x.length;i++){var D=x[i].getDomRef();if(D){p.push(D);}}var M=this.getMessageNotifier();if(M!=null){var D=M.getDomRef();if(D){p.push(D);}D=this.getDomRef("inplaceMessage");if(D&&q(D).hasClass("sapUiInPlaceMessageSelectable")){p.push(D);}}}this._oItemNavigation.setItemDomRefs(p);R(this);b(this);g(this,this.getMessageNotifier());h(this);if(sap.ui.Device.browser.mobile){var $=this.$("toggler");if(this.getVisibleStatus()!==sap.ui.ux3.NotificationBarStatus.None){$.css("display","block");}else{$.css("display","none");}}};var g=function(t,M){if(M&&M.hasItems()){var $=M.$("counter");$.removeClass("sapUiMessageInformation");$.removeClass("sapUiMessageSuccess");$.removeClass("sapUiMessageWarning");$.removeClass("sapUiMessageError");s(t,M);var L=t._sSeverestMessageLevel;$.addClass("sapUiMessage"+L);var i=M.getMessages().length;var K="NOTIBAR_MESSAGE_NOTIFIER_DESC_LEVEL_"+L.toUpperCase()+(i===1?"_SING":"_PL");k(t,M,K,i);}};var h=function(t){var j=t.getNotifiers();for(var i=0;i<j.length;i++){var p=j[i].getMessages().length;var K="NOTIBAR_NOTIFIER_COUNT_TEXT_"+(p===1?"SING":"PL");k(t,j[i],K,p);}};var k=function(t,i,K,j){var $=i.$("description");var M=t._oResBundle.getText(K,[j]);$.html(M);};var o=function(E){b(this);};var w=function(t){if(t._resizeFrom&&t._resizeTo){if(t._resizeFrom!=t._resizeTo){return true;}}return false;};N.prototype.hasItems=function(){var j=this.getNotifiers();if(j.length>0){for(var i=0;i<j.length;i++){var p=j[i];if(p.hasItems()){return true;}}}if(this.getMessageNotifier()){if(this.getMessageNotifier().hasItems()){return true;}}return false;};var m=function(i,t){var j="none";var $=i.$();switch(t){case sap.ui.ux3.NotificationBarStatus.Max:case sap.ui.ux3.NotificationBarStatus.None:break;case sap.ui.ux3.NotificationBarStatus.Min:$.stop().animate({height:i.getHeightOfStatus(t)},{duration:"fast",queue:true});$.addClass("sapUiNotificationBarMinimized");i.$("notifiers").css("display","none");j="block";break;default:case sap.ui.ux3.NotificationBarStatus.Default:$.stop().animate({height:i.getHeightOfStatus(t)},{duration:"fast",queue:true});$.removeClass("sapUiNotificationBarMaximized");$.removeClass("sapUiNotificationBarMinimized");break;}var p=i.$("hoverItem");p.css("display",j);};N.prototype.onfocusin=function(E){if(this._togglerClicked){delete this._togglerClicked;E.stopImmediatePropagation(true);}};N.prototype.onclick=function(E){this._togglerClicked=true;this.$().blur();var $=q(document.activeElement);n(this);var i=E.target.id;var j=i.split("-");if(j){var v=this.getVisibleStatus();var p=j.length-1;switch(j[p]){case"ArrowUp":if(v==="Min"){this.setVisibleStatus("Default");}else{this.setVisibleStatus("Max");}break;case"ArrowDown":if(v==="Max"){this.setVisibleStatus("Default");}else{this.setVisibleStatus("Min");}E.preventDefault();break;case"BarUp":if(this._formerVisibleStatus){this.setVisibleStatus(this._formerVisibleStatus);}else{this.setVisibleStatus("Default");}break;case"BarDown":this._formerVisibleStatus=v;this.setVisibleStatus("Min");$.blur();break;default:if($.hasClass("sapUiNotifier")){$.focus();}else{if(this.hasItems()){var t=this.getNotifiers();if(t.length>0){var u=q(t[0]);u.focus();}else{var x=this.getMessageNotifier();if(x){q(x).focus();}}}}break;}}};N.prototype.onThemeChanged=function(E){if(this.getDomRef()){this.invalidate();}};var n=function(t){var j=t.getNotifiers();for(var i=0;i<j.length;i++){var p=j[i];p._oCallout.close();}if(t.getMessageNotifier()){t.getMessageNotifier()._oCallout.close();}};N.prototype.getHeightOfStatus=function(i){var p="";if(i==sap.ui.ux3.NotificationBarStatus.Min){p="sapUiNotificationBarHeightMinimized";}else if(i==sap.ui.ux3.NotificationBarStatus.Default){p="sapUiNotificationBarHeight";}else if(i==sap.ui.ux3.NotificationBarStatus.Max){p="sapUiNotificationBarHeightMaximized";p=P.get(p);var j=p.indexOf("%");if(j!=-1){var t=p.substring(0,j);var H=q(window).height();H=parseInt(H/100*t,10);var _=parseInt(this.getHeightOfStatus(sap.ui.ux3.NotificationBarStatus.Default),10);if(H<_){H=_+1;}}else{var M="No valid percantage value given for maximized size. 400px is used";q.sap.log.warning(M);H=400;}return H+"px";}else{return"0px";}p=P.get(p);return p;};N.prototype.setVisibleStatus=function(t){this._resizeFrom=this.getVisibleStatus();this._resizeTo=t;if(this._resizeFrom!==this._resizeTo){if(t===sap.ui.ux3.NotificationBarStatus.None){n(this);if(this.getDomRef()){m(this,t);}else{this.$().css({"height":"0px","display":"none"});}}this.setProperty("visibleStatus",t);this.fireResize({status:t});}};N.prototype.setAlwaysShowToggler=function(A){if(sap.ui.Device.browser.mobile){A=true;}this.setProperty("alwaysShowToggler",A,true);var $=this.$("toggler");if(A){$.css("display","block");}else{$.css("display","none");}};}());return N;},true);

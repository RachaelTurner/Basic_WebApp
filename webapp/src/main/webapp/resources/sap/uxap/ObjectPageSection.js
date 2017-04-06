/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/InvisibleText","./ObjectPageSectionBase","sap/ui/Device","sap/m/Button","sap/ui/core/StashedControlSupport","./ObjectPageSubSection","./library"],function(q,I,O,D,B,S,a,l){"use strict";var b=O.extend("sap.uxap.ObjectPageSection",{metadata:{library:"sap.uxap",properties:{showTitle:{type:"boolean",group:"Appearance",defaultValue:true},titleUppercase:{type:"boolean",group:"Appearance",defaultValue:true}},defaultAggregation:"subSections",aggregations:{subSections:{type:"sap.uxap.ObjectPageSubSection",multiple:true,singularName:"subSection"},ariaLabelledBy:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_showHideAllButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_showHideButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{selectedSubSection:{type:"sap.uxap.ObjectPageSubSection",multiple:false}},designTime:true}});b.MEDIA_RANGE=D.media.RANGESETS.SAP_STANDARD;b._getClosestSection=function(s){return(s instanceof a)?s.getParent():s;};b.prototype._expandSection=function(){O.prototype._expandSection.call(this)._updateShowHideAllButton(!this._thereAreHiddenSubSections());};b.prototype.init=function(){O.prototype.init.call(this);this._sContainerSelector=".sapUxAPObjectPageSectionContainer";D.media.attachHandler(this._updateImportance,this,b.MEDIA_RANGE);};b.prototype.exit=function(){D.media.detachHandler(this._updateImportance,this,b.MEDIA_RANGE);};b.prototype._getImportanceLevelToHide=function(c){var o=this._getObjectPageLayout(),m=c||D.media.getCurrentRange(b.MEDIA_RANGE),s=o&&o.getShowOnlyHighImportance();return this._determineTheLowestLevelOfImportanceToShow(m.name,s);};b.prototype._updateImportance=function(c){var o=this._getObjectPageLayout(),i=this._getImportanceLevelToHide(c);this.getSubSections().forEach(function(s){s._applyImportanceRules(i);});this._applyImportanceRules(i);this._updateShowHideAllButton(false);if(o&&this.getDomRef()){o._requestAdjustLayout();}};b.prototype._determineTheLowestLevelOfImportanceToShow=function(m,s){if(s||m==="Phone"){return l.Importance.High;}if(m==="Tablet"){return l.Importance.Medium;}return l.Importance.Low;};b.prototype.connectToModels=function(){this.getSubSections().forEach(function(s){s.connectToModels();});};b.prototype._allowPropagationToLoadedViews=function(A){this.getSubSections().forEach(function(s){s._allowPropagationToLoadedViews(A);});};b.prototype.onBeforeRendering=function(){var A="ariaLabelledBy";if(!this.getAggregation(A)){this.setAggregation(A,this._getAriaLabelledBy(),true);}this._updateImportance();};b.prototype._getAriaLabelledBy=function(){return new I({text:this._getInternalTitle()||this.getTitle()}).toStatic();};b.prototype._setSubSectionsFocusValues=function(){var s=this.getSubSections()||[],L=this.getSelectedSubSection(),p;if(s.length===0){return this;}if(s.length===1){s[0]._setToFocusable(false);return this;}s.forEach(function(o){if(L===o.sId){o._setToFocusable(true);p=true;}else{o._setToFocusable(false);}});if(!p){s[0]._setToFocusable(true);}return this;};b.prototype._disableSubSectionsFocus=function(){var s=this.getSubSections()||[];s.forEach(function(o){o._setToFocusable(false);});return this;};b.prototype._thereAreHiddenSubSections=function(){return this.getSubSections().some(function(s){return s._getIsHidden();});};b.prototype._updateShowHideSubSections=function(h){this.getSubSections().forEach(function(s){if(h&&s._shouldBeHidden()){s._updateShowHideState(true);}else if(!h){s._updateShowHideState(false);}});};b.prototype._getShouldDisplayShowHideAllButton=function(){return this.getSubSections().some(function(s){return s._shouldBeHidden();});};b.prototype._showHideContentAllContent=function(){var s=this._thereAreHiddenSubSections();if(this._getIsHidden()&&s){this._updateShowHideState(false);}this._updateShowHideSubSections(!s);this._updateShowHideAllButton(s);};b.prototype._updateShowHideState=function(h){this._updateShowHideButton(h);this._getShowHideAllButton().setVisible(this._getShouldDisplayShowHideAllButton());return O.prototype._updateShowHideState.call(this,h);};b.prototype._updateShowHideAllButton=function(h){this._getShowHideAllButton().setVisible(this._getShouldDisplayShowHideAllButton()).setText(this._getShowHideAllButtonText(h));};b.prototype._getShowHideAllButton=function(){if(!this.getAggregation("_showHideAllButton")){this.setAggregation("_showHideAllButton",new B({visible:this._getShouldDisplayShowHideAllButton(),text:this._getShowHideAllButtonText(!this._thereAreHiddenSubSections()),press:this._showHideContentAllContent.bind(this),type:sap.m.ButtonType.Transparent}).addStyleClass("sapUxAPSectionShowHideButton"),true);}return this.getAggregation("_showHideAllButton");};b.prototype._getShowHideButtonText=function(h){return l.i18nModel.getResourceBundle().getText(h?"HIDE":"SHOW");};b.prototype._getShowHideAllButtonText=function(h){return l.i18nModel.getResourceBundle().getText(h?"HIDE_ALL":"SHOW_ALL");};b.prototype._updateShowHideButton=function(h){this._getShowHideButton().setVisible(this._shouldBeHidden()).setText(this._getShowHideButtonText(!h));};b.prototype._getShowHideButton=function(){if(!this.getAggregation("_showHideButton")){this.setAggregation("_showHideButton",new B({visible:this._shouldBeHidden(),text:this._getShowHideButtonText(!this._getIsHidden()),press:this._showHideContent.bind(this),type:sap.m.ButtonType.Transparent}).addStyleClass("sapUxAPSectionShowHideButton"),true);}return this.getAggregation("_showHideButton");};S.mixInto(b);return b;});

/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/dt/Overlay'],function(q,O){"use strict";var A=O.extend("sap.ui.dt.AggregationOverlay",{metadata:{library:"sap.ui.dt",properties:{aggregationName:{type:"string"},targetZone:{type:"boolean",defaultValue:false}},aggregations:{children:{type:"sap.ui.dt.Overlay",multiple:true},designTimeMetadata:{type:"sap.ui.dt.AggregationDesignTimeMetadata",multiple:false}},events:{targetZoneChange:{parameters:{targetZone:{type:"boolean"}}}}}});A.prototype.getAssociatedDomRef=function(){var e=this.getElementInstance();var a=this.getAggregationName();var d=this.getDesignTimeMetadata();var D=d.getDomRef();var v=d.getAssociatedDomRef(e,D,a);return v;};A.prototype.setTargetZone=function(t){if(this.getTargetZone()!==t){this.setProperty("targetZone",t);this.toggleStyleClass("sapUiDtOverlayTargetZone",t);this.fireTargetZoneChange({targetZone:t});}return this;};A.prototype.isTargetZone=function(){return this.getTargetZone();};A.prototype.getChildren=function(){return this.getAggregation("children")||[];};return A;},true);
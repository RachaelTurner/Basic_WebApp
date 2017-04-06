/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['jquery.sap.global'], function (jQuery) {
	'use strict';

	/**
	 * LightBox renderer.
	 * @namespace
	 */
	var LightBoxRenderer = {};

	var className = 'sapMLightBox';
	var classNameTwoLines = 'sapMLightBoxTwoLines';
	var classNameImageContainer = 'sapMLightBoxImageContainer';
	var classNameImageContainerTwoLines = 'sapMLightBoxImageContainerTwoHeaders';
	var classNameError = 'sapMLightBoxError';
	var classNameErrorContainer = 'sapMLightBoxErrorContainer';
	var classNameErrorContainerTwoLines = 'sapMLightBoxErrorContainerTwoHeaders';
	var classNameFooter = 'sapMLightBoxFooter';
	var classNameContrastBelize = 'sapContrast';
	var classNameContrastBelizePlus = 'sapContrastPlus';
	var classNameFooterTitleSection = 'sapMLightBoxTitleSection';
	var classNameFooterTitle = 'sapMLightBoxTitle';
	var classNameFooterSubtitle = 'sapMLightBoxSubtitle';
	var classNameFooterTwoLines = 'sapMLightBoxFooterTwoLines';

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered
	 */
	LightBoxRenderer.render = function (oRm, oControl) {
		/** @type {sap.m.LightBoxItem} */
		var lightBoxItem = oControl._getImageContent();
		/** @type {sap.m.LightBoxLoadingStates} */
		var imageState = lightBoxItem._getImageState();

		oRm.write('<div');
		oRm.writeControlData(oControl);
		oRm.addClass(className);

		if (lightBoxItem.getSubtitle()) {
			oRm.addClass(classNameTwoLines);
		}

		if (imageState !== sap.m.LightBoxLoadingStates.Error) {
			oRm.addStyle('width', oControl._width + 'px');
			oRm.addStyle('height', oControl._height + 'px');
		} else {
			oRm.addClass(classNameError);
		}

		oRm.writeClasses();
		oRm.writeStyles();
		oRm.write('>');

		//if control is busy render busyIndicator instead
		if (imageState === sap.m.LightBoxLoadingStates.Loading) {
			this.renderBusyState(oRm, oControl);
		} else if (imageState === sap.m.LightBoxLoadingStates.TimeOutError ||
			imageState === sap.m.LightBoxLoadingStates.Error) {
			this.renderError(oRm, oControl);
		} else {
			this.renderImage(oRm, oControl);
		}

		this.renderFooter(oRm, oControl, lightBoxItem);

		oRm.write('</div>');

		oControl._isRendering = false;
	};

	LightBoxRenderer.renderImage = function(oRm, oControl) {
		var oLightBoxItem = oControl._getImageContent();

		if (oLightBoxItem.getSubtitle()) {
			oRm.write('<div class="' + classNameImageContainerTwoLines + '">');
		} else {
			oRm.write('<div class="' + classNameImageContainer + '">');
		}

		oRm.renderControl(oLightBoxItem.getAggregation('_image'));
		oRm.write('</div>');
	};

	LightBoxRenderer.renderError = function(oRm, oControl) {
		var oLightBoxItem = oControl._getImageContent(),
			oVerticalLayout = oControl.getAggregation('_verticalLayout');

		if (oLightBoxItem.getSubtitle()) {
			oRm.write('<div class="' + classNameErrorContainerTwoLines + '">');
		} else {
			oRm.write('<div class="' + classNameErrorContainer + '">');
		}

		oRm.renderControl(oVerticalLayout);

		oRm.write('</div>');
	};

	LightBoxRenderer.renderBusyState = function (oRm, oControl) {
		oRm.renderControl(new sap.m.BusyIndicator());
	};

	LightBoxRenderer.renderFooter = function(oRm, oControl, oImageContent) {
		var title = oImageContent.getAggregation("_title"),
			subtitle = oImageContent.getAggregation("_subtitle");
		oRm.write('<div');
		oRm.addClass(classNameFooter);
		oRm.addClass(classNameContrastBelize);
		oRm.addClass(classNameContrastBelizePlus);

		if (oImageContent.getSubtitle()) {
			oRm.addClass(classNameFooterTwoLines);
		}

		oRm.writeClasses();
		oRm.write( '>');
		oRm.write('<div class="' + classNameFooterTitleSection + '">');
		if (title) {
			oRm.renderControl(title.addStyleClass(classNameFooterTitle));
		}

		if (subtitle && subtitle.getText()) {
			oRm.renderControl(subtitle.addStyleClass(classNameFooterSubtitle));
		}

		oRm.write('</div>');
		oRm.renderControl(oControl._getCloseButton());
		oRm.write('</div>');
	};


	return LightBoxRenderer;
}, /* bExport= */ true);

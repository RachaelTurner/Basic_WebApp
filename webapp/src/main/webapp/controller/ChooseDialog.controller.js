sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.rach.controller.ChooseDialog",{
        onInit: function () {
            this.dialog = this.getView().byId("ChooseDialog");
            this.viewModel = new JSONModel();
            this.getView().setModel(this.viewModel);
            this.viewData = {
                images: [
                    {
                        imageName: "Hello World",
                        imagePath:"https://i.ytimg.com/vi/zecueq-mo4M/maxresdefault.jpg"
                    },
                    {
                        imageName: "Hello World",
                        imagePath: "http://www.amir.ninja/content/images/2015/12/Hello-World.png"
                    },
                    {
                        imageName: "Hello World",
                        imagePath: "https://i.ytimg.com/vi/C2O7lM0bU0g/maxresdefault.jpg"
                    }
                ],
                okEnabled: false,
                selectedImage: ""

            };
            this.viewModel.setData(this.viewData);
            this.shellController = undefined;

        },
        onSelect: function (sender) {
            var item = sender.getParameter("listItem");
            var itemPathInModel = item.getBindingContext().getPath();
            this.viewModel.setProperty("/selectedImage", itemPathInModel);
            this.viewModel.setProperty("/okEnabled",true);
        },
        showDialog: function (shellController) {
            this.shellController = shellController;
            this.dialog.open();
        },
        onCancelPress: function () {
            this.dialog.close();
        },
        onOKPress: function () {
            var selectedImageRef = this.viewModel.getProperty("/selectedImage");
            var selectedImage = this.viewModel.getProperty(selectedImageRef);
            var selectedImageURL = selectedImage.imagePath;
            this.shellController.setSelectedImage(selectedImageURL);
            this.dialog.close();
        }
    });
});
/**
 * This class sends an ajax request then handles the displaying of the data
 */
class Info {
    /**
     * This is the cosntor of the class
     */
    constructor() {
        var self = this;
        $(document).ready(function () {      // when document loads, do some initialization
            $("#tableDump").hide();
            self.onload(); // calls the onload function onto itself
        });

    }// end of constructor

    /**
     * This method handles the request and parsing of data
     */
    onload() {

        // initialize button event handlers (note this shows an alternative to $("#id).click(handleClick)
        $("#SystemInfo").on("click",function(){
            $("#errorListDump").html("");
            $("#tableDump").html("");

            doAjaxSysRequest({"info": "system"});
        });
        $("#RequestInfo").on("click",function(){
            $("#errorListDump").html("");
            $("#tableDump").html("");
            doAjaxRIRequest({"info": "request"});
        });
        $("#HTTPHeader").on("click",function(){
            $("#errorListDump").html("");
            $("#tableDump").html("");
            doAjaxRequest({"info": "headers"});
        });
        $("#RequestParam").on("click",function(){
            $("#errorListDump").html("");
            $("#tableDump").html("");
            doAjaxParamRequest({"info": "params"});
        });

        /**
         * This function does ajax request for ajax request withought a custom request
         * @param params - passed in JS object for what the ajax request on what to do the request for
         */
        function doAjaxRequest(params) {
            $.ajax({
                type: 'GET', //the request type
                url:"http://sapphire.msoe.edu:8080/Moloney-Lab7/InfoService", // the url of the servlet returning the Ajax response
                data: params,
                crossDomain: true,
                async: true,
                dataType: "json", //the return data tye
                success: handleSuccess, //method called on success
                error: handleError, //method called on non success
            });
        }//end of doAjaxRequest

        /**
         * This function does ajax request for ajax request for request info
         * @param params - the jS info object that ajax uses for params
         */
        function doAjaxRIRequest(params) {
            $.ajax({
                type: 'GET', //the request type
                url:"http://sapphire.msoe.edu:8080/Moloney-Lab7/InfoService", // the url of the servlet returning the Ajax response
                data: params,
                crossDomain: true,
                async: true,
                dataType: "json", //the return data tye
                success: handleRISuccess, //method called on success
                error: handleError, //method called on non success
            });
        }
        /**
         * This function does an ajax request for the request param
         * @param params - passed in JS object for what the ajax request for params
         */
        function doAjaxParamRequest(params) {
            $.ajax({
                type: 'GET', //the request type
                url: "http://sapphire.msoe.edu:8080/Moloney-Lab7/InfoService", // the url of the servlet returning the Ajax response
                data: params, //
                crossDomain: true,
                async: true,
                dataType: "json", //the return data tye
                success: handleParamSuccess, //method called on success
                error: handleError, //method called on non success
            });
        } //end of doAjaxParamRequest

        /**
         * This function does ajax request for ajax request for System Info
         * @param params - passed in JS object for what the ajax request for params
         */
        function doAjaxSysRequest(params) {
            $.ajax({ // This is the request
                type: 'GET', //the request type
                url: "http://sapphire.msoe.edu:8080/Moloney-Lab7/InfoService", // the url of the servlet returning the Ajax response
                data: params, //
                crossDomain: true,
                async: true,
                dataType: "json", //the return data tye
                success: handleSysSuccess, //method called on success
                error: handleError, //method called on non success
            });
        } //end of doAjaxParamRequest

        /**
         * This handles the ajax success only for params request
         * @param response - json object response
         * @param textStatus - status showing that the response was succesful
         * @param jqXHR - essentially a fake javaScript xhr object
         */
        function handleParamSuccess(response, textStatus, jqXHR) {
            let innerhtml = "";
            $("#tableDump").html("");
            for (var param in response){
                var arrayObjects = response[param];
                for (var i = 0; i < arrayObjects.length; i++) {
                    var anObject = arrayObjects[0];
                    $.each(anObject, function (key, anObject) {
                        innerhtml += "<tr><td class=\"rightSide\"> " + key + " =  </td><td class=\"leftSide\">" +
                            anObject + "</td></tr>";
                        $("#tableDump").html(innerhtml);

                    });
                }
            }
            $("#tableDump").html(innerhtml);
            $("#tableDump").show();
        } //end of handleParamSuccess

        /**
         * This handles the ajax success for all things that are not params and request info
         * @param response - json object response
         * @param textStatus - status showing that the response was succesful
         * @param jqXHR - essentially a fake javaScript xhr object
         */
        function handleSuccess(response, textStatus, jqXHR) {
            let innerhtml = "";
            var data = $(response.data);
            $.each(data, function (key, keyValue) {
                $.each(keyValue, function (key, keyValue) {
                    innerhtml += "<tr><td class=\"rightSide\">" + key + " </td><td class=\"leftSide\"> :  " + keyValue + "</td></tr>";
                })

            })
            $("#tableDump").html(innerhtml);
            $("#tableDump").show();
        }//end of the handle success method

        /**
         * This handles the response info success for the ajax response info
         * @param response - json object response
         * @param textStatus - status showing that the response was succesful
         * @param jqXHR - essentially a fake javaScript xhr object
         */
        function handleRISuccess(response, textStatus, jqXHR) {
            let innerhtml ="<thead><tr><th class=\"centerScreen\">HTTP Message Attribute</th>" +
                "<th class=\"centerScreen\">"+ "Value</th></tr></thead>";
            var data = $(response.data);
            $.each(data, function (key, keyValue) {
                $.each(keyValue, function (key, keyValue) {
                    innerhtml += "<tr><td class=\"rightSide\">" + key + " </td><td class=\"leftSide\"> :  " + keyValue + "</td></tr>";
                })

            })
            $("#tableDump").html(innerhtml);
            $("#tableDump").show();
        }//end of the handleRISuccess

        /**
         * This handles the ajax success for all things that are not params, and response info
         * @param response - json object response
         * @param textStatus - status showing that the response was succesful
         * @param jqXHR - essentially a fake javaScript xhr object
         */
        function handleSysSuccess(response, textStatus, jqXHR) {
            let innerhtml = "";
            var data = $(response.data);
            $.each(data, function (key, keyValue) {
                $.each(keyValue, function (key, keyValue) {
                    innerhtml += "<tr><td class=\"rightSide\">" + key + "</td><td class=\"leftSide\">" + keyValue + "</td></tr>";
                })

            })
            $("#tableDump").html(innerhtml);
            $("#tableDump").show();
        }// end of handleSysSuccess

        /**
         * This method handles the errors for all ajax requests
         * @param jqXHR - n.a. for the method
         * @param textStatus - status showing that an error has occured
         * @param errorThrown - why has the error occured
         */
        function handleError(jqXHR, textStatus, errorThrown) {
            let innerhtml= "";
            innerhtml += "<tr><td class=\"rightSide\">" + textStatus + "</td><td class=\"leftSide\">    : " + errorThrown + "</td></tr>";
            $("#errorListDump").html(innerhtml);
        }//end of the handle error method
    } //end of on load method
} //end of program
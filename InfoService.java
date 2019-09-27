package Lab7;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Enumeration;

/**
 * Servlet implementation class InfoServlet
 */
@WebServlet("/InfoService")
public class InfoService extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public InfoService() {
        super();
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
                                                                                   ServletException,
                                                                                   IOException {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.setContentType(
                "application/json"); // explicitly set http response header
        PrintWriter pw = new PrintWriter(response.getWriter());
        Enumeration<String> params = request.getParameterNames();
        JSONObject error = new JSONObject();
        while (params.hasMoreElements()) {
            String info = (String) params.nextElement();
            String paramValues = request.getParameter(info);
            if (paramValues == null) {
                error.put("error", "missing request parameter");
                pw.print(error);
            }  else if (paramValues.equals("headers")) {
                doHeaders(params, request, pw);
            } else if (paramValues.equals("params")) {
                doParams(params, request, pw);
            } else if (paramValues.equals("request")) {
                doRequest(params, request, pw);
            } else if (paramValues.equals("system")) {
                doSystem(params, request, pw);
            } else { 
                    error.put("error", "invalid request parameter");
                    pw.print(error);
            }

        }
    }

    /**
     * Creates JSON object to return when System info is clicked
     */
    private void doSystem(Enumeration<String> params, HttpServletRequest request, PrintWriter pw) {
        JSONObject requestOBJ = new JSONObject();
        JSONObject datarequestOBJ = new JSONObject();

        requestOBJ.put("The current data and time is : ", new Date().toString());
        requestOBJ.put("The current thread is : ", new Date().toString());
        requestOBJ.put("The current data and time is : ", Thread.currentThread().getId());
        requestOBJ.put("The current java.home is : ", System.getProperty("java.home"));
        requestOBJ.put("The current version is : ",
                       System.getProperty("java.vm.specification.version"));
        requestOBJ.put("The current java.runtime.name is : ",
                       System.getProperty("java.specification.name"));
        requestOBJ.put("The current java.specification.version is : ",
                       System.getProperty("java.vm.specification.version"));
        requestOBJ.put("The current java.vm.version is : ", System.getProperty("java.vm.version"));
        requestOBJ.put("The current os name is : ", System.getProperty("os.name"));
        datarequestOBJ.put("data", requestOBJ);
        pw.print(datarequestOBJ);
    }

    /**
     * Creates JSON object to return when Request info is clicked
     */

    private void doRequest(Enumeration<String> params, HttpServletRequest request, PrintWriter pw) {
        JSONObject requestObjects = new JSONObject();
        JSONObject requestObjects2 = new JSONObject();
        requestObjects.put("protocol : ", request.getProtocol());
        requestObjects.put("scheme : ", request.getScheme());
        requestObjects.put("serverPort : ", request.getServerPort());
        requestObjects.put("secure : ", request.isSecure());
        requestObjects.put("method : ", request.getMethod());
        requestObjects.put("content type : ", request.getContentType());
        requestObjects.put("auth type : ", request.getAuthType());
        requestObjects.put("servername : ", request.getServerName());
        requestObjects.put("content length : ", request.getContentLength());
        requestObjects.put("remote host : ", request.getRemoteHost());
        requestObjects.put("remote addr : ", request.getRemoteAddr());

        requestObjects2.put("data", requestObjects);

        pw.print(requestObjects2);
    }

    /**
     * Creates JSON object to return when Header info is clicked
     */
    private void doHeaders(Enumeration<String> obj, HttpServletRequest request, PrintWriter pw) {
        JSONObject headersObj = new JSONObject();
        JSONObject headersObjOuter = new JSONObject();

        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = (String) headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            headersObj.put(headerName, headerValue);
        }
        headersObjOuter.put("data", headersObj);
        pw.print(headersObjOuter);
    }

    /**
     * Creates JSON object to return when Request Param is clicked
     */
    private void doParams(Enumeration<String> obj, HttpServletRequest request, PrintWriter pw) {
        // TODO Auto-generated method stub
        Enumeration<String> parameters = request.getParameterNames();
        JSONArray arrayJSON = new JSONArray();
        JSONObject outer = new JSONObject();
        while (parameters.hasMoreElements()) {
            JSONObject obj1 = new JSONObject();
            String param1 = (String) parameters.nextElement();
            String[] value1 = request.getParameterValues(param1);
            String paramValue = "";
            for (int i = 0; i < value1.length; i++) {
                paramValue += value1[i];
            }
            obj1.put("name", param1);
            obj1.put("value", paramValue);
            arrayJSON.add(obj1);
        }
        outer.put("data", arrayJSON);
        pw.print(outer);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws
                                                                                    ServletException,
                                                                                    IOException {
        doGet(request, response);
    }

}

package co.ab180.airbridge.cordova;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;

import java.util.Arrays;

import co.ab180.airbridge.Airbridge;
import co.ab180.airbridge.AirbridgeCallback;

public class AirbridgeDeeplink extends CordovaPlugin {

    private CallbackContext callback = null;

    private static String initialDeeplink = null;
    private static AirbridgeDeeplink instance = null;

    static void processDeeplinkData(final Intent intent) {
        Airbridge.getDeeplink(intent, new AirbridgeCallback.SimpleCallback<Uri>() {
            @Override
            public void onSuccess(Uri uri) {
                if (instance != null && instance.callback != null) {
                    PluginResult result = new PluginResult(PluginResult.Status.OK, uri.toString());
                    result.setKeepCallback(true);

                    instance.callback.sendPluginResult(result);
                } else {
                    initialDeeplink = uri.toString();
                }
            }

            @Override
            public void onFailure(Throwable throwable) {
                Log.d("AirbridgeCO", Arrays.toString(throwable.getStackTrace()));
            }
        });
    }

    //
    // cordova method
    //

    public void listen(CallbackContext callback) {
        if (initialDeeplink != null) {
            PluginResult result = new PluginResult(PluginResult.Status.OK, initialDeeplink);
            result.setKeepCallback(true);

            callback.sendPluginResult(result);

            initialDeeplink = null;
        }

        this.callback = callback;
    }
    
    //
    // override
    //

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        this.callback = null;

        instance = this;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        callback = null;

        instance = null;
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        try {
            return execute0(action, args, callbackContext);
        } catch(Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
    }

    public boolean execute0(String action, JSONArray args, CallbackContext callbackContext) throws Exception {
        switch (action) {
            case "listen":
                listen(callbackContext);
                return true;
            default:
                return false;
        }
    }
}

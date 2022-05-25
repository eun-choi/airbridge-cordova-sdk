package co.ab180.airbridge.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import co.ab180.airbridge.Airbridge;

public class AirbridgePlacement extends CordovaPlugin {

    //
    // cordova method
    //

    private void click(@Nonnull String trackingLink)
    {
        Airbridge.click(trackingLink);
    }

    private void impression(@Nonnull String trackingLink)
    {
        Airbridge.impression(trackingLink);
    }

    //
    // override
    //

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        try {
            return execute0(action, args, callbackContext);
        } catch(Exception e) {
            callbackContext.error(e.getMessage());
            return false;
        }
    }

    private boolean execute0(String action, JSONArray args, CallbackContext callbackContext) throws Exception {
        switch (action) {
            case "click":
                click(args.optString(0));
                break;
            case "impression":
                impression(args.optString(0));
                break;
            default:
                return false;
        }
        callbackContext.success();

        return true;
    }
}

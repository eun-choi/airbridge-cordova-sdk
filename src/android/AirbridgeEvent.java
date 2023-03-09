package co.ab180.airbridge.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import co.ab180.airbridge.Airbridge;
import co.ab180.airbridge.event.Event;
import co.ab180.airbridge.event.StandardEventCategory;

public class AirbridgeEvent extends CordovaPlugin {

    //
    // cordova method
    //

    public void trackEvent(@Nullable String category, @Nullable JSONObject option) {
        if (category == null) {
            return;
        }
        
        Event event = new Event(category);
        addOptionToEvent(event, option);
        Airbridge.trackEvent(event);
    }

    //
    // private - tool
    //

    /**
     * Add option infomation to event
     * <p>
     * add null when some data has unmatch type
     * @param       event
     *                  target event
     * @param       option
     *                  json-object which has option infomation
     */
    private void addOptionToEvent(@Nonnull Event event, @Nullable JSONObject option) {
        if (option == null) return;

        String action = Get.type(String.class, option, "action");
        String label = Get.type(String.class, option, "label");
        Float value = Get.type(Float.class, Get.type(Number.class, option, "value"));
        Map<String, Object> attributes = convertMap(Get.type(JSONObject.class, option, "customAttributes"));
        Map<String, Object> semantics = convertMap(Get.type(JSONObject.class, option, "semanticAttributes"));

        event.setAction(action);
        event.setLabel(label);
        event.setValue(value);
        event.setCustomAttributes(attributes);
        event.setSemanticAttributes(semantics);
    }

    /**
     * convert json-object to Map
     * <p>
     * return null when input is null
     * @param       input
     *                  json-object
     * @return      Map
     */
    @Nullable
    private Map convertMap(@Nullable JSONObject input) {
        if (input == null) return null;

        Map<String, Object> map = new HashMap<>();

        Iterator<String> it = input.keys();
        while(it.hasNext()) {
            String key = it.next();
            Object value = input.opt(key);

            if (value instanceof JSONObject) {
                value = convertMap((JSONObject) value);
            } else if (value instanceof JSONArray) {
                value = convertList((JSONArray) value);
            }

            if (key != null && value != null) {

                map.put(key, value);
            }
        }

        return map;
    }

    /**
     * convert json-array to List
     * <p>
     * return null when input is null
     * @param       input
     *                  json-array
     * @return      List
     */
    @Nullable
    private List convertList(@Nullable JSONArray input) {
        if (input == null) return null;

        List<Object> list = new ArrayList<>();

        for (int i=0; i<input.length(); i++) {
            Object value = input.opt(i);

            if (value instanceof JSONObject) {
                value = convertMap((JSONObject) value);
            } else if (value instanceof JSONArray) {
                value = convertList((JSONArray) value);
            }

            if (value != null) {
                list.add(value);
            }
        }

        return list;
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

    public boolean execute0(String action, JSONArray args, CallbackContext callbackContext) {
        switch (action) {
            case "trackEvent":
                trackEvent(args.optString(0), args.optJSONObject(1));
                break;
            default:
                return false;
        }
        callbackContext.success();

        return true;
    }
}

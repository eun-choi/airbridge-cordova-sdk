package co.ab180.airbridge.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Nullable;

import co.ab180.airbridge.Airbridge;

public class AirbridgeState extends CordovaPlugin {

    //
    // cordova method
    //

    public void setUser(@Nullable JSONObject user) {
        String id = Get.type(String.class, user, "ID");
        String email = Get.type(String.class, user, "email");
        String phone = Get.type(String.class, user, "phone");
        Map<String, String> alias = convertMap(Get.type(JSONObject.class, user, "alias"));
        Map<String, Object> attributes = convertMap(Get.type(JSONObject.class, user, "attributes"));

        Airbridge.getCurrentUser().setId(id);
        Airbridge.getCurrentUser().setEmail(email);
        Airbridge.getCurrentUser().setPhone(phone);

        if (alias != null) {
            for (Map.Entry<String, String> entry : alias.entrySet()) {
                Airbridge.getCurrentUser().setAlias(entry.getKey(), entry.getValue());
            }
        } else {
            Airbridge.getCurrentUser().clearAlias();
        }

        if (attributes != null) {
            for (Map.Entry<String, ?> entry : attributes.entrySet()) {
                String key = entry.getKey();
                Object value = entry.getValue();

                if (value instanceof String) {
                    Airbridge.getCurrentUser().setAttribute(key, (String) value);
                } else if (value instanceof Long) {
                    Airbridge.getCurrentUser().setAttribute(key, (Long) value);
                } else if (value instanceof Integer) {
                    Airbridge.getCurrentUser().setAttribute(key, (Integer) value);
                } else if (value instanceof Double || value instanceof Float) {
                    Airbridge.getCurrentUser().setAttribute(key, ((Number) value).floatValue());
                } else if (value instanceof Boolean) {
                    Airbridge.getCurrentUser().setAttribute(key, (Boolean) value);
                }
            }
        } else {
            Airbridge.getCurrentUser().clearAttributes();
        }
    }

    public void updateUser(@Nullable JSONObject user) {
        String id = Get.type(String.class, user, "ID");
        String email = Get.type(String.class, user, "email");
        String phone = Get.type(String.class, user, "phone");
        Map<String, String> alias = convertMap(Get.type(JSONObject.class, user, "alias"));
        Map<String, Object> attributes = convertMap(Get.type(JSONObject.class, user, "attributes"));

        if (id != null) {
            Airbridge.getCurrentUser().setId(id);
        }

        if (email != null) {
            Airbridge.getCurrentUser().setEmail(email);
        }

        if (phone != null) {
            Airbridge.getCurrentUser().setPhone(phone);
        }

        if (alias != null) {
            for (Map.Entry<String, String> entry : alias.entrySet()) {
                Airbridge.getCurrentUser().setAlias(entry.getKey(), entry.getValue());
            }
        }

        if (attributes != null) {
            for (Map.Entry<String, ?> entry : attributes.entrySet()) {
                String key = entry.getKey();
                Object value = entry.getValue();

                if (value instanceof String) {
                    Airbridge.getCurrentUser().setAttribute(key, (String) value);
                } else if (value instanceof Long) {
                    Airbridge.getCurrentUser().setAttribute(key, (Long) value);
                } else if (value instanceof Integer) {
                    Airbridge.getCurrentUser().setAttribute(key, (Integer) value);
                } else if (value instanceof Double || value instanceof Float) {
                    Airbridge.getCurrentUser().setAttribute(key, ((Number) value).floatValue());
                } else if (value instanceof Boolean) {
                    Airbridge.getCurrentUser().setAttribute(key, (Boolean) value);
                }
            }
        }
    }

    public void startTracking() {
        Airbridge.startTracking();
    }

    //
    // private - tool
    //

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

            if (key != null && value != null) {
                map.put(key, value);
            }
        }

        return map;
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

    public boolean execute0(String action, JSONArray args, CallbackContext callbackContext) throws Exception {
        switch (action) {
            case "setUser":
                setUser(args.optJSONObject(0));
                break;
            case "updateUser":
                updateUser(args.optJSONObject(0));
                break;
            case "startTracking":
                startTracking();
                break;
            default:
                return false;
        }
        callbackContext.success();

        return true;
    }
}

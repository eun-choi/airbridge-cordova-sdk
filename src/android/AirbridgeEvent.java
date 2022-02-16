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

    public void signIn(@Nullable JSONObject user, @Nullable JSONObject option) {
        String ID = Get.type(String.class, user, "ID");
        String email = Get.type(String.class, user, "email");
        String phone = Get.type(String.class, user, "phone");
        Map<String, String> alias = convertMap(Get.type(JSONObject.class, user, "alias"));
        Map<String, Object> attributes = convertMap(Get.type(JSONObject.class, user, "attributes"));

        Airbridge.getCurrentUser().setId(ID);
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
            for (Map.Entry<String, Object> entry : attributes.entrySet()) {
                String key = entry.getKey();
                Object value = entry.getValue();

                if (value instanceof Integer) {
                    Airbridge.getCurrentUser().setAttribute(key, (Integer) value);
                }
                else if (value instanceof Long) {
                    Airbridge.getCurrentUser().setAttribute(key, (Long) value);
                }
                else if (value instanceof Float) {
                    Airbridge.getCurrentUser().setAttribute(key, (Float) value);
                }
                else if (value instanceof Double) {
                    Airbridge.getCurrentUser().setAttribute(key, ((Double) value).floatValue());
                }
                else if (value instanceof Boolean) {
                    Airbridge.getCurrentUser().setAttribute(key, (Boolean) value);
                }
                else if (value instanceof String) {
                    Airbridge.getCurrentUser().setAttribute(key, (String) value);
                }
            }
        } else {
            Airbridge.getCurrentUser().clearAttributes();
        }

        Event event = new Event(StandardEventCategory.SIGN_IN);

        addOptionToEvent(event, option);

        Airbridge.trackEvent(event);
    }

    public void signUp(@Nullable JSONObject user, @Nullable JSONObject option) {
        String ID = Get.type(String.class, user, "ID");
        String email = Get.type(String.class, user, "email");
        String phone = Get.type(String.class, user, "phone");
        Map<String, String> alias = convertMap(Get.type(JSONObject.class, user, "alias"));
        Map<String, Object> attributes = convertMap(Get.type(JSONObject.class, user, "attributes"));

        Airbridge.getCurrentUser().setId(ID);
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
            for (Map.Entry<String, Object> entry : attributes.entrySet()) {
                String key = entry.getKey();
                Object value = entry.getValue();

                if (value instanceof Integer) {
                    Airbridge.getCurrentUser().setAttribute(key, (Integer) value);
                }
                else if (value instanceof Long) {
                    Airbridge.getCurrentUser().setAttribute(key, (Long) value);
                }
                else if (value instanceof Float) {
                    Airbridge.getCurrentUser().setAttribute(key, (Float) value);
                }
                else if (value instanceof Double) {
                    Airbridge.getCurrentUser().setAttribute(key, ((Double) value).floatValue());
                }
                else if (value instanceof Boolean) {
                    Airbridge.getCurrentUser().setAttribute(key, (Boolean) value);
                }
                else if (value instanceof String) {
                    Airbridge.getCurrentUser().setAttribute(key, (String) value);
                }
            }
        } else {
            Airbridge.getCurrentUser().clearAttributes();
        }

        Event event = new Event(StandardEventCategory.SIGN_UP);

        addOptionToEvent(event, option);

        Airbridge.trackEvent(event);
    }

    public void signOut(@Nullable JSONObject option) {
        Event event = new Event(StandardEventCategory.SIGN_OUT);

        addOptionToEvent(event, option);

        Airbridge.trackEvent(event);

        Airbridge.expireUser();
    }

    public void viewHome(@Nullable JSONObject option) {
        Event event = new Event(StandardEventCategory.HOME_VIEW);

        addOptionToEvent(event, option);

        Airbridge.trackEvent(event);
    }

    public void viewSearchResult(@Nullable JSONObject option) {
        Event event = new Event(StandardEventCategory.SEARCH_RESULT_VIEW);

        addOptionToEvent(event, option);

        Airbridge.trackEvent(event);
    }

    public void viewProductList(@Nullable JSONObject option) {
        Event event = new Event(StandardEventCategory.PRODUCT_LIST_VIEW);

        addOptionToEvent(event, option);

        Airbridge.trackEvent(event);
    }

    public void viewProductDetail(@Nullable JSONObject option) {
        Event event = new Event(StandardEventCategory.PRODUCT_DETAILS_VIEW);

        addOptionToEvent(event, option);

        Airbridge.trackEvent(event);
    }

    public void addToCart(@Nullable JSONObject option) {
        Event event = new Event(StandardEventCategory.ADD_TO_CART);

        addOptionToEvent(event, option);

        Airbridge.trackEvent(event);
    }

    public void purchase(@Nullable JSONObject option) {
        Event event = new Event(StandardEventCategory.ORDER_COMPLETED);

        addOptionToEvent(event, option);

        Airbridge.trackEvent(event);
    }

    public void custom(@Nonnull String category, @Nullable JSONObject option) {
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
        Map<String, Object> attributes = convertMap(Get.type(JSONObject.class, option, "attributes"));
        Map<String, Object> semantics = convertMap(Get.type(JSONObject.class, option, "semantics"));

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
            case "signIn":
                signIn(args.optJSONObject(0), args.optJSONObject(1));
                break;
            case "signUp":
                signUp(args.optJSONObject(0), args.optJSONObject(1));
                break;
            case "signOut":
                signOut(args.optJSONObject(0));
                break;
            case "viewHome":
                viewHome(args.optJSONObject(0));
                break;
            case "viewProductList":
                viewProductList(args.optJSONObject(0));
                break;
            case "viewSearchResult":
                viewSearchResult(args.optJSONObject(0));
                break;
            case "viewProductDetail":
                viewProductDetail(args.optJSONObject(0));
                break;
            case "addToCart":
                addToCart(args.optJSONObject(0));
                break;
            case "purchase":
                purchase(args.optJSONObject(0));
                break;
            case "custom":
                custom(args.optString(0), args.optJSONObject(1));
                break;
            default:
                return false;
        }
        callbackContext.success();

        return true;
    }
}
